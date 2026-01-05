'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CSRPage() {
  const [time, setTime] = useState(() => new Date().toISOString());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toISOString()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>CSR (Client-side Rendering)</h1>
      <p>This page runs on the client and updates the time every second.</p>
      <p>
        Client time: <strong>{time}</strong>
        <span>Checking re-building</span>
      </p>
      <p>
        <Link href="/">Back to Control Panel</Link>
      </p>
    </main>
  );
}
