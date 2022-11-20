//import React from 'react';
// In React 17 you no longer need to import react when writing JSX

import { Checkbox, ContextualMenu, CustomizerContext, IDragOptions, Label, Modal, Pivot, PivotItem, ProgressIndicator, registerIcons,  } from "@fluentui/react";
import { useRef, useState } from "react";
import { vsThemes} from "./themeColors";
import{ BeerMugIcon, CheckMarkIcon, ChevronDownIcon, ChevronRightMedIcon, ClearFilterIcon, createSvgIcon, ErrorBadgeIcon, FilterIcon, GitHubLogoIcon,  GroupedDescendingIcon, InfoIcon, LogRemoveIcon, MoreIcon, NextIcon, OpenPaneIcon, PreviousIcon, ReviewSolidIcon, SortDownIcon, SortUpIcon, TagIcon } from'@fluentui/react-icons-mdl2';
import { LogDemo } from "./LogDemo";

import { GroupedListDemo } from "./GroupedListDemo";
import { useBodyToolWindow } from "./useBody";
import { FeedbackDemo } from "./FeedbackDemo";

import { ControlsDemo } from "./ControlDemo";
import { getBodyStyles, getCustomizationStyling,} from "./themeStyles";
import { SimpleTableDemo } from "./SimpleTableDemo";
import { Long, Wide } from "./LongAndWide";
import React from "react";
import { MyActionButton } from "./MyActionButton";

//https://github.com/microsoft/fluentui/issues/22895
export const VisualStudioIDELogo32Icon =  createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 213v1622l-512 213L0 1536l1536 223V0l512 213zM245 1199l-117-39V590l117-39 283 213 470-465 282 119v913l-282 120-470-466-283 214zm430-324l323 244V631L675 875zm-430 169l171-169-171-170v339z" />
    </svg>
  ),
  displayName: 'VisualStudioIDELogo32Icon',
});

registerIcons({
    icons: {
      github:<GitHubLogoIcon/>,
      checkmark:<CheckMarkIcon/>,
      logRemove:<LogRemoveIcon/>,
      info:<InfoIcon/>,
      openPane:<OpenPaneIcon/>,
      error:<ErrorBadgeIcon/>,
      filter:<FilterIcon/>,
      clear:<ClearFilterIcon/>,
      chevronDown:<ChevronDownIcon/>,
      tag:<TagIcon/>,
      chevronrightmed:<ChevronRightMedIcon/>,
      groupeddescending:<GroupedDescendingIcon/>,
      sortdown:<SortDownIcon/>,
      sortup:<SortUpIcon/>,
      OpenFile: <VisualStudioIDELogo32Icon/>,
      beerMug:<BeerMugIcon/>,
      review:<ReviewSolidIcon/>,
      open:<OpenPaneIcon/>,
      next:<NextIcon/>,
      previous:<PreviousIcon/>,
      more:<MoreIcon/>

    },
  });


  const dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
  
    menu: ContextualMenu,
    dragHandleSelector: '.ms-Modal-scrollableContent > div:first-child',
};






