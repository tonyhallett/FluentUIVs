import { DetailsList, DetailsListLayoutMode, DetailsRow, getFocusStyle, GroupHeader, IColumn, IDetailsColumnStyleProps, IDetailsColumnStyles, IDetailsHeaderProps, IDetailsList, IFocusZoneProps, IGroup, IGroupedListProps, IGroupHeaderProps, IStyleFunctionOrObject, SelectionMode, Sticky, Theme, Label, GroupSpacer, CheckboxVisibility, ProgressIndicator, IDetailsRowProps, ActionButton } from "@fluentui/react";
import { useRef, useState } from "react";
import { VsColors, VsTheme } from "./themeColors";
import { getActionButtonStyles } from "./themeStyles";

/*
    todo

    items
    groups
    columns

    what 

    functional variable for 
    _columns / _groupNestingDepths
*/
interface IDemoItem{
  name:string,
  first:number,
  percentage:number | null,
  isGroup?:true
}



const items:IDemoItem[] = [
  // Group 1
  {
    name: "first.!!!!!!!!!!!!!!!!!!!!!",
    first: 1,
    percentage:10
  },
  // Group 2
  {
    name: "second!!!!!!!!!!!!!!!!!!!!!",
    first: 1,
    percentage:20
  },
  {
    name: "third!!!!!!!!!!!!!!!!!!!!!!!",
    first: 1,
    percentage:30
  },
  // Group nested 1
  {
    name: "fourth!!!!!!!!!!!!!!!!!!!!!!!!",
    first: 1,
    percentage:40
  },
  {
    name: "fifth!!!!!!!!!!!!!!!!!!!!!!!!",
    first: 1,
    percentage:null
  }
];

type IDemoGroup = IGroup & IDemoItem & {children?:IDemoGroup[]}

const groups:IDemoGroup[] = [
  {
    startIndex:0,
    count:1,
    key:"group1",
    name:"Group 1",
    first:123,
    percentage:10,
    isGroup:true,
    level:0,
    children:[
      {
        key:"groupNestedStart",
        name:"Group Nested Start",
        startIndex:0,
        count:1,
        first:123,
        percentage:60,
        isGroup:true,
        level:1
      },
    ]
  },
  {
    startIndex:1,
    count:2,
    key:"group2",
    name:"Group 2",
    first:123,
    percentage:20,
    isGroup:true,
    level:0
  },
  {
    startIndex:1, // are these important for the nested ?
    count:2,
    isGroup:true,
    level:0,
    children:[
      {
        key:"groupNested1",
        name:"Group Nested 1",
        startIndex:3,
        count:1,
        first:123,
        percentage:60,
        isGroup:true,
        level:1
      },
      {
        key:"groupNested2",
        name:"Group Nested 2",
        startIndex:4,
        count:1,
        first:123,
        percentage:70,
        isGroup:true,
        level:1
      }
    ],
    key:"groupNested",
    name:"Group Nested",
    first:123,
    percentage:null,
  }
];


type IDemoColumn = Omit<IColumn, 'onRender'> & {
  onRenderWithStyles?:(styles:any,item:IDemoItem,index:number | undefined,column:IDemoColumn)=>React.ReactNode,
  fieldName:string
}
const columns:IDemoColumn[] = [
  {
    fieldName:"name",
    name:"name",
    key:"name",
    minWidth:100,
    isGrouped:true,
    isSorted:true,
    isSortedDescending: false,
    isResizable:true,
    onRenderWithStyles(vsColors:VsColors,item:IDemoItem){
      const renderName = item.isGroup;
      if(renderName){
        return <span>{item.name}</span>
      }
      return <span><ActionButton iconProps={{iconName:"openFile"}} styles={getActionButtonStyles(vsColors)}></ActionButton><span style={{marginLeft:"5px"}}>{item.name}</span></span>
    }
  },
  {
    fieldName:"first",
    name:"first",
    key:"first",
    minWidth:100,
    isSorted:true,
    isSortedDescending: true,
    isResizable:true
  },
  {
    fieldName:"percentage",
    name:"percentage",
    key:"percentage",
    minWidth:100,
    isFiltered:true,
    isResizable:true,
    calculatedWidth:0,// workaround DetailsList] NaN is an invalid value for the 'width' css style property
    flexGrow:1,
    onRenderWithStyles(vsColors:VsColors,item:IDemoItem){
      return renderPercentage(item.percentage,vsColors);
    }
  }
];

let _columns:any = null;
const groupNestingDepth = 2
export interface IGroupedListDemoProps{
  vsColors:VsColors
}

