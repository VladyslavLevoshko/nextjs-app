import Link from "next/link";

// Revalidate this page every 10 seconds (ISR)
export const revalidate = 10;

export default function ISRPage() {
  const generatedAt = new Date().toISOString();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>ISR (Incremental Static Regeneration)</h1>
      <p>
        This page is statically generated, and will be revalidated on the server
        every 10 seconds.
      </p>
      <p>
        Generated at: <strong>{generatedAt}</strong>
      </p>
      <p>
        <Link href="/control-panel">Back to Control Panel</Link>
      </p>
    </main>
  );
}
