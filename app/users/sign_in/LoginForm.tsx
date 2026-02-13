// ...existing code...
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: k === "remember" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Введите корректный email";
    if (!form.password) e.password = "Введите пароль";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setLoading(true);

    try {
      // Используем next-auth signIn с credentials
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        callbackUrl: "/",
      });

      if (!res) {
        setServerError("Ошибка авторизации");
        setLoading(false);
        return;
      }

      if ((res as any).error) {
        setServerError((res as any).error);
        setLoading(false);
        return;
      }

      // Успешный вход
      router.push((res as any).url ?? "/");
    } catch (err) {
      setServerError("Сетевая ошибка, попробуйте позже");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Войти в аккаунт</h2>
        <p className="text-sm text-gray-500 mb-6">Введите ваш email и пароль для доступа к аккаунту.</p>

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.email ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={onChange("password")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.password ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="Ваш пароль"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && <p id="password-error" className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-gray-700">
              <input type="checkbox" checked={form.remember} onChange={onChange("remember")} className="h-4 w-4 rounded border-gray-300" />
              Запомнить меня
            </label>
            <a className="text-indigo-600 hover:underline" href="/forgot">Забыли пароль?</a>
          </div>

          {serverError && <div className="text-xs text-red-600">{serverError}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium hover:opacity-95 transition"
          >
            {loading ? <span className="animate-pulse text-sm">Вхожу...</span> : "Войти"}
          </button>

          <div className="text-center text-sm text-gray-500">
            Нет аккаунта? <a className="text-indigo-600 hover:underline" href="/users/new_user">Зарегистрироваться</a>
          </div>
        </form>
      </div>
    </div>
  );
}
// ...existing code...