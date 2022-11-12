import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { VsColors } from "./themeColors";



export function FeedbackDemo(props:{
    vsColors:VsColors
}){

  const {vsColors} = props;
  const {EnvironmentColors:environmentColors} = vsColors;

const buttonStyles:ICommandBarItemProps["buttonStyles"]={
    root:{
        color:environmentColors.CommandBarTextActive,
        backgroundColor:"transparent",
    },
    label:{
        color:environmentColors.CommandBarTextActive
    },
    icon:{
        color:environmentColors.CommandBarTextActive
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
        backgroundColor:environmentColors.CommandBarGradientBegin,
        border:`1px solid ${environmentColors.CommandBarToolBarBorder}`
        // add border
    }
    

  }} items={items} />
}