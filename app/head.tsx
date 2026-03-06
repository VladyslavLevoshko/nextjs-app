export default function Head() {
  return (
    <>
      {/* основной SVG-фавикон */}
      <link rel="icon" href="/public/favicon.svg" type="image/svg+xml" />
      {/* fallback для браузеров, которые не поддерживают SVG favicons */}
      <link rel="icon" href="/public/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}