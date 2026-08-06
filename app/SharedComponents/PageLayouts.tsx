import clsx from "clsx";
import { HeroLayoutProps} from "@/types/StyleTypes";

export function HeroLayout({children, className}:HeroLayoutProps){
    return (
        <div className={clsx("min-h-screen -mt-16", className)}>
            {children}
        </div>
    )
}

export function Container({children, className}:HeroLayoutProps){
    return (
        <div className={clsx("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
            {children}
        </div>
    )
}