import { ReactNode } from "react";

export function LeftSectionButtons( { children } : { children : ReactNode}){
    return (
        <div className="mt-6 flex w-full max-w-lg flex-col gap-4 sm:flex-row">
            { children }
        </div>
    )
}