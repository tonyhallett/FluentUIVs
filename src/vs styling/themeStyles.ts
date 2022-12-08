import { createTheme, FontClassNames, getFocusStyle, getInputFocusStyle, HighContrastSelector, ICheckboxStyleProps, ICheckboxStyles, ICustomizations, ICustomizerContext, IDetailsColumnStyleProps, IDetailsHeaderStyleProps, IDetailsHeaderStyles, IDetailsRowStyleProps, IDropdownStyleProps, IDropdownStyles, IGroupHeaderStyleProps, ILabelStyleProps, ILinkStyleProps, IModalStyleProps, IPivotStyleProps, IPivotStyles, IProgressIndicatorStyleProps, IProgressIndicatorStyles, IRawStyle, isDark, ISearchBoxStyleProps, ISearchBoxStyles, IsFocusVisibleClassName, ISliderStyleProps, ISliderStyles, ZIndexes } from "@fluentui/react";
import { VsColors } from "./themeColors";
import { cbGlobalClassNames, dropDownClassNames, sliderClassNames } from "./globalClassNames";
//import { getScrollbarStyle } from "./getScrollbarStyle";
import { colorRGBA, getColor, lightenOrDarken } from "./colorHelpers";
import { DeepPartial } from "@fluentui/merge-styles";
import { CSSProperties, SVGAttributes } from "react";
const reactToCSS = require('react-style-object-to-css')

export const actionButtonHighContrastFocus = {
    left: -1,
    top: -1,
    bottom: -1,
    right: -1,
    outlineColor: 'ButtonText', 
};

function getVsFocusStyle(vsColors:VsColors) {
  return getFocusStyle(null as any, {borderColor:"transparent", outlineColor:vsColors.CommonControlsColors.FocusVisualText})
}

