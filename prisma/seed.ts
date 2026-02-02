import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});


const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "First post",
          content: "This is first post",
          published: true,
        },
        {
          title: "Second post",
          content: "something else interesting",
        },
      ],
    },
  },
  {
    name: "Bib",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Third post",
          content: "and one more post",
          published: true,
        },
      ],
    },
  },
];

export async function main() {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();