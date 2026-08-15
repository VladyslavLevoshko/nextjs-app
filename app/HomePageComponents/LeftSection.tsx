import { ReactNode } from "react";

export function LeftSection( { children } : {children : ReactNode}){
    return (
        <section className="space-y-6">
            { children }
        </section>
    )
}