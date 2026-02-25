// ...existing code...
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteButton from "./Delete.Button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import BuyButton from "./BuyButton";

function formatCurrency(value?: number) {
  const v = Number(value ?? 0);
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(v);
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number.parseInt(String(id), 10);

  if (!Number.isFinite(postId) || Number.isNaN(postId)) {
    return notFound();
  }  
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) return notFound();

  const session = await getServerSession(authOptions);
  const isOwner = !!session && String((session.user as any).id) === String(post.authorId);

  const createdAt = (post as any).createdAt ? new Date((post as any).createdAt) : null;
  const dateLabel = createdAt ? createdAt.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" }) : "";

  const authorId = post.author?.id;
  const authorHref = authorId ? `/users/${authorId}` : "#";

  return (
    <div className="min-h-screen bg-gray-50 -mt-16 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <header className="p-6 sm:p-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href={authorHref}
                    className="flex items-center gap-3 group hover:text-indigo-600 transition-colors"
                    aria-label={`Перейти к автору ${post.author?.name ?? ""}`}
                  >
                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold transform transition-transform duration-150 ease-out group-hover:scale-110 cursor-pointer">
                      {post.author?.name?.[0] ?? (post.author?.email?.[0] ?? "U")}
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-gray-900 group-hover:underline">{post.author?.name ?? post.author?.email ?? "Unknown"}</div>
                      <div className="text-gray-500">{dateLabel}</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <div className="text-sm text-gray-600 mr-2 hidden sm:block">Цена</div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
                  {formatCurrency(post.price ?? 0)}
                </div>

                {isOwner ? (
                  <>
                    <Link href={`/posts/${post.id}/edit`} className="px-4 py-2 bg-yellow-400 text-white rounded shadow-sm transform transition duration-150 ease-out hover:bg-yellow-500 hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 cursor-pointer">
                      Edit
                    </Link>
                    <DeleteButton id={post.id} />
                  </>
                ) : (
                  <BuyButton postId={post.id} title={post.title} price={post.price ?? 5} />
                )}
              </div>
            </div>
          </header>

          <div className="p-6 sm:p-8">
            <div className="prose prose-lg prose-gray max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content || "<p>Нет содержимого.</p>" }} />
            </div>

            {/* metadata / actions */}
            <footer className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-100 pt-4">
              <div className="text-sm text-gray-600">
                <div>Категория: {post.category ?? "Unknown"}</div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/posts`}
                  className="px-3 py-2 bg-white border border-indigo-200 text-indigo-600 rounded shadow-sm transition-colors transition-shadow duration-150
                            hover:bg-indigo-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer text-sm"
                >
                  Все посты
                </Link>
                {!isOwner ? (
                <a
                  href={`mailto:${post.author?.email ?? ""}`}
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:opacity-95"
                >
                  Написать автору
                </a>) : (null)}
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}
// ...existing code...