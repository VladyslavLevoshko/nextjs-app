import Link from "next/link";
import SignInDropdown from "./SignInDropdown";
export default function Navigation(){
    return (
        <nav className="flex items-center gap-3">
            <Link href="/posts" className="text-sm text-gray-700 hover:text-indigo-600">
                Посты
            </Link>
            <Link href="/users" className="text-sm text-gray-700 hover:text-indigo-600">
                Пользователи
            </Link>
            <Link
                href="/posts/new"
                className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm hover:opacity-95"
            >
                Новый пост
            </Link>
            <SignInDropdown/>
        </nav>
    )
}