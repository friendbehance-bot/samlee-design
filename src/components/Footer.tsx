"use client";
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
