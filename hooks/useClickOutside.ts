import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
    const ref = useRef<T | null>(null);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        function listener(event:Event){
            const HTMLelement = ref.current;
            const listenerTarget = event.target;

            if(
                !HTMLelement ||
                !(listenerTarget instanceof Node) ||
                HTMLelement.contains(listenerTarget)              
            ) return

            callbackRef.current();
        }

        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("click", listener)
        };
    }, []);

    return ref
}