export function getActionButtonStyles(vsColors:VsColors){
    const {CommonControlsColors} = vsColors;
    const actionButtonStyles = {
      root:[
          getFocusStyle(null as any, { inset: 1, highContrastStyle: actionButtonHighContrastFocus, borderColor: 'transparent',outlineColor:CommonControlsColors.FocusVisualText }),
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

type BackgroundColor = CSSProperties['backgroundColor'];
type BorderColor = CSSProperties['borderColor'];
type SvgFill = SVGAttributes<SVGSVGElement>['fill']

function getScrollbarStyle(
  thumbColor: BackgroundColor,
  thumbHoverColor: BackgroundColor,
  thumbActiveColor: BackgroundColor,
  trackColor: BackgroundColor,
  arrowBackgroundColor: BackgroundColor,
  arrowBackgroundHoverColor: BackgroundColor,
  arrowBackgroundActiveColor: BackgroundColor,
  arrowGlyphBackgroundColor: SvgFill,
  arrowGlyphBackgroundHoverColor: SvgFill,
  arrowGlyphBackgroundActiveColor: SvgFill,
  scrollBarBorderColor:  BorderColor,
  scrollBarThumbBorderColor: BorderColor,
  scrollBarThumbBorderHoverColor: BorderColor,
  scrollBarThumbBorderActiveColor: BorderColor,
  arrowBorderHoverColor: BorderColor,
  arrowBorderActiveColor: BorderColor,
  scrollbarSize = 18,
  thumbSize = 8,
) {
  const hide = (scrollbarSize - thumbSize)/2;
  const arrowShift = (scrollbarSize - thumbSize/2)/2;

  function getArrow(points: string, fill: SvgFill) {
    return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${fill}'><polygon points='${points}'/></svg>")`;
  }

  function getArrowStyles(isHorizontal: boolean) {
    const vOrH = isHorizontal ? "horizontal" : "vertical";
    const points: [string, string] = isHorizontal ? ["0,50 50,100 50,0", "0,0 0,100 50,50"] : ["50,00 0,50 100,50", "0,0 100,0 50,50"];
    return {
      // left or up
      //
      [`::-webkit-scrollbar-button:single-button:${vOrH}:decrement`]: {
        backgroundPosition: isHorizontal ? `${arrowShift}px center` : `center ${arrowShift}px`,
        backgroundImage: getArrow(points[0], arrowGlyphBackgroundColor)
      },
      [`::-webkit-scrollbar-button:single-button:${vOrH}:decrement:hover`]: {
        backgroundImage: getArrow(points[0], arrowGlyphBackgroundHoverColor)
      },
      [`::-webkit-scrollbar-button:single-button:vertical:decrement:active`]: {
        backgroundImage: getArrow(points[0], arrowGlyphBackgroundActiveColor)
      },

      // right or down
      [`::-webkit-scrollbar-button:single-button:${vOrH}:increment`]: {
        
        backgroundPosition: isHorizontal ? `${arrowShift}px center` : `center ${arrowShift}px`,
        backgroundImage: getArrow(points[1], arrowGlyphBackgroundColor)
      },
      [`::-webkit-scrollbar-button:single-button:${vOrH}:increment:hover`]: {
        backgroundImage: getArrow(points[1], arrowGlyphBackgroundHoverColor)
      },
      [`::-webkit-scrollbar-button:single-button:${vOrH}:increment:active`]: {
        backgroundImage: getArrow(points[1], arrowGlyphBackgroundActiveColor)
      }
    };
  }

  function getBorder(borderColor: BorderColor) {
    return {};
    /* return {
      // box shadow ?
      border:`1px solid ${borderColor}`
    } */
  }


  return {
    "::-webkit-scrollbar": {
      width: `${scrollbarSize}px`,
      height: `${scrollbarSize}px`,
    },
    "::-webkit-scrollbar-corner": {
      forcedColorAdjust:"none",
      backgroundColor: trackColor,
      ...getBorder(scrollBarBorderColor)
    },
    // the track (progress bar) of the scrollbar, where there is a gray bar on top of a white bar
    "::-webkit-scrollbar-track": {
      forcedColorAdjust:"none",
      backgroundColor: trackColor,
      ...getBorder(scrollBarBorderColor)
    },


    // what press to slide
    "::-webkit-scrollbar-thumb": {
      forcedColorAdjust:"none",
      backgroundColor: thumbColor, // necessary even when styling differently
    },
    "::-webkit-scrollbar-thumb:vertical": {
      //...getBorder(scrollBarThumbBorderColor)
      borderLeft: `${hide}px solid ${trackColor}`,
      borderRight: `${hide}px solid ${trackColor}`,
      backgroundClip: "content-box",
    },
    "::-webkit-scrollbar-thumb:horizontal": {
      //...getBorder(scrollBarThumbBorderColor)
      borderTop: `${hide}px solid ${trackColor}`,
      borderBottom: `${hide}px solid ${trackColor}`,
      backgroundClip: "content-box",
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: thumbHoverColor,
      //...getBorder(scrollBarThumbBorderHoverColor)
    },
    "::-webkit-scrollbar-thumb:active": {
      backgroundColor: thumbActiveColor,
      //...getBorder(scrollBarThumbBorderActiveColor)
    },

    //the buttons on the scrollbar (arrows pointing upwards and downwards that scroll one line at a time
    "::-webkit-scrollbar-button:single-button": {
      forcedColorAdjust:"none",
      height:`${scrollbarSize}px`,
      width:`${scrollbarSize}px`,
      backgroundColor: arrowBackgroundColor,
      ...getBorder(scrollBarBorderColor),
      display: 'block',
      backgroundSize: `${thumbSize}px`,//***************************************************************************************
      backgroundRepeat: 'no-repeat'
    },
    "::-webkit-scrollbar-button:single-button:hover": {
      backgroundColor: arrowBackgroundHoverColor,
      ...getBorder(arrowBorderHoverColor)
    },
    "::-webkit-scrollbar-button:single-button:active": {
      backgroundColor: arrowBackgroundActiveColor,
      ...getBorder(arrowBorderActiveColor)
    },
    ...getArrowStyles(true),
    ...getArrowStyles(false)
    // the part of the track (progress bar) not covered by the handle.
    /* "::-webkit-scrollbar-track-piece":{
        backgroundColor:"green", ***************** this seems to do the same as track ?
    }, */
    //the bottom corner of the scrollbar, where both horizontal and vertical scrollbars meet. This is often the bottom-right corner of the browser window
    /* "::-webkit-scrollbar-corner":{
        backgroundColor:"purple"
    } */
  };
}


const getVsScrollbarStyle = (vsColors:VsColors) => {
  const {EnvironmentColors} = vsColors;

  return getScrollbarStyle(
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
  );
}

export const addScrollBarStyles = (vsColors:VsColors) => {
  const id = "scrollbarStyles";
  const previousStyle = document.getElementById(id);
  if(previousStyle){
    previousStyle.remove();
  }
  const style = document.createElement("style");
  style.id = id;
  const scrollBarStyle = getVsScrollbarStyle(vsColors);

  let styleHTML = "";

  for(const [key,value] of Object.entries(scrollBarStyle)){
    styleHTML += `${key}{ ${reactToCSS(value)}}`
  }
  
  style.innerHTML = styleHTML;
  document.head.append(style);
}

  export function getBodyStyles(vsColors:VsColors){
    const {EnvironmentColors} = vsColors;
    return [
      {
          background: EnvironmentColors.ToolWindowBackground,
          /* selectors:getScrollbarStyle(
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
  
          ), */
      },
    ]
  }

const getFontStyle = (fontFamily:string,fontSize:number) : IRawStyle => {
  if(fontFamily.indexOf(" ")!== -1){
    fontFamily = `'${fontFamily}'`;
  }
  return {
    fontFamily: fontFamily,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    fontSize: `${fontSize}px`,
    fontWeight: 400,
  };

}

const overrideHighContrast = (themeNotHighContrast:boolean,...propertyNames:Array<keyof CSSProperties>) => {
  if(themeNotHighContrast){
    // to type
    const removedProperties :any= {};
    propertyNames.forEach(propertyName => removedProperties[propertyName] = false);

    return {
      selectors:{
        [HighContrastSelector]:removedProperties
      }
    }
  }

  return {};
}

export class VsCustomizerContext implements ICustomizerContext {
  constructor(
    private vsColors:VsColors,
    private rowBackgroundFromTreeViewColors:boolean,
    private rowTextFromTreeViewColors:boolean,
    private headerColorsForHeaderText:boolean,
    private surroundTabs:boolean,
    private fontSize:number,
    private fontName:string,
    private themeIsHighContrast:boolean
    ){
      const consistentFontSize = getFontStyle(fontName,fontSize);
      this.customizations.settings.theme = createTheme({
        fonts:{
          large:consistentFontSize,
          medium:consistentFontSize,
          mediumPlus:consistentFontSize,
          mega:consistentFontSize,
          small:consistentFontSize,
          smallPlus:consistentFontSize
        }
      })
  }

  getNext(
    vsColors:VsColors,
    rowBackgroundFromTreeViewColors:boolean,
    rowTextFromTreeViewColors:boolean,
    headerColorsForHeaderText:boolean,
    surroundTabs:boolean,
    fontSize:number,
    fontName:string,
    themeIsHighContrast:boolean  
  ){
    if(vsColors === this.vsColors && 
      rowBackgroundFromTreeViewColors === this.rowBackgroundFromTreeViewColors &&
      rowTextFromTreeViewColors === this.rowTextFromTreeViewColors &&
      headerColorsForHeaderText === this.headerColorsForHeaderText &&
      surroundTabs === this.surroundTabs &&
      fontSize === this.fontSize &&
      fontName === this.fontName &&
      themeIsHighContrast === this.themeIsHighContrast

    ){
      return this;
    }
    return new VsCustomizerContext(
      vsColors, 
      rowBackgroundFromTreeViewColors, 
      rowTextFromTreeViewColors,
      headerColorsForHeaderText,
      surroundTabs, 
      fontSize,
      fontName,
      themeIsHighContrast
      );
  }

  customizations: ICustomizations = {
    scopedSettings:{
      "Dropdown":{
        styles:(dropDownStyleProps:IDropdownStyleProps):DeepPartial<IDropdownStyles> => {
          const {isRenderingPlaceholder, disabled,isOpen} = dropDownStyleProps;
          const {EnvironmentColors, CommonControlsColors} = this.vsColors;
          const focusColor = CommonControlsColors.FocusVisualText;
          const themeIsNotHighContrast = !this.themeIsHighContrast;
          const overrideHighContrastBorderColor = overrideHighContrast(themeIsNotHighContrast,"borderColor");
          const overrideHighContrastColor = overrideHighContrast(themeIsNotHighContrast,"color");
          const overrideHighContrastItemAndTitleStateMixin = overrideHighContrast(
            themeIsNotHighContrast,
            "backgroundColor",
            "borderColor",
            "color"
            )
          const getDropDownItemSelectors = (isSelected:boolean) => {
            const dropDownItemSelectors =  {
              selectors: {
                // when hover an item it is also focused
                '&:hover:focus': [
                  {
                    color: CommonControlsColors.ComboBoxListItemTextHover,//override
                    backgroundColor:CommonControlsColors.ComboBoxListItemBackgroundHover,//override
                    borderColor: CommonControlsColors.ComboBoxListItemBorderHover
                  },
                  overrideHighContrastItemAndTitleStateMixin
                ],
                // ActionButton supplies a hover
                '&:hover': [
                  {
                    color: CommonControlsColors.ComboBoxListItemTextHover,
                    backgroundColor: CommonControlsColors.ComboBoxListItemBackgroundHover,
                    borderColor: CommonControlsColors.ComboBoxListItemBorderHover,
                  },
                  overrideHighContrastColor
                ],
                '&:focus': [
                  {
                    color: CommonControlsColors.ComboBoxListItemTextHover,
                    backgroundColor: CommonControlsColors.ComboBoxListItemBackgroundHover,
                    borderColor: CommonControlsColors.ComboBoxListItemBorderHover
                  },
                  overrideHighContrastItemAndTitleStateMixin
                ],
                // contrary to https://learn.microsoft.com/en-us/visualstudio/extensibility/ux-guidelines/shared-colors-for-visual-studio?view=vs-2022#drop-downs-and-combo-boxes
                // ComboBoxListItemTextPressed ComboBoxListItemTextFocused and more
                '&:active': [
                  {
                    color: CommonControlsColors.ComboBoxListItemTextHover,//override
                    backgroundColor: CommonControlsColors.ComboBoxListItemBackgroundHover,//override
                    borderColor: CommonControlsColors.ComboBoxListItemBorderHover,
                  },
                  overrideHighContrastItemAndTitleStateMixin
                ],
                ...(themeIsNotHighContrast ? {
                  [HighContrastSelector]:{
                    border:false as any
                  }
                } : {})
              },
            };
            return dropDownItemSelectors;
        }

        const dropDownItemHighContrastFocus:any = themeIsNotHighContrast ? {
          left: false,
          top: false,
          bottom: false,
          right: false,
          outlineColor: this.vsColors.CommonControlsColors.FocusVisualText, 
        } : {
          left: 1,
          top: 1,
          bottom: 1,
          right: 1,
          outlineColor: 'ButtonText', 
      };;

        const dropDownItemFocusStyle = getFocusStyle(
          null as any, 
          { 
            inset: 1, 
            highContrastStyle: dropDownItemHighContrastFocus, 
            borderColor: 'transparent', 
            outlineColor:focusColor 
          }
        );

        const dropDownFocusStyle = getFocusStyle(null as any, {borderColor:"transparent", outlineColor:this.vsColors.CommonControlsColors.FocusVisualText, inset: -1})
        return {
          label:{
            color:EnvironmentColors.ToolWindowText
          },
          dropdown:[{
            color:isOpen ? CommonControlsColors.ComboBoxTextPressed : CommonControlsColors.ComboBoxText,
            selectors: {
              // title --------------------------------------------------------
              ['&:hover .' + dropDownClassNames.title]: [
                {
                  color:isOpen ? CommonControlsColors.ComboBoxTextPressed : CommonControlsColors.ComboBoxTextHover,
                  backgroundColor: isOpen ? CommonControlsColors.ComboBoxBackgroundPressed : CommonControlsColors.ComboBoxBackgroundHover,
                  borderColor: isOpen ? CommonControlsColors.ComboBoxBorderPressed : CommonControlsColors.ComboBoxBorderHover

                },
                overrideHighContrastBorderColor
              ],
              ['&:focus .' + dropDownClassNames.title]: [
                !disabled && {
                  color:CommonControlsColors.ComboBoxTextFocused,//override
                  borderColor:CommonControlsColors.ComboBoxBorderFocused,
                  backgroundColor:CommonControlsColors.ComboBoxBackgroundFocused
                },
                overrideHighContrastColor
              ],
              ['&:focus:after']: [
                {
                  border: 'none'
                },
                overrideHighContrastColor
              ],
              ['&:hover:focus .' + dropDownClassNames.title]: [
                {
                  color:isOpen ? CommonControlsColors.ComboBoxTextPressed : CommonControlsColors.ComboBoxTextHover,
                  backgroundColor: isOpen ? CommonControlsColors.ComboBoxBackgroundPressed : CommonControlsColors.ComboBoxBackgroundHover,
                  borderColor: isOpen ? CommonControlsColors.ComboBoxBorderPressed : CommonControlsColors.ComboBoxBorderHover
                },
              ],
              ['&:active .' + dropDownClassNames.title]: [
                !disabled && {
                  color:CommonControlsColors.ComboBoxTextPressed,
                  backgroundColor:CommonControlsColors.ComboBoxBackgroundPressed,
                },
                { borderColor: CommonControlsColors.ComboBoxBorderPressed},
                overrideHighContrastBorderColor
              ],

              // placeholder to do if use a placeholder

              //caretDown ----------------------------------------------------------------------------------------
              [`&:hover .${dropDownClassNames.caretDown}`]: !disabled && {
                color:isOpen ? CommonControlsColors.ComboBoxGlyphPressed : CommonControlsColors.ComboBoxGlyphHover,
                backgroundColor: isOpen ? CommonControlsColors.ComboBoxGlyphBackgroundPressed :CommonControlsColors.ComboBoxGlyphBackgroundHover,
                borderColor: isOpen ? CommonControlsColors.ComboBoxSeparatorPressed: CommonControlsColors.ComboBoxSeparatorHover
              
              },
              [`&:focus .${dropDownClassNames.caretDown}`]: [
                !disabled && {
                  color:CommonControlsColors.ComboBoxGlyphFocused,
                  backgroundColor:CommonControlsColors.ComboBoxGlyphBackgroundFocused,
                  borderColor:CommonControlsColors.ComboBoxSeparatorFocused
                },
                overrideHighContrastColor
              ],
              [`&:hover:focus .${dropDownClassNames.caretDown}`]: {
                color:isOpen ? CommonControlsColors.ComboBoxGlyphPressed : CommonControlsColors.ComboBoxGlyphHover,
                backgroundColor: isOpen ? CommonControlsColors.ComboBoxGlyphBackgroundPressed :CommonControlsColors.ComboBoxGlyphBackgroundHover,
                borderColor: isOpen ? CommonControlsColors.ComboBoxSeparatorPressed: CommonControlsColors.ComboBoxSeparatorHover
              
              },
              

              [`&:active .${dropDownClassNames.caretDown}`]: !disabled && {
                color:CommonControlsColors.ComboBoxGlyphPressed,
                backgroundColor:CommonControlsColors.ComboBoxGlyphBackgroundPressed,
                borderColor:CommonControlsColors.ComboBoxSeparatorPressed
              },

    
            },
          },dropDownFocusStyle],

          callout:[
            overrideHighContrast(themeIsNotHighContrast,"borderWidth","borderStyle","borderColor"),
            {
            
            selectors: {
              ['.ms-Callout-main']: { 
                border: `1px solid ${CommonControlsColors.ComboBoxListBorder}`,
                backgroundColor:CommonControlsColors.ComboBoxListBackground,
                boxShadow:`0 3.2px 7.2px 0 ${CommonControlsColors.ComboBoxListBackgroundShadow}, 0 0.6px 1.8px 0 ${CommonControlsColors.ComboBoxListBackgroundShadow}`
              },
            },
          }],
          dropdownItem:[
            {
              color:CommonControlsColors.ComboBoxListItemText,
              backgroundColor:CommonControlsColors.ComboBoxListBackground
            }, 
            getDropDownItemSelectors(false),
            dropDownItemFocusStyle,
            overrideHighContrastBorderColor // ActionButton
          ],
          dropdownItemSelected:[
              {
                backgroundColor:CommonControlsColors.ComboBoxListBackground,
                color: CommonControlsColors.ComboBoxListItemText
            },
            getDropDownItemSelectors(true),
            dropDownItemFocusStyle,
            overrideHighContrastItemAndTitleStateMixin,
            overrideHighContrastBorderColor // ActionButton
          ],
          dropdownItemHeader:overrideHighContrastColor,
          dropdownItemHeaderHidden:overrideHighContrastColor,
          title:[
              {
              backgroundColor:isOpen ? CommonControlsColors.ComboBoxBackgroundPressed : CommonControlsColors.ComboBoxBackground,//override
              borderColor:isOpen ? CommonControlsColors.ComboBoxBorderPressed : CommonControlsColors.ComboBoxBorder//override
            }, 
            isRenderingPlaceholder && {color:EnvironmentColors.ControlEditHintText} //override
          ],
          caretDown:{
            color:isOpen ? CommonControlsColors.ComboBoxGlyphPressed : CommonControlsColors.ComboBoxGlyph,
            borderLeft:`1px solid ${isOpen? CommonControlsColors.ComboBoxSeparatorPressed : CommonControlsColors.ComboBoxSeparator}`,
            backgroundColor:isOpen ? CommonControlsColors.ComboBoxGlyphBackgroundPressed : CommonControlsColors.ComboBoxGlyphBackground,
            paddingLeft:"5px",
            paddingRight:"5px"
          },
          caretDownWrapper:{
            right:1
          },

        }
        }
      },
      "Modal": {
        styles:(props:IModalStyleProps) => {
          const {EnvironmentColors} = this.vsColors;
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
                color:this.vsColors.EnvironmentColors.ToolWindowText
              }
            }
         
        }
      },
      // necessary as Pivot renders an ActionButton
      "MyActionButton":{
        styles:getActionButtonStyles(this.vsColors)
      },
      "Link":{
        styles:(props:ILinkStyleProps) => {
          return getLinkStyle(props,this.vsColors);
        }
      },
      "Checkbox":{
        styles:(props:ICheckboxStyleProps) => {
          return vsCbStylesFn(props,this.vsColors)
        }
      },
      "ProgressIndicator":{
        styles:(props:IProgressIndicatorStyleProps) => {
          const {ProgressBarColors : progressBarColors, EnvironmentColors:environmentColors} = this.vsColors;
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
        styles:(pivotStyleProps:IPivotStyleProps):DeepPartial<IPivotStyles>=> {
          const {linkFormat, } = pivotStyleProps;
          const rootIsTabs = linkFormat === 'tabs';
          const {EnvironmentColors:environmentColors, CommonControlsColors} = this.vsColors;
          const themeNotHighContrast = !this.themeIsHighContrast;

          const getLinkStyles = (isLinkInOverflowMenu: boolean = false) => {
            return [
              {
                color:environmentColors.ToolWindowText,
                backgroundColor:environmentColors.ToolWindowBackground,
                selectors: {
                  ':hover': {
                    color: environmentColors.ToolWindowText,
                    backgroundColor: environmentColors.ToolWindowBackground,
                    ...overrideHighContrast(themeNotHighContrast,"color")
                  },
                  ':active': {
                    color: environmentColors.ToolWindowText,
                    backgroundColor: environmentColors.ToolWindowBackground,
                  },
                },
              },
              !isLinkInOverflowMenu && [
                {
                  selectors:{
                    [`.${IsFocusVisibleClassName} &:focus`]: {
                      outline: `1px solid ${CommonControlsColors.FocusVisualText}`,
                    },
                  }
                },
                overrideHighContrast(themeNotHighContrast,"borderColor"),
                
                rootIsTabs && [{
                  color:environmentColors.ToolWindowTabText,
                  backgroundColor:environmentColors.ToolWindowTabGradientBegin,
                  border:`1px solid ${environmentColors.ToolWindowTabBorder}`,
                  selectors:{
                    '&:hover, &:focus': {
                      color: environmentColors.ToolWindowTabMouseOverText,
                      backgroundColor:environmentColors.ToolWindowTabMouseOverBackgroundBegin,
                      border:`1px solid ${environmentColors.ToolWindowTabMouseOverBorder}`,
                    },
                    '&:active, &:hover': {
                      color: environmentColors.ToolWindowTabMouseOverText,
                      backgroundColor:environmentColors.ToolWindowTabMouseOverBackgroundBegin,
                      border:`1px solid ${environmentColors.ToolWindowTabMouseOverBorder}`,
                    },
                    [`&.is-selected`]: {
                      color:environmentColors.ToolWindowTabSelectedText,
                      backgroundColor:environmentColors.ToolWindowTabSelectedTab,
                      borderTop:`1px solid ${environmentColors.ToolWindowTabSelectedBorder}`,
                      borderLeft:`1px solid ${environmentColors.ToolWindowTabSelectedBorder}`,
                      borderRight:`1px solid ${environmentColors.ToolWindowTabSelectedBorder}`,
                      borderBottom:`0px solid`,
                      selectors: {
                        ':hover': {
                          color: environmentColors.ToolWindowTabSelectedText,
                          backgroundColor:environmentColors.ToolWindowTabSelectedTab,
                          borderTop:`1px solid ${environmentColors.ToolWindowTabSelectedBorder}`,
                          borderLeft:`1px solid ${environmentColors.ToolWindowTabSelectedBorder}`,
                          borderRight:`1px solid ${environmentColors.ToolWindowTabSelectedBorder}`,
                          borderBottom:`0px solid`,
                          selectors:{
                            ...(themeNotHighContrast ? {
                          
                            }:{
                              [HighContrastSelector]: {
                                color:'HighlightText',
                                backgroundColor:'Highlight',
                                borderWidth:'0px'
                              }
                            })
                          }
                        },
                        '&:active': {
                          color: environmentColors.ToolWindowTabSelectedActiveText,
                          backgroundColor:environmentColors.ToolWindowTabSelectedTab,
                        },
                        ...(themeNotHighContrast ? {
                          
                        }:{
                          [HighContrastSelector]: {
                            borderWidth:"0px"
                          }
                        }),
                        ...(themeNotHighContrast ? {
                            [HighContrastSelector]: {
                              fontWeight:false as any,
                              color: false as any,
                              background: false as any,
                            } 
                        }:{}),
                      },
                    },
                  }
                }]
              ]
            ]
          }

          return {
            root:{

            },
            link:getLinkStyles(),
            linkIsSelected:{
              selectors: {
                ':before': {
                  backgroundColor: environmentColors.ToolWindowText,
                  selectors: {
                    ...(themeNotHighContrast ? {
                      [HighContrastSelector]: {
                        backgroundColor: false as any,
                    }}:{})
                  },
                },
                ...(themeNotHighContrast ? 
                  {
                    [HighContrastSelector]: {
                      color: false as any,
                    }
                  }:{}),
              },
            },
            }
          }


          
      },
      "Slider": {
        styles:():DeepPartial<ISliderStyles> => {
          const {CommonControlsColors, EnvironmentColors} = this.vsColors
          const focusStyle = getVsFocusStyle(this.vsColors);

          const toolWindowTextColor = getColor(EnvironmentColors.ToolWindowText);
          const toolWindowTextDark = isDark(toolWindowTextColor);
          const hoverToolWindowTextShade = lightenOrDarken(toolWindowTextColor,0.4,toolWindowTextDark); 
          const hoverToolWindowText =  colorRGBA(hoverToolWindowTextShade);
          const themeNotHighContrast = !this.themeIsHighContrast;

          
          const overrideHighContrastBackgroundColor = overrideHighContrast(themeNotHighContrast,"backgroundColor");
          const overrideHighContrastBorderColor = overrideHighContrast(themeNotHighContrast,"borderColor");

          return {
            slideBox: [
                focusStyle,
                {
                  selectors: {
                    [`:active .${sliderClassNames.activeSection}`]: {
                      backgroundColor:hoverToolWindowText,
                      ...overrideHighContrastBackgroundColor
                    },
                    [`:hover .${sliderClassNames.activeSection}`]: {
                      backgroundColor:hoverToolWindowText,
                      ...overrideHighContrastBackgroundColor
                    },
          
                    [`:active .${sliderClassNames.inactiveSection}`]: {
                      backgroundColor:hoverToolWindowText,
                      selectors:{
                        [HighContrastSelector]:{
                        ...(themeNotHighContrast ? {
                          border: false as any,
                        } : {
                          background:"WindowText", // bizarrely not supplied by base 
                          border : false as any,
                        })
                        }
                      },
                     
                    },
                    [`:hover .${sliderClassNames.inactiveSection}`]: {
                      backgroundColor:hoverToolWindowText,
                      selectors:{
                        [HighContrastSelector]:{
                        ...(themeNotHighContrast ? {
                          border: false as any,
                        } : {
                          background:"WindowText", // bizarrely not supplied by base 
                          border : false as any,
                        })
                        }
                      },
                      ...overrideHighContrastBorderColor
                    },
          
                    
                    [`:active .${sliderClassNames.thumb}`]: {
                      border: `2px solid ${CommonControlsColors.ButtonBorderPressed}`,
                      ...overrideHighContrastBorderColor
                    },
                    [`:hover .${sliderClassNames.thumb}`]: {
                      border: `2px solid ${CommonControlsColors.ButtonBorderHover}`,
                      ...overrideHighContrastBorderColor
                    },
                  },
                },
              ],
            
            activeSection:{ //*********** This has messed up  */
              background:EnvironmentColors.ToolWindowText, // this is the lhs of the selected value,
              borderRadius:"4px 0px 0px 4px",
              selectors:{
                [HighContrastSelector]:{
                ...(themeNotHighContrast ? {
                  backgroundColor : false as any
                } : {})
                }
              },
              
            },
            inactiveSection:{
              background:EnvironmentColors.ToolWindowText, // this is the rhs
              borderRadius:"0px 4px 4px 0px",
              selectors:{
                [HighContrastSelector]:{
                ...(themeNotHighContrast ? {
                  border: false as any,
                } : {
                  background:"WindowText", // bizarrely not supplied by base 
                  border : false as any,
                })
                }
              },
            },
            thumb: [
              {
                borderColor: CommonControlsColors.ButtonBorder,
                background: CommonControlsColors.Button,
                selectors:{
                  [HighContrastSelector]:{
                    ...(themeNotHighContrast ? {} : {
                      borderColor:"transparent",
                      background:"WindowText"
                    })
                  }
                }
              },
            ],
            valueLabel:{
              color:EnvironmentColors.ToolWindowText,
              selectors:{
                [HighContrastSelector]:{
                  color:themeNotHighContrast ? EnvironmentColors.ToolWindowText : "WindowText"
                }
              }
            }
          }
        }
      },
      "SearchBox" : {
        styles:(searchBoxStyleProps:ISearchBoxStyleProps):DeepPartial<ISearchBoxStyles>=> {
          const {theme, underlined, hasFocus} = searchBoxStyleProps;
          const {SearchControlColors, CommonControlsColors} = this.vsColors;
          const themeNotHighContrast = !this?.themeIsHighContrast;

        return { 
          root: [
            { 
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
            themeNotHighContrast && {
              selectors:{
                [HighContrastSelector]:{
                  borderColor:false as any
                },
                ':hover':{
                  selectors:{
                    [HighContrastSelector]:{
                      borderColor:false as any
                    }
                  }
                }
              }
            },
            // todo focused states for other
            hasFocus && [
              getInputFocusStyle(CommonControlsColors.FocusVisualText,underlined ? 0 : theme.effects.roundedCorner2, underlined ? 'borderBottom' : 'border'),
              {
                border: `1px solid ${SearchControlColors.FocusedBorder}`,
                backgroundColor:SearchControlColors.FocusedBackground
              },
              {
                selectors: {
                  ':after': {
                    selectors: {
                      [HighContrastSelector]: {
                        borderColor:false as any,
                        borderBottomColor:false as any
                      },

                  }
                }
              }}
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
              [`.${IsFocusVisibleClassName} && .ms-Button:focus:after`]:[
                {
                outline: `1px solid ${this.vsColors.CommonControlsColors.FocusVisualText}`,
                },
                themeNotHighContrast && {
                  [HighContrastSelector]:{
                    inset:"0px"
                  }
                }
              ],
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
            },
            
          ],
          }
        }
      },
      "VsSpan":{
        styles:{
          color:this.vsColors.EnvironmentColors.ToolWindowText,
        }
      },
      "ToolWindowText":{
        styles:{
          root:{
            color:this.vsColors.EnvironmentColors.ToolWindowText,
          }
        }
      },
      "SimpleTableRow":{
        styles:(props:IDetailsRowStyleProps) => {
          const {EnvironmentColors} = this.vsColors;
          const environmentCommandBarTextActive = EnvironmentColors.CommandBarTextActive;
          return {
            root: [{
              background:"none",
              borderBottom:"none",
              color:environmentCommandBarTextActive, // this will not style the header text
              selectors: {
                "&:hover":{
                  background:"none",
                  color:environmentCommandBarTextActive,
                  selectors: {
                    [`.is-row-header`]: {
                      color: environmentCommandBarTextActive,
                    },
                  },
                }
              }
            },
            getFocusStyle(null as any,{borderColor:"none", outlineColor:"none"})
            ],
            isRowHeader:{
              color:environmentCommandBarTextActive 
            }
          }
        }
      },
      "Percentage" : {
        styles:(props:{percentage:number | null}) : DeepPartial<IProgressIndicatorStyles> => {
          const {percentage} = props;
          const {EnvironmentColors} = this.vsColors;
          const backgroundColor = percentage === null ? "transparent" : EnvironmentColors.VizSurfaceGreenMedium;
          const themeNotHighContrast = !this.themeIsHighContrast;
          return {
            progressBar: [{
              backgroundColor,
              color: "transparent",
            },
            themeNotHighContrast && {
              [HighContrastSelector]:{
                backgroundColor:false
              }
            }],
            progressTrack: [{
              backgroundColor: "transparent",
              color: "transparent",
              selectors:{
                [HighContrastSelector] : {
                  borderBottom: "0px solid transparent" 
                }
              }
            }],
            root: {
              color: "transparent"
            },
          }
        }
      },
      "DetailsListCellText" : {
        styles:(props:any) => {
          return {
            root: [{
              color:'inherit',
            },
            getVsFocusStyle(this.vsColors)
            ]
          }
        }
      },
      "DetailsHeader" : {
        styles:(props:IDetailsHeaderStyleProps):DeepPartial<IDetailsHeaderStyles> => {
          const {HeaderColors, EnvironmentColors} = this.vsColors;
          const focusStyle = getVsFocusStyle(this.vsColors);
          return {
            root:{
              background:HeaderColors.Default,
              borderBottom: `1px solid ${HeaderColors.SeparatorLine}`,
              paddingTop:'0px'//***************************************** 
              // should this be done ?
              //borderTop: `1px solid ${headerColors.SeparatorLine}`,
              //borderLeft: `1px solid ${headerColors.SeparatorLine}`,
              //borderRight: `1px solid ${headerColors.SeparatorLine}`,
              
            },
            cellIsGroupExpander:[
              focusStyle,
              {
                color:HeaderColors.Glyph,
                selectors: {
                  ':hover': {
                    color: HeaderColors.MouseOverGlyph,
                    backgroundColor: HeaderColors.MouseOver
                  },
                  ':active': {
                    color: HeaderColors.MouseDownGlyph,
                    backgroundColor: HeaderColors.MouseDown
                  },
                },

            }],
            cellSizer: [
              {
                selectors: {
                  ':after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: this.headerColorsForHeaderText ? HeaderColors.MouseOverText : EnvironmentColors.CommandBarDragHandle,
                    opacity: 0,
                    left: '50%',
                  },
                  [`&.is-resizing:after`]: [
                    {
                      boxShadow: `0 0 5px 0 ${EnvironmentColors.CommandBarDragHandleShadow}`,
                    },
                  ],
                },
              },
],
        }
      }
    },
    "DetailsColumn":{
      styles:(props:IDetailsColumnStyleProps) => {
        const {isActionable} = props;
        const {HeaderColors, EnvironmentColors} = this.vsColors;
        
      
      return {
        root:[
          {
            color: this.headerColorsForHeaderText ? HeaderColors.DefaultText : EnvironmentColors.CommandBarTextActive, // mirroring vs - alt headerColors.DefaultText,
            background:HeaderColors.Default,
            borderLeft:`1px solid ${HeaderColors.SeparatorLine}`
          },
        isActionable && {
          selectors: {
            ':hover': {
              color: this.headerColorsForHeaderText ? HeaderColors.MouseOverText : EnvironmentColors.CommandBarTextHover,// mirroring vs, alt headerColors.MouseOverText,
              background: HeaderColors.MouseOver,
              selectors:{
                ".ms-Icon":{
                  color:HeaderColors.MouseOverGlyph
                }
              }
            },
            ':active': {
              color: this.headerColorsForHeaderText ? HeaderColors.MouseDownText : EnvironmentColors.CommandBarTextSelected, //mirroring vs, alt headerColors.MouseDownText,
              background: HeaderColors.MouseDown,
              selectors:{
                ".ms-Icon":{
                  color:HeaderColors.MouseDownGlyph
                }
              }
            },
          },
        },
      ],
      cellTitle:[
        getVsFocusStyle(this.vsColors)
      ],  
      nearIcon:{
        color:HeaderColors.Glyph,
      },
      sortIcon:{
        color:HeaderColors.Glyph
      },
      gripperBarVerticalStyle:{
        color:HeaderColors.SeparatorLine
      }
     }
      }
    },
     "GroupHeader" : {
      styles: (props:IGroupHeaderStyleProps) => {
        const {HeaderColors, TreeViewColors, EnvironmentColors} = this.vsColors;
        const rowBackground = this.rowBackgroundFromTreeViewColors ? TreeViewColors.Background : "transparent"
        const rowTextColor = this.rowTextFromTreeViewColors ? TreeViewColors.BackgroundText : EnvironmentColors.CommandBarTextActive;
        const focusStyle = getVsFocusStyle(this.vsColors);
        return {
          root:[{
            borderBottom: `1px solid ${HeaderColors.SeparatorLine}`,
            userSelect:'text',
            background: rowBackground,// treeViewColors.Background,
            color: rowTextColor,//environmentColors.CommandBarTextActive, // *** mirroring vs
            selectors: {
              ':hover': {
                background: rowBackground,// treeViewColors.Background,
                color: rowTextColor,// environmentColors.CommandBarTextActive // *** mirroring vs
              },
            },
            
          },
          
          
          focusStyle
          ],
          expand:[{  
            color:HeaderColors.Glyph,
            selectors: { // ignoring selected state
              ':hover': {
                color: HeaderColors.MouseOverGlyph,
                backgroundColor: HeaderColors.MouseOver
              },
              ':active': {
                color: HeaderColors.MouseDownGlyph,
                backgroundColor: HeaderColors.MouseDown
              },
            },
            
            },focusStyle
          ],
          //cellSizer here
          
        }
      }
     },
     "DetailsRow" : {
      styles:(detailsRowStyleProps:IDetailsRowStyleProps) => {        
        const { TreeViewColors, EnvironmentColors} = this.vsColors;
        const focusStyle = getVsFocusStyle(this.vsColors);
        const rowBackground = this.rowBackgroundFromTreeViewColors ? TreeViewColors.Background : "transparent"
        const rowTextColor = this.rowTextFromTreeViewColors ? TreeViewColors.BackgroundText : EnvironmentColors.CommandBarTextActive;
        const {isSelected} = detailsRowStyleProps;
        const progressBarClass = "ms-ProgressIndicator-progressBar";
        return {
          root: [
            {
              background: rowBackground,//  treeViewColors.Background, // mirroring vs, docs say "transparent",
              borderBottom:"none",
              color: rowTextColor,// environmentColors.CommandBarTextActive,
              selectors: {
                [`.${progressBarClass}`]:{
                  backgroundColor:rowTextColor
                },
                "&:hover":{
                  background:rowBackground,//treeViewColors.Background, // mirroring vs, docs say "transparent",
                  color:rowTextColor,// environmentColors.CommandBarTextActive,
                  selectors: {
                    [`.ms-DetailsRow-cell > .ms-Link`]: {
                      color: EnvironmentColors.PanelHyperlink,
                      textDecoration:"underline",
                      cursor:"pointer"
                    }
                  },

                }
              }
            },
          
            isSelected && {
              color:TreeViewColors.SelectedItemInactiveText,
              background: TreeViewColors.SelectedItemInactive,
              borderBottom: "none",
              selectors: {
                [`.${progressBarClass}`]:{
                  backgroundColor:TreeViewColors.SelectedItemInactiveText
                },
                ['.ms-DetailsRow-cell button.ms-Link']:{
                  color:TreeViewColors.SelectedItemInactiveText
                },
                '&:active': {
                  ['.ms-DetailsRow-cell button.ms-Link']:{
                    color:TreeViewColors.SelectedItemActiveText
                  },
                },
        

                '&:before': {
                  borderTop: "none",
                },
        
                // Selected State hover
                '&:hover': {
                  color: TreeViewColors.SelectedItemInactiveText,
                  background: TreeViewColors.SelectedItemInactive,
                },
        
                // Focus state
                '&:focus': {
                  color: TreeViewColors.SelectedItemActiveText,
                  background: TreeViewColors.SelectedItemActive,
                  selectors: {
                    [`.${progressBarClass}`]:{
                      backgroundColor:TreeViewColors.SelectedItemActiveText
                    },
                    [`.ms-DetailsRow-cell`]: {
                      color: TreeViewColors.SelectedItemActiveText,
                      background: TreeViewColors.SelectedItemActive,
                    },
                    ['.ms-DetailsRow-cell button.ms-Link']:{
                      color:TreeViewColors.SelectedItemActiveText
                    },
                  },
                },
        
                // Focus and hover state
                '&:focus:hover': {
                  color: TreeViewColors.SelectedItemActiveText,
                  background: TreeViewColors.SelectedItemActive,
                  selectors: {
                    [`.ms-DetailsRow-cell`]: {
                      color: TreeViewColors.SelectedItemActiveText,
                      background: TreeViewColors.SelectedItemActive,
                    },
                  },
                },
                '&:focus-within':{
                  color: TreeViewColors.SelectedItemActiveText,
                  background: TreeViewColors.SelectedItemActive,
                  [`.${progressBarClass}`]:{
                    backgroundColor:TreeViewColors.SelectedItemActiveText
                  },
                }
                
              },
            },
            focusStyle,
          ],
          // todo requires override ?
          /* cell:{
            selectors:{
              "[data-is-focusable='true']":
            }
          } */
        }
        }
      }
     
    },
    settings:{
     
    },
  }
  
}


