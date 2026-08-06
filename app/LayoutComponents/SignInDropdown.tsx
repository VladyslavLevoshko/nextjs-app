"use client";
import { useState} from "react";
import { signOut, useSession } from "next-auth/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { NavigationButton } from "../SharedComponents/NavigationButton";

export default function SignInDropdown() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>( () => setOpen(false) )


  switch(status){
    case "loading":
      return (
        <NavigationButton color="white">
          Loading...
        </NavigationButton>
      );

    case "unauthenticated":
      return (
        <NavigationButton href="/users/sign_in" color="blue">
          Войти
        </NavigationButton>
      );

    case "authenticated":
      const user = session?.user;
      return (
        <div className="relative" ref={ref}>

          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex items-center gap-3 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-sm shadow-sm
            transform transition duration-150 ease-out hover:shadow-md hover:bg-gray-50
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 cursor-pointer"                aria-haspopup="menu"
            aria-expanded={open}
          >
            <svg className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
            </svg>
          </button>

          {open && (
            <div role="menu" className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-800 truncate">{user.name ?? "User"}</div>
                <div className="text-xs text-gray-500 truncate">{user.email}</div>
              </div>

              <button
                role="menuitem"
                onClick={() => { setOpen(false); signOut(); }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      );
  }
}