// ...new file...
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const CATEGORIES = ["Технологии", "Дизайн", "Бизнес", "Личное развитие"];

export default function CategoryFilter({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  function applyCategory(cat?: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (cat) {
      params.set("category", cat);
      params.set("page", "1");
    } else {
      params.delete("category");
      params.set("page", "1");
    }
    const qs = params.toString();
    router.push(`/posts${qs ? `?${qs}` : ""}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-sm rounded-md shadow-sm
                   transform transition duration-150 ease-out hover:scale-105 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm text-gray-700">{current ?? "Фильтр"}</span>
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg z-50">
          <button
            type="button"
            onClick={() => applyCategory(undefined)}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Все категории
          </button>

          <div className="border-t border-gray-100" />

          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => applyCategory(c)}
              className={`w-full text-left px-3 py-2 text-sm ${c === current ? "bg-indigo-50 text-indigo-700" : "text-gray-700"} hover:bg-gray-100 cursor-pointer`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
// ...existing code...