"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="border-t border-[#1A1A1A]/8 py-10" style={{background:"#F6F3EC"}}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-6 text-xs text-[#666]">
          <Link href="/furniture" className="hover:text-[#1A1A1A] transition-colors">{t("nav.furniture")}</Link>
          <Link href="/projects" className="hover:text-[#1A1A1A] transition-colors">{t("nav.projects")}</Link>
          <Link href="/photography" className="hover:text-[#1A1A1A] transition-colors">{t("nav.photography")}</Link>
          <Link href="/travel" className="hover:text-[#1A1A1A] transition-colors">{t("nav.travel")}</Link>
          <Link href="/contact" className="hover:text-[#1A1A1A] transition-colors">{t("nav.contact")}</Link>
        </div>
        <div className="flex gap-4 text-xs text-[#666]">
            <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="hover:text-[#1A1A1A] transition-colors">Pexels</a>
            <a href="https://www.pinterest.com/friendsz9014/" target="_blank" rel="noopener" className="hover:text-[#1A1A1A] transition-colors">Pins</a>
          </div>
          <p className="text-xs text-[#999]">© 2026 Sam Lee</p>
      </div>
    </footer>
  );
}
