"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import projects from "@/../content/projects.json";

const selected = projects.filter((p:any)=>p.featured).slice(0,6);

export default function Home() {
  const { t, lang } = useLang();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const tmr = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(tmr);
  }, []);

  const label = lang==="en" ? "AVAILABLE FOR WORK" : "开放合作";
  const tagline = lang==="en"
    ? <>furniture designer<br/>from TAIWAN<br/>working globally.</>
    : <>办公家具设计师<br/>来自台湾<br/>服务全球。</>;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6" style={{background:"#F6F3EC"}}>
        {/* 可用状态标签 */}
        <div className={`mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1A1A1A]/15 text-xs font-medium tracking-[0.15em] uppercase ${loaded ? "animate-fadeUp" : "opacity-0"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
          {label}
        </div>

        {/* 主标题 */}
        <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-center mb-10 ${loaded ? "animate-fadeUp" : "opacity-0"}`} style={{animationDelay:"0.1s",fontFamily:"'Azeret Mono',monospace"}}>
          Sam Lee
        </h1>

        {/* 副标题 */}
        <p className={`text-base sm:text-lg md:text-xl text-[#666666] text-center leading-relaxed max-w-xl mb-16 ${loaded ? "animate-fadeUp" : "opacity-0"}`} style={{animationDelay:"0.2s"}}>
          {tagline}
        </p>

        {/* CTA 按钮 */}
        <div className={`flex gap-4 ${loaded ? "animate-fadeUp" : "opacity-0"}`} style={{animationDelay:"0.3s"}}>
          <Link href="/furniture" className="mono inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#333] transition-colors">
            {t("btn.works")} <span className="text-lg">&rarr;</span>
          </Link>
          <Link href="/about" className="mono inline-flex items-center gap-2 px-6 py-3 border border-[#1A1A1A]/15 text-[#1A1A1A] text-sm font-medium hover:bg-[#1A1A1A]/5 transition-colors">
            {t("btn.learnMore")}
          </Link>
        </div>

        {/* 滚动引导 */}
        <div className={`absolute bottom-10 flex flex-col items-center gap-2 text-[#666666] text-xs tracking-[0.2em] uppercase ${loaded ? "animate-fadeUp" : "opacity-0"}`} style={{animationDelay:"0.5s"}}>
          <span>{t("scroll")}</span>
          <span className="text-lg animate-bounceArrow">&darr;</span>
        </div>
      </section>

      {/* ===== SELECTED WORK ===== */}
      <section className="py-32 px-6" style={{background:"#F6F3EC"}}>
        <div className="max-w-6xl mx-auto">
          <h2 className="mono text-xs tracking-[0.3em] uppercase text-[#666666] mb-12 reveal revealed">
            {lang==="en" ? "SELECTED WORK" : "精选作品"}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 reveal revealed">
            {selected.map((p:any, i:number) => (
              <Link key={p.id} href={"/furniture/"+p.id} className="group block">
                {/* 编号 + 项目名 */}
                <div className="mono text-xs text-[#999] mb-3 tracking-wide">
                  {String(i+1).padStart(2,"0")} / {p.title}
                </div>
                {/* 图片 */}
                {p.images?.[0] && (
                  <div className="aspect-[4/3] overflow-hidden mb-4 bg-[#e8e4da]">
                    <img
                      src={assetPath(p.images[0])}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600"
                    />
                  </div>
                )}
                {/* CTA */}
                <div className="mono text-xs font-medium text-[#1A1A1A] group-hover:text-[#666] transition-colors inline-flex items-center gap-1">
                  {lang==="en" ? "VIEW PROJECT" : "查看项目"} <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/furniture" className="mono inline-flex items-center gap-2 text-sm text-[#1A1A1A] hover:text-[#666] transition-colors">
              {t("btn.allWorks")}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-32 px-6 border-t border-[#1A1A1A]/8" style={{background:"#F6F3EC"}}>
        <div className="max-w-2xl mx-auto reveal revealed">
          <h2 className="mono text-xs tracking-[0.3em] uppercase text-[#666666] mb-8">
            {lang==="en" ? "ABOUT SAM" : "关于 Sam"}
          </h2>
          <p className="text-lg sm:text-xl text-[#1A1A1A] leading-relaxed mb-6">
            {t("about.p1")}
          </p>
          <p className="text-base text-[#666] leading-relaxed mb-3">
            {t("about.p2")}
          </p>
          <p className="text-base text-[#666] leading-relaxed mb-8">
            {t("about.p3")}
          </p>
          <Link href="/about" className="mono text-sm text-[#1A1A1A] hover:text-[#666] transition-colors inline-flex items-center gap-1">
            {lang==="en" ? "read more" : "了解更多"} <span>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="py-24 px-6 border-t border-[#1A1A1A]/8" style={{background:"#F6F3EC"}}>
        <div className="max-w-xl mx-auto text-center reveal revealed">
          <h2 className="mono text-xs tracking-[0.3em] uppercase text-[#666666] mb-8">
            {lang==="en" ? "GET IN TOUCH" : "取得联系"}
          </h2>
          <a href="mailto:friendbehance@gmail.com" className="mono text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-wider hover:text-[#666] transition-colors break-all">
            FRIENDBEHANCE@GMAIL.COM
          </a>
          <div className="flex gap-6 justify-center mt-10">
            <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="mono text-sm text-[#666] hover:text-[#1A1A1A] transition-colors">Pexels</a>
          </div>
        </div>
      </section>
    </>
  );
}
