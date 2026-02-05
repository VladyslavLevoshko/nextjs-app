import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function UsersPage() {
   const users = await prisma.user.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline">
              {user.name || user.email}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};