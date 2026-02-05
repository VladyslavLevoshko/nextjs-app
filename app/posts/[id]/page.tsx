import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteButton from "./Delete.Button";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">{post.title}</h1>
        <div className="flex gap-3 justify-center mb-4">
          <Link
            href={`/posts/${post.id}/edit`}
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:opacity-90"
          >
            Edit
          </Link>

          <DeleteButton id={post.id} />
        </div>
        <p className="text-gray-600 text-center">
          by{" "}
          {post.author ? (
            <Link href={`/users/${post.author.id}`} className="text-blue-600 hover:underline">
              {post.author.name || post.author.email}
            </Link>
          ) : (
            "Unknown"
          )}
        </p>
        <div className="prose prose-gray mt-8">
          {post.content || "No content available."}
        </div>
      </article>
    </div>
  );
}