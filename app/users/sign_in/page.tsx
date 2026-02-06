'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  const res = await signIn("credentials", { redirect: false, email, password, callbackUrl: "/" });
  console.log("signIn result :", res);

  if ((res as any)?.ok) {
    router.push("/posts/new");
  } else {
    alert("Login failed: " + ((res as any)?.error ?? "unknown"));
  }
}

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-4">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Sign in</button>
    </form>
  );
}