import Link from "next/link";
import { ButtonProps } from "@/types/StyleTypes";

const blueNavigationButtonStyle = "px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-700 transition";
const whiteNavigationButtonStyle = "text-sm text-gray-700 hover:text-indigo-600";

export function NavigationButton( {children, color, href}:ButtonProps){
    if(href){
        return (
            <Link href={href} 
            className= { color === "blue" ? blueNavigationButtonStyle : whiteNavigationButtonStyle }
            >
                {children}
            </Link>
        )
    }

    return(
        <div className= { color === "blue" ? blueNavigationButtonStyle : whiteNavigationButtonStyle }>
            {children}
        </div>
    )
}