import { Selection, DetailsList, DetailsListLayoutMode, DetailsRow, getFocusStyle,Text, GroupHeader, IColumn, IDetailsColumnStyleProps, IDetailsColumnStyles, IDetailsHeaderProps, IDetailsList, IFocusZoneProps, IGroup, IGroupedListProps, IGroupHeaderProps, IStyleFunctionOrObject, SelectionMode, Sticky, Theme, Label, GroupSpacer, CheckboxVisibility, ProgressIndicator, IDetailsRowProps, ActionButton, Stack, ISliderProps, Slider, SearchBox, getInputFocusStyle, isDark, Link, ILinkProps, ILinkStyleProps, ITheme, IGetFocusStylesOptions, IRawStyle, ZIndexes, ISelection, SelectionZone, IObjectWithKey } from "@fluentui/react";
import React, { FocusEvent, useEffect, useRef, useState } from "react";
import { getColor, lightenOrDarken, colorRGBA } from "./colorHelpers";
import { sliderClassNames } from "./globalClassNames";
import { VsColors, VsTheme } from "./themeColors";
import { buttonHighContrastFocus, getActionButtonStyles } from "./themeStyles";

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

function StopPropagation(props:{children:React.ReactNode}){
  return <div  onMouseDown={evt => {
    evt.stopPropagation();
  }} onClick={evt => {
    evt.stopPropagation();
    
    }}>
    {props.children}
  </div>
}


type IDemoColumn = Omit<IColumn, 'onRender'> & {
  onRenderWithStyles?:(styles:any,useLink:boolean,item:IDemoItem,index:number | undefined,column:IDemoColumn)=>React.ReactNode,
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
    onRenderWithStyles(vsColors:VsColors,useLink,item:IDemoItem){
      const {EnvironmentColors: environmentColors, CommonControlsColors} = vsColors;
      const focusColor = CommonControlsColors.FocusVisualText;
      const renderName = item.isGroup;
      if(renderName){
        return <Text styles={{
          root:{
            color:'inherit',
          }}}>{item.name}</Text>
      }
      return useLink ? <Link styles={props => {
        const {isDisabled} = props;
        return {
          root:[{
            color:environmentColors.PanelHyperlink,
            selectors: {
              '.ms-Fabric--isFocusVisible &:focus': {
                // Can't use getFocusStyle because it doesn't support wrapping links
                // https://github.com/microsoft/fluentui/issues/4883#issuecomment-406743543
                // Using box-shadow and outline allows the focus rect to wrap links that span multiple lines
                // and helps the focus rect avoid getting clipped.
                boxShadow: `0 0 0 1px ${focusColor} inset`,
                outline: `none`,
              },
            },
            
          },
         
        ]
        }}
      }>{item.name}</Link> : 
       <span><ActionButton iconProps={{iconName:"openFile"}} styles={getActionButtonStyles(vsColors)}></ActionButton><span style={{marginLeft:"5px"}}>{item.name}</span></span>
    }
  },
  {
    fieldName:"first",
    name:"first",
    key:"first",
    minWidth:100,
    isSorted:true,
    isSortedDescending: true,
    isResizable:true,
    onRenderWithStyles(vsColors:VsColors,useLink,item:IDemoItem){
      const focusStyle = getFocusStyle(null as any, {borderColor:"transparent", outlineColor:vsColors.CommonControlsColors.FocusVisualText});
      return <Text styles={
        {root:{
          color:'inherit',
          selectors:{
            ":focus":focusStyle
          }
    }}} data-is-focusable={!item.isGroup}>{item.first}</Text>
    }
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
    onRenderWithStyles(vsColors:VsColors,useLink,item:IDemoItem){
      return renderPercentage(item.percentage,vsColors);
    }
  }
];

let _columns:any = null;
const groupNestingDepth = 2
export interface IGroupedListDemoProps{
  vsColors:VsColors,
  useLink:boolean
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


class MySelection extends Selection{
  constructor(){
    super({selectionMode:SelectionMode.single});
  }
  private groupSelections:GroupSelection[] = [];
  getOrAddGroup(group:IGroup):GroupSelection{
    let groupSelection = this.groupSelections.find(gs => gs.key == group.key);
    if(groupSelection == undefined){
      groupSelection = new GroupSelection(this,group);
      this.groupSelections.push(groupSelection);
    }
    
    
    return groupSelection;
  }
  public clearSelection(){
    const selectedIndices = this.getSelectedIndices();
    if(selectedIndices.length === 1){
      this.setIndexSelected(selectedIndices[0],false,true);//anchor !
    }
  }

