import { ReactNode } from "react";

export function HeadingFontStyle( { children } : { children : ReactNode}){
    return (
        <h1 className="text-3xl font-bold text-gray-800 mb-3"> { children } </h1>
    )
}