import { Checkbox, Dropdown, IDropdownOption, Link } from "@fluentui/react";
import { useState } from "react";
import { MyActionButton } from "./vs styling/MyActionButton";

export function ControlsDemo(props:{}){
    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [selectedDropDownOption, setSelectedDropDownOptions] = useState<IDropdownOption>();
    const dropDownOptions: IDropdownOption[] = [
        {
          key:"ddo1",
          text:"First"
        },
        {
          key:"ddo2",
          text:"Second"
        }
      ];
    
    return <div>
        <Link>Hello</Link>
        <Checkbox label="Toggle btn disabled"  checked={buttonDisabled} onChange={(evt) => {
            setButtonDisabled(!buttonDisabled);
        }}/>
        <MyActionButton disabled={buttonDisabled} iconProps={{iconName:"github"}}>Some text</MyActionButton>
        <MyActionButton iconProps={{iconName:"logRemove"}}/>
        <Dropdown selectedKey={selectedDropDownOption?.key} label="Drop me" placeholder="Placeholder" options={dropDownOptions} onChange={(_,option) => {
        setSelectedDropDownOptions(option)
      }} />
    </div>
}