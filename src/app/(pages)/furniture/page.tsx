"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import projects from "@/../content/projects.json";

const catKeys = ["全部","声学隔断","系统家具","办公桌","会议桌","沙发","储物柜","静音舱"];

export default function Furniture() {
  const { t, lang } = useLang();
  const [cat, setCat] = useState("全部");
  const cats = t("furnitureCats") as any;
  const filtered = cat==="全部"?projects:projects.filter((p:any)=>p.category===cat);

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <span className="inline-block px-3 py-1 rounded-full bg-[#b8860b]/10 text-[#b8860b] text-xs font-semibold tracking-wider uppercase mb-4">Furniture Design</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("furnitureTitle")}</h1>
        <p className="text-lg text-[#6b7280] dark:text-[#9ca3af] mb-10 max-w-xl">{t("furnitureDesc")}</p>
        <div className="flex gap-2 mb-10 flex-wrap">{catKeys.map(k=><button key={k} onClick={()=>setCat(k)} className={"px-5 py-2 rounded-full text-sm font-medium transition-all "+(cat===k?"bg-[#b8860b] text-white":"bg-transparent border border-[#e5e5e0] dark:border-[#2a2a2a] text-[#6b7280] dark:text-[#9ca3af] hover:border-[#b8860b]")}>{cats[k]||k}</button>)}</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map((p:any)=><Link key={p.id} href={"/furniture/"+p.id} className="group rounded-xl overflow-hidden bg-[#f5f5f0] dark:bg-[#1a1a1a] border border-[#e5e5e0] dark:border-[#2a2a2a] hover:-translate-y-1 transition-all">{p.images?.[0]&&<div className="aspect-[4/3] overflow-hidden"><img decoding="async" src={assetPath(p.images[0])} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/></div>}<div className="p-4"><div className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#9ca3af] mb-1">{p.category}</div><h3 className="font-semibold text-sm mb-0.5">{p.title}</h3><p className="text-xs text-[#6b7280] dark:text-[#9ca3af]">{p.description}</p></div></Link>)}</div>
      </div>
    </section>
  );
}
