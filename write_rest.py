import os
base = r"C:\Users\frien\Documents\portfolio\src\app\(pages)"
pages = {}

# Projects
pages[base + r"\projects\page.tsx"] = '''"use client";
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
'''

# Projects detail
pages[base + r"\projects\[id]\page.tsx"] = '''"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import cases from "@/../content/cases.json";

export default function CaseDetail() {
  const params = useParams();
  const { t, lang } = useLang();
  const c = cases.find((cc:any)=>cc.id===params.id);
  if (!c) return <section className="pt-32 pb-24"><div className="max-w-4xl mx-auto px-6 text-center"><h1 className="text-2xl font-bold mb-4">404</h1><Link href="/projects" className="text-[#b8860b] hover:underline">Back to Cases</Link></div></section>;
  const cl = t("caseLabels") as any;
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-[#6b7280] dark:text-[#9ca3af] hover:text-[#059669] transition-colors mb-8">{lang==="en"?"← Back to Case List":"← 返回案例列表"}</Link>
        <div className="flex flex-wrap items-center gap-3 mb-4"><span className="px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-semibold">{c.year}</span><span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">{cl.client}: {c.client}</span><span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">| {cl.scope}: {c.scope}</span><span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">| {cl.duration}: {c.duration}</span></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{c.title}</h1>
        <div className="flex gap-2 mb-8"><span className="px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-medium">{cl.role}: {c.role}</span></div>
        {c.images?.length>0&&<div className="grid gap-4 mb-10">{c.images.map((img:string,i:number)=><div key={i} className="rounded-2xl overflow-hidden bg-[#f5f5f0] dark:bg-[#111]"><img decoding="async" src={assetPath(img)} alt={c.title+" - "+(i+1)} className="w-full object-cover" loading="lazy"/></div>)}</div>}
        <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">{c.description}</p>
      </div>
    </section>
  );
}
'''

# Photography
pages[base + r"\photography\page.tsx"] = '''"use client";
import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import photos from "@/../content/photos.json";

const catKeys = ["全部","architecture","street","travel"];

export default function Photography() {
  const { t, lang } = useLang();
  const pc = t("photoCats") as any;
  const [cat, setCat] = useState("全部");
  const [sel, setSel] = useState<any>(null);
  const [si, setSi] = useState(0);
  const filtered = cat==="全部"?photos:photos.filter((p:any)=>p.category===cat);
  const open = useCallback((p:any,i:number)=>{ setSel(p); setSi(i); },[]);
  const close = useCallback(()=>setSel(null),[]);
  const next = useCallback(()=>{ const idx=(si+1)%filtered.length; setSel(filtered[idx]); setSi(idx); },[si,filtered]);
  const prev = useCallback(()=>{ const idx=(si-1+filtered.length)%filtered.length; setSel(filtered[idx]); setSi(idx); },[si,filtered]);
  useEffect(()=>{ if(!sel)return; const h=(e:KeyboardEvent)=>{ if(e.key==="Escape")close(); if(e.key==="ArrowRight")next(); if(e.key==="ArrowLeft")prev(); }; window.addEventListener("keydown",h); return()=>window.removeEventListener("keydown",h); },[sel,next,prev,close]);
  const imgSrc=(p:any)=>p.src.startsWith("http")?p.src:assetPath(p.src);

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4"><span className="inline-block px-3 py-1 rounded-full bg-[#d97706]/10 text-[#d97706] text-xs font-semibold tracking-wider uppercase">Photography</span><a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="text-xs text-[#6b7280] dark:text-[#9ca3af] hover:text-[#d97706] transition-colors underline underline-offset-2">Pexels ↗</a></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("photoTitle")}</h1>
        <p className="text-lg text-[#6b7280] dark:text-[#9ca3af] mb-10 max-w-xl">{t("photoDesc")}</p>
        <div className="flex gap-2 mb-10 flex-wrap">{catKeys.map(k=><button key={k} onClick={()=>setCat(k)} className={"px-5 py-2 rounded-full text-sm font-medium transition-all "+(cat===k?"bg-[#d97706] text-white":"bg-transparent border border-[#e5e5e0] dark:border-[#2a2a2a] text-[#6b7280] dark:text-[#9ca3af] hover:border-[#d97706]")}>{pc[k]||k}</button>)}</div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">{filtered.map((p:any,i:number)=><div key={p.id} onClick={()=>open(p,i)} className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"><img decoding="async" src={imgSrc(p)} alt={p.title||"Photo"} className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500" loading="lazy"/><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div className="absolute bottom-4 left-4 text-white"><p className="text-xs text-white/70">{p.location||p.category}</p><p className="font-semibold text-sm">{p.title||"Untitled"}</p></div></div></div>)}</div>
        <div className="mt-16 text-center"><p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mb-2">{t("photoBottom")}</p><a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d97706]/10 text-[#d97706] text-sm font-medium hover:bg-[#d97706]/20 transition-all">{t("pexelsLink")}</a></div>
      </div>
      {sel&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={close}><div className="relative max-w-5xl w-full mx-4 animate-scale-in" onClick={e=>e.stopPropagation()}><button onClick={close} className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors text-sm">ESC ✕</button><div className="absolute -top-10 left-0 text-white/40 text-xs">{si+1}/{filtered.length}</div><div className="relative rounded-2xl overflow-hidden bg-black"><img decoding="async" src={imgSrc(sel)} alt={sel.title} className="w-full max-h-[75vh] object-contain"/><button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-all flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-all flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button></div><div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-b-2xl"><div className="flex items-center gap-3 mb-1"><h3 className="font-bold">{sel.title||"Untitled"}</h3>{sel.location&&<span className="text-sm text-[#d97706] font-medium">{sel.location}</span>}</div><div className="flex items-center gap-4 text-xs text-[#6b7280] dark:text-[#9ca3af]">{sel.category&&<span>{pc[sel.category]||sel.category}</span>}{sel.camera&&<span>{sel.camera}</span>}{sel.exif&&<span>{sel.exif}</span>}</div>{sel.pexelUrl&&<a href={sel.pexelUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 mt-2 text-xs text-[#d97706] hover:underline">View on Pexels →</a>}</div></div></div>}
    </section>
  );
}
'''

