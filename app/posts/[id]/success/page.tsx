import Link from "next/link";

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ session_id?: string }>;
}) {
  const { id: postId } = await params;
  const sp = (await searchParams) ?? {};
  const sessionId = sp.session_id ?? "";

  return (
    <div className="min-h-screen pt-16 bg-gray-50 flex items-center">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-4">Спасибо за покупку!</div>
          <p className="text-gray-700 mb-4">Платёж подтверждён. Доступ к посту открыт.</p>

          {sessionId ? (
            <p className="text-sm text-gray-500 mb-6">Session: <span className="font-mono">{sessionId}</span></p>
          ) : null}

          <div className="flex justify-center gap-3">
            <Link href={`/posts/${postId}`} className="px-4 py-2 rounded-md bg-indigo-600 text-white">
              Перейти к посту
            </Link>
            <Link href="/posts" className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700">
              Все посты
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}