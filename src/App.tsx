//import React from 'react';
// In React 17 you no longer need to import react when writing JSX

import { ActionButton, Checkbox, Dropdown, getFocusStyle, getInputFocusStyle, getTheme, HighContrastSelector, ICheckboxStyleProps, ICheckboxStyles, IDropdownOption, isDark, IsFocusVisibleClassName, IStyleFunction, Label, makeStyles, Pivot, PivotItem, ProgressIndicator, registerIcons, SearchBox, Slider, useDocument } from "@fluentui/react";
import { useState } from "react";
import {vsThemes} from "./themeColors";
import{ CheckMarkIcon, ChevronDownIcon, ChevronRightMedIcon, ClearFilterIcon, ErrorBadgeIcon, FilterIcon, GitHubLogoIcon, GroupedAscendingIcon, GroupedDescendingIcon, InfoIcon, LogRemoveIcon, OpenPaneIcon, SortDownIcon, SortUpIcon, TagIcon } from'@fluentui/react-icons-mdl2';
import { getColor, lightenOrDarken, colorRGBA } from "./colorHelpers";
import { SimpleTableDemo } from "./simpleTableDemo";
import { LogDemo } from "./LogDemo";
import { cbGlobalClassNames, dropDownClassNames, sliderClassNames } from "./globalClassNames";
import { GroupedListDemo } from "./GroupedListDemo";
import React from "react";
import { ThemeProviderState } from "@fluentui/react/lib/utilities/ThemeProvider/ThemeProvider.types";
import { useBodyToolWindow } from "./useBody";



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
    },
  });

const buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    outlineColor: 'ButtonText', 
};


