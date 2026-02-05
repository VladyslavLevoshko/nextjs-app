import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  if (Number.isNaN(postId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  try {
    await prisma.post.delete({ where: { id: postId } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Not found or cannot delete" }, { status: 404 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  if (Number.isNaN(postId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await request.json().catch(() => ({}));
  const { title, content } = body;

  if (!title && !content) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  try {
    const updated = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Not found or cannot update" }, { status: 404 });
  }
}