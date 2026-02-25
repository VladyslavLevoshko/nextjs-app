"use client";
import Link from "next/link";

export default function PopularCategories({ categories = [] as string[] }: { categories?: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((c) => (
        <Link
          key={c}
          href={`/posts?category=${encodeURIComponent(c)}`}
          className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 text-sm rounded-md shadow-sm
                     transform transition duration-150 ease-out hover:scale-105 hover:shadow-md hover:bg-indigo-50 text-gray-800 cursor-pointer"
        >
          {c}
        </Link>
      ))}
    </div>
  );
}