//todo type color
//todo sizes

export function getScrollbarStyle(
  thumbColor: string,
  thumbHoverColor: string,
  thumbActiveColor: string,
  trackColor: string,
  arrowBackgroundColor: string,
  arrowBackgroundHoverColor: string,
  arrowBackgroundActiveColor: string,
  arrowGlyphBackgroundColor: string,
  arrowGlyphBackgroundHoverColor: string,
  arrowGlyphBackgroundActiveColor: string,
  scrollBarBorderColor: string,
  scrollBarThumbBorderColor: string,
  scrollBarThumbBorderHoverColor: string,
  scrollBarThumbBorderActiveColor: string,
  arrowBorderHoverColor: string,
  arrowBorderActiveColor: string

) {
  function getVerticalArrow(points: string, fill: string) {

    return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${fill}'><polygon points='${points}'/></svg>")`;
  }

  function getArrowStyles(isHorizontal: boolean) {
    const vOrH = isHorizontal ? "horizontal" : "vertical";
    const points: [string, string] = isHorizontal ? ["0,50 50,100 50,0", "0,0 0,100 50,50"] : ["50,00 0,50 100,50", "0,0 100,0 50,50"];
    return {
      // left or up
      [`::-webkit-scrollbar-button:single-button:${vOrH}:decrement`]: {
        // which may change
        height: isHorizontal ? "12px" : '12px',
        width: isHorizontal ? "12px" : '16px',
        backgroundPosition: isHorizontal ? "3px 3px" : 'center 4px',

        backgroundImage: getVerticalArrow(points[0], arrowGlyphBackgroundColor)
      },
      [`::-webkit-scrollbar-button:single-button:${vOrH}:decrement:hover`]: {
        backgroundImage: getVerticalArrow(points[0], arrowGlyphBackgroundHoverColor)
      },
      [`::-webkit-scrollbar-button:single-button:vertical:decrement:active`]: {
        backgroundImage: getVerticalArrow(points[0], arrowGlyphBackgroundActiveColor)
      },

      // right or down
      [`::-webkit-scrollbar-button:single-button:${vOrH}:increment`]: {
        height: isHorizontal ? "12px" : '12px',
        width: isHorizontal ? "12px" : '16px',
        backgroundPosition: isHorizontal ? "3px 3px" : 'center 2px',

        backgroundImage: getVerticalArrow(points[1], arrowGlyphBackgroundColor)
      },
      [`::-webkit-scrollbar-button:single-button:${vOrH}:increment:hover`]: {
        backgroundImage: getVerticalArrow(points[1], arrowGlyphBackgroundHoverColor)
      },
      [`::-webkit-scrollbar-button:single-button:${vOrH}:increment:active`]: {
        backgroundImage: getVerticalArrow(points[1], arrowGlyphBackgroundActiveColor)
      }
    };
  }

  function getBorder(borderColor: string) {
    return {};
    /* return {
      // box shadow ?
      border:`1px solid ${borderColor}`
    } */
  }
  return {
    "::-webkit-scrollbar": {
      width: "12px",
      height: "12px",
    },

    "::-webkit-scrollbar-corner": {
      backgroundColor: trackColor,
      ...getBorder(scrollBarBorderColor)
    },
    // the track (progress bar) of the scrollbar, where there is a gray bar on top of a white bar
    "::-webkit-scrollbar-track": {
      backgroundColor: trackColor,
      ...getBorder(scrollBarBorderColor)
    },


    // what press to slide
    "::-webkit-scrollbar-thumb": {
      backgroundColor: thumbColor, // necessary even when styling differently
    },
    "::-webkit-scrollbar-thumb:vertical": {
      //...getBorder(scrollBarThumbBorderColor)
      borderLeft: `1px solid ${trackColor}`,
      borderRight: `3px solid ${trackColor}`,
      backgroundClip: "content-box",
    },
    "::-webkit-scrollbar-thumb:horizontal": {
      //...getBorder(scrollBarThumbBorderColor)
      borderTop: `1px solid ${trackColor}`,
      borderBottom: `3px solid ${trackColor}`,
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
      backgroundColor: arrowBackgroundColor,
      ...getBorder(scrollBarBorderColor),
      display: 'block',
      backgroundSize: '10px',
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
