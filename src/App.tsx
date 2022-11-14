//import React from 'react';
// In React 17 you no longer need to import react when writing JSX

import { HighContrastSelector, ICheckboxStyleProps, ICheckboxStyles, IsFocusVisibleClassName, IStyleFunction, Pivot, PivotItem, ProgressIndicator, registerIcons,  } from "@fluentui/react";
import { useState } from "react";
import {vsThemes} from "./themeColors";
import{ BeerMugIcon, CheckMarkIcon, ChevronDownIcon, ChevronRightMedIcon, ClearFilterIcon, createSvgIcon, ErrorBadgeIcon, FilterIcon, GitHubLogoIcon,  GroupedDescendingIcon, InfoIcon, LogRemoveIcon, OpenPaneIcon, ReviewSolidIcon, SortDownIcon, SortUpIcon, TagIcon } from'@fluentui/react-icons-mdl2';
import { LogDemo } from "./LogDemo";
import { cbGlobalClassNames } from "./globalClassNames";
import { GroupedListDemo } from "./GroupedListDemo";
import { useBodyToolWindow } from "./useBody";
import { FeedbackDemo } from "./FeedbackDemo";
import { getScrollbarStyle } from "./getScrollbarStyle";
import { ColorDisplay } from "./ColorDisplay";
import { ControlsDemo } from "./ControlDemo";
import { MakeChange } from "./MakeChange";
import { getActionButtonStyles } from "./themeStyles";
import { SimpleTableDemo } from "./SimpleTableDemo";

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
    },
  });

