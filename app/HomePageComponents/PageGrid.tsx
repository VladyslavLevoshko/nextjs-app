import { ReactNode } from "react";

export function PageGrid( { children } : { children : ReactNode }){
    return (
        <div className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            { children }
        </div>
    )
}

// className="flex items-center justify-center py-20"