import SignInDropdown from "./SignInDropdown";
import { NavigationButton } from "../SharedComponents/NavigationButton";

export default function Navigation(){
    return (
        <nav className="flex items-center gap-3">
            <NavigationButton href="/posts" color = "white">
                Посты
            </NavigationButton>

            <NavigationButton href="/users" color = "white">
                Пользователи
            </NavigationButton>

            <NavigationButton href="/posts/new" color="blue">
                Новый пост
            </NavigationButton>

            <SignInDropdown/>
        </nav>
    )
}