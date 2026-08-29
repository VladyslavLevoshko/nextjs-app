import Link from "next/link"

export function UserNavigation( {totalPages} : {totalPages : number}) {
    return (
        <nav className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Страница {1} из {totalPages}
          </div>

          <div className="flex items-center gap-2">
              <Link
                href={`/users?page=${1}`}
                className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                ← Назад
              </Link>

            
              <Link
                href={`/users?page=${1}`}
                className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:opacity-95"
              >
                Вперед →
              </Link>
            
          </div>
        </nav>
    )
}