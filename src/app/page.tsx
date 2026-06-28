"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import projects from "@/../content/projects.json";
import cases from "@/../content/cases.json";

const roles = [
  { k:"design", i:"✏", c:"text-[#2563eb]", h:"/furniture" },
  { k:"mgmt", i:"◆", c:"text-[#059669]", h:"/projects" },
  { k:"photo", i:"◌", c:"text-[#d97706]", h:"/photography" },
  { k:"travel", i:"△", c:"text-[#dc2626]", h:"/travel" },
];

export default function Home() {
  const { t, lang } = useLang();
  const featured = projects.filter((p:any)=>p.featured);
  const [ri, setRi] = useState(0);
  const [ra, setRa] = useState("role-enter");
  const [typed, setTyped] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => { setRa("role-exit"); setTimeout(()=>{ setRi(p=>(p+1)%4); setRa("role-enter"); },300); },3000);
    return ()=>clearInterval(iv);
  }, []);

  const full = lang==="en"?"Furniture Design / Project Management":"办公家具设计 / 项目管理";
  useEffect(() => {
    setTyped(""); setCursor(true); let i=0;
    const tmr = setInterval(()=>{ if(i<full.length){ setTyped(full.slice(0,i+1)); i++; } else { clearInterval(tmr); setCursor(false); } },50);
    return ()=>clearInterval(tmr);
  }, [full]);

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(184,134,11,0.15),transparent_50%),radial-gradient(ellipse_at_80%_50%,rgba(37,99,235,0.10),transparent_50%)]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-6 reveal revealed flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 bg-white/10">
              <img src={assetPath("/images/profile/sam-lee.jpg")} alt="Sam Lee" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/50 text-[11px] font-medium tracking-[0.2em] uppercase reveal revealed">{t("hero.badge")}</div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6 reveal revealed">Sam Lee</h1>
          <p className="text-lg md:text-xl text-white/40 max-w-lg mx-auto mb-3 leading-relaxed font-light tracking-wide min-h-[2rem] reveal revealed">{typed}{cursor&&<span className="typewriter-cursor"/>}</p>
          <div className="mb-12 flex justify-center min-h-[3rem]"><div className={"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 "+ra}><span className={roles[ri].c}>{roles[ri].i}</span><span className="text-white/70 text-sm font-medium">{t("roles."+roles[ri].k)}</span></div></div>
          <div className="flex flex-wrap gap-3 justify-center reveal revealed">
            <Link href="/furniture" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#b8860b] text-white font-medium text-sm hover:bg-[#8a6508] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#b8860b]/20">{t("btn.works")}</Link>
            <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white/80 font-medium text-sm hover:bg-white/5 hover:-translate-y-0.5 transition-all">{t("btn.cases")}</Link>
            <Link href="/photography" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white/80 font-medium text-sm hover:bg-white/5 hover:-translate-y-0.5 transition-all">{t("btn.photo")}</Link>
          </div>
          <div className="mt-20 reveal revealed"><p className="text-white/20 text-xs uppercase tracking-[0.3em]">{t("scroll")}</p></div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24 bg-white dark:bg-[#111]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div><span className="inline-block px-3 py-1 rounded-full bg-[#b8860b]/10 text-[#b8860b] text-[11px] font-semibold tracking-wider uppercase mb-3">Featured</span><h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("section.featured")}</h2></div>
            <Link href="/furniture" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-[#6b7280] dark:text-[#9ca3af] hover:text-[#b8860b] transition-colors">{t("btn.allWorks")}</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 reveal">{featured.map((p:any)=>
            <Link key={p.id} href={"/furniture/"+p.id} className="group rounded-xl overflow-hidden bg-[#f5f5f0] dark:bg-[#1a1a1a] border border-[#e5e5e0] dark:border-[#2a2a2a] hover:-translate-y-1 transition-all">
              {p.images?.[0]&&<div className="aspect-[4/3] overflow-hidden"><img decoding="async" src={assetPath(p.images[0])} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}
              <div className="p-4"><div className="text-[10px] uppercase tracking-wider text-[#6b7280] dark:text-[#9ca3af] mb-1">{p.category}</div><h3 className="font-semibold text-sm mb-0.5">{p.title}</h3><p className="text-xs text-[#6b7280] dark:text-[#9ca3af] line-clamp-2">{p.description}</p></div>
            </Link>
          )}</div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 bg-[#f5f5f0] dark:bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 items-start reveal">
            <div className="md:col-span-2"><span className="inline-block px-3 py-1 rounded-full bg-[#b8860b]/10 text-[#b8860b] text-[11px] font-semibold tracking-wider uppercase mb-3">About</span><h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{t("section.about")}</h2><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-3 leading-relaxed">{t("about.p1")}</p><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-3 leading-relaxed">{t("about.p2")}</p><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-5 leading-relaxed">{t("about.p3")}</p><Link href="/about" className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-[#b8860b] hover:text-[#8a6508] transition-colors">{t("btn.learnMore")}</Link></div>
            <div className="md:col-span-3 grid grid-cols-2 gap-3">{roles.map(r=><Link key={r.k} href={r.h} className="group p-5 rounded-xl bg-white dark:bg-[#111] border border-[#e5e5e0] dark:border-[#2a2a2a] hover:-translate-y-0.5 transition-all"><div className={"text-lg mb-2 "+r.c}>{r.i}</div><div className="text-sm font-semibold mb-1">{t("roles."+r.k)}</div><div className="text-xs text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">{t("desc."+r.k)}</div></Link>)}</div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="py-24 bg-white dark:bg-[#111]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10"><div><span className="inline-block px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-[11px] font-semibold tracking-wider uppercase mb-3">Projects</span><h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("section.projects")}</h2></div><Link href="/projects" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-[#6b7280] dark:text-[#9ca3af] hover:text-[#059669] transition-colors">{t("btn.allCases")}</Link></div>
          <div className="grid md:grid-cols-2 gap-6 reveal">{cases.map((c:any)=>
            <Link key={c.id} href={"/projects/"+c.id} className="rounded-xl overflow-hidden bg-[#f5f5f0] dark:bg-[#1a1a1a] border border-[#e5e5e0] dark:border-[#2a2a2a] hover:-translate-y-1 transition-all">
              {c.images?.[0]&&<div className="aspect-[16/9] overflow-hidden"><img decoding="async" src={assetPath(c.images[0])} alt={c.title} className="w-full h-full object-cover" /></div>}
              <div className="p-6"><div className="flex items-center gap-2 mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] font-medium">{c.role}</span><span className="text-xs text-[#6b7280]">{c.year}</span></div><h3 className="font-semibold text-base mb-1">{c.title}</h3><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-3">{c.description}</p><div className="flex gap-4 text-xs text-[#6b7280] dark:text-[#9ca3af]"><span>{t("caseLabels.client")}: {c.client}</span><span>{t("caseLabels.scope")}: {c.scope}</span><span>{t("caseLabels.duration")}: {c.duration}</span></div></div>
            </Link>
          )}</div>
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      <section className="py-24 bg-[#f5f5f0] dark:bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-6 text-center reveal"><span className="inline-block px-3 py-1 rounded-full bg-[#d97706]/10 text-[#d97706] text-[11px] font-semibold tracking-wider uppercase mb-3">Photography</span><h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t("section.photography")}</h2><p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-8 max-w-md mx-auto">{t("photoDesc")}</p><div className="flex flex-wrap gap-3 justify-center"><Link href="/photography" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#b8860b] text-white font-medium text-sm hover:bg-[#8a6508] transition-all">{t("btn.browse")}</Link><a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#e5e5e0] dark:border-[#2a2a2a] text-sm font-medium hover:bg-white/50 dark:hover:bg-white/5 transition-all">{t("btn.pexels")}</a></div></div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white dark:bg-[#1a1a1a] border-t border-[#e5e5e0] dark:border-[#2a2a2a]">
        <div className="max-w-2xl mx-auto px-6 text-center reveal"><h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t("section.cta")}</h2><p className="text-[#6b7280] dark:text-[#9ca3af] mb-8 max-w-sm mx-auto">{t("section.ctaDesc")}</p><Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#b8860b] text-white font-medium text-sm hover:bg-[#8a6508] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#b8860b]/20">{t("btn.contact")}</Link></div>
      </section>
    </>
  );
}

