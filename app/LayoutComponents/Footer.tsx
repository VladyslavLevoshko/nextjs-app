import Link from "next/link";

export default function Footer(){
    return (
          <footer className="mt-16 border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between text-sm text-gray-600">
              <div>© {new Date().getFullYear()} WD1 — Все права защищены</div>
              <div className="flex items-center gap-4">
                <Link href="/layout/privacy" className="hover:underline">
                  Политика конфиденциальности
                </Link>
                <Link href="/layout/terms" className="hover:underline">
                  Условия
                </Link>
              </div>
            </div>
          </footer>
    )
}