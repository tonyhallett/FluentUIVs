import { getFocusStyle, ILinkStyleProps } from "@fluentui/react";
import { VsColors } from "./themeColors";

export const buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    outlineColor: 'ButtonText', 
};

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