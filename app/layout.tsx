// ...existing code...
import "./globals.css";
import Link from "next/link";

// ...existing code...
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <nav aria-label="Main navigation">
                <ul className="flex items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/users"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/posts"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/posts/new"
                      className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                    >
                      New Post
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Auth">
                <ul className="flex items-center gap-2">
                  <li>
                    <Link
                      href="/users/new_user"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/users/sign_in"
                      className="px-3 py-2 rounded-md text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition"
                    >
                      Sign in
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
};