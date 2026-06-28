import os
base = r"C:\Users\frien\Documents\portfolio\src"

files = {}

# globals.css
files[base + r"\app\globals.css"] = '''@import "tailwindcss";

@layer base {
  body { @apply bg-white text-[#1a1a1a] dark:bg-[#0f0f0f] dark:text-[#f5f5f0]; }
}

@keyframes typewriter-cursor { 0%,100% { opacity:1; } 50% { opacity:0; } }
.typewriter-cursor { display:inline-block; width:2px; height:1.2em; background:#b8860b; margin-left:2px; vertical-align:text-bottom; animation:typewriter-cursor 0.8s infinite; }

@keyframes scale-in { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
.animate-scale-in { animation:scale-in 0.2s ease-out; }

@keyframes role-enter { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
@keyframes role-exit { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-8px); } }
.role-enter { animation:role-enter 0.3s ease-out forwards; }
.role-exit { animation:role-exit 0.3s ease-out forwards; }

.reveal { opacity:0; transform:translateY(20px); transition:opacity 0.6s ease-out, transform 0.6s ease-out; }
.reveal.revealed { opacity:1; transform:translateY(0); }
'''

# layout.tsx
files[base + r"\app\layout.tsx"] = '''import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sam Lee | Furniture Design & Project Management",
  description: "Sam Lee - 30 years of office furniture design and project management. Portfolio of product design, project cases, and photography.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: \(function(){var s=localStorage.getItem("theme");if(s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")})();\ }} />
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
'''

# Navbar
files[base + r"\components\Navbar.tsx"] = '''"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useState } from "react";

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = ["home","about","furniture","projects","photography","travel","contact"];
  const hrefs: Record<string,string> = { home:"/", about:"/about", furniture:"/furniture", projects:"/projects", photography:"/photography", travel:"/travel", contact:"/contact" };

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#e5e5e0] dark:border-[#222]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-sm tracking-tight">Sam Lee</Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map(k => (
            <Link key={k} href={hrefs[k]} className={\px-3 py-1.5 rounded-full text-xs font-medium transition-colors \\}>
              {t("nav."+k)}
            </Link>
          ))}
          <button onClick={toggle} className="ml-3 px-2 py-1 rounded-full bg-[#e5e5e0] dark:bg-[#222] text-xs font-medium">
            {lang==="zh"?"EN":"中"}
          </button>
        </div>
        <button onClick={()=>setOpen(!open)} className="md:hidden text-sm">{open?"✕":"☰"}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-1">
          {links.map(k => (
            <Link key={k} href={hrefs[k]} onClick={()=>setOpen(false)} className={\lock px-3 py-2 rounded-lg text-sm \\}>{t("nav."+k)}</Link>
          ))}
          <button onClick={toggle} className="w-full text-left px-3 py-2 rounded-lg text-sm bg-[#e5e5e0] dark:bg-[#222]">{lang==="zh"?"Switch to English":"切换到中文"}</button>
        </div>
      )}
    </nav>
  );
}
'''

# Footer
files[base + r"\components\Footer.tsx"] = '''"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="border-t border-[#e5e5e0] dark:border-[#222] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6b7280] dark:text-[#9ca3af]">
        <div className="flex gap-4">
          <Link href="/furniture" className="hover:text-[#b8860b]">{t("nav.furniture")}</Link>
          <Link href="/projects" className="hover:text-[#b8860b]">{t("nav.projects")}</Link>
          <Link href="/photography" className="hover:text-[#b8860b]">{t("nav.photography")}</Link>
          <Link href="/travel" className="hover:text-[#b8860b]">{t("nav.travel")}</Link>
        </div>
        <p>© 2026 {t("footer")}</p>
      </div>
    </footer>
  );
}
'''

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {os.path.basename(path)}")