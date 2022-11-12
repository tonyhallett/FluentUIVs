import { ActionButton, Checkbox, IButtonProps, ICheckboxProps, ILabelProps, Label } from "@fluentui/react";
import { useState } from "react";
import { Long, Wide } from "./LongAndWide";

export function MakeChange(props:{
    checkBoxStyles:ICheckboxProps['styles'],
    actionButtonStyles:IButtonProps['styles'],
    labelStyles:ILabelProps['styles'],
    nextTheme:IButtonProps['onClick'],
    selectedThemeName:string,
    coverageRunning:boolean,
    coverageRunningToggled:ICheckboxProps['onChange']
    }){
    const [addScrollbars,setAddScrollbars] = useState(false);
    return <div>
        <Label styles={props.labelStyles}>{props.selectedThemeName}</Label>
        <ActionButton iconProps={{iconName:"github"}} styles={
            props.actionButtonStyles
        } onClick={props.nextTheme}>Next theme</ActionButton>
        <Checkbox styles={props.checkBoxStyles} label="Add scrollbars"  checked={addScrollbars} onChange={(evt) => {
                    setAddScrollbars(!addScrollbars);
                }}/>
        <Checkbox styles={props.checkBoxStyles} label="Coverage running"  checked={props.coverageRunning} onChange={props.coverageRunningToggled}/>
        {addScrollbars && <><Wide/><Long/></>}
        
    </div>
}