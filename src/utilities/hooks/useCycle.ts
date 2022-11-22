import { useCallback, useState } from "react";

export type NextPrevious = () => void;
export const useCycle = (array:Array<unknown>,firstSelectedIndex = 0):[number,NextPrevious,NextPrevious] => {
    const [selectedIndex,setSelectedIndex] = useState(firstSelectedIndex);

    const next= useCallback(() => {
        var next = selectedIndex < array.length - 1 ? selectedIndex+1 : 0;
        setSelectedIndex(next);
      }, [selectedIndex])
  
      const previous = useCallback(() => {
        var next = selectedIndex === 0 ? array.length - 1 : selectedIndex-1;
        setSelectedIndex(next);
      },[selectedIndex])
      return [selectedIndex,next, previous]
}

