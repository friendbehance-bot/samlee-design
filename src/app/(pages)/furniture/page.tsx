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
    <section className="pt-32 pb-24" style={{background:"#000"}}>
      <div className="max-w-6xl mx-auto px-6">
        <span className="inline-block px-3 py-1 rounded-full liquid-glass text-white text-xs font-semibold tracking-wider uppercase mb-4">Furniture Design</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">{t("furnitureTitle")}</h1>
        <p className="text-lg text-white/50 mb-10 max-w-xl">{t("furnitureDesc")}</p>
        <div className="flex gap-2 mb-10 flex-wrap">
          {catKeys.map(k=>(
            <button key={k} onClick={()=>setCat(k)}
              className={"px-5 py-2 rounded-full text-sm font-medium transition-all "+(cat===k?"bg-[#C4956A] text-black":"liquid-glass text-white/60 hover:text-white")}>
              {cats[k]||k}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p:any)=>(
            <Link key={p.id} href={"/furniture/"+p.id}
              className="group rounded-xl overflow-hidden liquid-glass hover:-translate-y-1 transition-all">
              {p.images?.[0]&&(
                <div className="aspect-[4/3] overflow-hidden">
                  <img decoding="async" src={assetPath(p.images[0])} alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/>
                </div>
              )}
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{p.category}</div>
                <h3 className="font-semibold text-sm mb-0.5 text-white">{p.title}</h3>
                <p className="text-xs text-white/50">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
