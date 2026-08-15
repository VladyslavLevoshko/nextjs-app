import { ReactNode } from "react";

export function LayoutBody( { children } : { children : ReactNode }) {
    return (
        <body className="bg-gray-50 text-gray-900 antialiased">
            {children}
        </body>
    )
}