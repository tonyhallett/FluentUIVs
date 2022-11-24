import { ICommandBarItemProps } from "@fluentui/react";
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
      },
    }
  ]

  return  <>
    {items.map(props => <MyActionButton key={props.key} style={{marginRight:'5px'}} onClick={props.onClick as any} iconProps={props.iconProps}>{props.text} </MyActionButton>)}
  </>
}