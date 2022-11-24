//import React from 'react';
// In React 17 you no longer need to import react when writing JSX

import { Checkbox, ContextualMenu, CustomizerContext, IDragOptions, IPivotProps, Label, Modal, Pivot, PivotItem, ProgressIndicator, registerIcons, Slider,  } from "@fluentui/react";
import { useState } from "react";
import { vsThemes} from "./vs styling/themeColors";
import{ BeerMugIcon, CheckMarkIcon, ChevronDownIcon, ChevronRightMedIcon, ClearFilterIcon, createSvgIcon, ErrorBadgeIcon, FilterIcon, GitHubLogoIcon,  GroupedDescendingIcon, InfoIcon, LogRemoveIcon, MoreIcon, NextIcon, OpenPaneIcon, PreviousIcon, ReviewSolidIcon, SortDownIcon, SortUpIcon, TagIcon } from'@fluentui/react-icons-mdl2';
import { LogDemo } from "./LogDemo";

import { GroupedListDemo } from "./GroupedListDemo";
import { useBodyToolWindow } from "./utilities/useBody";
import { FeedbackDemo } from "./FeedbackDemo";

import { ControlsDemo } from "./ControlDemo";
import { getBodyStyles, VsCustomizerContext,} from "./vs styling/themeStyles";
import { SimpleTableDemo } from "./SimpleTableDemo";
import { Long, Wide } from "./Helper components/LongAndWide";
import { MyActionButton } from "./vs styling/MyActionButton";
import { useBoolean } from "@fluentui/react-hooks";
import { useCycle } from "./utilities/hooks/useCycle";
import { useRefInitOnce } from "./utilities/hooks/useRefInitOnce";
import { TabColours } from "./Helper components/TabColours";
import { installedFonts } from "./vs styling/installedFonts";

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
    const [selectedThemeIndex,nextTheme, previousTheme] = useCycle(vsThemes)
    const [selectedFontIndex,nextFont, previousFont] = useCycle(installedFonts)
    const [coverageRunning,{toggle:toggleCoverageRunning}] = useBoolean(false);
    const [useHyperlink,{toggle:toggleUseHyperlink}] = useBoolean(false);
    const [addScrollbars, {toggle:toggleAddScrollbars}] = useBoolean(false);
    const [useLinksFormat, {toggle:toggleLinkFormat}] = useBoolean(true);

    const [surroundTabs, {toggle:toggleSurroundTabs}] = useBoolean(false);
    const [rowBackgroundFromTreeViewColors,{toggle:toggleRowBackgroundFromTreeViewColors}] = useBoolean(true);
    const [rowTextFromTreeViewColors,{toggle:toggleRowTextFromTreeViewColors}] = useBoolean(false);
    const [headerColorsForHeaderText,{toggle:toggleHeaderColorsForHeaderText}] = useBoolean(false);
    const [fontSize, setFontSize] = useState(10);

    
    const customizationStyling = useRefInitOnce(new VsCustomizerContext(
      vsThemes[selectedThemeIndex][1],
      rowBackgroundFromTreeViewColors,
      rowTextFromTreeViewColors,
      headerColorsForHeaderText,
      surroundTabs,
      fontSize,
      installedFonts[selectedFontIndex]
      ))
    
    const selectedTheme = vsThemes[selectedThemeIndex];
    const selectedThemeColors = selectedTheme[1];
    customizationStyling.current = customizationStyling.current.getNext(
      selectedThemeColors,
      rowBackgroundFromTreeViewColors,
      rowTextFromTreeViewColors,
      headerColorsForHeaderText,
      surroundTabs,
      fontSize,
      installedFonts[selectedFontIndex]
      );

    useBodyToolWindow(getBodyStyles(selectedThemeColors));

    const linkFormat:IPivotProps['linkFormat'] = useLinksFormat ? "links" : "tabs"; 
    // has to be true or any column resizing is lost !
    const alwaysRender = true;
    
    const pivotItems:JSX.Element[] = [
      <PivotItem key={0} itemKey='scrollbars' headerText='Scrollbars' alwaysRender={alwaysRender}>
        {addScrollbars && <><Long/><Wide/></>}
      </PivotItem>,
      <PivotItem key={1} itemKey='log' headerText='Log' alwaysRender={alwaysRender}>
        <LogDemo useLinks={useHyperlink}/>
      </PivotItem>,
      <PivotItem key={2} itemKey='simpleTable' headerText='Simple Table' alwaysRender={alwaysRender}>
        <SimpleTableDemo/>
      </PivotItem>,
      <PivotItem key={3} itemKey='detailsList' headerText='Grouped List' alwaysRender={alwaysRender}>
        <GroupedListDemo 
          useLink={useHyperlink} 
          />
    </PivotItem>,
    <PivotItem key={4} itemKey="feedback" headerText='Feedback' alwaysRender={alwaysRender}>
      <FeedbackDemo />
    </PivotItem>,
    <PivotItem key={5} itemKey="controls" headerText='Controls' alwaysRender={alwaysRender}>
      <ControlsDemo></ControlsDemo>
    </PivotItem>,
    <PivotItem key={6} itemKey="tabColours" headerText='Tab Colours' alwaysRender={alwaysRender}>
      <TabColours vsColors={selectedThemeColors}/>
    </PivotItem>,
    
    ]

    const percentComplete = coverageRunning ? undefined : 0;
    
    
    return  (
    <CustomizerContext.Provider value={customizationStyling.current}>
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
                  <Checkbox label="Use hyperlink"  checked={useHyperlink} onChange={toggleUseHyperlink}/>
                  <Label>{selectedTheme[0]}</Label>
                  
                  <MyActionButton iconProps={{iconName:"previous"}} onClick={previousTheme}>Previous theme</MyActionButton>
                  <MyActionButton iconProps={{iconName:"next"}} onClick={nextTheme}>Next theme</MyActionButton>
                  <br/>
                  <MyActionButton iconProps={{iconName:"previous"}} onClick={previousFont}>Previous font</MyActionButton>
                  <MyActionButton iconProps={{iconName:"next"}} onClick={nextFont}>Next font</MyActionButton>

                  <Checkbox label="Add scrollbars"  checked={addScrollbars} onChange={toggleAddScrollbars}/>
                  <Checkbox label="Coverage running"  checked={coverageRunning} onChange={toggleCoverageRunning}/>

                  <Checkbox label="row background from tvc "  checked={rowBackgroundFromTreeViewColors} onChange={toggleRowBackgroundFromTreeViewColors}/>
                  <Checkbox label="row text from tvc "  checked={rowTextFromTreeViewColors} onChange={toggleRowTextFromTreeViewColors}/>
                  <Checkbox label="header colors for header text ! "  checked={headerColorsForHeaderText} onChange={toggleHeaderColorsForHeaderText}/>

                  <Checkbox label="use link format"  checked={useLinksFormat} onChange={toggleLinkFormat}/>
                  <Checkbox styles={
                    {
                      root:{
                        visibility:useLinksFormat ? "collapse" : "visible"
                      }
                    }
                  } label="surround tabs"  checked={surroundTabs} onChange={toggleSurroundTabs}/>
                  <Slider showValue value={fontSize} min={10} max={19} onChange={num => setFontSize(num)} />
                </div>
    
        </Modal>
        <ProgressIndicator barHeight={10} percentComplete={percentComplete} />
        <Pivot linkFormat={linkFormat} styles={(_) => {
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
            {pivotItems}
        </Pivot>
        
      </>
    </CustomizerContext.Provider>)
}