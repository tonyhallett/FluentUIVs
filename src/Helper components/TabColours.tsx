import { VsColors } from "../vs styling/themeColors";


interface TabColourGrouping{
    text:string,
    background:string,
    border:string,
    description:string
}

export function TabColours(props:{vsColors:VsColors}){
    const {EnvironmentColors} = props.vsColors;

    const tabColourGroupings:TabColourGrouping[] = [
        {
            text:EnvironmentColors.ToolWindowTabText,
            background:EnvironmentColors.ToolWindowTabGradientBegin,
            border:EnvironmentColors.ToolWindowTabBorder,
            description:"ToolWindowTab defaults state"
        },
        {
            text:EnvironmentColors.ToolWindowTabMouseOverText,
            background:EnvironmentColors.ToolWindowTabMouseOverBackgroundBegin,
            border:EnvironmentColors.ToolWindowTabMouseOverBorder,
            description:"ToolWindowTab mouse over state"
        },
        {
            text:EnvironmentColors.ToolWindowTabSelectedText,
            background:EnvironmentColors.ToolWindowTabSelectedTab,
            border:EnvironmentColors.ToolWindowTabSelectedBorder,
            description:"ToolWindowTab selected state"
        },
        {
            text:EnvironmentColors.ToolWindowTabSelectedActiveText,
            background:EnvironmentColors.ToolWindowTabSelectedTab,
            border:EnvironmentColors.ToolWindowTabSelectedBorder,
            description:"ToolWindowTab selected active state"
        },
        /* {
            text:EnvironmentColors.AutoHideTabBackgroundBegin,
            background:EnvironmentColors.AutoHideTabText,
            border:EnvironmentColors.AutoHideTabBorder,
            description:"Autohidetab defaults state"
        },
        {
            text:EnvironmentColors.AutoHideTabMouseOverBackgroundBegin,
            background:EnvironmentColors.AutoHideTabMouseOverText,
            border:EnvironmentColors.AutoHideTabMouseOverBorder,
            description:"Autohidetab mouse over state"
        }, */
    ]
    return <>{tabColourGroupings.map((tcg,i) => {
        return <div key={i} style={
            {
                color:tcg.text,
                backgroundColor:tcg.background,
                border:`5px solid ${tcg.border}`,
                height:'80px',
                width:'160xpx'
            }
        }>
            <div>{tcg.description}</div>
            <div>{"bg " + tcg.background}</div>
            <div>{"txt " + tcg.background}</div>
            <div>{"border " + tcg.border}</div>
        </div>
    })}</>
}