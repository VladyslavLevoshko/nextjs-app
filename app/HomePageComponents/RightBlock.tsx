import { ReactNode } from "react";

export function RightBlock({ children } : {children:ReactNode}){
    return (
        <aside className="hidden lg:flex items-center justify-center">
            {children}
        </aside>
    )
}