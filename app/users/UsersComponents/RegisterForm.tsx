"use client";
import React, { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { RegisterRequest } from "@/types/registerTypes";
import { validateRegisterRequest } from "@/types/registerTypes";

interface RegisterFormState extends RegisterRequest {
  confirmedPass: string;
};

interface Errors extends Partial<RegisterFormState> {
  apiErrors?: string;
}

export default function RegisterForm():JSX.Element {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormState>({ name: "", email: "", password: "", confirmedPass: ""});
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const validate = ():boolean => {
    const validateErrors:Errors = {};
    if (!form.name.trim()) validateErrors.name = "Введите имя";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) validateErrors.email = "Неверный email";
    if (form.password.length < 8) validateErrors.password = "Пароль должен быть минимум 8 символов";
    if (form.password !== form.confirmedPass) validateErrors.confirmedPass = "Пароли не совпадают";
    setErrors(validateErrors);
    return Object.keys(validateErrors).length === 0;
  };


  const onChange = function<KeyType extends keyof RegisterFormState>(
    key:KeyType
  ):React.ChangeEventHandler<HTMLInputElement> {
    return function(event: React.ChangeEvent<HTMLInputElement>):void {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };
  };

  const submit = async function (event: React.FormEvent):Promise<void> {
    event.preventDefault();
    setSuccess(false);
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const {confirmedPass, ...rest} = form;
      const request:unknown = rest;

      if (!validateRegisterRequest(request)) {
        setErrors({ apiErrors: "Некорректные данные" });
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        const data:unknown = await res.json().catch(() => ({}));
        if(
          typeof data === "object" 
          && data !== null 
          && "error" in data 
          && typeof data.error === "string"
        ) {
          setErrors({ apiErrors: data.error });
          return;
        } else {
          setErrors({ apiErrors: "Сетевая ошибка" });
          return;
        }
      };

      setSuccess(true);
      try {
        const signRes = await signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password,
        });

        if (signRes && (signRes as any).ok) {
          router.push("/users/success");
        } else {
          router.push("/users/sign_in");
        }
      } catch (err) {
        console.error("Sign-in error", err);
        router.push("/users/sign_in");
      }
    } catch (err) {
      console.error(err);
      setErrors({ apiErrors: "Сетевая ошибка" });
    } finally {
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
              value={form.confirmedPass}
              onChange={onChange("confirmedPass")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.confirmedPass ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="Повторите пароль"
              aria-invalid={!!errors.confirmedPass}
              aria-describedby={errors.confirmedPass ? "confirm-error" : undefined}
            />
            {errors.confirmedPass && <p id="confirm-error" className="mt-1 text-xs text-red-600">{errors.confirmedPass}</p>}
          </div>

          {errors.apiErrors && <div className="text-xs text-red-600">{errors.apiErrors}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium hover:opacity-95 transition"
          >
            {loading ? <span className="animate-pulse text-sm">Создаём аккаунт...</span> : "Зарегистрироваться"}
          </button>

          <div className="text-center text-sm text-gray-500">
            Уже есть аккаунт? <a className="text-indigo-600 hover:underline" href="/users/sign_in">Войти</a>
          </div>
        </form>
      </div>

      {success && (
        <div className="mt-4 p-3 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm">
          {"Регистрация прошла успешно. Автоматический вход..."}
        </div>
      )}
    </div>
  );
};