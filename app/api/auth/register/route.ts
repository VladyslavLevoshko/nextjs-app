import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { validateRegisterRequest } from "../../../../types/registerTypes";
import type { RegisterRequest } from "../../../../types/registerTypes";
import type { User } from "@prisma/client";

export async function POST(req: Request): Promise<NextResponse<{ id: number } | { error: string }>> {
  try {
    const body:unknown = await req.json();

    if (!validateRegisterRequest(body)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 422 });
    }

    const { email, password, name }:RegisterRequest = body;

    const existing:User | null = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const passwordHash:string = await hash(password, 10);

    const user:User = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}