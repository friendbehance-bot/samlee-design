"use client";
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
          {links.map(k => {
            const isActive = pathname === hrefs[k];
            const cls = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " + (isActive ? "bg-[#b8860b]/10 text-[#b8860b]" : "text-[#6b7280] dark:text-[#9ca3af] hover:text-[#1a1a1a] dark:hover:text-white");
            return <Link key={k} href={hrefs[k]} className={cls}>{t("nav."+k)}</Link>;
          })}
          <button onClick={toggle} className="ml-3 px-2 py-1 rounded-full bg-[#e5e5e0] dark:bg-[#222] text-xs font-medium">
            {lang==="zh"?"EN":"中"}
          </button>
        </div>
        <button onClick={()=>setOpen(!open)} className="md:hidden text-sm">{open?"✕":"☰"}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-1">
          {links.map(k => <Link key={k} href={hrefs[k]} onClick={()=>setOpen(false)} className={"block px-3 py-2 rounded-lg text-sm "+(pathname===hrefs[k]?"bg-[#b8860b]/10 text-[#b8860b]":"text-[#6b7280]")}>{t("nav."+k)}</Link>)}
          <button onClick={toggle} className="w-full text-left px-3 py-2 rounded-lg text-sm bg-[#e5e5e0] dark:bg-[#222]">{lang==="zh"?"Switch to English":"切换到中文"}</button>
        </div>
      )}
    </nav>
  );
}