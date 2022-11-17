import { ActionButton, ContextualMenu, IButtonStyles, IDragOptions,  } from "@fluentui/react";

export function MakeChangePivotItem(props:{showModal:() => void, actionButtonStyles:IButtonStyles}){
    return <>
        <ActionButton iconProps={{iconName:"open"}} styles={
            props.actionButtonStyles
        } onClick={props.showModal}>Open</ActionButton>

    </>
}