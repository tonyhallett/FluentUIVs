import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { MyActionButton } from "./MyActionButton";
import { VsColors } from "./themeColors";


export function FeedbackDemo(props:{
    vsColors:VsColors
}){

  const {vsColors} = props;
  const {EnvironmentColors:environmentColors} = vsColors;

  const buttonStyles:ICommandBarItemProps["buttonStyles"] = {
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
      buttonStyles
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
      buttonStyles
    },
    {
      key:'rateAndReview',
      text:'Rate and review',
      iconProps:{iconName:'review'},
      ariaLabel:'Review',
      buttonStyles,
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


  // I should lokkd at sub compoennet styles again.
  return <CommandBar buttonAs={ButtonAs} overflowButtonProps={
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
        backgroundColor:'none',
        border:`none`,
        padding:'0px'
        // add border
    }
    

  }} items={items} />
}