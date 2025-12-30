import Link from "next/link";

// Force static generation at build time
export const dynamic = "force-static";

export default function SSGPage() {
  // When built, this timestamp will be the build-time value.
  const buildTime = new Date().toISOString();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>SSG (Static Site Generation)</h1>
      <p>This page is statically generated at build time.</p>
      <p>
        Build time: <strong>{buildTime}</strong>
      </p>
      <p>
        <Link href="/control-panel">Back to Control Panel</Link>
      </p>
    </main>
  );
}
