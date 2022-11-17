import { ActionButton, Checkbox, IButtonProps, ICheckboxProps, ILabelProps, Label } from "@fluentui/react";
import { useState } from "react";
import { Long, Wide } from "./LongAndWide";

export interface IMakeChangeProps{
    checkBoxStyles:ICheckboxProps['styles'],
    actionButtonStyles:IButtonProps['styles'],
    labelStyles:ILabelProps['styles'],
    nextTheme:IButtonProps['onClick'],
    previousTheme:IButtonProps['onClick'],
    selectedThemeName:string,
    coverageRunning:boolean,
    coverageRunningToggled:ICheckboxProps['onChange'],
    useHyperlink:boolean,
    useHyperlinkToggled:ICheckboxProps['onChange'],
    toolWindowBackground:string,
    toolWindowBorder:string,
    addScrollbars:boolean,
    toggleAddScrollbars:ICheckboxProps['onChange']
    }

export function MakeChange(props:IMakeChangeProps){
    
    return <div>
        <Checkbox styles={props.checkBoxStyles} label="Use hyperlink"  checked={props.useHyperlink} onChange={props.useHyperlinkToggled}/>
        <Label styles={props.labelStyles}>{props.selectedThemeName}</Label>
        
        <ActionButton iconProps={{iconName:"previous"}} styles={
            props.actionButtonStyles
        } onClick={props.previousTheme}>Previous theme</ActionButton>
        <ActionButton iconProps={{iconName:"next"}} styles={
            props.actionButtonStyles
        } onClick={props.nextTheme}>Next theme</ActionButton>
        <Checkbox styles={props.checkBoxStyles} label="Add scrollbars"  checked={props.addScrollbars} onChange={props.toggleAddScrollbars}/>
        <Checkbox styles={props.checkBoxStyles} label="Coverage running"  checked={props.coverageRunning} onChange={props.coverageRunningToggled}/>
    </div>
}