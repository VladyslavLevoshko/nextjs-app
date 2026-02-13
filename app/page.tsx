import Link from "next/link";

export const metadata = {
  title: "WD1 — Главная",
  description: "Купля/продажа постов. Находите полезные материалы и поддерживайте авторов.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen -mt-16 flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <section className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
              Платформа постов — покупайте, читайте и поддерживайте авторов
            </h1>
            <p className="text-lg text-gray-600 max-w-prose">
              На WD1 авторы публикуют глубокие и полезные материалы. Поддержите автора — получите полный доступ к контенту
              и удобную навигацию по вашим покупкам.
            </p>

            <div className="mt-6 w-full max-w-lg">
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <Link
                  href="/posts"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium text-base shadow-sm hover:opacity-95 transition"
                >
                  Смотреть посты
                </Link>

                <Link
                  href="/users/new_user"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700 font-medium text-base hover:bg-emerald-100 transition"
                >
                  Создать аккаунт
                </Link>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500 space-y-2 max-w-prose">
              <p className="font-medium">Почему WD1</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Удобный рынок постов с честной поддержкой авторов.</li>
                <li>Гибкие цены и безопасная оплата через Stripe.</li>
                <li>Профили авторов, поиск и простой доступ к купленным материалам.</li>
              </ul>
            </div>
          </section>

          <aside className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Популярные категории</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">Технологии</span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">Дизайн</span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">Бизнес</span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">Личное развитие</span>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p>Начните с просмотра популярных постов или создайте аккаунт, чтобы покупать и сохранять понравившиеся материалы.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}