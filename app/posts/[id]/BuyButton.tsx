"use client";
import type { StripeCheckoutInfo } from "@/types";

export default function BuyButton({ postId, title, price } : StripeCheckoutInfo) {

  const startCheckout = async () => {

    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, title, price }),
    });

    const json = await res.json();
    
    if (json.url) window.location.href = json.url;
    else alert("Ошибка при создании сессии");
  };

  const sizeClasses = "px-4 py-2 text-sm";
  const base = "inline-flex items-center justify-center rounded";
  const finalClass = `${base} ${sizeClasses} " bg-indigo-600 text-white hover:opacity-95 cursor-pointer"`;

  return (
    <button onClick={startCheckout} className={finalClass}>
      Buy post — {price}{" "}
    </button>
  );
}
