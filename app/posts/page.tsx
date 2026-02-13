// ...existing code...
import PostCard from "./PostCard";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const revalidate = 0;

type Props = {
  searchParams?: { page?: string };
};

export default async function PostsPage({ searchParams }: Props) {
  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const perPage = 12;
  const skip = (page - 1) * perPage;

  const posts = await prisma.post.findMany({
    take: perPage,
    skip,
    include: { author: true },
  });

  const total = await prisma.post.count();
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="min-h-screen bg-gray-50 -mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Посты</h1>
            <p className="text-gray-600 mt-1">Свежие материалы от авторов. Купите и получите полный доступ.</p>
          </div>
          <div>
            <Link href="/posts/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
              Новый пост
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard
              key={p.id}
              id={String(p.id)}
              title={p.title}
              price={p.price ?? 0}
              authorName={p.author?.name ?? "Автор"}
            />
          ))}
        </section>

        <nav className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Страница {page} из {totalPages}
          </div>

          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link
                href={`/posts?page=${page - 1}`}
                className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                ← Назад
              </Link>
            ) : (
              <span className="px-3 py-2 rounded-md text-gray-300">← Назад</span>
            )}

            {page < totalPages ? (
              <Link
                href={`/posts?page=${page + 1}`}
                className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:opacity-95"
              >
                Вперед →
              </Link>
            ) : (
              <span className="px-3 py-2 rounded-md text-gray-300">Вперед →</span>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
// ...existing code...