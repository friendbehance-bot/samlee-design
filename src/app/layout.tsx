import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sam Lee | Furniture Design & Project Management",
  description: "Sam Lee - 30 years of office furniture design and project management. Portfolio of product design, project cases, and photography.",
};

const themeScript = `
(function(){
  var s = localStorage.getItem("theme");
  if (s === "dark" || (!s && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}