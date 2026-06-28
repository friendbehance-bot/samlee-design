"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import cases from "@/../content/cases.json";

export default function Projects() {
  const { t, lang } = useLang();
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <span className="inline-block px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-semibold tracking-wider uppercase mb-4">Project Management</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("projectsTitle")}</h1>
        <p className="text-lg text-[#6b7280] dark:text-[#9ca3af] mb-10 max-w-xl">{t("projectsDesc")}</p>
        <div className="grid md:grid-cols-2 gap-6">{cases.map((c:any)=><Link key={c.id} href={"/projects/"+c.id} className="rounded-xl overflow-hidden bg-[#f5f5f0] dark:bg-[#1a1a1a] border border-[#e5e5e0] dark:border-[#2a2a2a] hover:-translate-y-1 transition-all">{c.images?.[0]&&<div className="aspect-[16/9] overflow-hidden"><img decoding="async" src={assetPath(c.images[0])} alt={c.title} className="w-full h-full object-cover" loading="lazy"/></div>}<div className="p-6"><div className="flex items-center gap-2 mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] font-medium">{c.role}</span><span className="text-xs text-[#6b7280]">{c.year}</span></div><h3 className="font-semibold text-base mb-1">{c.title}</h3><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-3">{c.description}</p><div className="flex gap-4 text-xs text-[#6b7280] dark:text-[#9ca3af]"><span>{t("caseLabels.client")}: {c.client}</span><span>{t("caseLabels.scope")}: {c.scope}</span><span>{t("caseLabels.duration")}: {c.duration}</span></div></div></Link>)}</div>
      </div>
    </section>
  );
}
