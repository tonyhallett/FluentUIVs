import { makeStyles, useDocument } from "@fluentui/react";
import { ThemeProviderState } from "@fluentui/react/lib/utilities/ThemeProvider/ThemeProvider.types";
import React from "react";

export function useBodyToolWindow(toolWindowBackground: string){
    const bodyClasses = useBodyStyles(toolWindowBackground)();
    useApplyClassToBody({applyTo:"body"},[bodyClasses.body])
}
  
const useBodyStyles = (toolWindowBackground: string) => {
    return makeStyles({
        body: [
        {
            background: toolWindowBackground,
            
        },
        ],
    } as Record<string, any>)
}
  
function useApplyClassToBody(state: Pick<ThemeProviderState,"applyTo">, classesToApply: string[]): void {
    const { applyTo } = state;

    const applyToBody = applyTo === 'body';
    const body = useDocument()?.body;

    React.useEffect(() => {
        if (!applyToBody || !body) {
        return;
        }

        for (const classToApply of classesToApply) {
        if (classToApply) {
            body.classList.add(classToApply);
        }
        }

        return () => {
        if (!applyToBody || !body) {
            return;
        }

        for (const classToApply of classesToApply) {
            if (classToApply) {
            body.classList.remove(classToApply);
            }
        }
        };
    }, [applyToBody, body, classesToApply]);
}