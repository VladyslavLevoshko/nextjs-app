import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any)?.id) {
      redirect("/users/sign_in");
    }

    const userId = Number((session.user as any).id);
    if (Number.isNaN(userId)) {
      redirect("/users/sign_in");
    }

    const title = (formData.get("title") as string) || "";
    const content = (formData.get("content") as string) || "";
    const priceRaw = formData.get("price");
    let price = 0;
    if (priceRaw != null) {
      const parsed = Number(String(priceRaw).trim());
      price = Number.isFinite(parsed) && !Number.isNaN(parsed) ? parsed : 0;
    }

    const category = ((formData.get("category") as string) || "").trim();

    if (!title.trim()) {
      redirect("/posts/new");
    }

    const data: any = {
      title,
      content,
      price,
      author: { connect: { id: userId } },
      category
    };
    if (!category) data.category = 'Без категории';

    await prisma.post.create({ data });

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 -mt-8"> {/* уменьшён отступ сверху */}
      <h1 className="text-2xl font-bold mb-6">Создать новый пост</h1>
      <Form action={createPost} className="space-y-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Введите заголовок"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Содержимое
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Напишите содержимое поста..."
            rows={8}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Категория
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              defaultValue=""
              className="w-full appearance-none pr-8 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white cursor-pointer"
            >
              <option value="" disabled>
                Выберите категорию
              </option>
              <option value="Технологии">Технологии</option>
              <option value="Дизайн">Дизайн</option>
              <option value="Бизнес">Бизнес</option>
              <option value="Личное развитие">Личное развитие</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Выберите категорию для удобной навигации.</p>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Цена
          </label>
          <div className="relative">
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full pr-20 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">$</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Оставьте 0 для бесплатного поста.</p>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 rounded-lg hover:opacity-95 transition cursor-pointer"
          >
            Создать пост
          </button>
        </div>
      </Form>
    </div>
  );
}