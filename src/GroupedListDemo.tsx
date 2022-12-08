import { DetailsList, DetailsListLayoutMode, DetailsRow, IColumn, IDetailsHeaderProps, IDetailsList, IFocusZoneProps, IGroup, IGroupHeaderProps, SelectionMode, CheckboxVisibility, IDetailsRowProps, Stack, Slider, SearchBox, Link, IContextualMenuItem, ContextualMenu, IButtonProps } from "@fluentui/react";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "./Helper components/CopyToClipboard";
import { DetailsListCellText } from "./vs styling/DetailsListCellText";
import { GroupsItemsSelection } from "./utilities/GroupsItemsSelection";
import { MyActionButton } from "./vs styling/MyActionButton";
import { Percentage } from "./vs styling/Percentage";
import { useConst } from "@fluentui/react-hooks";

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
  onRenderWithOptions?:(useLink:boolean,item:IDemoItem,index:number | undefined,column:IDemoColumn)=>React.ReactNode,
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
    onRenderWithOptions(useLink,item:IDemoItem){
      const renderName = item.isGroup;
      if(renderName){
        return <DetailsListCellText data-is-focusable={true}>{item.name}</DetailsListCellText>
      }
      const clickHandler:IButtonProps['onClick'] = evt => {
        
      }
      
      return useLink ? <Link onClick={clickHandler} >{item.name}</Link> : 
       <>
        <MyActionButton iconProps={{iconName:"openFile"}} onClick={clickHandler}></MyActionButton>
        <DetailsListCellText style={{marginLeft:"5px"}}>{item.name}</DetailsListCellText>
        </>
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
    onRenderWithOptions(useLink,item:IDemoItem){
      return <CopyToClipboard>
        <DetailsListCellText data-is-focusable={true}>{item.first}</DetailsListCellText>
        </CopyToClipboard>
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
    
    onRenderWithOptions(useLink,item:IDemoItem){
      return <Percentage className="cellTextBg"  percentage={item.percentage} styles={{root: {
        width: '100px'}}}/>
    }
  }
];

let _columns:any = null;
const groupNestingDepth = 2
export interface IGroupedListDemoProps{
  useLink:boolean,
}

const groupHeaderRowClassName = "groupHeaderRow";

interface IContextMenuDetails{
  items:IContextualMenuItem[],
  target:MouseEvent
}

let lastUseLink:boolean | undefined;
let needsNewVersion = false;
export function GroupedListDemo(props:IGroupedListDemoProps){
    const detailsListRef = useRef<IDetailsList>(null);
    const [contextMenuDetails, setContextMenuDetails] = useState<IContextMenuDetails>();
    const [sliderValue,setSliderValue] = useState(1);
    const [filter, setFilter] = useState("");
    const selection = useConst(() => new GroupsItemsSelection());
    useEffect(() => {
      if(needsNewVersion){
        detailsListRef.current?.forceUpdate();
      }
    })

    const {useLink} = props;

    needsNewVersion = useLink !== lastUseLink
    lastUseLink = props.useLink;
    
    selection.initialize(groups,items);



    const onRenderItemColumn:IDetailsRowProps["onRenderItemColumn"] = (item,index, column) => {
      const demoColumn = column as IDemoColumn;
      if(demoColumn!.onRenderWithOptions){
        return demoColumn.onRenderWithOptions(props.useLink, item, index, demoColumn);
      }else{
        return item[demoColumn.fieldName];
      }
    }

    const onHideContextualMenu = React.useCallback(() => setContextMenuDetails(undefined), []);
    const contextMenu = contextMenuDetails ? <ContextualMenu 
      items={contextMenuDetails.items} 
      target={contextMenuDetails.target}
      onItemClick={onHideContextualMenu}
      onDismiss={onHideContextualMenu}
      >
        
    </ContextualMenu> : undefined;

    return <div>
      {contextMenu}
      <Stack horizontal horizontalAlign='space-between' verticalAlign='center'>
      <Slider styles={{root:{width:200}}} showValue value={sliderValue} min={-1} max={3} onChange={num => setSliderValue(num)} valueFormat={value => {
              return "The value";
          }}/>
      <SearchBox clearButtonProps={{
          ariaLabel: 'Clear text',
          styles:{
            root: [
              { height: 'auto'}], 
            
          }
       }}   styles={props => {
          return { 
            root: [{ 
              width: 200, 
              marginRight:10, 
             },
            ],
          }
        }} iconProps={{iconName:'filter'}} value={filter} onChange={(_,newFilter) => setFilter(newFilter!)}/>
      </Stack>
      <DetailsList 
        styles={
          {
            root:{
              marginTop:'10px'
            }
          }
        }
        componentRef={detailsListRef}
        onShouldVirtualize={() => false} //https://github.com/microsoft/fluentui/issues/21367 https://github.com/microsoft/fluentui/issues/20825
        layoutMode={DetailsListLayoutMode.fixedColumns} // justified always flashes unless have set all the column sizes
        selection={selection}
        selectionMode={SelectionMode.single} // due to defaultProps ! does not take from selection !
        checkboxVisibility={CheckboxVisibility.hidden}
        items={items} 
        groups={groups}
        columns={columns}
        onItemContextMenu={(item, index, evt) => {
          if(item){
            const demoItem = item as IDemoItem;
            const contextMenuOn = demoItem.isGroup ? "group" : "item";
            const groupOrItemAndName = `${contextMenuOn} ${demoItem.name}`;
            const mouseEvent = evt as MouseEvent
            setContextMenuDetails({
              items:[
                
                  {
                    key:'clipboard',
                    text:`Copy to clipboard ${groupOrItemAndName} ?`,
                    onClick: (ev) => {
                      navigator.clipboard.writeText(`Todo for - ${groupOrItemAndName}`)
                      //ev.preventDefault();
                    },
      
                  }
                
              ],
              target:mouseEvent
            })
          }
        }}
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
              
              const index = selection.getGroupIndex(props!.group!);
              return <DetailsRow
               className={groupHeaderRowClassName}
               selection={selection}
               focusZoneProps={focusZoneProps}
                groupNestingDepth={headerGroupNestingDepth} 
                item={props!.group} 
                columns={_columns} 
                selectionMode={SelectionMode.single} 
                checkboxVisibility={CheckboxVisibility.hidden}
                itemIndex={index}
                onRenderItemColumn={onRenderItemColumn}
                />
            }
          },
          onRenderHeader: (props:IGroupHeaderProps|undefined, defaultRender) => {
            _columns = (props as any).columns; // ****************************** any cast
            props!.onGroupHeaderKeyUp = ev => {
              const leftOrRightArrow = ev.code === 'ArrowRight' || ev.code === 'ArrowLeft';
              if(leftOrRightArrow){
                const groupHeaderRow = (ev.target as Element).closest(`.${groupHeaderRowClassName}`);
                if(groupHeaderRow){
                  ev.preventDefault()
                }
              }
              

            }
            props!.expandButtonProps = {
              'aria-label': 'expand collapse group',
              'data-is-focusable':'true'
            } as any
            return defaultRender!(props)
          }
        }}
        onRenderRow={(rowProps, defaultRender) => {
          rowProps!.groupNestingDepth = 2; // todo calculate
          rowProps!.styles = {
            fields:{
              alignItems:"center"
            },
          }
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
                paddingTop:'0px'//***************************************** 
              },
            }
            return defaultRender(detailsHeaderProps)
          }
        }
        
    />
    </div>
}