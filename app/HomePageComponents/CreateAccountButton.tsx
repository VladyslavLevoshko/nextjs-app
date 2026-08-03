import Link from "next/link"

export default function() {
    return (
        <Link
            href="/users/new_user"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700 font-medium text-base hover:bg-emerald-100 transition"
        >
            Создать аккаунт
        </Link>
    )
}