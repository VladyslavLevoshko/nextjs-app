import { ReactNode } from "react";


export function LogButton( { children, setOpenFunc, ButtonSpec } :
    { children : ReactNode,   
       setOpenFunc : () => void, 
       ButtonSpec:"In" | "Out"
    }){

    const buttonStyle = {
        In:  "inline-flex items-center gap-3 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-sm shadow-sm" + 
             " transform transition duration-150 ease-out hover:shadow-md hover:bg-gray-50" + 
             " focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 cursor-pointer",

        Out: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
    }

    
    return (
        <button
            onClick = {setOpenFunc}
            className = {buttonStyle[ButtonSpec]}
        >
            {children}
        </button>        
    )
}