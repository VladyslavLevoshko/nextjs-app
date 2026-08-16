import { ReactNode } from "react";

export function PageGrid( { children } : { children : ReactNode }){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            { children }
        </div>
    )
}