import Link from "next/link";


export default function WatchPostsButton(){
    return (
        <Link
           href="/posts"
           className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium text-base shadow-sm hover:opacity-95 transition"
        >
            Смотреть посты
        </Link>
    )
}