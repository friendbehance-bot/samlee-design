"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import cases from "@/../content/cases.json";

export function CaseDetailClient() {
  const params = useParams();
  const { t, lang } = useLang();
  const c = cases.find((cc:any)=>cc.id===params.id);
  if (!c) return <section className="pt-32 pb-24" style={{background:"#000"}}><div className="max-w-4xl mx-auto px-6 text-center"><h1 className="text-2xl font-bold mb-4 text-white">404</h1><Link href="/projects" className="text-[#C4956A] hover:underline">Back to Cases</Link></div></section>;
  const cl = t("caseLabels") as any;
  return (
    <section className="pt-32 pb-24" style={{background:"#000"}}>
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-[#C4956A] transition-colors mb-8">{lang==="en"?"← Back to Case List":"← 返回案例列表"}</Link>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full liquid-glass text-white text-xs font-semibold">{c.year}</span>
          <span className="text-sm text-white/50">{cl.client}: {c.client}</span>
          <span className="text-sm text-white/50">| {cl.scope}: {c.scope}</span>
          <span className="text-sm text-white/50">| {cl.duration}: {c.duration}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">{c.title}</h1>
        <div className="flex gap-2 mb-8"><span className="px-3 py-1 rounded-full liquid-glass-gold text-white text-xs font-medium">{cl.role}: {c.role}</span></div>
        {c.images?.length>0&&<div className="grid gap-4 mb-10">{c.images.map((img:string,i:number)=><div key={i} className="rounded-2xl overflow-hidden liquid-glass"><img decoding="async" src={assetPath(img)} alt={c.title+" - "+(i+1)} className="w-full object-cover" loading="lazy"/></div>)}</div>}
        <p className="text-white/60 leading-relaxed">{c.description}</p>
      </div>
    </section>
  );
}
