import Link from "next/link";

// Force server-side rendering for this page
export const dynamic = "force-dynamic";

export default function SSRPage() {
  const serverTime = new Date().toISOString();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>SSR (Server-side Rendering)</h1>
      <p>This page is rendered on every request on the server.</p>
      <p>
        Server time: <strong>{serverTime}</strong>
      </p>
        <p>
          <Link href="/">Back to App</Link>
        </p>
        <p>
          {/* Link to nested route: /ssr/extra_folder */}
          <Link href="/ssr/extra_folder">Go to extra_folder</Link>
        </p>
    </main>
  );
}
