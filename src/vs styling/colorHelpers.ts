import { assign, clamp, getColorFromRGBA, hsv2rgb, IColor, IHSV } from "@fluentui/react";

export function getColor(rgbaString:string):IColor{
    const partsStr = rgbaString.replace("rgba(","").replace(")","");
    const parts = partsStr.split(",");
    const rgba =  {
      r:Number.parseInt(parts[0]),
      g:Number.parseInt(parts[1]),
      b:Number.parseInt(parts[2]),
      a:Number.parseFloat(parts[3]) * 100
    }
    
    return getColorFromRGBA(rgba);
  }
  
  export function colorRGBA(color:IColor):string{
    return `rgb(${color.r},${color.g},${color.b})`;
  }
  
  function _darken(hsv: IHSV, factor: number): IHSV {
    return {
      h: hsv.h,
      s: hsv.s,
      v: clamp(hsv.v - hsv.v * factor, 100, 0),
    };
  }
  
  export function lightenOrDarken(color: IColor, factor: number,lighten:boolean): IColor {
    let hsv = { h: color.h, s: color.s, v: color.v };
    hsv =  lighten?  _lighten(hsv,factor) :  _darken(hsv,factor);
    return getColorFromRGBA(assign(hsv2rgb(hsv.h, hsv.s, hsv.v), { a: color.a }));
  }
  
  function _lighten(hsv: IHSV, factor: number): IHSV {
    return {
      h: hsv.h,
      s: clamp(hsv.s - hsv.s * factor, 100, 0),
      v: clamp(hsv.v + (100 - hsv.v) * factor, 100, 0),
    };
  }