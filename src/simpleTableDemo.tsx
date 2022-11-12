import { IDetailsListProps, DetailsList, CheckboxVisibility, SelectionMode, getFocusStyle } from "@fluentui/react";

type SimpleTableProps = Omit<IDetailsListProps,'role'|'checkboxVisibility'|'isHeaderVisible'|'selectionMode'|'focusZoneProps'|'onRenderRow'> 
& {
  environmentCommandBarTextActive:string
}

function SimpleTable(props:SimpleTableProps){
    
    return <DetailsList
    focusZoneProps={{disabled:true}}
    role='table'
    checkboxVisibility={CheckboxVisibility.hidden}
    isHeaderVisible={false}
    selectionMode={SelectionMode.none}
    styles={props.styles}
    onRenderRow={(rowProps, defaultRender) => {
      rowProps!.styles = {
        root: [{
          background:"none",
          borderBottom:"none",
          color:props.environmentCommandBarTextActive, // this will not style the header text
          selectors: {
            "&:hover":{
              background:"none",
              color:props.environmentCommandBarTextActive,
              selectors: {
                [`.is-row-header`]: {
                  color: props.environmentCommandBarTextActive,
                },
              },
            }
          }
        },
        getFocusStyle(null as any,{borderColor:"none", outlineColor:"none"})
      ],
        isRowHeader:{
          color:props!.environmentCommandBarTextActive 
        }
      };
      return defaultRender!(rowProps);
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

export function SimpleTableDemo(props:{environmentColorsCommandBarTextActive:string}){
    return <SimpleTable environmentCommandBarTextActive={props.environmentColorsCommandBarTextActive}
        items={summaryRows}
        
        columns={[
          { key: 'key', fieldName: 'key', isRowHeader: true, name: "Key", minWidth: 200, maxWidth: 200 },
          { key: 'display', fieldName: 'display', name: "Display", minWidth: 100 }
    ]}
  />
}