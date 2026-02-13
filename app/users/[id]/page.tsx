import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "../../posts/PostCard";

export const revalidate = 0;

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) return notFound();

  const [user, posts] = await Promise.all([
    prisma.user.findUnique({ where: { id } }),
    prisma.post.findMany({
      where: { authorId: id },
      orderBy: { id: "desc" },
      include: { author: true },
    }),
  ]);

  if (!user) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 -mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name ?? user.email}</h1>
            <p className="text-gray-600 mt-1">Посты автора — просмотрите, купите или откройте для чтения.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/users"
              className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm"
            >
              Все пользователи
            </Link>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-600 shadow-sm">
            У этого автора пока нет постов.
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}