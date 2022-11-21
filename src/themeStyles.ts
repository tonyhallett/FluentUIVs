import { getFocusStyle, getInputFocusStyle, HighContrastSelector, ICheckboxStyleProps, ICheckboxStyles, ILabelStyleProps, ILinkStyleProps, IModalStyleProps, IPivotStyleProps, IProgressIndicatorStyleProps, IProgressIndicatorStyles, isDark, ISearchBoxStyleProps, IsFocusVisibleClassName, ISliderStyleProps } from "@fluentui/react";
import { VsColors } from "./themeColors";
import { cbGlobalClassNames, sliderClassNames } from "./globalClassNames";
import { getScrollbarStyle } from "./getScrollbarStyle";
import { colorRGBA, getColor, lightenOrDarken } from "./colorHelpers";

export const buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    outlineColor: 'ButtonText', 
};

export function getVsFocusStyle(vsColors:VsColors) {
  return getFocusStyle(null as any, {borderColor:"transparent", outlineColor:vsColors.CommonControlsColors.FocusVisualText})
}

export function getActionButtonStyles(vsColors:VsColors){
    const {CommonControlsColors} = vsColors;
    const actionButtonStyles = {
      root:[
          getFocusStyle(null as any, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent',outlineColor:CommonControlsColors.FocusVisualText }),
          {
              color:CommonControlsColors.ButtonText,
              backgroundColor:CommonControlsColors.Button,
              border:`1px solid ${CommonControlsColors.ButtonBorder}`,
              // todo high contrast
              ":focus":{
                  color:CommonControlsColors.ButtonFocusedText,
                  backgroundColor:CommonControlsColors.ButtonFocused,
                  border:`1px solid ${CommonControlsColors.ButtonBorderFocused}`
              }
          },
      ],
      rootHovered:{
          color:CommonControlsColors.ButtonHoverText, // affects the text
          backgroundColor:CommonControlsColors.ButtonHover,
          border:`1px solid ${CommonControlsColors.ButtonBorderHover}`
      },
      rootDisabled:{
          color:CommonControlsColors.ButtonDisabledText,
          backgroundColor:CommonControlsColors.ButtonDisabled,
          border:`1px solid ${CommonControlsColors.ButtonBorderDisabled}`
      },
      rootPressed:{
          color:CommonControlsColors.ButtonPressedText,
          backgroundColor:CommonControlsColors.ButtonPressed,
          border:`1px solid ${CommonControlsColors.ButtonBorderPressed}`
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

  export function getLinkStyle(props:ILinkStyleProps,vsColors:VsColors){
    const {isDisabled} = props;
    const {EnvironmentColors: environmentColors, CommonControlsColors} = vsColors;
    const focusColor = CommonControlsColors.FocusVisualText;
  
    return {
      root:[{
        color:environmentColors.PanelHyperlink,
        selectors: {
          '.ms-Fabric--isFocusVisible &:focus': {
            // Can't use getFocusStyle because it doesn't support wrapping links
            // https://github.com/microsoft/fluentui/issues/4883#issuecomment-406743543
            // Using box-shadow and outline allows the focus rect to wrap links that span multiple lines
            // and helps the focus rect avoid getting clipped.
            boxShadow: `0 0 0 1px ${focusColor} inset`,
            outline: `none`,
          },
        },
  
      },
      !isDisabled && {
        '&:active:hover':{
          color:environmentColors.PanelHyperlinkPressed,
        },
        '&:hover':{
          color:environmentColors.PanelHyperlinkHover,
        },
        '&:focus': {
          color: environmentColors.PanelHyperlink,
        },
  
      }
    ]
    }}

        // ignoring indetermintate as vs styling does not provide and not having that state
    // visual studio does not differentiate with checked state
    export const vsCbStylesFn = (props:ICheckboxStyleProps,vsColors:VsColors) : ICheckboxStyles => {
      const {CommonControlsColors:commonControlsColors} = vsColors;
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
                  outline: `1px solid ${commonControlsColors.FocusVisualText}`,
              },
            },
      };
  }

  export function getBodyStyles(vsColors:VsColors){
    const {EnvironmentColors} = vsColors;
    return [
      {
          background: EnvironmentColors.ToolWindowBackground,
          selectors:getScrollbarStyle(
            EnvironmentColors.ScrollBarThumbBackground,
            EnvironmentColors.ScrollBarThumbMouseOverBackground,
            EnvironmentColors.ScrollBarThumbPressedBackground,
            EnvironmentColors.ScrollBarBackground,
            EnvironmentColors.ScrollBarArrowBackground,
            EnvironmentColors.ScrollBarArrowMouseOverBackground,
            EnvironmentColors.ScrollBarArrowPressedBackground,
            EnvironmentColors.ScrollBarArrowGlyph,
            EnvironmentColors.ScrollBarArrowGlyphMouseOver,
            EnvironmentColors.ScrollBarArrowGlyphPressed,
            EnvironmentColors.ScrollBarBorder,
            EnvironmentColors.ScrollBarThumbBorder,
            EnvironmentColors.ScrollBarThumbMouseOverBorder,
            EnvironmentColors.ScrollBarThumbPressedBorder,
            EnvironmentColors.ScrollBarThumbGlyphMouseOverBorder,
            EnvironmentColors.ScrollBarThumbGlyphPressedBorder
  
          ),
      },
    ]
  }

  export function getCustomizationStyling(vsColors:VsColors){
    return {
      customizations:{
        scopedSettings:{
          "Modal": {
            styles:(props:IModalStyleProps) => {
              const {EnvironmentColors} = vsColors;
              return {
                main:[{
                  backgroundColor:EnvironmentColors.ToolWindowBackground,
                  borderColor:EnvironmentColors.ToolWindowBorder
                  },
                ],
              }
            }
          },
          "Label":{
            styles:(props:ILabelStyleProps) => {
                return {
                  root:{
                    color:vsColors.EnvironmentColors.ToolWindowText
                  }
                }
             
            }
          },
          // necessary as Pivot renders an ActionButton
          "MyActionButton":{
            styles:getActionButtonStyles(vsColors)
          },
          "Link":{
            styles:(props:ILinkStyleProps) => {
              return getLinkStyle(props,vsColors);
            }
          },
          "Checkbox":{
            styles:(props:ICheckboxStyleProps) => {
              return vsCbStylesFn(props,vsColors)
            }
          },
          "ProgressIndicator":{
            styles:(props:IProgressIndicatorStyleProps) => {
              const {ProgressBarColors : progressBarColors, EnvironmentColors:environmentColors} = vsColors;
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
            }
          },
          "Pivot":{
            styles:(props:IPivotStyleProps) => {
              const {EnvironmentColors:environmentColors, CommonControlsColors, TreeViewColors} = vsColors;
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
                        backgroundColor:environmentColors.ToolWindowBackground,
                        selectors: {
                            [`.${IsFocusVisibleClassName} &:focus`]: {
                              outline: `1px solid ${CommonControlsColors.FocusVisualText}`,
                            },
                            
                            ':hover': {
                                //backgroundColor: commonControlsColors.InnerTabInactiveHoverBackground,
                                //color: commonControlsColors.InnerTabInactiveHoverText,
                                // might only supply if rootIsTabs
                                //border:`1px solid ${commonControlsColors.InnerTabInactiveHoverBorder}`,
                                
                                color: environmentColors.ToolWindowText,// environmentColors.PanelHyperlinkHover,
                                backgroundColor:environmentColors.ToolWindowBackground
                            },
                            ':active': {
                                //backgroundColor: commonControlsColors.InnerTabActiveBackground,
                                //color: commonControlsColors.InnerTabActiveText,
                                // might only supply if rootIsTabs
                                //border:`1px solid ${commonControlsColors.InnerTabActiveBorder}`,
                                
                                //color: environmentColors.PanelHyperlinkPressed,
                                backgroundColor:environmentColors.ToolWindowBackground
                            },
            

                        }
  
                    },
                ],
                linkIsSelected:[
                    {
                        selectors: {
                            ':before': {
                                //TreeView.SelectedItemInactive commonControlsColors.InnerTabActiveBorder, 
                                backgroundColor: TreeViewColors.SelectedItemInactiveText, 
                            },
                        }
                    }
                ],
              }
            }
          },
          "Slider": {
            styles:(props:ISliderStyleProps) => {
              const {CommonControlsColors, EnvironmentColors} = vsColors
              const focusStyle = getVsFocusStyle(vsColors);

              const toolWindowTextColor = getColor(EnvironmentColors.ToolWindowText);
              const toolWindowTextDark = isDark(toolWindowTextColor);
              const hoverToolWindowTextShade = lightenOrDarken(toolWindowTextColor,0.4,toolWindowTextDark); 
              const hoverToolWindowText=  colorRGBA(hoverToolWindowTextShade);
              return {
                root:{
                    width:200
                },
                slideBox: [
                    focusStyle,
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
                          border: `2px solid ${CommonControlsColors.ButtonBorderPressed}`,
                        },
                        [`:hover .${sliderClassNames.thumb}`]: {
                          border: `2px solid ${CommonControlsColors.ButtonBorderPressed}`,
                        },
                      },
                    },
                  ],
                zeroTick:{
                  background:"red"
                },
                activeSection:{
                  background:EnvironmentColors.ToolWindowText // this is the lhs of the selected value
                },
                inactiveSection:{
                  background:EnvironmentColors.ToolWindowText // this is the rhs
                },
                thumb: [
                  {
                    borderColor: CommonControlsColors.ButtonBorder,
                    background: CommonControlsColors.Button,
                  },
                ],
                valueLabel:{
                  color:EnvironmentColors.ToolWindowText
                }
              }
            }
          },
          "SearchBox" : {
            styles:(props:ISearchBoxStyleProps) => {
              const {theme, underlined, hasFocus} = props;
              const {SearchControlColors, CommonControlsColors} = vsColors;
            return { 
              root: [{ 
                backgroundColor:SearchControlColors.Unfocused,
                border: `1px solid ${SearchControlColors.UnfocusedBorder}`,
                selectors: {
                  ':hover': {
                    borderColor: SearchControlColors.MouseOverBorder,
                    backgroundColor:SearchControlColors.MouseOverBackground
                  },
                  [`:hover .ms-SearchBox-iconContainer`]: {
                    color: SearchControlColors.MouseOverSearchGlyph,
                  },
                },
              },
                // todo focused states for other
                hasFocus && [
                  getInputFocusStyle(CommonControlsColors.FocusVisualText,underlined ? 0 : theme.effects.roundedCorner2, underlined ? 'borderBottom' : 'border'),
                  {
                    border: `1px solid ${SearchControlColors.FocusedBorder}`,
                    backgroundColor:SearchControlColors.FocusedBackground
                  }
                ],
              ],
              // gets background color from root
              field: [{
                color:SearchControlColors.UnfocusedText,
                selectors:{
                  "::selection":{
                    color:SearchControlColors.SelectionText,
                    background:SearchControlColors.Selection
                  },
                  ":hover":{
                    color:SearchControlColors.MouseOverBackgroundText
                  }
                }
                
              }, hasFocus && {color:SearchControlColors.FocusedBackgroundText}],
              iconContainer: [{
                color:SearchControlColors.SearchGlyph
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
                      color: SearchControlColors.MouseOverClearGlyph,
                    },
                    '.ms-Button-icon': {
                      color: SearchControlColors.ClearGlyph,
                    },
                  },
                },
                hasFocus && {
                  '.ms-Button-icon': {
                    color:SearchControlColors.FocusedClearGlyph,
                  },
                }
              ],
              }
            }
          },
          "Percentage" : {
            styles:(props:{percentage:number | null}) => {
              const {percentage} = props;
              const {EnvironmentColors} = vsColors;
              const backgroundColor = percentage === null ? "transparent" : EnvironmentColors.VizSurfaceGreenMedium;
              return {
                progressBar: {
                  backgroundColor,
                  color: "transparent"
                },
                progressTrack: {
                  backgroundColor: "transparent",
                  color: "transparent"
                },
                root: {
                  color: "transparent"
                },
              }
            }
          }
          
        },
        settings:{
  
        },
        
      },
      vsColors
    }
  }