export function App() {
    const [selectedTabKey, setSelectedTabKey] = useState("0");
    const [selectedThemeIndex,setSelectedThemeIndex] = useState(0);
    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [coverageRunning,setCoverageRunning] = useState(false);
    const [sliderValue,setSliderValue] = useState(1);
    const [filter, setFilter] = useState("");
    const [selectedDropDownOption, setSelectedDropDownOptions] = useState<IDropdownOption>();
    
    
    const selectedTheme = vsThemes[selectedThemeIndex];
    const selectedThemeName = selectedTheme[0];
    const selectedThemeColors = selectedTheme[1];
    useBodyToolWindow(selectedThemeColors.EnvironmentColors.ToolWindowBackground);
    function nextTheme(){
        var next = selectedThemeIndex < vsThemes.length - 1 ? selectedThemeIndex+1 : 0;
        setSelectedThemeIndex(next);
    }
    
    const progressBarColors = selectedThemeColors.ProgressBarColors;
    const environmentColors = selectedThemeColors.EnvironmentColors;
    const toolWindowBackground = environmentColors.ToolWindowBackground;
    const toolWindowText = environmentColors.ToolWindowText;

    const treeViewColors = selectedThemeColors.TreeViewColors;
    const commonControlsColors = selectedThemeColors.CommonControlsColors;

    const focusColor = commonControlsColors.FocusVisualText;
    const searchControlColors = selectedThemeColors.SearchControlColors;
    const headerColors = selectedThemeColors.HeaderColors;

    
    const toolWindowTextColor = getColor(environmentColors.ToolWindowText);
    const toolWindowTextDark = isDark(toolWindowTextColor);
    const hoverToolWindowTextShade = lightenOrDarken(toolWindowTextColor,0.4,toolWindowTextDark); 
    const hoverToolWindowText=  colorRGBA(hoverToolWindowTextShade);
    const theme = getTheme();
    function getActionButtonStyles(){
      const actionButtonStyles = {
        root:[
            getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent',outlineColor:focusColor }),
            {
                color:commonControlsColors.ButtonText,
                backgroundColor:commonControlsColors.Button,
                border:`1px solid ${commonControlsColors.ButtonBorder}`,
                // todo high contrast
                ":focus":{
                    color:commonControlsColors.ButtonFocusedText,
                    backgroundColor:commonControlsColors.ButtonFocused,
                    border:`1px solid ${commonControlsColors.ButtonBorderFocused}`
                }
            },
        ],
        rootHovered:{
            color:commonControlsColors.ButtonHoverText, // affects the text
            backgroundColor:commonControlsColors.ButtonHover,
            border:`1px solid ${commonControlsColors.ButtonBorderHover}`
        },
        rootDisabled:{
            color:commonControlsColors.ButtonDisabledText,
            backgroundColor:commonControlsColors.ButtonDisabled,
            border:`1px solid ${commonControlsColors.ButtonBorderDisabled}`
        },
        rootPressed:{
            color:commonControlsColors.ButtonPressedText,
            backgroundColor:commonControlsColors.ButtonPressed,
            border:`1px solid ${commonControlsColors.ButtonBorderPressed}`
        },
        
        icon:{
            color:"inherit"
        },
        iconHovered:{
            color:"inherit"
        },
        //iconDisabled inherits
        iconPressed:{
            color:"inherit"
        }
      }
      return actionButtonStyles
    }

    const items:JSX.Element[] = [
      <PivotItem key={0} itemKey='first' headerText='First' alwaysRender>
        <span>First</span>
      </PivotItem>,
      <PivotItem key={1} itemKey='log' headerText='Log' alwaysRender>
        <LogDemo toolWindowBackground={toolWindowBackground} toolWindowText={toolWindowText} actionButtonStyles={getActionButtonStyles()}/>
      </PivotItem>,
      <PivotItem key={2} itemKey='simpleTable' headerText='Simple Table' alwaysRender>
        <SimpleTableDemo environmentColorsCommandBarTextActive={environmentColors.CommandBarTextActive}/>
      </PivotItem>,
      <PivotItem key={3} itemKey='detailsList' headerText='Grouped List' alwaysRender>
        <GroupedListDemo vsColors={selectedThemeColors}/>
    </PivotItem>
    ]

    const percentComplete = coverageRunning ? undefined : 0;

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

    

    const demoActionButtonStyles = getActionButtonStyles();
    
    const dropDownOptions: IDropdownOption[] = [
      {
        key:"ddo1",
        text:"First"
      },
      {
        key:"ddo2",
        text:"Second"
      }
    ];


  const getDropDownItemSelectors = (isSelected:boolean) => {
      const dropDownItemSelectors =  {
        selectors: {
          '&:hover:focus': [
            {
              color: commonControlsColors.ComboBoxListItemTextHover,//override
              backgroundColor: commonControlsColors.ComboBoxListItemBackgroundHover,//override
              borderColor: commonControlsColors.ComboBoxListItemBorderHover
            },
          ],
          //mine for when hover and not active window
          '&:hover': [
            {
              color: commonControlsColors.ComboBoxListItemTextHover,
              backgroundColor: commonControlsColors.ComboBoxListItemBackgroundHover,
              borderColor: commonControlsColors.ComboBoxListItemBorderHover
            },
          ],
          '&:focus': [
            {
              color: commonControlsColors.ComboBoxListItemText,
              backgroundColor: !isSelected ? 'transparent' : commonControlsColors.ComboBoxTextInputSelection,//override
            },
          ],
          // contrary to https://learn.microsoft.com/en-us/visualstudio/extensibility/ux-guidelines/shared-colors-for-visual-studio?view=vs-2022#drop-downs-and-combo-boxes
          // ComboBoxListItemTextPressed ComboBoxListItemTextFocused and more
          // changed to active:hover
          '&:active:hover': [
            {
              color: commonControlsColors.ComboBoxListItemTextHover,//override
              backgroundColor: isSelected ? commonControlsColors.ComboBoxListBackground :commonControlsColors.ComboBoxListItemBackgroundHover,//override
              borderColor: commonControlsColors.ComboBoxListItemBorderHover
            },
          ],
        },
      };
      return dropDownItemSelectors;
  }

    // not styling the combobox glyph background
    return <div style={{background:toolWindowBackground, color:toolWindowText}}>
      
      <Dropdown styles={(dropDownStyleProps => {
        const {isRenderingPlaceholder, disabled, isOpen} = dropDownStyleProps;
        return {
          root:{
            width:"200px"
          },
          label:{
            color:toolWindowText
          },
          dropdown:{
            color:commonControlsColors.ComboBoxText,
            borderColor:commonControlsColors.ComboBoxBorder,
            selectors: {
              // title --------------------------------------------------------
              ['&:hover .' + dropDownClassNames.title]: [
                !disabled && {
                  color:commonControlsColors.ComboBoxTextHover,//override
                  backgroundColor:commonControlsColors.ComboBoxBackgroundHover
                },
                { borderColor: commonControlsColors.ComboBoxBorderHover},
              ],
              ['&:focus .' + dropDownClassNames.title]: [
                !disabled && {
                  color:commonControlsColors.ComboBoxTextFocused,//override
                  borderColor:commonControlsColors.ComboBoxBorderFocused,
                  backgroundColor:commonControlsColors.ComboBoxBackgroundFocused
                },
              ],
              ['&:focus:after']: [
                {
                  border: !disabled ? `2px solid ${focusColor}` : 'none',
                },
              ],
              ['&:active .' + dropDownClassNames.title]: [
                !disabled && {
                  color:commonControlsColors.ComboBoxTextPressed,
                  backgroundColor:commonControlsColors.ComboBoxBackgroundPressed,
                },
                { borderColor: commonControlsColors.ComboBoxBorderPressed},
              ],

              //when rendering placeholder ( additional class applied) ------------------------------------------
              ['&:hover .' + dropDownClassNames.titleIsPlaceHolder]:
              !disabled && {
                color:commonControlsColors.ComboBoxTextHover,//necessary override
              },
              ['&:focus .' + dropDownClassNames.titleIsPlaceHolder]:
                !disabled &&  {
                  color:commonControlsColors.ComboBoxTextFocused,//necessary override
                
                },
              ['&:active .' + dropDownClassNames.titleIsPlaceHolder]:
              !disabled && {
                color:commonControlsColors.ComboBoxTextPressed,//necessary override
              },

              //caretDown ----------------------------------------------------------------------------------------
              ['&:hover .' + dropDownClassNames.caretDown]: !disabled && {color:commonControlsColors.ComboBoxGlyphHover},
              ['&:focus .' + dropDownClassNames.caretDown]: [
                !disabled && {color:commonControlsColors.ComboBoxGlyphFocused},
              ],
              ['&:active .' + dropDownClassNames.caretDown]: !disabled && {color:commonControlsColors.ComboBoxGlyphPressed},

    
            },
          },
          callout:{
            selectors: {
              ['.ms-Callout-main']: { 
                border: `1px solid ${commonControlsColors.ComboBoxListBorder}`,
                backgroundColor:commonControlsColors.ComboBoxListBackground,
                // could do this - for the 6 themes testing with, all are black for ComboBoxListBackgroundShadow
                // boxShadow:`0 3.2px 7.2px 0 ${commonControlsColors.ComboBoxListBackgroundShadow}, 0 0.6px 1.8px 0 ${commonControlsColors.ComboBoxListBackgroundShadow}`
              },
            },
          },
          dropdownItem:[
            {
              color:commonControlsColors.ComboBoxListItemText
            }, 
            getDropDownItemSelectors(false),
            getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent', outlineColor:focusColor }),
          ],
          dropdownItemSelected:[
              {
              backgroundColor:commonControlsColors.ComboBoxTextInputSelection,
              color:commonControlsColors.ComboBoxListItemText
            },
            getDropDownItemSelectors(true),
            getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent', outlineColor:focusColor })
          ],
          title:[
              {
              backgroundColor:commonControlsColors.ComboBoxBackground,//override
              borderColor:commonControlsColors.ComboBoxBorder//override
            }, 
            isRenderingPlaceholder && {color:environmentColors.ControlEditHintText} //override
          ],
          caretDown:{
            color:commonControlsColors.ComboBoxGlyph,
          }
        }
      })} selectedKey={selectedDropDownOption?.key} label="Drop me" placeholder="Placeholder" options={dropDownOptions} onChange={(_,option) => {
        setSelectedDropDownOptions(option)
      }} />
       <SearchBox clearButtonProps={{
          ariaLabel: 'Clear text',
          styles:{
            root: [
              getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent',outlineColor:focusColor }),
              { height: 'auto'}], 
            
          }
       }}   styles={props => {
          const {theme, underlined, hasFocus} = props;
          return { 
            root: [{ 
              width: 200, 
              marginRight:10, 
              backgroundColor:searchControlColors.Unfocused,
              border: `1px solid ${searchControlColors.UnfocusedBorder}`,
              selectors: {
			          ':hover': {
			            borderColor: searchControlColors.MouseOverBorder,
                  backgroundColor:searchControlColors.MouseOverBackground
			          },
			          [`:hover .ms-SearchBox-iconContainer`]: {
			            color: searchControlColors.MouseOverSearchGlyph,
			          },
              },
             },
              // todo focused states for other
              hasFocus && [
                getInputFocusStyle(focusColor,underlined ? 0 : theme.effects.roundedCorner2, underlined ? 'borderBottom' : 'border'),
                {
                  border: `1px solid ${searchControlColors.FocusedBorder}`,
                  backgroundColor:searchControlColors.FocusedBackground
                }
              ],
            ],
            // gets background color from root
            field: [{
              color:searchControlColors.UnfocusedText,
              selectors:{
                "::selection":{
                  color:searchControlColors.SelectionText,
                  background:searchControlColors.Selection
                },
                ":hover":{
                  color:searchControlColors.MouseOverBackgroundText
                }
              }
              
            }, hasFocus && {color:searchControlColors.FocusedBackgroundText}],
            iconContainer: [{
              color:searchControlColors.SearchGlyph
            }, 
            // no need for this as search glyph not visible when focus
            /*hasFocus && {color:searchControlColors.FocusedSearchGlyph}*/
            ],
            clearButton:[
              {
                selectors: {
                  '&:hover .ms-Button.ms-Button': {
                    backgroundColor: "transparent",
                  },
                  '&:hover .ms-Button-icon': {
                    color: searchControlColors.MouseOverClearGlyph,
                  },
                  '.ms-Button-icon': {
                    color: searchControlColors.ClearGlyph,
                  },
                },
              },
              hasFocus && {
                '.ms-Button-icon': {
                  color:searchControlColors.FocusedClearGlyph,
                },
              }
            ],
            }
        }} iconProps={{iconName:'filter'}} value={filter} onChange={(_,newFilter) => setFilter(newFilter!)}/>
        <Checkbox styles={vsCbStylesFn} label="Toggle btn disabled"  checked={buttonDisabled} onChange={(evt) => {
            setButtonDisabled(!buttonDisabled);
        }}/>
        <Checkbox styles={vsCbStylesFn} label="Coverage running"  checked={coverageRunning} onChange={(evt) => {
            setCoverageRunning(!coverageRunning);
        }}/>

        <Label styles={{
            root:{
                color:environmentColors.ToolWindowText
            }
        }}>{selectedThemeName}</Label>
        
        <ActionButton disabled={buttonDisabled} iconProps={{iconName:"github"}} styles={
            demoActionButtonStyles
        } onClick={nextTheme}>Next theme</ActionButton>
        <ActionButton iconProps={{iconName:"logRemove"}} styles={demoActionButtonStyles}/>


        <ProgressIndicator barHeight={1} percentComplete={percentComplete} styles={ props => {

            return {
                progressTrack:{
                    //can barely see this with blue, cannot see with light or dark
                    backgroundColor : progressBarColors.Background, //could use environmentColors.ToolWindowText
                },
                // might use an accent color
                progressBar:[
                    {
                        backgroundColor: "pink",// // or environmentColors.ToolWindowText  
                    },
                    props.indeterminate && {
                        background:
                        `linear-gradient(to right, ${progressBarColors.IndicatorFill} 0%, ` +
                        `${progressBarColors.IndicatorFill} 50%, ${progressBarColors.IndicatorFill} 100%)`,
                    }
                ]
            }
        }}/>
        
        
        <Slider styles={
            {
                root:{
                    width:200
                },
                slideBox: [
                    getFocusStyle(theme,{borderColor: 'transparent',outlineColor:focusColor}),
                    {
                      
                      selectors: {
                        [`:active .${sliderClassNames.activeSection}`]: {
                          backgroundColor:hoverToolWindowText
                        },
                        [`:hover .${sliderClassNames.activeSection}`]: {
                          backgroundColor:hoverToolWindowText
                        },

                        [`:active .${sliderClassNames.inactiveSection}`]: {
                          backgroundColor:hoverToolWindowText
                        },
                        [`:hover .${sliderClassNames.inactiveSection}`]: {
                          backgroundColor:hoverToolWindowText
                        },

                        [`:active .${sliderClassNames.thumb}`]: {
                          border: `2px solid ${commonControlsColors.ButtonBorderPressed}`,
                        },
                        [`:hover .${sliderClassNames.thumb}`]: {
                          border: `2px solid ${commonControlsColors.ButtonBorderPressed}`,
                        },
                      },
                    },
                  ],
                zeroTick:{
                  background:"red"
                },
                activeSection:{
                  background:environmentColors.ToolWindowText // this is the lhs of the selected value
                },
                inactiveSection:{
                  background:environmentColors.ToolWindowText // this is the rhs
                },
                thumb: [
                  {
                    borderColor: commonControlsColors.ButtonBorder,
                    background: commonControlsColors.Button,
                  },
                ],
                valueLabel:{
                  color:environmentColors.ToolWindowText
                }
      

  
            }
        } showValue value={sliderValue} min={-1} max={3} onChange={num => setSliderValue(num)} valueFormat={value => {
            return "The value";
        }}/>

        <Pivot linkFormat="links" styles={(props) => {
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
                  marginTop:"5px"
                }
            }
            }} 
            getTabId={(itemKey, _) => itemKey} 
            focusZoneProps={{
                isCircularNavigation: true, onFocus: (evt) => {
                var targetId = evt.target.id;
                setSelectedTabKey(targetId);
                }
            }} 
            selectedKey={selectedTabKey}>
            {items}
        </Pivot>
    </div>
}