import "./globals.css";
import Header from "./LayoutComponents/Header";
import Footer from "./LayoutComponents/Footer";
import SessionProviderClient from "./providers/SessionProviderClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "WD1",
    template: "%s | WD1",
  },
  description: "Platform for creating, buying, and managing posts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <SessionProviderClient>
          <Header/>
          <main className="pt-16">{children}</main>
          <Footer/>
        </SessionProviderClient>
      </body>
    </html>
  );
};