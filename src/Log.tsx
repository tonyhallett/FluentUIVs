import { Text, IActivityItemProps, Icon, ActivityItem, Link } from "@fluentui/react"
import { CSSProperties } from "react"
import { MyActionButton } from "./MyActionButton"
import { VsColors } from "./themeColors"

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
    useLinks:boolean,
    vsColors:VsColors
}
export function Log(props:LogProps) {
    const {logMessages, clearLogMessages, useLinks, vsColors} = props;

    const activityItemsOrBreaks:any[] = [];
    logMessages.forEach((logMessage,i) => {
      
      const activityDescription:React.ReactNode[] =
      logMessage.message.map((msgPart,j) => {
        if(msgPart.type === 'emphasized' ){
          const emphasisStyle:CSSProperties={
            color:vsColors.EnvironmentColors.ToolWindowText,
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
          return useLinks ? 
           <span key={j} style={{
            
            ...emphasisStyle as any,
            display:"inline"
          }}>{msgPart.message}</span> : <Text key={j} styles={{
            root:{
                ...emphasisStyle as any,
                
            }
          }}>{msgPart.message}</Text>
        }else{
          // issue with fontSize and fontWeight inheriting
          const btn =  useLinks ? <Link key={j} style={{marginLeft:'5px'}}>{msgPart.title}</Link> :
         <MyActionButton 
          key={j} 
          ariaLabel={msgPart.ariaLabel}
          iconProps={{iconName:getIconNameForHostObjectMethod(msgPart.hostObject,msgPart.methodName)}} 
          style={{marginLeft:'10px'}}
          onClick={() => {
            
          }}>{msgPart.title}</MyActionButton>
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
              color:vsColors.EnvironmentColors.ToolWindowText
            },
  
          }}
          iconName={getIconNameForContext(logMessage.context)}/>,
        isCompact:false,
        styles:{
            root:[
              !useLinks && {
              alignItems:"center"
            }],
            activityTypeIcon:[
              !useLinks && {
              height:"16px"
            }]
        }
      }
      
      activityItemsOrBreaks.push(<ActivityItem {...activityItemProps} key={i}/>);
  
      // works for ms code coverage but not for old as there are info messages before CoverageStart
      /* if(i !== 0 && logMessage.context === MessageContext.CoverageStart){
        activityItemsOrBreaks.push(<br key={`break${i}`}/>);
      } */
    })
  
    
  
    return <>
      <MyActionButton ariaLabel='Clear log messages' iconProps={{iconName:'logRemove'}} onClick={clearLogMessages}/>
      {activityItemsOrBreaks}
    </>
  }