export function App() {
    const [selectedTabKey, setSelectedTabKey] = useState("0");
    const [selectedThemeIndex,setSelectedThemeIndex] = useState(0);
    const [coverageRunning,setCoverageRunning] = useState(false);
    const [useHyperlink,setUseHyperlink] = useState(false);
    
    const selectedTheme = vsThemes[selectedThemeIndex];
    const selectedThemeName = selectedTheme[0];
    const selectedThemeColors = selectedTheme[1];

    const environmentColors = selectedThemeColors.EnvironmentColors;
    environmentColors.ScrollBarArrowBackground
    const bodyStyles = [
      {
          background: selectedThemeColors.EnvironmentColors.ToolWindowBackground,
          selectors:getScrollbarStyle(
            environmentColors.ScrollBarThumbBackground,
            environmentColors.ScrollBarThumbMouseOverBackground,
            environmentColors.ScrollBarThumbPressedBackground,
            environmentColors.ScrollBarBackground,
            environmentColors.ScrollBarArrowBackground,
            environmentColors.ScrollBarArrowMouseOverBackground,
            environmentColors.ScrollBarArrowPressedBackground,
            environmentColors.ScrollBarArrowGlyph,
            environmentColors.ScrollBarArrowGlyphMouseOver,
            environmentColors.ScrollBarArrowGlyphPressed,
            environmentColors.ScrollBarBorder,
            environmentColors.ScrollBarThumbBorder,
            environmentColors.ScrollBarThumbMouseOverBorder,
            environmentColors.ScrollBarThumbPressedBorder,
            environmentColors.ScrollBarThumbGlyphMouseOverBorder,
            environmentColors.ScrollBarThumbGlyphPressedBorder

          ),
      },
    ]
    useBodyToolWindow(bodyStyles);

    function nextTheme(){ //todo memo 
        var next = selectedThemeIndex < vsThemes.length - 1 ? selectedThemeIndex+1 : 0;
        setSelectedThemeIndex(next);
    }
    
    const progressBarColors = selectedThemeColors.ProgressBarColors;
    
    
    const toolWindowBackground = environmentColors.ToolWindowBackground;
    const toolWindowText = environmentColors.ToolWindowText;

    const treeViewColors = selectedThemeColors.TreeViewColors;
    const commonControlsColors = selectedThemeColors.CommonControlsColors;

    const focusColor = commonControlsColors.FocusVisualText;

    // ignoring indetermintate as vs styling does not provide and not having that state
    // visual studio does not differentiate with checked state
    const vsCbStylesFn : IStyleFunction<ICheckboxStyleProps, ICheckboxStyles> = (props) => {
      return {
          root:[
              {
                  [`:hover .${cbGlobalClassNames.checkbox}`]: {
                    background: commonControlsColors.CheckBoxBackgroundHover,
                    borderColor: commonControlsColors.CheckBoxBorderHover,
                    [HighContrastSelector]: {
                      borderColor: 'Highlight',
                      background: 'Highlight',
                    },
                  },
                  [`:focus .${cbGlobalClassNames.checkbox}`]: { 
                      background: commonControlsColors.CheckBoxBackgroundFocused,
                      borderColor: commonControlsColors.CheckBoxBorderFocused 
                  },
                  
                  [`:hover .${cbGlobalClassNames.checkmark}`]: { // perhaps should prevent the opacity changing to 1 ?
                    color: commonControlsColors.CheckBoxGlyphHover,
                    [HighContrastSelector]: {
                      color: 'Highlight',
                    },
                  },

                  [`:focus .${cbGlobalClassNames.checkmark}`]: {
                      color: commonControlsColors.CheckBoxGlyphFocused,
                      [HighContrastSelector]: {
                        color: 'Highlight',
                      },
                    },


                  // issue hover and focus together ? Does mine override
                  /* [`:hover .${cbGlobalClassNames.text}, :focus .${cbGlobalClassNames.text}`]: {
                      color: checkboxHoveredTextColor,
                      [HighContrastSelector]: {
                        color: props.disabled ? 'GrayText' : 'WindowText',
                      },
                  } */
                  [`:hover .${cbGlobalClassNames.text}`]: {
                      color: commonControlsColors.CheckBoxTextHover,
                      [HighContrastSelector]: {
                        color: props.disabled ? 'GrayText' : 'WindowText',
                      },
                  },
                  [`:focus .${cbGlobalClassNames.text}`]: {
                      color: commonControlsColors.CheckBoxTextFocused,
                      [HighContrastSelector]: {
                        color: props.disabled ? 'GrayText' : 'WindowText',
                      },
                  },
                },

                
          ],
          checkbox:[
              {
                  border: `1px solid ${commonControlsColors.CheckBoxBorder}`,
                  background:commonControlsColors.CheckBoxBackground
              },
              props.checked && {
                  borderColor: commonControlsColors.CheckBoxBorder, // default styling switches from border to borderColor
              },
              props.disabled && {
                  borderColor : commonControlsColors.CheckBoxBorderDisabled,
                  background: commonControlsColors.CheckBoxBackgroundDisabled
              }
          ],

          checkmark:{
              color:props.disabled? commonControlsColors.CheckBoxGlyphDisabled : commonControlsColors.CheckBoxGlyph
          },
          text:{
              color: props.disabled ? commonControlsColors.CheckBoxTextDisabled : commonControlsColors.CheckBoxText
          },
          input: {
              opacity: 0,
              [`.${IsFocusVisibleClassName} &:focus + label::before`]: {
                  outline: `1px solid ${focusColor}`,
              },
            },
      };
  }

    const alwaysRender = false;
    const items:JSX.Element[] = [
      <PivotItem key={0} itemKey='first' headerText='First' alwaysRender={alwaysRender}>
        <div>
          <ColorDisplay color={environmentColors.VizSurfaceGreenLight}/>
          <ColorDisplay color={environmentColors.VizSurfaceGreenMedium}/>
          <ColorDisplay color={environmentColors.VizSurfaceGreenDark}/>
        </div>
      </PivotItem>,
      <PivotItem key={1} itemKey='log' headerText='Log' alwaysRender={alwaysRender}>
        <LogDemo useLinks={useHyperlink} toolWindowBackground={toolWindowBackground} toolWindowText={toolWindowText} actionButtonStyles={getActionButtonStyles(selectedThemeColors)}/>
      </PivotItem>,
      <PivotItem key={2} itemKey='simpleTable' headerText='Simple Table' alwaysRender={alwaysRender}>
        <SimpleTableDemo environmentColorsCommandBarTextActive={environmentColors.CommandBarTextActive}/>
      </PivotItem>,
      <PivotItem key={3} itemKey='detailsList' headerText='Grouped List' alwaysRender={alwaysRender}>
        <GroupedListDemo useLink={useHyperlink} vsColors={selectedThemeColors}/>
    </PivotItem>,
    <PivotItem key={4} itemKey="feedback" headerText='Feedback' alwaysRender={alwaysRender}>
      <FeedbackDemo vsColors={selectedThemeColors} 
      />
    </PivotItem>,
    <PivotItem key={5} itemKey="controls" headerText='Controls' alwaysRender={alwaysRender}>
      <ControlsDemo vsColors={selectedThemeColors} checkBoxStyles={vsCbStylesFn} actionButtonStyles={getActionButtonStyles(selectedThemeColors)}></ControlsDemo>
    </PivotItem>,
    <PivotItem key={6} itemKey="makeChange" headerText="Make change" alwaysRender={alwaysRender}>
      <MakeChange 
        useHyperlink={useHyperlink} 
        useHyperlinkToggled={() =>setUseHyperlink(!useHyperlink) }
        coverageRunning={coverageRunning} coverageRunningToggled={(_) => {
            setCoverageRunning(!coverageRunning);
       }} 
       labelStyles={
        {
          root:{
            color:environmentColors.ToolWindowText
      }}
      } nextTheme={nextTheme} selectedThemeName={selectedThemeName} actionButtonStyles={getActionButtonStyles(selectedThemeColors)} checkBoxStyles={vsCbStylesFn} />
    </PivotItem>
    ]

    const percentComplete = coverageRunning ? undefined : 0;

    return <div>
        <ProgressIndicator barHeight={5} percentComplete={percentComplete} styles={ props => {

            return {
                progressTrack:{
                    //can barely see this with blue, cannot see with light or dark
                    backgroundColor : progressBarColors.Background, //could use environmentColors.ToolWindowText
                },
                // might use an accent color
                progressBar:[
                {
                },
                props.indeterminate && {
                    background:
                    `linear-gradient(to right, ${progressBarColors.IndicatorFill} 0%, ` +
                    `${progressBarColors.IndicatorFill} 50%, ${progressBarColors.IndicatorFill} 100%)`,
                }
                ]
            }
        }}/>
        
        <Pivot linkFormat="links" styles={(_) => {
            return {
                link:[
                    {
                        //color:commonControlsColors.InnerTabInactiveText,
                        // might only supply if rootIsTabs - if not tabs use a link color instead 
                        //border:`1px solid ${commonControlsColors.InnerTabInactiveBorder}`,
                        //backgroundColor: commonControlsColors.InnerTabInactiveBackground,

                        // does not work
                        //color:environmentColors.ToolWindowTabText,
                        //backgroundColor:environmentColors.ToolWindowTabGradientEnd,

                        color:environmentColors.ToolWindowText, //environmentColors.PanelHyperlink,
                        selectors: {
                            [`.${IsFocusVisibleClassName} &:focus`]: {
                              outline: `1px solid ${focusColor}`,
                            },
                            
                            ':hover': {
                                //backgroundColor: commonControlsColors.InnerTabInactiveHoverBackground,
                                //color: commonControlsColors.InnerTabInactiveHoverText,
                                // might only supply if rootIsTabs
                                //border:`1px solid ${commonControlsColors.InnerTabInactiveHoverBorder}`,
                                
                                color: environmentColors.ToolWindowText,// environmentColors.PanelHyperlinkHover,
                                backgroundColor:"none"
                            },
                            ':active': {
                                //backgroundColor: commonControlsColors.InnerTabActiveBackground,
                                //color: commonControlsColors.InnerTabActiveText,
                                // might only supply if rootIsTabs
                                //border:`1px solid ${commonControlsColors.InnerTabActiveBorder}`,
                                
                                //color: environmentColors.PanelHyperlinkPressed,
                                backgroundColor:"none"
                            },
            

                        }
  
                    },
                ],
                linkIsSelected:[
                    {
                        selectors: {
                            ':before': {
                                //TreeView.SelectedItemInactive commonControlsColors.InnerTabActiveBorder, 
                                backgroundColor: treeViewColors.SelectedItemInactiveText, 
                            },
                        }
                    }
                ],
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
    </div>
}