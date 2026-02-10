"use client";

export default function BuyButton({ postId, title, price }: { postId: number; title: string; price: number }) {
  const startCheckout = async () => {
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, title, amount: price, buyerEmail: "test@example.com" }),
    });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
    else alert("Ошибка при создании сессии");
  };

  return (
    <button onClick={startCheckout} className="px-4 py-2 bg-indigo-600 text-white rounded">
      Buy post — {price}{" "}
    </button>
  );
}
