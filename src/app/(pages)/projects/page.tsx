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
        <span className="inline-block px-3 py-1 rounded-full bg-[#1A1A1A]/8 text-[#1A1A1A] text-xs font-semibold tracking-wider uppercase mb-4">Project Management</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("projectsTitle")}</h1>
        <p className="text-lg text-[#666] mb-10 max-w-xl">{t("projectsDesc")}</p>
        <div className="grid md:grid-cols-2 gap-6">{cases.map((c:any)=><Link key={c.id} href={"/projects/"+c.id} className="rounded-xl overflow-hidden  border border-[#1A1A1A]/8 hover:-translate-y-1 transition-all">{c.images?.[0]&&<div className="aspect-[16/9] overflow-hidden"><img decoding="async" src={assetPath(c.images[0])} alt={c.title} className="w-full h-full object-cover" loading="lazy"/></div>}<div className="p-6"><div className="flex items-center gap-2 mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-[#1A1A1A]/8 text-[#1A1A1A] font-medium">{c.role}</span><span className="text-xs text-[#666]">{c.year}</span></div><h3 className="font-semibold text-base mb-1">{c.title}</h3><p className="text-sm text-[#666] mb-3">{c.description}</p><div className="flex gap-4 text-xs text-[#666]"><span>{t("caseLabels.client")}: {c.client}</span><span>{t("caseLabels.scope")}: {c.scope}</span><span>{t("caseLabels.duration")}: {c.duration}</span></div></div></Link>)}</div>
      </div>
    </section>
  );
}
