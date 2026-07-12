"use client";
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
    <section className="pt-32 pb-24" style={{background:"#000"}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block px-3 py-1 rounded-full liquid-glass text-white text-xs font-semibold tracking-wider uppercase">Photography</span>
          <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="text-xs text-white/40 hover:text-[#C4956A] transition-colors underline underline-offset-2">Pexels ↗</a>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">{t("photoTitle")}</h1>
        <p className="text-lg text-white/50 mb-10 max-w-xl">{t("photoDesc")}</p>
        <div className="flex gap-2 mb-10 flex-wrap">
          {catKeys.map(k=>(
            <button key={k} onClick={()=>setCat(k)}
              className={"px-5 py-2 rounded-full text-sm font-medium transition-all "+(cat===k?"photo-filter-active":"liquid-glass text-white/60 hover:text-white")}>
              {pc[k]||k}
            </button>
          ))}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((p:any,i:number)=>(
            <div key={p.id} onClick={()=>open(p,i)} className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative liquid-glass">
              <img decoding="async" src={imgSrc(p)} alt={p.title||"Photo"} className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500" loading="lazy"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs text-white/70">{p.location||p.category}</p>
                  <p className="font-semibold text-sm">{p.title||"Untitled"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-xs text-white/40 mb-2">{t("photoBottom")}</p>
          <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C4956A] text-black text-sm font-medium hover:brightness-110 transition-all">{t("pexelsLink")}</a>
        </div>
      </div>
      {sel&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={close}>
        <div className="relative max-w-5xl w-full mx-4 animate-scaleIn" onClick={e=>e.stopPropagation()}>
          <button onClick={close} className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors text-sm">ESC ✕</button>
          <div className="absolute -top-10 left-0 text-white/40 text-xs">{si+1}/{filtered.length}</div>
          <div className="relative rounded-2xl overflow-hidden bg-black liquid-glass-strong">
            <img decoding="async" src={imgSrc(sel)} alt={sel.title} className="w-full max-h-[75vh] object-contain"/>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white/80 hover:bg-[#C4956A] hover:text-black transition-all flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white/80 hover:bg-[#C4956A] hover:text-black transition-all flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <div className="p-4 rounded-b-2xl liquid-glass">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-bold text-white">{sel.title||"Untitled"}</h3>
              {sel.location&&<span className="text-sm text-[#C4956A] font-medium">{sel.location}</span>}
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              {sel.category&&<span>{pc[sel.category]||sel.category}</span>}
              {sel.camera&&<span>{sel.camera}</span>}
              {sel.exif&&<span>{sel.exif}</span>}
            </div>
            {sel.pexelUrl&&<a href={sel.pexelUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 mt-2 text-xs text-[#C4956A] hover:underline">View on Pexels →</a>}
          </div>
        </div>
      </div>}
    </section>
  );
}
