import { ReactNode } from "react";

export function LogInButtonMenu( { user, children }: 
    { user : {id:string, name:string, email:string}, 
    children : ReactNode} ){
    return (
        <div role="menu" className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
            {children}
        </div>
    )
}