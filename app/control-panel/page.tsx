import Link from "next/link";

export default function ControlPanel() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, -apple-system, Roboto" }}>
      <h1>Control Panel</h1>
      <p>Choose a page to see how it's rendered:</p>
      <ul>
        <li>
          <Link href="/ssr">SSR (Server-side Rendering)</Link>
        </li>
        <li>
          <Link href="/ssg">SSG (Static Site Generation)</Link>
        </li>
        <li>
          <Link href="/isr">ISR (Incremental Static Regeneration)</Link>
        </li>
        <li>
          <Link href="/csr">CSR (Client-side Rendering)</Link>
        </li>
      </ul>
    </main>
  );
}
