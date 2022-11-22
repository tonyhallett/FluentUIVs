import { IDetailsListProps, DetailsList, CheckboxVisibility, SelectionMode, customizable, IDetailsRowProps, DetailsRow } from "@fluentui/react";
import React from "react";

type SimpleTableProps = Omit<IDetailsListProps,'role'|'checkboxVisibility'|'isHeaderVisible'|'selectionMode'|'focusZoneProps'|'onRenderRow'> 


@customizable('SimpleTableRow', ['theme', 'styles'], true)
class SimpleTableRow extends React.Component<IDetailsRowProps, {}> {
  public render(): JSX.Element {
    return <DetailsRow {...this.props}/>
  }
  
}


function SimpleTable(props:SimpleTableProps){
    
    return <DetailsList
    focusZoneProps={{disabled:true}}
    role='table'
    checkboxVisibility={CheckboxVisibility.hidden}
    isHeaderVisible={false}
    selectionMode={SelectionMode.none}
    styles={props.styles}
    onRenderRow={(rowProps) => {
      return <SimpleTableRow {...rowProps!}/>
    }}
    {...props} 
    />
}


const summaryRows: { key: string; display: string; }[] = [];
  summaryRows.push({ key: 'Assemblies :', display: "1"});
  summaryRows.push({ key: 'Classes :', display: "2" });
  summaryRows.push({ key: 'Files :', display: "3" });
  summaryRows.push({ key: 'Covered lines :', display: "10" });
  summaryRows.push({ key: 'Uncovered lines :', display: "3" });
  summaryRows.push({ key: 'Coverable lines :', display: "13" });
  summaryRows.push({ key: 'Total lines :', display: "20" });

export function SimpleTableDemo(props:{}){
    return <SimpleTable
        items={summaryRows}
        
        columns={[
          { key: 'key', fieldName: 'key', isRowHeader: true, name: "Key", minWidth: 200, maxWidth: 200 },
          { key: 'display', fieldName: 'display', name: "Display", minWidth: 100 }
    ]}
  />
}