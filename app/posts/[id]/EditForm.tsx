'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditForm({ post }: { post: { id: number; title: string; content: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setLoading(false);
    if (res.ok) {
      router.push(`/posts/${post.id}`);
    } else {
      alert("Failed to update");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2"
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 h-48"
        placeholder="Content"
      />
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-yellow-400 text-white rounded">
          {loading ? "Saving..." : "Save"}
        </button>
        <Link href={`/posts/${post.id}`} className="px-4 py-2 bg-gray-200 rounded">
          Cancel
        </Link>
      </div>
    </form>
  );
}