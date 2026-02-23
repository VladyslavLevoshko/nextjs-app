// ...existing code...
"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-700 transition"
      >
        Войти
      </button>
    );
  }

  const user = session.user;
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-sm shadow-sm hover:shadow transition"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {user.image ? (
          <Image src={user.image} alt={user.name ?? "avatar"} width={28} height={28} className="rounded-full" />
        ) : (
          <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
            {String(user.name ?? user.email ?? "U").charAt(0).toUpperCase()}
          </div>
        )}

        <span className="text-sm font-medium text-gray-800">{user.name ?? user.email}</span>

        <svg className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="text-sm font-semibold text-gray-800 truncate">{user.name ?? "User"}</div>
            <div className="text-xs text-gray-500 truncate">{user.email}</div>
          </div>

          <button
            role="menuitem"
            onClick={() => { setOpen(false); signIn(); }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Войти как другой пользователь
          </button>

          <button
            role="menuitem"
            onClick={() => { setOpen(false); signOut(); }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}
// ...existing code...