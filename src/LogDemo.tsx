import { Emphasis, Emphasized, FCCLink, Log, LogMessage, LogProps, MessageContext } from "./Log"

const fccLink:FCCLink = {
    type:"fcclink",
    title:"Title",
    hostObject:"fccOutputPane",
    methodName:"",
    ariaLabel:""
  }
  const fccLinkEmphasized : Emphasized = {
    type:"emphasized",
    message:"Prefix",
    emphasis:Emphasis.Bold
  }
  const emphasized:Emphasized = {
    type:"emphasized",
    message:"Hello",
    emphasis:Emphasis.None
  }
  const logMessage: LogMessage = {
    context:MessageContext.Error,
    message:[emphasized]
  }
  const logMessage2: LogMessage = {
    context:MessageContext.Info,
    message:[fccLinkEmphasized, fccLink]
  }
  const logMessages:LogMessage[] = [
    logMessage,
    logMessage2
  ]

  type LogDemoProps = Omit<LogProps,"logMessages"|"clearLogMessages">
  export function LogDemo(logDemoProps:LogDemoProps){
    return <Log logMessages={logMessages} clearLogMessages={() => {}} {...logDemoProps}/>
  }