'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationSuccess() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md text-center p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-2">Регистрация успешна</h1>
        <p className="text-gray-600 mb-4">Вы автоматически вошли. Сейчас будет перенаправление на главную.</p>
        <a href="/" className="text-indigo-600 underline">Перейти сейчас</a>
      </div>
    </div>
  );
}