# Travel
pages[base + r"\travel\page.tsx"] = '''"use client";
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
'''

# Contact
pages[base + r"\contact\page.tsx"] = '''"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";

export default function Contact() {
  const { t, lang } = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{setMounted(true);},[]);
  const cp = t("contactPage") as any;

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8"><div className="rounded-2xl overflow-hidden bg-black max-w-2xl mx-auto"><video src={assetPath("/videos/sam-animation.mp4")} className="w-full aspect-video" autoPlay muted loop playsInline controls preload="auto"/></div><p className="text-center text-xs text-[#6b7280] dark:text-[#9ca3af] mt-3">{t("videoHint")}</p></div>
        <div className="mb-12"><span className="inline-block px-3 py-1 rounded-full bg-[#b8860b]/10 text-[#b8860b] text-xs font-semibold tracking-wider uppercase mb-4">Contact</span><h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{cp.title}</h1><p className="text-lg text-[#6b7280] dark:text-[#9ca3af]">{cp.detail_p}</p></div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">{[
          {h:cp.email,v:"friendbehance@gmail.com",n:cp.reply,link:"mailto:friendbehance@gmail.com"},
          {h:cp.wechat,v:"frendsamlee",n:cp.wechat_note,link:null},
          {h:cp.pexels,v:"pexels.com/@sam-lee",n:cp.follow_photo,link:"https://www.pexels.com/@sam-lee-2162121365/"},
        ].map((item,i)=><div key={i} className={"p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#e5e5e0] dark:border-[#2a2a2a] transition-all duration-500 "+(mounted?"opacity-100 translate-y-0":"opacity-0 translate-y-4")} style={{transitionDelay:i*100+"ms"}}><h3 className="font-bold mb-3">{item.h}</h3>{item.link?<a href={item.link} target="_blank" rel="noopener" className="text-[#b8860b] hover:underline text-sm">{item.v}</a>:<p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">{item.v}</p>}<p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-2">{item.n}</p></div>)}</div>
        <div className={"p-8 rounded-2xl bg-[#f5f5f0] dark:bg-[#111] border border-[#e5e5e0] dark:border-[#2a2a2a] text-center transition-all duration-700 "+(mounted?"opacity-100 scale-100":"opacity-0 scale-95")}><h3 className="font-bold text-lg mb-2">{cp.chat_cta}</h3><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-4">{cp.chat_desc}</p><a href="mailto:friendbehance@gmail.com" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#b8860b] text-white font-medium text-sm hover:bg-[#8a6508] hover:-translate-y-0.5 transition-all">{cp.send_email}</a></div>
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