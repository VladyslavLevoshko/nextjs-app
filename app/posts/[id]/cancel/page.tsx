import Link from "next/link";

export default function CancelPage({ params }: { params: { id: string } }) {
  const postId = params?.id ?? "#";

  return (
    <div className="min-h-screen bg-gray-50 -mt-16 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <header className="p-6 sm:p-8 border-b border-gray-100 flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-700 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Покупка отменена</h1>
              <p className="mt-1 text-sm text-gray-600">
                Похоже, вы прервали оформление на странице оплаты. Оплата не была завершена, и права на пост не переданы.
              </p>
            </div>
          </header>

          <div className="p-6 sm:p-8">
            <div className="prose prose-lg prose-gray max-w-none">
              <p>
                Это может произойти, если вы закрыли окно платежа, нажали «Отмена» или вернулись на сайт до завершения
                оплаты. Если вы хотите попробовать снова — просто нажмите «Повторить покупку».
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-100 pt-4">
              <div className="flex gap-3">
                <Link
                  href={`/posts/${postId}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
                >
                  Повторить покупку
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Вернуться на главную
                </Link>
              </div>

              <div className="text-sm text-gray-600">
                Нужна помощь? <a href="mailto:support@example.com" className="text-emerald-600 hover:underline">Связаться с поддержкой</a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}