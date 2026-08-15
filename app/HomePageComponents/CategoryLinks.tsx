"use client";
import Link from "next/link";
import { PostCategories } from "@/types/PostsCategories";

export default function CategoryLinks() {
  return (
      <div className="flex flex-wrap gap-2">
        {PostCategories.map((category) => (
          <Link
          key={category.label}
          href={`/posts?category=${encodeURIComponent(category.label)}`}
          className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm shadow-sm
                     transform transition duration-150 ease-out hover:bg-indigo-100 hover:text-indigo-800
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 cursor-pointer"
         >
          {category.label}
         </Link>
          ))}
      </div>
  );
}