  public groupSelected(groupSelection:GroupSelection){
    this.groupSelections.forEach(gs => {
      if(gs !== groupSelection){
        gs.clearSelection();
      }
    })
    this.clearSelection();
  }

  setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void {
    console.log(`ItemSelection setIndexSelected ${index} ${isSelected}`);
    if(isSelected){
        this.groupSelections.forEach(gs => {
          gs.setIndexSelected(0,false,false)
        });
    }
    
    super.setIndexSelected(index, isSelected, shouldAnchor); // anchor
    
    
  }
}

class GroupSelection extends Selection{
  public key:string
  setGroup(group: IGroup | undefined) {
    this.setItems([group] as any);
  }
  constructor(private mainSelection:MySelection,group:IGroup){
    super({selectionMode:SelectionMode.single});
    this.setItems([group] as any);
    this.key = group.key
  }
  public clearSelection(){
    this.setIndexSelected(0,false,false)
  }
  setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void {
    console.log(`GroupSelection setIndexSelected ${this.key} ${index} ${isSelected}`);
    
    if(isSelected){
      this.mainSelection.groupSelected(this);
    }
    super.setIndexSelected(index, isSelected, shouldAnchor);
  }
}

class GroupsItemsSelection extends Selection{
  constructor(groups:IGroup[]){
    super({selectionMode:SelectionMode.single});
    groups.forEach(group => this.addGroup(group));
  }
  private addGroup(group:IGroup){
    this.groups.push(group);
    if(group.children){
      group.children.forEach(g => this.addGroup(g))
    }
  }
  private itemsLength:number | undefined;
  private groups:IGroup[] = [];
  public setItems(items: any[], shouldClear: boolean = true): void {
    this.itemsLength = items.length;
    // will need to clear groups from before ?????????
    super.setItems(items.concat(this.groups), shouldClear);
  }
  
  public getItems() : any[] {
    const items = super.getItems();
    return items;
  }
  
  public getGroupIndex(group:IGroup):number{
    
    const items = this.getItems();
    const groups = items.slice(this.itemsLength);
    let groupIndex = groups.findIndex(g => g.key === group.key);
    return groupIndex + this.itemsLength!;
  }

  public getSelection(): any[] {
    console.log("getSelection");
    const selection =  super.getSelection();
    return selection;
  }

  public getSelectedCount(): number{

    const selectedCount =  super.getSelectedCount();
    if(selectedCount > 1){
      console.log("MORE THAN ONE ****************************************")
    }
    return selectedCount;
  }

  public getSelectedIndices():number[]{
    const selectedIndices =  super.getSelectedIndices();
    console.log("getSelectedIndices");
    return selectedIndices
  }
  public getItemIndex(key: string):number{
    const itemIndex = super.getItemIndex(key);
    console.log(`getItemIndex ${key} - ${itemIndex}`)
    return itemIndex;
  }

  public isRangeSelected(fromIndex: number, count: number): boolean{
    return super.isRangeSelected(fromIndex,count);
  }

  public isAllSelected(): boolean{
    return super.isAllSelected();
  }

  public isKeySelected(key: string): boolean {
    return super.isKeySelected(key);
  }

  public isIndexSelected(index: number): boolean{
    return super.isIndexSelected(index);
  }

  public setAllSelected(isAllSelected: boolean): void{
    if(isAllSelected){
      console.log("setting all to selected ***********************************************")
    }
    super.setAllSelected(isAllSelected);
  }

  public setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void{
    super.setKeySelected(key,isSelected,shouldAnchor);
  }

  public setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void {
    super.setIndexSelected(index,isSelected,shouldAnchor);
  }

  public setRangeSelected(fromIndex: number, count: number, isSelected: boolean, shouldAnchor: boolean): void {
    super.setRangeSelected(fromIndex,count,isSelected,shouldAnchor);
  }

  public selectToKey(key: string, clearSelection?: boolean): void {
    super.selectToKey(key,clearSelection);
  }

  public selectToRange(fromIndex: number, count: number, clearSelection?: boolean): void {
    super.selectToRange(fromIndex, count, clearSelection);
  }

  public selectToIndex(index: number, clearSelection?: boolean): void {
    super.selectToIndex(index, clearSelection);
  }

