import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
    console.log('UserPage params:', await params);
  const id = parseInt((await params).id, 10);
  if (Number.isNaN(id)) return notFound();

  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });

  if (!user) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{user.name || user.email}</h1>
      <p className="text-sm text-gray-500 mb-6">Posts by this user:</p>

      {user.posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="space-y-3">
          {user.posts.map((p) => (
            <li key={p.id}>
              <Link href={`/posts/${p.id}`} className="text-blue-600 hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}