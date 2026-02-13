// ...existing code...
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Регистрация",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 -mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <section className="hidden lg:block">
            <div className="bg-gradient-to-tr from-indigo-50 to-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">Добро пожаловать</h1>
              <p className="text-gray-600">Зарегистрируйтесь, чтобы покупать посты, вести профиль и взаимодействовать с авторами.</p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>• Простая и безопасная регистрация</li>
                <li>• Доступ к купленным постам</li>
                <li>• Управление профилем и уведомления</li>
              </ul>
            </div>
          </section>

          <aside className="flex justify-center">
            <RegisterForm />
          </aside>
        </div>
      </div>
    </div>
  );
}
// ...existing code...