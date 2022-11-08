import { DetailsList, DetailsListLayoutMode, DetailsRow, getFocusStyle, GroupHeader, IColumn, IDetailsColumnStyleProps, IDetailsColumnStyles, IDetailsHeaderProps, IDetailsList, IFocusZoneProps, IGroup, IGroupedListProps, IGroupHeaderProps, IStyleFunctionOrObject, SelectionMode, Sticky, Theme } from "@fluentui/react";
import { useRef, useState } from "react";
import { VsColors, VsTheme } from "./themeColors";

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
  second:number
}



const items:IDemoItem[] = [
  // Group 1
  {
    name: "first",
    first: 1,
    second:2
  },
  // Group 2
  {
    name: "second",
    first: 1,
    second:2
  },
  {
    name: "third",
    first: 1,
    second:2
  },
  // Group nested 1
  {
    name: "fourth",
    first: 1,
    second:2
  },
  {
    name: "fifth",
    first: 1,
    second:2
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
    second:345
  },
  {
    startIndex:1,
    count:2,
    key:"group2",
    name:"Group 2",
    first:123,
    second:345
  },
  {
    startIndex:1, // are these important for the nested ?
    count:2,
    children:[
      {
        key:"groupNested1",
        name:"Group Nested 1",
        startIndex:3,
        count:1,
        first:123,
        second:345
      },
      {
        key:"groupNested2",
        name:"Group Nested 2",
        startIndex:4,
        count:1,
        first:123,
        second:345
      }
    ],
    key:"groupNested",
    name:"Group Nested",
    first:123,
    second:345
  }
];



//const groupNestingDepth = grouping > 0 ? 2 : 1;
const columns:IColumn[] = [
  {
    fieldName:"name",
    name:"name",
    key:"name",
    minWidth:100,
    isGrouped:true,
    isSorted:true,
    isSortedDescending: false,
    isResizable:true
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
    fieldName:"second",
    name:"second",
    key:"second",
    minWidth:100,
    isFiltered:true,
    isResizable:true
  }
];

/*

IGroup has 
children - IGroup[]
count

interface ICoverageGroup extends IGroup, ICoverageItemBase{
  classPaths:undefined
  totalBranches:number
  coveredBranches:number
  totalLines:number,
  filter:(filter:string, hideFullyCovered:boolean) => void
  sort:(fieldName:keyof ICoverageItemBase,ascending:boolean) => void
  hideFullyCovered?:never
}
*/

let _columns:any = null;
const groupNestingDepth = 1;
export interface IGroupedListDemoProps{
  vsColors:VsColors
}

let lastVsColors:VsColors|undefined;
export function GroupedListDemo(props:IGroupedListDemoProps){
    const detailsListRef = useRef<IDetailsList>(null);
    const {vsColors} = props;
    const headerColors = vsColors.HeaderColors;
    const environmentColors = vsColors.EnvironmentColors;
    const focusColor = vsColors.CommonControlsColors.FocusVisualText;
    const focusStyle = getFocusStyle(null as any, {borderColor:"transparent", outlineColor:focusColor});
    const columnStyles:IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>= props => {
      const {isActionable} = props;
      return {
        root:[
          {
            color:headerColors.DefaultText,
            background:headerColors.Default
            // could add border here - but will need to not duplicate
          },
        isActionable && {
          selectors: {
            ':hover': {
              color: headerColors.MouseOverText,
              background: headerColors.MouseOver,
              // glyph to do
            },
            ':active': {
              color:headerColors.MouseDownText,
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

    lastVsColors = vsColors;
    return <DetailsList 
        componentRef={detailsListRef}
        onShouldVirtualize={() => false} //https://github.com/microsoft/fluentui/issues/21367 https://github.com/microsoft/fluentui/issues/20825
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionMode={SelectionMode.none} 
        items={items} 
        groups={groups}
        columns={columns}
        onColumnResize={() => {console.log("OnColumnResize")}}
        listProps={
          {}
        }
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
               
              return <DetailsRow {...props} 
                focusZoneProps={focusZoneProps} 
                groupNestingDepth={headerGroupNestingDepth} 
                item={props!.group} 
                columns={_columns} 
                selectionMode={SelectionMode.none} 
                itemIndex={props!.groupIndex!}
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
                color:headerColors.DefaultText,
                selectors: {
                  ':hover': {
                    background: headerColors.MouseOver,
                    color: headerColors.MouseOverText,
                  },
                }
              },focusStyle
              ],
              // inside root
              groupHeaderContainer:{
      
              },
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
              }
            }}
            props!.styles = styles;
            return defaultRender!(props)
            //return <GroupHeader {...props} styles={styles}/>
          }
        }}

        onRenderRow={(rowProps, defaultRender) => {
          rowProps!.styles = {
            root: [{
              background:"none",
              borderBottom:"none",
              color:environmentColors.CommandBarTextActive,
              selectors: {
                "&:hover":{
                  background:"none", // if I am hovering on group header....
                  color:environmentColors.CommandBarTextActive,
                }
              }
            },
            focusStyle
          ],
          };
          return defaultRender!(rowProps);
        }}

        onRenderDetailsHeader={
          (detailsHeaderProps: IDetailsHeaderProps | undefined, defaultRender: any) => {
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