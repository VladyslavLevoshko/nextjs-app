import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { validatePatchBody } from "@/types/registerTypes";

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const postId = Number(params.id);
  if (Number.isNaN(postId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.id !== String(post.authorId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id: postId } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request, { params }: { params:{ id: string } }) {
  const { id } = params;
  const postId = parseInt(id, 10);
  if (Number.isNaN(postId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.id !== String(post.authorId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body: unknown = await request.json().catch(() => ({}));
  if (!validatePatchBody(body)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  };

  const { title, content } = body;

  const updated = await prisma.post.update({
    where: { id: postId },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(content !== undefined ? { content } : {}),
    },
  });

  return NextResponse.json(updated);
}