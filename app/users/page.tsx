// ...existing code...
import UserCard from "./UserCard";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const revalidate = 0;

type Props = {
  searchParams?: Promise<{ page?: string }>; // <- поменяли тип на Promise
};

export default async function PostsPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};          // <- распаковываем Promise
  const page = Math.max(1, Number(sp.page ?? 1));
const perPage = 12;
const skip = (page - 1) * perPage;

const users = await prisma.user.findMany({
  take: perPage,
  skip,
});

const total = await prisma.user.count();
const totalPages = Math.ceil(total / perPage);
  return (
    <div className="min-h-screen bg-gray-50 -mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Пользователи</h1>
            <p className="text-gray-600 mt-1">Список зарегистрированных пользователей.</p>
          </div>
          <div>
            <Link href="/users/new_user" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
              Новый пользователь
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <UserCard key={u.id} id={String(u.id)} name={u.name ?? "Пользователь"} email={u.email} />
          ))}
        </section>

        <nav className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Страница {page} из {totalPages}
          </div>

          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link
                href={`/users?page=${page - 1}`}
                className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                ← Назад
              </Link>
            ) : (
              <span className="px-3 py-2 rounded-md text-gray-300">← Назад</span>
            )}

            {page < totalPages ? (
              <Link
                href={`/users?page=${page + 1}`}
                className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:opacity-95"
              >
                Вперед →
              </Link>
            ) : (
              <span className="px-3 py-2 rounded-md text-gray-300">Вперед →</span>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
// ...existing code...