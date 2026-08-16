import clsx from "clsx";
import { HeroLayoutProps} from "@/types/StyleTypes";
import { ReactNode } from "react";


export function HeroLayout({children, color = "white"}:HeroLayoutProps){

    const gray = "bg-gray-50 py-10"

    return (
        <div className={clsx("min-h-screen -mt-16 pt-36",
         color === "gray" ? gray : null)}>
            {children}
        </div>
    )
}

export function Container({ children } : { children : ReactNode}){
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    )
}