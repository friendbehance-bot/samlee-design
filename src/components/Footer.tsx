"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t py-10" style={{background:"#000", borderColor:"rgba(255,255,255,0.04)"}}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-6 text-xs">
          <Link href="/furniture" className="transition-all duration-300" style={{color:"rgba(255,255,255,0.4)"}}>{t("nav.furniture")}</Link>
          <Link href="/projects" className="transition-all duration-300" style={{color:"rgba(255,255,255,0.4)"}}>{t("nav.projects")}</Link>
          <Link href="/photography" className="transition-all duration-300" style={{color:"rgba(255,255,255,0.4)"}}>{t("nav.photography")}</Link>
          <Link href="/travel" className="transition-all duration-300" style={{color:"rgba(255,255,255,0.4)"}}>{t("nav.travel")}</Link>
          <Link href="/contact" className="transition-all duration-300" style={{color:"rgba(255,255,255,0.4)"}}>{t("nav.contact")}</Link>
        </div>
        <div className="flex gap-4 text-xs">
            <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="transition-all duration-300" style={{color:"rgba(255,255,255,0.4)"}}>Pexels</a>
            <a href="https://www.pinterest.com/friendsz9014/" target="_blank" rel="noopener" className="transition-all duration-300" style={{color:"rgba(255,255,255,0.4)"}}>Pins</a>
            <a href="https://www.linkedin.com/in/sam-lee-583aa041a/" target="_blank" rel="noopener" className="transition-all duration-300" style={{color:"rgba(255,255,255,0.4)"}}>LinkedIn</a>
          </div>
          <p className="text-xs" style={{color:"rgba(196,149,106,0.4)"}}>
            &copy; {year} Sam<span style={{color:"#C4956A"}}>.</span>Lee
          </p>
      </div>
    </footer>
  );
}
