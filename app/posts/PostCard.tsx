// ...existing code...
"use client";
import Link from "next/link";
import BuyButton from "./[id]/BuyButton";

export default function PostCard({
  id,
  title,
  price,
  authorName,
  authorId,
}: {
  id: number;
  title: string;
  price: number;
  authorName: string;
  authorId?: number;
}) {
  console.log("Author ID:", authorId);

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
          <div className="text-indigo-600 font-medium ml-3">{price ? `${price} $` : "Бесплатно"}</div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          {/* ссылка на страницу автора */}
          <Link
            href={authorId ? `/users/${authorId}` : "#"}
            className="flex items-center gap-2 group-hover:text-indigo-600 transition-colors"
          >
            <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-semibold transform transition-transform duration-150 group-hover:scale-110">
              {authorName?.[0] ?? "A"}
            </div>
            <div>
              <div className="text-xs font-medium text-gray-800 hover:underline">
                {authorName}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/posts/${id}`}
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:opacity-95"
            >
              Открыть
            </Link>
            <BuyButton postId={id} title={title} price={price} />
          </div>
        </div>
      </div>
    </article>
  );
}
// ...existing code...