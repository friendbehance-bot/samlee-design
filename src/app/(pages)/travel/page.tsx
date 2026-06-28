"use client";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import posts from "@/../content/travel.json";

export default function Travel() {
  const { t, lang } = useLang();
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-block px-3 py-1 rounded-full bg-[#dc2626]/10 text-[#dc2626] text-xs font-semibold tracking-wider uppercase mb-4">Travel Notes</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("travelTitle")}</h1>
        <p className="text-lg text-[#6b7280] dark:text-[#9ca3af] mb-14 max-w-xl">{t("travelDesc")}</p>
        <div className="space-y-16">{posts.map((post:any)=>{const title=lang==="en"&&post.titleEn?post.titleEn:post.title;const content=lang==="en"&&post.contentEn?post.contentEn:post.content;const imgs=post.images;return<article key={post.id} className="group"><div className={"grid gap-2 mb-6 "+(imgs.length>1?"grid-cols-3":"")}>{imgs.map((img:string,i:number)=><div key={i} className="rounded-2xl overflow-hidden bg-[#f5f5f0] dark:bg-[#111]"><img decoding="async" src={assetPath(img)} alt={title+(imgs.length>1?" - "+(i+1):"")} className={"w-full object-cover "+(imgs.length>1?"aspect-[4/3]":"aspect-[16/9]")} loading="lazy"/></div>)}</div><div className="space-y-3"><div className="flex items-center gap-3 text-sm"><span className="text-[#dc2626] font-medium">{post.location}</span><span className="text-[#6b7280] dark:text-[#9ca3af]">|</span><span className="text-[#6b7280] dark:text-[#9ca3af]">{post.date}</span></div><h2 className="text-2xl font-bold tracking-tight">{title}</h2><p className="text-[#4b5563] dark:text-[#9ca3af] leading-relaxed whitespace-pre-line">{content}</p><div className="flex gap-2 pt-2">{post.tags?.map((tag:string)=><span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#dc2626]/5 text-[#dc2626]/70 border border-[#dc2626]/10">#{tag}</span>)}</div></div></article>})}</div>
      </div>
    </section>
  );
}
