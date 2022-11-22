import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { MyActionButton } from "./vs styling/MyActionButton";


export function FeedbackDemo(props:{}){

  let items:ICommandBarItemProps[] = [
    {
      key:'buyBeer',
      text:'Buy beer',
      iconProps:{iconName:'beerMug'},
      ariaLabel:'Buy me a beer',
      onClick(){
        alert("Beer")
        //(window as any).chrome.webview.hostObjects.fccResourcesNavigator.buyMeACoffee();
      },
    },
    {
      key:'logIssueOrSuggestion',
      text:'Issue / feature',
      iconProps:{iconName:'github'},
      ariaLabel:'Log issue or suggestion',
      onClick(){
        alert("issue")
        //(window as any).chrome.webview.hostObjects.fccResourcesNavigator.logIssueOrSuggestion();
      },
    },
    {
      key:'rateAndReview',
      text:'Rate and review',
      iconProps:{iconName:'review'},
      ariaLabel:'Review',
      onClick(){
        alert("review")
        //(window as any).chrome.webview.hostObjects.fccResourcesNavigator.rateAndReview();
      }
    }
  ]

  const numItems = 10;
  for(let i = items.length;i<numItems;i++){
    items.push({...items[0],key:(items.length + i).toString()})
  }
  
  const ButtonAs:any = (props:ICommandBarItemProps) => {
    return <MyActionButton style={{marginRight:'5px'}} onClick={props.onClick as any} iconProps={props.iconProps}>{props.text} </MyActionButton>
  } 


  return <CommandBar buttonAs={ButtonAs} overflowButtonProps={
    {
    }
  } styles={{
    root:{
        backgroundColor:'none',
        border:`none`,
        padding:'0px'
        // add border ?
    }
    

  }} items={items} />
}