  public toggleAllSelected(): void {
    super.toggleAllSelected();
  }

  public toggleKeySelected(key: string): void {
    super.toggleKeySelected(key);
  }

  public toggleIndexSelected(index: number): void {
    super.toggleIndexSelected(index);
  }

  public toggleRangeSelected(fromIndex: number, count: number): void {
    super.toggleRangeSelected(fromIndex, count);
  }
}

export function GroupedListDemo(props:IGroupedListDemoProps){
    const detailsListRef = useRef<IDetailsList>(null);
    //const selectionRef = useRef<GroupsItemsSelection>(new GroupsItemsSelection());
    const [sliderValue,setSliderValue] = useState(1);
    const [filter, setFilter] = useState("");
    const selection = new GroupsItemsSelection(groups);
    const {vsColors} = props;
    const headerColors = vsColors.HeaderColors;
    const environmentColors = vsColors.EnvironmentColors;
    const treeViewColors = vsColors.TreeViewColors;
    const searchControlColors = vsColors.SearchControlColors;
    const commonControlsColors = vsColors.CommonControlsColors;
    const focusColor = vsColors.CommonControlsColors.FocusVisualText;

    const focusStyle = getFocusStyle(null as any, {borderColor:"transparent", outlineColor:focusColor});

    const toolWindowTextColor = getColor(environmentColors.ToolWindowText);
    const toolWindowTextDark = isDark(toolWindowTextColor);
    const hoverToolWindowTextShade = lightenOrDarken(toolWindowTextColor,0.4,toolWindowTextDark); 
    const hoverToolWindowText=  colorRGBA(hoverToolWindowTextShade);
    
    const sliderStyles:ISliderProps['styles']={
      root:{
          width:200
      },
      slideBox: [
          getFocusStyle(null as any,{borderColor: 'transparent',outlineColor:focusColor}),
          {
            
            selectors: {
              [`:active .${sliderClassNames.activeSection}`]: {
                backgroundColor:hoverToolWindowText
              },
              [`:hover .${sliderClassNames.activeSection}`]: {
                backgroundColor:hoverToolWindowText
              },
    
              [`:active .${sliderClassNames.inactiveSection}`]: {
                backgroundColor:hoverToolWindowText
              },
              [`:hover .${sliderClassNames.inactiveSection}`]: {
                backgroundColor:hoverToolWindowText
              },
    
              [`:active .${sliderClassNames.thumb}`]: {
                border: `2px solid ${commonControlsColors.ButtonBorderPressed}`,
              },
              [`:hover .${sliderClassNames.thumb}`]: {
                border: `2px solid ${commonControlsColors.ButtonBorderPressed}`,
              },
            },
          },
        ],
      zeroTick:{
        background:"red"
      },
      activeSection:{
        background:environmentColors.ToolWindowText // this is the lhs of the selected value
      },
      inactiveSection:{
        background:environmentColors.ToolWindowText // this is the rhs
      },
      thumb: [
        {
          borderColor: commonControlsColors.ButtonBorder,
          background: commonControlsColors.Button,
        },
      ],
      valueLabel:{
        color:environmentColors.ToolWindowText
      }
    }
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
        return demoColumn.onRenderWithStyles(vsColors,props.useLink, item, index, demoColumn);
      }else{
        return item[demoColumn.fieldName];
      }
    }
    lastVsColors = vsColors;
    return <div>
      <Stack horizontal horizontalAlign='space-between' verticalAlign='center'>
      <Slider styles={sliderStyles} showValue value={sliderValue} min={-1} max={3} onChange={num => setSliderValue(num)} valueFormat={value => {
              return "The value";
          }}/>
      <SearchBox clearButtonProps={{
          ariaLabel: 'Clear text',
          styles:{
            root: [
              getFocusStyle(null as any, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent',outlineColor:focusColor }),
              { height: 'auto'}], 
            
          }
       }}   styles={props => {
          const {theme, underlined, hasFocus} = props;
          return { 
            root: [{ 
              width: 200, 
              marginRight:10, 
              backgroundColor:searchControlColors.Unfocused,
              border: `1px solid ${searchControlColors.UnfocusedBorder}`,
              selectors: {
			          ':hover': {
			            borderColor: searchControlColors.MouseOverBorder,
                  backgroundColor:searchControlColors.MouseOverBackground
			          },
			          [`:hover .ms-SearchBox-iconContainer`]: {
			            color: searchControlColors.MouseOverSearchGlyph,
			          },
              },
             },
              // todo focused states for other
              hasFocus && [
                getInputFocusStyle(focusColor,underlined ? 0 : theme.effects.roundedCorner2, underlined ? 'borderBottom' : 'border'),
                {
                  border: `1px solid ${searchControlColors.FocusedBorder}`,
                  backgroundColor:searchControlColors.FocusedBackground
                }
              ],
            ],
            // gets background color from root
            field: [{
              color:searchControlColors.UnfocusedText,
              selectors:{
                "::selection":{
                  color:searchControlColors.SelectionText,
                  background:searchControlColors.Selection
                },
                ":hover":{
                  color:searchControlColors.MouseOverBackgroundText
                }
              }
              
            }, hasFocus && {color:searchControlColors.FocusedBackgroundText}],
            iconContainer: [{
              color:searchControlColors.SearchGlyph
            }, 
            // no need for this as search glyph not visible when focus
            /*hasFocus && {color:searchControlColors.FocusedSearchGlyph}*/
            ],
            clearButton:[
              {
                selectors: {
                  '&:hover .ms-Button.ms-Button': {
                    backgroundColor: "transparent",
                  },
                  '&:hover .ms-Button-icon': {
                    color: searchControlColors.MouseOverClearGlyph,
                  },
                  '.ms-Button-icon': {
                    color: searchControlColors.ClearGlyph,
                  },
                },
              },
              hasFocus && {
                '.ms-Button-icon': {
                  color:searchControlColors.FocusedClearGlyph,
                },
              }
            ],
            }
        }} iconProps={{iconName:'filter'}} value={filter} onChange={(_,newFilter) => setFilter(newFilter!)}/>
      </Stack>
      <DetailsList 
        componentRef={detailsListRef}
        onShouldVirtualize={() => false} //https://github.com/microsoft/fluentui/issues/21367 https://github.com/microsoft/fluentui/issues/20825
        layoutMode={DetailsListLayoutMode.justified}
        //selectionMode={SelectionMode.single}
        selection={selection}
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
                "data-is-focusable":true,
              } as any 
              //const groupSelection = selectionRef.current.getOrAddGroup(props!.group!);
              
              const index = selection.getGroupIndex(props!.group!);
              //<StopPropagation>
              //<SelectionZone selection={selectionRef.current} >
              console.log(`Group ${props!.group!.key} selected : ${props?.selected}`)
              
              return <DetailsRow {...props} 
               selection={selection}
               focusZoneProps={focusZoneProps}
                groupNestingDepth={headerGroupNestingDepth} 
                item={props!.group} 
                columns={_columns} 
                selectionMode={SelectionMode.none} 
                itemIndex={index}
                onRenderItemColumn={onRenderItemColumn}
                styles={(styleProps) => {
                  const {isSelected} = styleProps
                  return {
                    root: [{
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
                    isSelected && {
                      background:"orange"
                    },
                    focusStyle
                    ]
                  }
                }}
                />
                //</SelectionZone>
                //</StopPropagation>  
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
              root: [
                {
                  background:treeViewColors.Background, // mirroring vs, docs say "transparent",
                  borderBottom:"none",
                  color:environmentColors.CommandBarTextActive,
                  selectors: {
                    "&:hover":{
                      background:treeViewColors.Background, // mirroring vs, docs say "transparent",
                      color:environmentColors.CommandBarTextActive,
                      selectors: {
                        [`.ms-DetailsRow-cell > .ms-Link`]: {
                          color: environmentColors.PanelHyperlink,
                          textDecoration:"underline",
                          cursor:"pointer"
                        }
                      },
    
                    }
                  }
                },
              
                isSelected && {
                  color:treeViewColors.SelectedItemInactiveText,
                  background: treeViewColors.SelectedItemInactive,
                  borderBottom: "none",
                  selectors: {
                    ['.ms-DetailsRow-cell button.ms-Link']:{
                      color:treeViewColors.SelectedItemInactiveText
                    },
                    '&:active': {
                      ['.ms-DetailsRow-cell button.ms-Link']:{
                        color:treeViewColors.SelectedItemActiveText
                      },
                    },
            

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
              // todo requires override ?
              /* cell:{
                selectors:{
                  "[data-is-focusable='true']":
                }
              } */
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
    </div>
}