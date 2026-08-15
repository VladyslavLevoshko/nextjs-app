"use client"
import { useState} from "react";
import { signOut, useSession } from "next-auth/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { NavigationButton } from "../SharedComponents/NavigationButton";
import { Arrow, LogButton, LogInButtonMenu  } from "./"

export function SignInDropdown() {
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
         <LogButton
          setOpenFunc={() => setOpen(open => !open)} 
          ButtonSpec = "In" >
            <Arrow isOpen = {open}/>
            {user.name}
         </LogButton>

          {open && (
            <LogInButtonMenu user = {user}>
              <LogButton
              setOpenFunc = {() => { setOpen(false); signOut(); }}
              ButtonSpec = "Out"
              >
                Выйти
              </LogButton>
            </LogInButtonMenu>
          )}
        </div>
      );
  }
}