export function App() {
    const [selectedTabKey, setSelectedTabKey] = useState("0");
    const [selectedThemeIndex,setSelectedThemeIndex] = useState(0);
    const [coverageRunning,setCoverageRunning] = useState(false);
    const [useHyperlink,setUseHyperlink] = useState(false);
    const [addScrollbars, toggleAddScrollbars] = useState(false);

    const [rowBackgroundFromTreeViewColors,setRowBackgroundFromTreeViewColors] = useState(true);
    const [rowTextFromTreeViewColors,setRowTextFromTreeViewColors] = useState(false);
    const [headerColorsForHeaderText,setHeaderColorsForHeaderText] = useState(false);
    
    const customizationStyling = useRef(getCustomizationStyling(vsThemes[0][1]))

    const nextTheme= React.useCallback(() => {
      var next = selectedThemeIndex < vsThemes.length - 1 ? selectedThemeIndex+1 : 0;
      setSelectedThemeIndex(next);
    }, [selectedThemeIndex])

    const previousTheme = React.useCallback(() => {
      var next = selectedThemeIndex === 0 ? vsThemes.length - 1 : selectedThemeIndex-1;
      setSelectedThemeIndex(next);
    },[selectedThemeIndex])
    
    const selectedTheme = vsThemes[selectedThemeIndex];
    const selectedThemeColors = selectedTheme[1];
    if(customizationStyling.current.vsColors !== selectedThemeColors){
      customizationStyling.current = getCustomizationStyling(selectedThemeColors);
    }

    const environmentColors = selectedThemeColors.EnvironmentColors;
    useBodyToolWindow(getBodyStyles(selectedThemeColors));

    
    
    const progressBarColors = selectedThemeColors.ProgressBarColors;
    const treeViewColors = selectedThemeColors.TreeViewColors;
    const commonControlsColors = selectedThemeColors.CommonControlsColors;
    const focusColor = commonControlsColors.FocusVisualText;



    const alwaysRender = true;
    
    const items:JSX.Element[] = [
      <PivotItem key={0} itemKey='scrollbars' headerText='Scrollbars' alwaysRender={alwaysRender}>
        {addScrollbars && <><Long/><Wide/></>}
      </PivotItem>,
      <PivotItem key={1} itemKey='log' headerText='Log' alwaysRender={alwaysRender}>
        <LogDemo vsColors={selectedThemeColors} useLinks={useHyperlink}/>
      </PivotItem>,
      <PivotItem key={2} itemKey='simpleTable' headerText='Simple Table' alwaysRender={alwaysRender}>
        <SimpleTableDemo treeViewColorsBackground={treeViewColors.Background} environmentColorsCommandBarTextActive={environmentColors.CommandBarTextActive}/>
      </PivotItem>,
      <PivotItem key={3} itemKey='detailsList' headerText='Grouped List' alwaysRender={alwaysRender}>
        <GroupedListDemo headerColorsForHeaderText={headerColorsForHeaderText} 
          useLink={useHyperlink} 
          vsColors={selectedThemeColors} 
          rowBackgroundFromTreeViewColors={rowBackgroundFromTreeViewColors} 
          rowTextFromTreeViewColors={rowTextFromTreeViewColors}/>
    </PivotItem>,
    <PivotItem key={4} itemKey="feedback" headerText='Feedback' alwaysRender={alwaysRender}>
      <FeedbackDemo vsColors={selectedThemeColors} 
      />
    </PivotItem>,
    <PivotItem key={5} itemKey="controls" headerText='Controls' alwaysRender={alwaysRender}>
      <ControlsDemo vsColors={selectedThemeColors}></ControlsDemo>
    </PivotItem>,
    
    ]

    const percentComplete = coverageRunning ? undefined : 0;
    
    
    return  <CustomizerContext.Provider value={customizationStyling.current}>
    <>
        <Modal
              /*
                this version also suffers with
                https://github.com/microsoft/fluentui/issues/18924
                Unable to focus outside modeless modal

              */
			        forceFocusInsideTrap={false} //						https://github.com/microsoft/fluentui/issues/24151
              isOpen={true}
              isModeless={true}
              dragOptions={dragOptions}
              /*
                includes style fixes for
                [Bug]-Regression: Absolute-positioned modeless dialogs/modals are no longer visible or repositioned since 8.64.0.
                https://github.com/microsoft/fluentui/issues/22878
              */
              styles = {modalStyleProps => {
                const {isVisible, isModeless} = modalStyleProps
                return {
                    root:[{
                      position: "fixed",
                    },
                    isVisible && {
                      pointerEvents:"inherit"
                    },
                    isVisible && !isModeless && {
                      pointerEvents: 'auto',
                    },
                    
                  ],
                  main:[{
                    },
                    isModeless && {
                      pointerEvents: 'auto',
                    }
                  ],
                  layer: isModeless &&  { pointerEvents: 'none', position:"fixed" }
                }
              }}
              >
                  
                <div style={{padding:'5px'}}>
                  <Checkbox label="Use hyperlink"  checked={useHyperlink} onChange={() =>setUseHyperlink(!useHyperlink)}/>
                  <Label>{selectedTheme[0]}</Label>
                  
                  <MyActionButton iconProps={{iconName:"previous"}} onClick={previousTheme}>Previous theme</MyActionButton>
                  <MyActionButton iconProps={{iconName:"next"}} onClick={nextTheme}>Next theme</MyActionButton>
                  <Checkbox label="Add scrollbars"  checked={addScrollbars} onChange={() =>toggleAddScrollbars(!addScrollbars)}/>
                  <Checkbox label="Coverage running"  checked={coverageRunning} onChange={() => setCoverageRunning(!coverageRunning)}/>

                  <Checkbox label="row background from tvc "  checked={rowBackgroundFromTreeViewColors} onChange={() => setRowBackgroundFromTreeViewColors(!rowBackgroundFromTreeViewColors)}/>
                  <Checkbox label="row text from tvc "  checked={rowTextFromTreeViewColors} onChange={() =>setRowTextFromTreeViewColors(!rowTextFromTreeViewColors)}/>
                  <Checkbox label="header colors for header text ! "  checked={headerColorsForHeaderText} onChange={() =>setHeaderColorsForHeaderText(!headerColorsForHeaderText)}/>
                </div>
    
          </Modal>
        <ProgressIndicator barHeight={10} percentComplete={percentComplete} />
        
        <Pivot linkFormat="links" styles={(_) => {
            return {
                itemContainer:{
                  marginTop:"5px",
                },
            }
            }} 
            getTabId={(itemKey, _) => itemKey} 
            focusZoneProps={{
                isCircularNavigation: true, 
                onFocus: (evt) => {
                  var targetId = evt.target.id;
                  setSelectedTabKey(targetId);
                }
            }} 
            selectedKey={selectedTabKey}>
            {items}
        </Pivot>
      </>
        </CustomizerContext.Provider>
}