function renderPercentage(percentage:number | null,vsColors:VsColors){
  const {EnvironmentColors, HeaderColors} = vsColors;
  const backgroundColor = percentage === null ? "transparent" : EnvironmentColors.VizSurfaceGreenMedium;//HeaderColors.SeparatorLine
  return <ProgressIndicator barHeight={5} percentComplete={percentage === null ? 1 : percentage/100} styles={
    {
      progressBar:{
        backgroundColor,
        color:"transparent"
      },
      progressTrack:{
        backgroundColor:"transparent",
        color:"transparent"
      },
      root:{
        width:'100px',
        color:"transparent"
      },
    }
  }/>
}


let lastVsColors:VsColors|undefined;

export function GroupedListDemo(props:IGroupedListDemoProps){
    const detailsListRef = useRef<IDetailsList>(null);
    const {vsColors} = props;
    const headerColors = vsColors.HeaderColors;
    const environmentColors = vsColors.EnvironmentColors;
    const treeViewColors = vsColors.TreeViewColors;
    const focusColor = vsColors.CommonControlsColors.FocusVisualText;
    const focusStyle = getFocusStyle(null as any, {borderColor:"transparent", outlineColor:focusColor});
    const columnStyles:IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>= props => {
      const {isActionable} = props;
      return {
        root:[
          {
            color:environmentColors.CommandBarTextActive, // mirroring vs - alt headerColors.DefaultText,
            background:headerColors.Default,
            borderLeft:`1px solid ${headerColors.SeparatorLine}`
          },
        isActionable && {
          selectors: {
            ':hover': {
              color: environmentColors.CommandBarTextHover,// mirroring vs, alt headerColors.MouseOverText,
              background: headerColors.MouseOver,
              // glyph to do
            },
            ':active': {
              color:environmentColors.CommandBarTextSelected, //mirroring vs, alt headerColors.MouseDownText,
              background: headerColors.MouseDown,
            },
          },
        },
      ],
      cellTitle:[
        focusStyle,
      ],  
      nearIcon:{
        color:headerColors.Glyph
      },
      sortIcon:{
        color:headerColors.Glyph
      },
      gripperBarVerticalStyle:{
        color:headerColors.SeparatorLine
      }
     }
    }
    columns.forEach(c => c.styles=columnStyles);

    const needsNewVersion = lastVsColors !== vsColors;
    if(needsNewVersion){
      detailsListRef.current?.forceUpdate();
    }
    const onRenderItemColumn:IDetailsRowProps["onRenderItemColumn"] = (item,index, column) => {
      const demoColumn = column as IDemoColumn;
      if(demoColumn!.onRenderWithStyles){
        return demoColumn.onRenderWithStyles(vsColors, item, index, demoColumn);
      }else{
        return item[demoColumn.fieldName];
      }
    }
    lastVsColors = vsColors;
    return <DetailsList 
        componentRef={detailsListRef}
        onShouldVirtualize={() => false} //https://github.com/microsoft/fluentui/issues/21367 https://github.com/microsoft/fluentui/issues/20825
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.single}
        checkboxVisibility={CheckboxVisibility.hidden}
        items={items} 
        groups={groups}
        columns={columns}
        groupProps={{
          showEmptyGroups:false,
          headerProps:{
            onRenderTitle:(props:IGroupHeaderProps|undefined) => {
              // groupNestingDepth used for aria
              const groupLevel = props!.groupLevel === undefined ? 0 : props!.groupLevel;
              const headerGroupNestingDepth = groupNestingDepth- groupLevel - 1;
              const focusZoneProps:IFocusZoneProps = {
                "data-is-focusable":false
              } as any
               
              return  <DetailsRow {...props} 
                focusZoneProps={focusZoneProps} 
                groupNestingDepth={headerGroupNestingDepth} 
                item={props!.group} 
                columns={_columns} 
                selectionMode={SelectionMode.none} 
                itemIndex={props!.groupIndex!}
                onRenderItemColumn={onRenderItemColumn}
                styles={
                  {
                    root: {
                      background:"inherit",
                      borderBottom:"none",
                      color:"inherit",
                      selectors: {
                        "&:hover":{
                          background:"inherit",
                          color:"inherit",
                        }
                      }
                    },
                  }
                }
                />
            }
          },
          onRenderHeader: (props:IGroupHeaderProps|undefined, defaultRender) => {
            _columns = (props as any).columns; // ****************************** any cast
            const styles:IGroupHeaderProps["styles"] = styleProps  => {
              const {selected} = styleProps
              return {
              root:[{
                borderBottom: `1px solid ${headerColors.SeparatorLine}`,
                //borderTop: `1px solid ${headerColors.SeparatorLine}`,

                background:headerColors.Default,
                color: environmentColors.CommandBarTextActive, // *** mirroring vs, alt headerColors.DefaultText
                selectors: {
                  ':hover': {
                    background: headerColors.MouseOver,
                    color: environmentColors.CommandBarTextHover // *** mirroring vs, alt headerColors.MouseOverText,
                  },
                }
              },focusStyle
              ],
              expand:{  
                color:headerColors.Glyph,
                selectors: { // ignoring selected state
                  ':hover': {
                    color: headerColors.MouseOverGlyph,
                    backgroundColor: headerColors.MouseOver
                  },
                  ':active': {
                    color: headerColors.MouseDownGlyph,
                    backgroundColor: headerColors.MouseDown
                  },
                },
              },
              cellSizer: [
                {
                  selectors: {
                    ':after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: 1,
                      background: headerColors.MouseOver,
                      opacity: 0,
                      left: '50%',
                    },
                    // could change the boxShadow
                    /* [`&.${classNames.isResizing}:after`]: [
                      cellSizerFadeInStyles,
                      {
                        boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)',
                      },
                    ], */
                  },
                },
              ],
            }}
            props!.styles = styles;
            return defaultRender!(props)
          }
        }}
        onRenderRow={(rowProps, defaultRender) => {
          rowProps!.styles = (detailsRowStyleProps) => {
            const {isSelected} = detailsRowStyleProps;
            return {
              fields:{
                alignItems:"center"
              },
              root: [{
                background:treeViewColors.Background, // mirroring vs, docs say "transparent",
                borderBottom:"none",
                color:environmentColors.CommandBarTextActive,
                selectors: {
                  "&:hover":{
                    background:treeViewColors.Background, // mirroring vs, docs say "transparent",
                    color:environmentColors.CommandBarTextActive,
                  }
                }
              },
              
              isSelected && {
                color: treeViewColors.SelectedItemInactiveText,
                background: treeViewColors.SelectedItemInactive,
                borderBottom: "none",
                selectors: {
                  '&:before': {
                    borderTop: "none",
                  },
          
                  // Selected State hover
                  '&:hover': {
                    color: treeViewColors.SelectedItemInactiveText,
                    background: treeViewColors.SelectedItemInactive,
                  },
          
                  // Focus state
                  '&:focus': {
                    color: treeViewColors.SelectedItemActiveText,
                    background: treeViewColors.SelectedItemActive,
                    selectors: {
                      [`.ms-DetailsRow-cell`]: {
                        color: treeViewColors.SelectedItemActiveText,
                        background: treeViewColors.SelectedItemActive,
                      },
                    },
                  },
          
                  // Focus and hover state
                  '&:focus:hover': {
                    color: treeViewColors.SelectedItemActiveText,
                    background: treeViewColors.SelectedItemActive,
                    selectors: {
                      [`.ms-DetailsRow-cell`]: {
                        color: treeViewColors.SelectedItemActiveText,
                        background: treeViewColors.SelectedItemActive,
                      },
                    },
                  },
                },
              },
              focusStyle,
            ],
          }
        };
          rowProps!.groupNestingDepth = 2; // todo calculate
          return defaultRender!(rowProps);
        }}
        onRenderItemColumn={onRenderItemColumn}
        onRenderDetailsHeader={
          (detailsHeaderProps: IDetailsHeaderProps | undefined, defaultRender: any) => {
            detailsHeaderProps!.groupNestingDepth = 2; // todo calculate
            /* if(active){
              return <Sticky>
              {defaultRender(detailsHeaderProps)}
            </Sticky>
            } */
            detailsHeaderProps!.styles={
              root:{
                background:headerColors.Default,
                borderBottom: `1px solid ${headerColors.SeparatorLine}`,
                // should this be done ?
                //borderTop: `1px solid ${headerColors.SeparatorLine}`,
                //borderLeft: `1px solid ${headerColors.SeparatorLine}`,
                //borderRight: `1px solid ${headerColors.SeparatorLine}`,
                
              },
              cellIsGroupExpander:[
                focusStyle,
                {
                  color:headerColors.Glyph,
                  selectors: {
                    ':hover': {
                      color: headerColors.MouseOverGlyph,
                      backgroundColor: headerColors.MouseOver
                    },
                    ':active': {
                      color: headerColors.MouseDownGlyph,
                      backgroundColor: headerColors.MouseDown
                    },
                  },

              }],
              
            }
            return defaultRender(detailsHeaderProps)
          }
        }
    />
}