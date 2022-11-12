import { ActionButton, Checkbox, Dropdown, getFocusStyle, ICheckboxProps, IDropdownOption } from "@fluentui/react";
import React, { useState } from "react";
import { dropDownClassNames } from "./globalClassNames";
import { VsColors } from "./themeColors";
import { buttonHighContrastFocus } from "./themeStyles";

export function ButtonDemo(props:{actionButtonStyles:any,checkBoxStyles:ICheckboxProps['styles'],vsColors:VsColors}){ //todo type
    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [selectedDropDownOption, setSelectedDropDownOptions] = useState<IDropdownOption>();
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
    const {CommonControlsColors: commonControlsColors, EnvironmentColors:environmentColors} = props.vsColors;
    const focusColor = commonControlsColors.FocusVisualText;
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
    return <div>
        <Checkbox styles={props.checkBoxStyles} label="Toggle btn disabled"  checked={buttonDisabled} onChange={(evt) => {
            setButtonDisabled(!buttonDisabled);
        }}/>
        <ActionButton disabled={buttonDisabled} iconProps={{iconName:"github"}} styles={
            props.actionButtonStyles
        } >Some text</ActionButton>
        <ActionButton iconProps={{iconName:"logRemove"}} styles={props.actionButtonStyles}/>
        <Dropdown styles={(dropDownStyleProps => {
        const {isRenderingPlaceholder, disabled, isOpen} = dropDownStyleProps;
        return {
          root:{
            width:"200px"
          },
          label:{
            color:environmentColors.ToolWindowText
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
            getFocusStyle(null as any, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent', outlineColor:focusColor }),
          ],
          dropdownItemSelected:[
              {
              backgroundColor:commonControlsColors.ComboBoxTextInputSelection,
              color:commonControlsColors.ComboBoxListItemText
            },
            getDropDownItemSelectors(true),
            getFocusStyle(null as any, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent', outlineColor:focusColor })
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
    </div>
}