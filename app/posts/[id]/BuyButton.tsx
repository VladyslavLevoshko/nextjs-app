"use client";

export default function BuyButton({ 
  postId,
  title,
  price,
  buyerEmail,
  size = "md",
  className,
 }: {
  postId: number;
  title?: string;
  price?: number;
  buyerEmail?: string;
  size? : 'sm' | 'md';
  className?: string;
}) {
  const startCheckout = async () => {
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, title, amount: price ?? 0, buyerEmail: buyerEmail }),
    });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
    else alert("Ошибка при создании сессии");
  };

  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-sm";
  const base = "inline-flex items-center justify-center rounded";
  const finalClass = `${base} ${sizeClasses} ${className ?? "bg-indigo-600 text-white"}`;

  return (
    <button onClick={startCheckout} className={finalClass}>
      Buy post — {price}{" "}
    </button>
  );
}
