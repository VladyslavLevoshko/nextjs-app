// ...existing code...
"use client";
import Link from "next/link";

export default function UserCard({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email?: string | null;
}) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-semibold text-lg">
              {name?.[0] ?? "U"}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{name}</div>
              <div className="text-xs text-gray-500">{email ?? "—"}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/../users/${id}`}
              aria-label={`Посты автора ${name}`}
              className="px-3 py-1.5 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            >
              Посты
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
// ...existing code...