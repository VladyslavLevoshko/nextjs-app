"use client";
// ...existing code...
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Неверный email";
    if (form.password.length < 8) e.password = "Пароль должен быть минимум 8 символов";
    if (form.password !== form.confirm) e.confirm = "Пароли не совпадают";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (k: keyof FormState) => (ev: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: ev.target.value }));

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSuccess(null);
    if (!validate()) return;
    setLoading(true);
    try {
      // Замените endpoint на ваш реальный API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ form: data?.error || "Ошибка регистрации" });
        setLoading(false);
        return;
      }

      setSuccess("Регистрация успешна! Перенаправляем...");
      setLoading(false);
      setTimeout(() => router.push("/login"), 1400);
    } catch (err) {
      setErrors({ form: "Сетевая ошибка, попробуйте позже" });
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Создать аккаунт</h2>
        <p className="text-sm text-gray-500 mb-6">Быстро и безопасно — регистрация займёт минуту.</p>

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Имя
            </label>
            <input
              id="name"
              value={form.name}
              onChange={onChange("name")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.name ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="Как к вам обращаться"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

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
              placeholder="Минимум 8 символов"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && <p id="password-error" className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirm">
              Подтвердите пароль
            </label>
            <input
              id="confirm"
              type="password"
              value={form.confirm}
              onChange={onChange("confirm")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.confirm ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="Повторите пароль"
              aria-invalid={!!errors.confirm}
              aria-describedby={errors.confirm ? "confirm-error" : undefined}
            />
            {errors.confirm && <p id="confirm-error" className="mt-1 text-xs text-red-600">{errors.confirm}</p>}
          </div>

          {errors.form && <div className="text-xs text-red-600">{errors.form}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium hover:opacity-95 transition"
          >
            {loading ? <span className="animate-pulse text-sm">Создаём аккаунт...</span> : "Зарегистрироваться"}
          </button>

          <div className="text-center text-sm text-gray-500">
            Уже есть аккаунт? <a className="text-indigo-600 hover:underline" href="/login">Войти</a>
          </div>
        </form>
      </div>

      {success && (
        <div className="mt-4 p-3 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm">
          {success}
        </div>
      )}
    </div>
  );
}
// ...existing code...