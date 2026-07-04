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
    <nav className="fixed top-0 w-full z-40 border-b" style={{background:"rgba(246,243,236,0.85)",backdropFilter:"blur(12px)",borderColor:"rgba(26,26,26,0.06)"}}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="mono font-bold text-sm tracking-tight" style={{color:"#1A1A1A"}}>
          Sam<span style={{color:"#C4956A"}}>.</span>Lee
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map(k => {
            const isActive = pathname === hrefs[k];
            return (
              <Link key={k} href={hrefs[k]}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "hover:bg-[#1A1A1A]/5"}`}
                    style={isActive ? {background:"#C4956A",color:"#fff"} : {color:"#666"}}>
                {t("nav."+k)}
              </Link>
            );
          })}
          <button onClick={toggle}
                  className="ml-3 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300"
                  style={{border:"1px solid rgba(196,149,106,0.2)", color:"#8B6914", background:"rgba(196,149,106,0.06)"}}>
            {lang==="zh"?"EN":"中"}
          </button>
        </div>
        <button onClick={()=>setOpen(!open)} className="md:hidden text-sm" style={{color:"#1A1A1A"}}>{open?"✕":"☰"}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-1" style={{background:"#F6F3EC"}}>
          {links.map(k => (
            <Link key={k} href={hrefs[k]} onClick={()=>setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm"
                  style={pathname===hrefs[k] ? {background:"#C4956A",color:"#fff"} : {color:"#666"}}>
              {t("nav."+k)}
            </Link>
          ))}
          <button onClick={toggle}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm"
                  style={{border:"1px solid rgba(196,149,106,0.2)", color:"#8B6914", background:"rgba(196,149,106,0.06)"}}>
            {lang==="zh"?"Switch to English":"切换到中文"}
          </button>
        </div>
      )}
    </nav>
  );
}
