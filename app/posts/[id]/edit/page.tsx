import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "../EditForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  if (Number.isNaN(postId)) notFound();

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) notFound();

  const session = await getServerSession(authOptions);
  if (!session || String((session.user as any).id) !== String(post.authorId)) notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center -mt-16">
      <div className="w-full max-w-2xl p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Edit post</h1>
        <EditForm post={{ id: post.id, title: post.title || "", content: post.content || "" }} />
      </div>
    </div>
  );
}