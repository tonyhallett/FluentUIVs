//import React from 'react';
// In React 17 you no longer need to import react when writing JSX

import { ActionButton, Checkbox, ContextualMenu, CustomizerContext, HighContrastSelector, ICheckboxStyleProps, ICheckboxStyles, IDragOptions, ILabelProps, ILabelStyleProps, IsFocusVisibleClassName, IStyleFunction, Label, Modal, Pivot, PivotItem, ProgressIndicator, registerIcons, ThemeProvider,  } from "@fluentui/react";
import { useRef, useState } from "react";
import {getVsColors, VsColorsThemed, vsThemes} from "./themeColors";
import{ BeerMugIcon, CheckMarkIcon, ChevronDownIcon, ChevronRightMedIcon, ClearFilterIcon, createSvgIcon, ErrorBadgeIcon, FilterIcon, GitHubLogoIcon,  GroupedDescendingIcon, InfoIcon, LogRemoveIcon, MoreIcon, NextIcon, OpenPaneIcon, PreviousIcon, ReviewSolidIcon, SortDownIcon, SortUpIcon, TagIcon } from'@fluentui/react-icons-mdl2';
import { LogDemo } from "./LogDemo";
import { cbGlobalClassNames } from "./globalClassNames";
import { GroupedListDemo } from "./GroupedListDemo";
import { useBodyToolWindow } from "./useBody";
import { FeedbackDemo } from "./FeedbackDemo";
import { getScrollbarStyle } from "./getScrollbarStyle";
import { ControlsDemo } from "./ControlDemo";
import { getActionButtonStyles } from "./themeStyles";
import { SimpleTableDemo } from "./SimpleTableDemo";
import { useBoolean } from "@fluentui/react-hooks";
import { Long, Wide } from "./LongAndWide";
import React from "react";

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
    const vsColorsTheme = useRef({vsColors:vsThemes[0][1]})

    const nextTheme= React.useCallback(() => {
      var next = selectedThemeIndex < vsThemes.length - 1 ? selectedThemeIndex+1 : 0;
      setSelectedThemeIndex(next);
    }, [selectedThemeIndex])

    const previousTheme = React.useCallback(() => {
      var next = selectedThemeIndex === 0 ? vsThemes.length - 1 : selectedThemeIndex-1;
      setSelectedThemeIndex(next);
    },[selectedThemeIndex])
    
    const selectedTheme = vsThemes[selectedThemeIndex];
    const selectedThemeName = selectedTheme[0];
    const selectedThemeColors = selectedTheme[1];
    if(vsColorsTheme.current.vsColors !== selectedThemeColors){
      vsColorsTheme.current = {vsColors:selectedThemeColors};
    }

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
      <PivotItem key={0} itemKey='scrollbars' headerText='Scrollbars' alwaysRender={alwaysRender}>
        {addScrollbars && <><Long/><Wide/></>}
      </PivotItem>,
      <PivotItem key={1} itemKey='log' headerText='Log' alwaysRender={alwaysRender}>
        <LogDemo vsColors={selectedThemeColors} useLinks={useHyperlink} toolWindowBackground={toolWindowBackground} toolWindowText={toolWindowText} actionButtonStyles={getActionButtonStyles(selectedThemeColors)}/>
      </PivotItem>,
      <PivotItem key={2} itemKey='simpleTable' headerText='Simple Table' alwaysRender={alwaysRender}>
        <SimpleTableDemo treeViewColorsBackground={treeViewColors.Background} environmentColorsCommandBarTextActive={environmentColors.CommandBarTextActive}/>
      </PivotItem>,
      <PivotItem key={3} itemKey='detailsList' headerText='Grouped List' alwaysRender={alwaysRender}>
        <GroupedListDemo headerColorsForHeaderText={headerColorsForHeaderText} useLink={useHyperlink} vsColors={selectedThemeColors} rowBackgroundFromTreeViewColors={rowBackgroundFromTreeViewColors} rowTextFromTreeViewColors={rowTextFromTreeViewColors}/>
    </PivotItem>,
    <PivotItem key={4} itemKey="feedback" headerText='Feedback' alwaysRender={alwaysRender}>
      <FeedbackDemo vsColors={selectedThemeColors} 
      />
    </PivotItem>,
    <PivotItem key={5} itemKey="controls" headerText='Controls' alwaysRender={alwaysRender}>
      <ControlsDemo vsColors={selectedThemeColors} checkBoxStyles={vsCbStylesFn} actionButtonStyles={getActionButtonStyles(selectedThemeColors)}></ControlsDemo>
    </PivotItem>,
    
    ]

    const percentComplete = coverageRunning ? undefined : 0;
    const actionButtonStyles = getActionButtonStyles(selectedThemeColors);
    const labelStyles:ILabelProps['styles'] = {
        root:{
          color:environmentColors.ToolWindowText
      }
    }
    
    {/* */}
    return  <ThemeProvider applyTo="none" theme={vsColorsTheme.current as any}> 
    <CustomizerContext.Provider value={{
      customizations:{
        scopedSettings:{
          "Label":{
            styles:(props:ILabelStyleProps) => {
              // why is vsColors not getting through ? 
              // although do not need theme when they are in js scope
              //will just need to change the value attribute to re-render ( and can get rid of the ThemeProvider)  
              

                return {
                  root:{
                    color:selectedThemeColors.EnvironmentColors.ToolWindowText
                  }
                }
             
            }
          }
        },
        settings:{

        }
      }
    }}>
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
                const {isVisible, isModeless, theme} = modalStyleProps
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
                    backgroundColor:selectedThemeColors.EnvironmentColors.ToolWindowBackground,
                    borderColor:selectedThemeColors.EnvironmentColors.ToolWindowBorder
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
                  <Checkbox styles={vsCbStylesFn} label="Use hyperlink"  checked={useHyperlink} onChange={() =>setUseHyperlink(!useHyperlink)}/>
                  <Label>{selectedThemeName}</Label>
                  
                  <ActionButton iconProps={{iconName:"previous"}} styles={actionButtonStyles} onClick={previousTheme}>Previous theme</ActionButton>
                  <ActionButton iconProps={{iconName:"next"}} styles={actionButtonStyles} onClick={nextTheme}>Next theme</ActionButton>
                  <Checkbox styles={vsCbStylesFn} label="Add scrollbars"  checked={addScrollbars} onChange={() =>toggleAddScrollbars(!addScrollbars)}/>
                  <Checkbox styles={vsCbStylesFn} label="Coverage running"  checked={coverageRunning} onChange={() => setCoverageRunning(!coverageRunning)}/>

                  <Checkbox styles={vsCbStylesFn} label="row background from tvc "  checked={rowBackgroundFromTreeViewColors} onChange={() => setRowBackgroundFromTreeViewColors(!rowBackgroundFromTreeViewColors)}/>
                  <Checkbox styles={vsCbStylesFn} label="row text from tvc "  checked={rowTextFromTreeViewColors} onChange={() =>setRowTextFromTreeViewColors(!rowTextFromTreeViewColors)}/>
                  <Checkbox styles={vsCbStylesFn} label="header colors for header text ! "  checked={headerColorsForHeaderText} onChange={() =>setHeaderColorsForHeaderText(!headerColorsForHeaderText)}/>
                  </div>
    
          </Modal>
        <ProgressIndicator barHeight={10} percentComplete={percentComplete} styles={ props => {
            const trackColor = progressBarColors.Background;//environmentColors.ToolWindowText
            const progressBarColor = progressBarColors.IndicatorFill !== trackColor ? progressBarColors.IndicatorFill : environmentColors.ToolWindowText;
            return {
                progressTrack:{
                    //can barely see this with blue, cannot see with light or dark
                    backgroundColor : trackColor,
                    //border:`1px solid ${environmentColors.ToolWindowText}`
                },
                // might use an accent color
                progressBar:[
                {
                },
                props.indeterminate && {
                    background:
                    `linear-gradient(to right, ${progressBarColor} 0%, ` +
                    `${progressBarColor} 50%, ${progressBarColor} 100%)`,
                    //border:`1px solid ${environmentColors.ToolWindowText}`
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
      </>
        </CustomizerContext.Provider>
   </ThemeProvider>
}