import { CommandBar, ICommandBarItemProps } from "@fluentui/react";



export function FeedbackDemo(props:{
    commandBarBorder: string;commandBarBackground:string,commandBarButtonColor:string, commandBarButtonBackground:string
}){

// todo this need to look at CommandBarButton ! same styling as before ?
const buttonStyles:ICommandBarItemProps["buttonStyles"]={
    root:{
        color:props.commandBarButtonColor,
        backgroundColor:"transparent",
    },
    label:{
        color:props.commandBarButtonColor
    },
    icon:{
        color:props.commandBarButtonColor
    }

}
const items:ICommandBarItemProps[] = [
    {
      key:'buyBeer',
      text:'Buy beer',
      iconProps:{iconName:'beerMug'},
      ariaLabel:'Buy me a beer',
      onClick(){
        (window as any).chrome.webview.hostObjects.fccResourcesNavigator.buyMeACoffee();
      },
      buttonStyles
    },
    {
      key:'logIssueOrSuggestion',
      text:'Issue / feature',
      iconProps:{iconName:'github'},
      ariaLabel:'Log issue or suggestion',
      onClick(){
        (window as any).chrome.webview.hostObjects.fccResourcesNavigator.logIssueOrSuggestion();
      },
      buttonStyles
    },
    {
      key:'rateAndReview',
      text:'Rate and review',
      iconProps:{iconName:'review'},
      ariaLabel:'Review',
      buttonStyles,
      onClick(){
        (window as any).chrome.webview.hostObjects.fccResourcesNavigator.rateAndReview();
      }
    }
    
  ]
  // I should lokkd at sub compoennet styles again.
  return <CommandBar overflowButtonProps={
    {
        // to do when I have some overflow items
        // the styles are for a CommandBarButton
        styles:{
            // can ossibly style the menu here
        },
        // this is incorrectly typed.
        // to do when have a menu
        /* menuProps:{
            styles:{

            }
        } */
    }
  } styles={{
    root:{
        backgroundColor:props.commandBarBackground,
        border:`1px solid ${props.commandBarBorder}`
        // add border
    }
    

  }} items={items} />
}