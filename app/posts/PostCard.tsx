// ...existing code...
"use client";
import Link from "next/link";

export default function PostCard({
  id,
  title,
  price,
  authorName,
}: {
  id: string;
  title: string;
  price: number;
  authorName: string;
}) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
          <div className="text-indigo-600 font-medium ml-3">{price ? `${price} $` : "Бесплатно"}</div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-semibold">
              {authorName?.[0] ?? "A"}
            </div>
            <div>
              <div className="text-xs font-medium text-gray-800">{authorName}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/posts/${id}`}
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:opacity-95"
            >
              Открыть
            </Link>
            <Link
              href={`/posts/${id}/buy`}
              className="px-3 py-1.5 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            >
              Купить
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
// ...existing code...