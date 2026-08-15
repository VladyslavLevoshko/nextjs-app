import "./globals.css";
import { Header, Footer, LayoutBody } from "./LayoutComponents";
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
      <LayoutBody>
        <SessionProviderClient>
          <Header/>
          { children }
          <Footer/>
        </SessionProviderClient>
      </LayoutBody>
    </html>
  );
};