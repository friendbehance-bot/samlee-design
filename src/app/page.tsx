"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import projects from "@/../content/projects.json";

const selected = projects.filter((p: any) => p.featured).slice(0, 6);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const tmr = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(tmr);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(prev => new Set(prev).add(entry.target.id || "section-" + Math.random()));
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal-up, .reveal-scale, .reveal-stagger").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [loaded]);

  const tagline = lang === "en"
    ? (<>furniture designer<br/>from China<br/>working globally.</>)
    : (<>办公家具设计师<br/>中国原创<br/>服务全球。</>);

  const heroImages = [
    selected[0]?.images?.[0] || "/images/furniture/panel/Dynasty_01.jpg",
    selected[1]?.images?.[0] || "/images/furniture/desk/FLEX_01.png",
    selected[4]?.images?.[0] || "/images/furniture/sofa/GRANDEUR_01.jpg",
    "/images/photography/architecture/DSC01710.jpg",
    "/images/photography/architecture/DSC03106-.jpg.jpg",
    selected[5]?.images?.[0] || "/images/furniture/sofa/Tranquo_01.jpg",
  ].filter(Boolean);

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [loaded, heroImages.length]);

  const heroImg = selected[0]?.images?.[0] || "/images/furniture/panel/Dynasty_01.jpg";
  const heroLabel = lang === "en" ? "EST. 1996 · 30 YEARS" : "始于1996 · 三十年";

  const caps = lang === "en"
    ? [
        { label: "Panel Products", desc: "30 years of panel-based office furniture" },
        { label: "Ergonomic Seating", desc: "Chairs designed for all-day comfort" },
        { label: "Smart Desking", desc: "Height-adjustable electric desk systems" },
        { label: "Acoustic Systems", desc: "Modular partition & privacy solutions" },
      ]
    : [
        { label: "板类产品", desc: "30年板式家具积淀" },
        { label: "人体工学椅", desc: "全天候舒适坐具" },
        { label: "智能升降桌", desc: "坐站交替办公方案" },
        { label: "声学隔断", desc: "模块化隔断系统" },
      ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="min-h-screen flex items-end md:items-center relative overflow-hidden" style={{ background: "#F6F3EC" }}>
        {/* Grain overlay */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{ opacity: 0.25, backgroundImage: "url(data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)", backgroundSize: "256px 256px", backgroundRepeat: "repeat" }} />
        <div className="w-full grid md:grid-cols-2 min-h-screen relative z-[2]">
          {/* LEFT - Text */}
          <div ref={textRef} className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 md:py-0 relative">
            <div ref={watermarkRef} className="watermark-30" style={{ bottom: "0.5em", left: "0.3em" }}>30</div>
            <div className="relative z-10">
              <div className="hero-label mono text-[10px] tracking-[0.2em] mb-6 opacity-0" style={{ color: "#C4956A" }}>
                {heroLabel}
              </div>
              <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-tight mb-6 opacity-0"
                style={{ fontFamily: "'Azeret Mono',monospace", letterSpacing: "-0.04em" }}>
                Sam<br/>Lee
              </h1>
              <p className="hero-tagline text-base sm:text-lg leading-relaxed max-w-sm mb-12 opacity-0" style={{ color: "#666" }}>
                {tagline}
              </p>
              <div className="hero-buttons flex gap-4 opacity-0">
                <Link href="/furniture" className="mono inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium transition-all duration-300 hover:opacity-80"
                  style={{ background: "#1A1A1A" }}>
                  {t("btn.works")} <span className="text-lg">&rarr;</span>
                </Link>
                <Link href="/about" className="mono inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300"
                  style={{ border: "1px solid rgba(26,26,26,0.1)", color: "#666" }}>
                  {t("btn.learnMore")}
                </Link>
              </div>
            </div>
          </div>
          {/* RIGHT - Image Rotator with GSAP */}
          <div ref={imgRef} className="h-[50vh] md:h-screen relative overflow-hidden">
            {heroImages.map((img, i) => (
              <img key={i}
                src={img.startsWith("http") ? img : assetPath(img)}
                alt=""
                className="hero-slide absolute inset-0 w-full h-full object-cover"
                style={{ opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.08 }}
              />
            ))}
            <div className="absolute inset-0" style={{background:"linear-gradient(90deg, rgba(246,243,236,0.5) 0%, transparent 40%)"}} />
            <div className="absolute bottom-8 left-8 md:left-auto md:right-8 flex gap-2 z-10">
              {heroImages.map((_, i) => (
                <div key={i}
                  className={`indicator-dot h-px transition-all duration-500 ease-out ${i === 0 ? "active" : ""}`}
                  style={{width: i === 0 ? "32px" : "12px", background: i === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="py-28 px-8 md:px-16" style={{ background: "#F6F3EC" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 reveal-up">
            <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
              {lang === "en" ? "Core Expertise" : "核心专长"}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px reveal-stagger" style={{ background: "rgba(26,26,26,0.06)" }}>
            {caps.map((c) => (
              <div key={c.label} className="cap-card" style={{ background: "#F6F3EC" }}>
                <h3 className="mono text-sm font-bold mb-3" style={{ color: "#1A1A1A", letterSpacing: "0.02em" }}>{c.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SELECTED WORKS ===== */}
      <section className="py-28 px-8 md:px-16" style={{ background: "#F6F3EC" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex items-center justify-between reveal-up">
            <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
              {lang === "en" ? "Selected Works" : "精选作品"}
            </span>
            <Link href="/furniture" className="mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300" style={{ color: "#999" }}>
              {t("btn.allWorks")}
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px reveal-stagger" style={{ background: "rgba(26,26,26,0.06)" }}>
            {selected.map((p: any) => (
              <Link key={p.id} href={"/furniture/" + p.id} className="work-card group relative overflow-hidden" style={{ background: "#F6F3EC" }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={assetPath(p.images?.[0] || "")} alt={p.title}
                    className="w-full h-full object-cover img-sketch group-hover:scale-[1.04] transition-transform duration-700" />
                </div>
                <div className="work-overlay">
                  <div className="work-overlay-text">
                    <div className="text-xs font-medium tracking-wider mb-1 opacity-70">{p.category}</div>
                    <div className="text-sm font-bold">{p.title}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-badge">{p.category}</span>
                    {p.year && <span className="mono text-[10px] tracking-wider" style={{ color: "#bbb" }}>{p.year}</span>}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-28 px-8 md:px-16" style={{ background: "#F6F3EC" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center reveal-up">
          <div className="relative w-full">
            <img src={assetPath("/images/profile/sam-portrait.jpg")} alt="Sam Lee" className="w-full aspect-[3/4] object-cover" />
          </div>
          <div>
            <div className="mb-8">
              <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
                {lang === "en" ? "About" : "关于"}
              </span>
            </div>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "#1A1A1A", lineHeight: "1.7" }}>{t("about.p1")}</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#666", lineHeight: "1.8" }}>{t("about.p2")}</p>
            <p className="text-sm leading-relaxed mb-10" style={{ color: "#666", lineHeight: "1.8" }}>{t("about.p3")}</p>
            <Link href="/about" className="mono inline-flex items-center gap-2 text-sm transition-all duration-300" style={{ color: "#C4956A" }}>
              {lang === "en" ? "read more" : "了解更多"} <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-24 px-8 md:px-16 border-t" style={{ background: "#F6F3EC", borderColor: "rgba(26,26,26,0.04)" }}>
        <div className="max-w-2xl mx-auto text-center reveal-up">
          <span className="mono text-[10px] tracking-[0.25em] uppercase mb-8 inline-block" style={{ color: "#C4956A" }}>
            {lang === "en" ? "Get in Touch" : "取得联系"}
          </span>
          <a href="mailto:friendbehance@gmail.com"
            className="mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider transition-all duration-300 inline-block"
            style={{ color: "#1A1A1A", letterSpacing: "-0.02em" }}>
            FRIENDBEHANCE@GMAIL.COM
          </a>
          <div className="flex gap-8 justify-center mt-12">
            <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener"
              className="mono text-xs tracking-wider transition-all duration-300" style={{ color: "#999" }}>Pexels</a>
            <span style={{ color: "rgba(196,149,106,0.2)" }}>/</span>
            <a href="https://www.pinterest.com/friendsz9014/" target="_blank" rel="noopener"
              className="mono text-xs tracking-wider transition-all duration-300" style={{ color: "#999" }}>Pins</a>
            <span style={{ color: "rgba(196,149,106,0.2)" }}>/</span>
            <a href="https://www.linkedin.com/in/sam-lee-583aa041a/" target="_blank" rel="noopener"
              className="mono text-xs tracking-wider transition-all duration-300" style={{ color: "#999" }}>LinkedIn</a>
          </div>
        </div>
      </section>
    </>
  );
}
