import { IButtonStyles, IRawStyle, Label, ActionButton, IActivityItemProps, Icon, ActivityItem, Link } from "@fluentui/react"
import { CSSProperties } from "react"
import { ToolWindowColors } from "./commonTypes"

export enum Emphasis{
    None = 0,
    Bold = 1,
    Italic = 2,
    Underline = 4
}
  
export interface Emphasized{
    message:string,
    emphasis : Emphasis,
    type:'emphasized'
}

export interface FCCLink{
    hostObject:string
    methodName:string
    arguments?:any[]
    title:string,
    ariaLabel: string,
    type:'fcclink'
}
  
export enum MessageContext {
    Info,
    Warning,
    Error,
    CoverageStart,
    CoverageCancelled,
    CoverageCompleted,
    CoverageToolStart,
    CoverageToolCompleted,
    ReportGeneratorStart,
    ReportGeneratorCompleted,
    TaskStarted,
    TaskCompleted // file synchronization
}

export interface LogMessage{
    context:MessageContext,
    message:(Emphasized | FCCLink)[]
}

function getIconNameForContext(messageContext:MessageContext){
    switch(messageContext){
        case MessageContext.Info:
        return "info";
        case MessageContext.Warning:
        return "warning";
        case MessageContext.Error:
        return "error";
        case MessageContext.CoverageStart:
        return "processing";
        case MessageContext.CoverageCancelled:
        return "processingCancelled";
        case MessageContext.TaskCompleted:
        case MessageContext.ReportGeneratorCompleted:
        case MessageContext.CoverageCompleted:
        case MessageContext.CoverageToolCompleted:
        return "completed";
        case MessageContext.ReportGeneratorStart:
        return "table";
        case MessageContext.CoverageToolStart:
        return "tool"
    }
}

function getIconNameForHostObjectMethod(hostObject:string,method:string){
    if(hostObject === 'fccOutputPane'){
        return 'openPane';
    }
    return 'navigate';
}

function getActivityIconAriaLabelFromContext(messageContext:MessageContext){
    switch(messageContext){
        case MessageContext.CoverageCancelled:
        return "Coverage Cancelled";
        case MessageContext.CoverageCompleted:
        return "Coverage Completed";
        case MessageContext.CoverageStart:
        return "Coverage Start";
        case MessageContext.CoverageToolCompleted:
        return "Coverage Tool Completed";
        case MessageContext.CoverageToolStart:
        return "Coverage Tool Start";
        case MessageContext.Error:
        return "Error";
        case MessageContext.Info:
        return "Info";
        case MessageContext.ReportGeneratorCompleted:
        return "Report Completed";
        case MessageContext.ReportGeneratorStart:
        return "Report Start";
        case MessageContext.TaskCompleted:
        return "Task Completed";
        case MessageContext.TaskStarted:
        return "Task Started";
        case MessageContext.Warning:
        return "Warning";
    }
}

export type LogProps = {
    logMessages:LogMessage[],
    clearLogMessages:() => void,
    actionButtonStyles:IButtonStyles,
    useLinks:boolean
} & ToolWindowColors

export function Log(props:LogProps) {
    const {logMessages, clearLogMessages, toolWindowBackground, toolWindowText, actionButtonStyles} = props;
    var root = actionButtonStyles.root!;
    if(Array.isArray(root)){
      root.push({marginLeft:"10px"})
    }else{
      (root as IRawStyle).marginLeft = "10px";
    }
    const activityItemsOrBreaks:any[] = [];
    logMessages.forEach((logMessage,i) => {
      
      const activityDescription:React.ReactNode[] =
      logMessage.message.map((msgPart,j) => {
        if(msgPart.type === 'emphasized' ){
          const emphasisStyle:CSSProperties={
            //fontFamily:getFontFamily(styling.fontName),
            //fontSize:styling.fontSize,
            color:toolWindowText,
            backgroundColor:toolWindowBackground
          }
          if(msgPart.emphasis & Emphasis.Bold){
            emphasisStyle.fontWeight='bold';
          }
          if(msgPart.emphasis & Emphasis.Italic){
            emphasisStyle.fontStyle='italic';
          }
          if(msgPart.emphasis & Emphasis.Underline){
            emphasisStyle.textDecoration = 'underline';
          }
          //return <span key={j} style={emphasisStyle}>{msgPart.message}</span>;
          return <Label key={j} styles={{
            root:{
                ...emphasisStyle as any,
                display:"inline"
            }
          }}>{msgPart.message}</Label>
        }else{
          const btn =  props.useLinks ? <Link key={j}>{msgPart.title}</Link> :
         <ActionButton 
          key={j} 
          ariaLabel={msgPart.ariaLabel}
          iconProps={{iconName:getIconNameForHostObjectMethod(msgPart.hostObject,msgPart.methodName)}} 
          styles={actionButtonStyles}
          onClick={() => {
            
          }}>{msgPart.title}</ActionButton>
          return btn;
        }
      })
  
      let activityItemProps:Partial<IActivityItemProps> = {
        activityDescription,
        activityIcon:<Icon 
          aria-label={getActivityIconAriaLabelFromContext(logMessage.context)} 
          styles={{
            root:{
              marginLeft:'10px',
              color:props.toolWindowText
            },
  
          }}
          iconName={getIconNameForContext(logMessage.context)}/>,
        isCompact:false,
        styles:{
            root:{
              alignItems:"center"
            },
            activityTypeIcon:{
              height:"16px"
            }
        }
      }
      
      activityItemsOrBreaks.push(<ActivityItem {...activityItemProps} key={i}/>);
  
      // works for ms code coverage but not for old as there are info messages before CoverageStart
      /* if(i !== 0 && logMessage.context === MessageContext.CoverageStart){
        activityItemsOrBreaks.push(<br key={`break${i}`}/>);
      } */
    })
  
    
  
    return <>
        <ActionButton ariaLabel='Clear log messages' iconProps={{iconName:'logRemove'}} onClick={clearLogMessages} styles={props.actionButtonStyles}/>
      
      {activityItemsOrBreaks}
    </>
  }