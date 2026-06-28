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
        <span className="inline-block px-3 py-1 rounded-full bg-[#1A1A1A]/8 text-[#1A1A1A] text-xs font-semibold tracking-wider uppercase mb-4">Furniture Design</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("furnitureTitle")}</h1>
        <p className="text-lg text-[#666] mb-10 max-w-xl">{t("furnitureDesc")}</p>
        <div className="flex gap-2 mb-10 flex-wrap">{catKeys.map(k=><button key={k} onClick={()=>setCat(k)} className={"px-5 py-2 rounded-full text-sm font-medium transition-all "+(cat===k?"bg-[#1A1A1A] text-white":"bg-transparent border border-[#1A1A1A]/8 text-[#666] hover:border-[#b8860b]")}>{cats[k]||k}</button>)}</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map((p:any)=><Link key={p.id} href={"/furniture/"+p.id} className="group rounded-xl overflow-hidden  border border-[#1A1A1A]/8 hover:-translate-y-1 transition-all">{p.images?.[0]&&<div className="aspect-[4/3] overflow-hidden"><img decoding="async" src={assetPath(p.images[0])} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/></div>}<div className="p-4"><div className="text-[10px] uppercase tracking-wider text-[#666] mb-1">{p.category}</div><h3 className="font-semibold text-sm mb-0.5">{p.title}</h3><p className="text-xs text-[#666]">{p.description}</p></div></Link>)}</div>
      </div>
    </section>
  );
}
