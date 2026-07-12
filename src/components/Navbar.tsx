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
    <nav className="fixed top-0 w-full z-40 border-b" style={{background:"rgba(0,0,0,0.6)",backdropFilter:"blur(20px)",borderColor:"rgba(255,255,255,0.04)"}}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="mono font-bold text-sm tracking-tight text-white hover:opacity-80 transition-opacity">
          Sam<span style={{color:"#C4956A"}}>.</span>Lee
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map(k => {
            const isActive = pathname === hrefs[k];
            return (
              <Link key={k} href={hrefs[k]}
                    className="mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300"
                    style={isActive ? {color:"#fff"} : {color:"rgba(255,255,255,0.5)"}}>
                {t("nav."+k)}
              </Link>
            );
          })}
          <button onClick={toggle}
                  className="mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300"
                  style={{color:"#C4956A"}}>
            {lang==="zh"?"EN":"中"}
          </button>
        </div>
        <button onClick={()=>setOpen(!open)} className="md:hidden text-sm text-white">{open?"✕":"☰"}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-2" style={{background:"rgba(0,0,0,0.95)"}}>
          {links.map(k => (
            <Link key={k} href={hrefs[k]} onClick={()=>setOpen(false)}
                  className="block py-2 mono text-xs tracking-[0.1em] uppercase"
                  style={pathname===hrefs[k] ? {color:"#fff"} : {color:"rgba(255,255,255,0.5)"}}>
              {t("nav."+k)}
            </Link>
          ))}
          <button onClick={toggle}
                  className="mono text-xs tracking-[0.1em] uppercase transition-all duration-300"
                  style={{color:"#C4956A"}}>
            {lang==="zh"?"Switch to English":"切换到中文"}
          </button>
        </div>
      )}
    </nav>
  );
}
