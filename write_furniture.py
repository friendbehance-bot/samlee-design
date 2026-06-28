import os
base = r"C:\Users\frien\Documents\portfolio\src\app\(pages)"
pages = {}

# Furniture list
pages[base + r"\furniture\page.tsx"] = '''"use client";
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
'''

# Furniture detail
pages[base + r"\furniture\[id]\page.tsx"] = '''"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import projects from "@/../content/projects.json";

export default function FurnitureDetail() {
  const params = useParams();
  const { t, lang } = useLang();
  const project = projects.find((p:any)=>p.id===params.id);
  if (!project) return <section className="pt-32 pb-24"><div className="max-w-4xl mx-auto px-6 text-center"><h1 className="text-2xl font-bold mb-4">404</h1><p>Project not found</p><Link href="/furniture" className="text-[#b8860b] hover:underline">Back to Works</Link></div></section>;

  const dl = t("detailLabels") as any;

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/furniture" className="inline-flex items-center gap-1 text-sm text-[#6b7280] dark:text-[#9ca3af] hover:text-[#b8860b] transition-colors mb-8">{dl.back}</Link>
        <div className="flex items-center gap-3 mb-4"><span className="px-3 py-1 rounded-full bg-[#b8860b]/10 text-[#b8860b] text-xs font-semibold">{project.category}</span><span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">{project.year}</span><span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">| {dl.role}: {project.role}</span></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{project.title}</h1>
        {project.images.length>0&&<div className="grid gap-4 mb-12">{project.images.map((img:string,i:number)=><div key={i} className="rounded-2xl overflow-hidden bg-[#f5f5f0] dark:bg-[#111]"><img decoding="async" src={assetPath(img)} alt={project.title+" - "+(i+1)} className="w-full object-cover" loading="lazy"/></div>)}</div>}
        <div className="max-w-none"><h2 className="text-xl font-bold mb-4">{dl.info}</h2><p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">{project.description}</p>
        {project.details&&project.details.trim()!==""&&<><h2 className="text-xl font-bold mt-10 mb-4">{dl.specs}</h2><div className="bg-[#f5f5f0] dark:bg-[#111] rounded-2xl p-6"><table className="w-full text-sm"><tbody>{project.details.split("\n").map((line:string,i:number)=>{const ci=line.indexOf(": ");if(ci===-1)return null;const key=line.substring(0,ci);const val=line.substring(ci+2);return<tr key={i} className="border-b border-[#e5e5e0] dark:border-[#2a2a2a] last:border-0"><td className="py-3 pr-4 font-semibold whitespace-nowrap">{key}</td><td className="py-3 text-[#6b7280] dark:text-[#9ca3af]">{val}</td></tr>})}</tbody></table></div></>}
        {project.id==="zoom-booth"&&<><h2 className="text-xl font-bold mt-10 mb-4">{dl.sampling}</h2><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-4">{dl.samplingDesc}</p><div className="grid sm:grid-cols-3 gap-4">{["zoom-1.png","zoom-2.png","zoom-3.png"].map((img,i)=><div key={i} className="rounded-xl overflow-hidden bg-[#f5f5f0] dark:bg-[#111] border border-[#e5e5e0] dark:border-[#2a2a2a]"><img src={assetPath("/images/furniture/phone-proof/"+img)} alt={"Zoom booth sample "+(i+1)} className="w-full aspect-[4/3] object-cover" loading="lazy"/></div>)}</div></>}
        <div className="flex flex-wrap gap-2 mt-8">{project.tags?.map((tag:string)=><span key={tag} className="px-3 py-1 rounded-full bg-[#f5f5f0] dark:bg-[#111] text-sm text-[#6b7280] dark:text-[#9ca3af]">#{tag}</span>)}</div>
        {project.driveLink&&<div className="mt-10 p-6 rounded-2xl bg-[#f5f5f0] dark:bg-[#111] border border-[#e5e5e0] dark:border-[#2a2a2a]"><p className="font-semibold mb-2">{dl.download}</p><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-4">{dl.downloadDesc}</p><a href={project.driveLink} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b8860b] text-white font-semibold text-sm hover:bg-[#8a6508] transition-colors">{dl.downloadBtn}</a></div>}</div>
      </div>
    </section>
  );
}
'''

for path, content in pages.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {os.path.basename(os.path.dirname(path))}/{os.path.basename(path)}")