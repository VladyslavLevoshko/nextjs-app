'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;
    setLoading(true);
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      // navigate after delete
      router.push("/posts");
    } else {
      alert("Failed to delete post");
    }
  }


  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-90 disabled:opacity-60"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}