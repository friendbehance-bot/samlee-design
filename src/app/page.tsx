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
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(watermarkRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 });
    tl.fromTo(".hero-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");
    tl.fromTo(".hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.5");
    tl.fromTo(".hero-tagline", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5");
    tl.fromTo(".hero-buttons", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    tl.fromTo(imgRef.current, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, "-=1.0");
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (heroImages.length < 2) return;
    let current = 0;
    const next = () => {
      current = (current + 1) % heroImages.length;
      setCurrentImg(current);
      const imgs = document.querySelectorAll(".hero-slide");
      imgs.forEach((img, i) => {
        gsap.to(img, {
          opacity: i === current ? 1 : 0,
          scale: i === current ? 1 : 1.08,
          filter: i === current ? "saturate(1) brightness(0.9)" : "saturate(1) brightness(0.75)",
          duration: 1.4, ease: "power2.inOut"
        });
      });
    };
    const interval = setInterval(next, 4800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!imgRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current, start: "top top", end: "bottom top",
        onUpdate: (self) => { if (imgRef.current) gsap.set(imgRef.current, { y: self.progress * 80 }); }
      });
    }, heroRef);
    return () => { ctx.revert(); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }); },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal-up, .reveal-stagger").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

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
      {/* ===== SIDE CONTACT (Bene-inspired) ===== */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <a href="mailto:friendbehance@gmail.com"
           className="group flex items-center gap-3 bg-[#1A1A1A] text-white px-3 py-4 rounded-l-md transition-all duration-300 hover:bg-[#C4956A] hover:pr-6"
           style={{ writingMode: "vertical-rl" }}>
          <span className="mono text-[9px] tracking-[0.2em] uppercase transition-all">Get in touch</span>
        </a>
      </div>
      {/* ===== HERO (Bene-inspired: full-bleed image + overlay text) ===== */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={assetPath(heroImages[currentImg] || "/images/furniture/panel/Dynasty_01.jpg")}
            alt=""
            className="w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Overlay content — left aligned, over the image */}
        <div className="relative z-10 flex items-end md:items-center min-h-screen px-8 md:px-16 lg:px-24 pb-20 md:pb-0">
          <div className="max-w-2xl">
            {/* Small label */}
            <div className="hero-label mono text-[10px] tracking-[0.2em] uppercase mb-6 opacity-0" style={{ color: "#C4956A" }}>
              {heroLabel}
            </div>
            {/* Big product name / brand */}
            <h1 className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-8 opacity-0 text-white">
              Sam<span style={{ color: "#C4956A" }}>.</span>Lee
            </h1>
            {/* Tagline */}
            <p className="hero-tagline text-base sm:text-lg md:text-xl leading-relaxed max-w-md mb-12 opacity-0" style={{ color: "rgba(255,255,255,0.75)" }}>
              {tagline}
            </p>
            {/* CTA buttons */}
            <div className="hero-buttons flex gap-4 opacity-0">
              <Link href="/furniture" className="mono inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium transition-all duration-300 hover:bg-[#C4956A]"
                style={{ border: "1px solid rgba(255,255,255,0.3)", background: "transparent" }}>
                {t("btn.works")} <span className="text-lg">&rarr;</span>
              </Link>
              <Link href="/about" className="mono inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                {t("btn.learnMore")}
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-8 left-8 md:left-16 z-10 flex gap-2">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setCurrentImg(i)}
              className="transition-all duration-300 rounded-full"
              style={{ width: currentImg === i ? "24px" : "8px", height: "8px", backgroundColor: currentImg === i ? "#C4956A" : "rgba(255,255,255,0.3)" }}
            />
          ))}
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
      <section className="py-28 px-8 md:px-16 section-alt-warm">
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
      <section className="py-28 px-8 md:px-16 section-dark border-0 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10 reveal-up">
          <div className="divider-dot mb-12"><span></span></div>
          <span className="mono text-[10px] tracking-[0.25em] uppercase mb-6 inline-block" style={{color: "rgba(196,149,106,0.6)"}}>
            {lang === "en" ? "Get in Touch" : "取得联系"}
          </span>
          <div className="mb-8">
            <a href="mailto:friendbehance@gmail.com" className="contact-email-dark">
              FRIENDBEHANCE@GMAIL.COM
            </a>
          </div>
          <div className="flex gap-10 justify-center mt-10">
            <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="social-link-dark">Pexels</a>
            <a href="https://www.pinterest.com/friendsz9014/" target="_blank" rel="noopener" className="social-link-dark">Pins</a>
            <a href="https://www.linkedin.com/in/sam-lee-583aa041a/" target="_blank" rel="noopener" className="social-link-dark">LinkedIn</a>
          </div>
          <div className="divider-dot mt-12"><span></span></div>
        </div>
      </section>
    </>
  );
}
