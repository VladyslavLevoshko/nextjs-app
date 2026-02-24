// ...existing code...
import "./globals.css";
import Link from "next/link";
import SignInButton from "./SignInButton";
import SessionProviderClient from "./providers/SessionProviderClient"; // added

export const metadata = {
  title: "WD1 — Платформа постов",
  description: "Купля/продажа постов, профиль автора и удобное чтение",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <SessionProviderClient>
          <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold">
                    WD
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold">WD1</div>
                    <div className="text-xs text-gray-500">Платформа постов</div>
                  </div>
                </Link>

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
                  <SignInButton />
                </nav>
              </div>
            </div>
          </header>

          {/* отступ сверху равный высоте header, чтобы контент не перекрывался */}
          <main className="pt-16">{children}</main>

          <footer className="mt-16 border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between text-sm text-gray-600">
              <div>© {new Date().getFullYear()} WD1 — Все права защищены</div>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:underline">
                  Политика конфиденциальности
                </Link>
                <Link href="/terms" className="hover:underline">
                  Условия
                </Link>
              </div>
            </div>
          </footer>
        </SessionProviderClient>
      </body>
    </html>
  );
}
// ...existing code...