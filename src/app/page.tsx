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
  const { t, lang } = useLang();
  const [loaded, setLoaded] = useState(false);
  // Space video background — no carousel needed

  useEffect(() => { gsap.registerPlugin(ScrollTrigger); }, []);

  // Video autoplays — no interval needed

  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".hero-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(".hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.5")
      .fromTo(".hero-tagline", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
      .fromTo(".hero-buttons", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }); },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal-up, .reveal-stagger").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

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
    const interval = setInterval(() => setCurrentImg(prev => (prev + 1) % heroImages.length), 4500);
    return () => clearInterval(interval);
  }, []);

  const caps = lang === "en"
    ? [
        { label: "Panel Products", desc: "30 years of panel-based office furniture" },
        { label: "Ergonomic Seating", desc: "Chairs designed for all-day comfort" },
        { label: "Smart Desking", desc: "Height-adjustable electric desk systems" },
        { label: "Acoustic Systems", desc: "Modular partition & privacy solutions" },
      ]
    : [
        { label: "\u677f\u7c7b\u4ea7\u54c1", desc: "30\u5e74\u677f\u5f0f\u5bb6\u5177\u79ef\u6dc0" },
        { label: "\u4eba\u4f53\u5de5\u5b66\u6905", desc: "\u5168\u5929\u5019\u8212\u9002\u5750\u5177" },
        { label: "\u667a\u80fd\u5347\u964d\u684c", desc: "\u5750\u7ad9\u4ea4\u66ff\u529e\u516c\u65b9\u6848" },
        { label: "\u58f0\u5b66\u9694\u65ad", desc: "\u6a21\u5757\u5316\u9694\u65ad\u7cfb\u7edf" },
      ];

  return (
    <>
      {/* SIDE CONTACT */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <a href="mailto:friendbehance@gmail.com"
           className="group flex items-center gap-3 text-white px-3 py-4 rounded-l-md transition-all duration-300 hover:bg-[#C4956A] hover:pr-6 side-contact"
           style={{ writingMode: "vertical-rl" }}>
          <span className="mono text-[9px] tracking-[0.2em] uppercase transition-all text-white/70">Get in touch</span>
        </a>
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: loaded ? 1 : 0 }}
            onLoadedData={() => setLoaded(true)}
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 flex items-end md:items-center min-h-screen px-8 md:px-16 lg:px-24 pb-20 md:pb-0">
          <div className="max-w-2xl">
            <div className="hero-label mono text-[10px] tracking-[0.2em] uppercase mb-6 opacity-0" style={{ color: "#C4956A" }}>
              {lang === "en" ? "EST. 1996 \u00b7 30 YEARS" : "\u59cb\u4e8e1996 \u00b7 \u4e09\u5341\u5e74"}
            </div>
            <h1 className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-8 opacity-0 text-white">
              Sam<span style={{ color: "#C4956A" }}>.</span>Lee
            </h1>
            <p className="hero-tagline text-base sm:text-lg md:text-xl leading-relaxed max-w-md mb-12 opacity-0" style={{ color: "rgba(255,255,255,0.75)" }}>
              {lang === "en"
                ? (<>furniture designer<br/>from China<br/>working globally.</>)
                : (<>\u529e\u516c\u5bb6\u5177\u8bbe\u8ba1\u5e08<br/>\u4e2d\u56fd\u539f\u521b<br/>\u670d\u52a1\u5168\u7403\u3002</>)
              }
            </p>
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

        {/* PRODUCT SHOWCASE OVERLAY */}
        <div className="absolute bottom-28 right-8 md:right-16 z-10 hidden lg:block">
          <div className="liquid-glass-strong rounded-2xl p-3 w-64">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src={assetPath(heroImages[currentImg])}
                alt=""
                className="w-full h-full object-cover transition-opacity duration-700"
              />
            </div>
            <div className="flex gap-1.5 justify-center mt-3">
              {heroImages.map((_, i) => (
                <button key={i} onClick={() => setCurrentImg(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: currentImg === i ? "20px" : "6px",
                    height: "6px",
                    backgroundColor: currentImg === i ? "#C4956A" : "rgba(255,255,255,0.25)"
                  }}
                />
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* CAPABILITIES */}
      <section className="py-28 px-8 md:px-16" style={{ background: "#000" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 reveal-up">
            <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
              {lang === "en" ? "Core Expertise" : "\u6838\u5fc3\u4e13\u957f"}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px reveal-stagger" style={{ background: "rgba(255,255,255,0.06)" }}>
            {caps.map((c) => (
              <div key={c.label} className="cap-card" style={{ background: "#000" }}>
                <h3 className="mono text-sm font-bold mb-3 text-white" style={{ letterSpacing: "0.02em" }}>{c.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="py-28 px-8 md:px-16" style={{ background: "#000" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex items-center justify-between reveal-up">
            <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
              {lang === "en" ? "Selected Works" : "\u7cbe\u9009\u4f5c\u54c1"}
            </span>
            <Link href="/furniture" className="mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t("btn.allWorks")}
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px reveal-stagger" style={{ background: "rgba(255,255,255,0.06)" }}>
            {selected.map((p: any) => (
              <Link key={p.id} href={"/furniture/" + p.id} className="work-card group relative overflow-hidden" style={{ background: "#000" }}>
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
                    {p.year && <span className="mono text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{p.year}</span>}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-28 px-8 md:px-16 section-alt-warm">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center reveal-up">
          <div className="relative w-full">
            <img src={assetPath("/images/profile/sam-portrait.jpg")} alt="Sam Lee" className="w-full aspect-[3/4] object-cover rounded-2xl" />
          </div>
          <div>
            <div className="mb-8">
              <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
                {lang === "en" ? "About" : "\u5173\u4e8e"}
              </span>
            </div>
            <p className="text-lg leading-relaxed mb-8 text-white" style={{ lineHeight: "1.7" }}>{t("about.p1")}</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}>{t("about.p2")}</p>
            <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}>{t("about.p3")}</p>
            <Link href="/about" className="mono inline-flex items-center gap-2 text-sm transition-all duration-300" style={{ color: "#C4956A" }}>
              {lang === "en" ? "read more" : "\u4e86\u89e3\u66f4\u591a"} <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-28 px-8 md:px-16 section-dark border-0 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10 reveal-up">
          <div className="divider-dot mb-12"><span></span></div>
          <span className="mono text-[10px] tracking-[0.25em] uppercase mb-6 inline-block" style={{color: "rgba(196,149,106,0.6)"}}>
            {lang === "en" ? "Get in Touch" : "\u53d6\u5f97\u8054\u7cfb"}
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
