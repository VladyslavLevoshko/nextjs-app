import Link from "next/link"

export default function Logo(){
    return (
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold">
            WD
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold">WD1</div>
            <div className="text-xs text-gray-500">Платформа постов</div>
          </div>
        </Link>
    )
}