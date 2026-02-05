import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "../EditForm";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center -mt-16">
      <div className="w-full max-w-2xl p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Edit post</h1>
        <EditForm post={{ id: post.id, title: post.title || "", content: post.content || "" }} />
      </div>
    </div>
  );
}