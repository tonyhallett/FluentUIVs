import { Checkbox, Dropdown, IDropdownOption, Link } from "@fluentui/react";
import { useState } from "react";
import { MyActionButton } from "./vs styling/MyActionButton";

const initialSelectedOption:IDropdownOption = {
  key:"ddo1",
  text:"First"
}

export function ControlsDemo(props:{}){
    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [selectedDropDownOption, setSelectedDropDownOptions] = useState<IDropdownOption>(initialSelectedOption);
    const dropDownOptions: IDropdownOption[] = [
        initialSelectedOption,
        {
          key:"ddo2",
          text:"Second"
        },
        {
          key:"ddo3",
          text:"Third"
        }
      ];
    
    return <div>
        <Link>Hello</Link>
        <Checkbox label="Toggle btn disabled"  checked={buttonDisabled} onChange={(evt) => {
            setButtonDisabled(!buttonDisabled);
        }}/>
        <MyActionButton disabled={buttonDisabled} iconProps={{iconName:"github"}}>Some text</MyActionButton>
        <MyActionButton iconProps={{iconName:"logRemove"}}/>
        <Dropdown
          styles={
            {
              root:{
                width:"200px"
              }
            }
          } 
          selectedKey={selectedDropDownOption?.key} 
          /*label="Drop me" */
          //placeholder="Placeholder" 
          options={dropDownOptions} 
          onChange={(_,option) => {
            setSelectedDropDownOptions(option!)
          }} />
    </div>
}