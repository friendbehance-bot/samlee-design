"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import projects from "@/../content/projects.json";

const selected = projects.filter((p: any) => p.featured).slice(0, 6);

const toolIcons = ["🪵", "⚙️", "📐", "🪑", "🔧", "🎨", "📏", "🧩", "🔩", "✏️", "🛠️", "🗄️"];

const gradCombos = [
  { a: "#C4956A", b: "#E8D5C0" },
  { a: "#5B9BD5", b: "#A8D8EA" },
  { a: "#B39DDB", b: "#D1C4E9" },
  { a: "#E8A87C", b: "#F5CCB8" },
];

const statsDarkData = [
  { num: "30+", labelEn: "Years Experience", labelZh: "年行业经验" },
  { num: "200+", labelEn: "Projects Delivered", labelZh: "项目交付" },
  { num: "50+", labelEn: "Clients Served", labelZh: "服务客户" },
  { num: "8", labelEn: "Product Series", labelZh: "产品系列" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { gsap.registerPlugin(ScrollTrigger); }, []);

  // Hero entrance timeline
  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(watermarkRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 });
    tl.fromTo(".hero-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");
    tl.fromTo(".hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.5");
    tl.fromTo(".hero-tagline", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5");
    tl.fromTo(".hero-buttons", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    return () => { tl.kill(); };
  }, []);

  // Core Expertise Bento image crossfade (hero-slide)
  useEffect(() => {
    if (heroImages.length < 2) return;
    let current = 1;
    const interval = setInterval(() => {
      current = (current + 1) % heroImages.length;
      document.querySelectorAll(".hero-slide").forEach((img, i) => {
        gsap.to(img, {
          opacity: i === current ? 1 : 0,
          scale: i === current ? 1 : 1.08,
          filter: i === current ? "saturate(0.7) brightness(0.85)" : "saturate(0.5) brightness(0.6)",
          duration: 1.4, ease: "power2.inOut"
        });
      });
    }, 4800);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver
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
      {/* SIDE CONTACT */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <a href="mailto:friendbehance@gmail.com"
           className="group flex items-center gap-3 text-white px-3 py-4 rounded-l-md transition-all duration-300 hover:bg-[#C4956A] hover:pr-6 side-contact"
           style={{ writingMode: "vertical-rl" }}>
          <span className="mono text-[9px] tracking-[0.2em] uppercase transition-all text-white/70">Get in touch</span>
        </a>
      </div>

      {/* ===== HERO - Video Background Only ===== */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)" }} />
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setLoaded(true)}>
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center min-h-screen px-8 md:px-16 lg:px-24">
          <div ref={watermarkRef} className="watermark-30" style={{ bottom: "0.2em", left: "0.15em", color: "rgba(196,149,106,0.08)" }}>30</div>
          <div className="relative z-10 max-w-3xl">
            <div className="hero-label mono text-[10px] tracking-[0.2em] mb-6 opacity-0" style={{ color: "#C4956A" }}>
              {lang === "en" ? "EST. 1996 · 30 YEARS" : "始于1996 · 三十年"}
            </div>
            <h1 className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-8 opacity-0 text-white"
              style={{ letterSpacing: "-0.04em" }}>
              Sam<span style={{ color: "#C4956A" }}>.</span>Lee
            </h1>
            <p className="hero-tagline text-base sm:text-lg md:text-xl leading-relaxed max-w-md mb-12 opacity-0" style={{ color: "rgba(255,255,255,0.75)" }}>
              {lang === "en"
                ? (<>furniture designer<br/>from China<br/>working globally.</>)
                : (<>办公家具设计师<br/>中国原创<br/>服务全球。</>)
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
      </section>

      {/* ===== CAPABILITIES - Bento Grid + Gradient Border Cards ===== */}
      <section className="py-28 px-8 md:px-16 section-alt-warm">
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
              {lang === "en" ? "Core Expertise" : "核心专长"}
            </span>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {/* LEFT - Bento Grid (col-span-2) */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full min-h-[320px]">
                {/* Main image with crossfade */}
                <div className="col-span-1 row-span-2 relative overflow-hidden rounded-xl">
                  {heroImages.map((img, i) => (
                    <img key={i}
                      src={img.startsWith("http") ? img : assetPath(img)}
                      alt=""
                      className="hero-slide absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.08 }}
                    />
                  ))}
                  <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 z-10">
                    {heroImages.map((_, i) => (
                      <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                        <div className="h-full rounded-full transition-all duration-500 ease-out"
                          style={{ width: "50%", background: "rgba(255,255,255,0.7)" }} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Stats card */}
                <div className="col-span-1 row-span-1 rounded-xl flex flex-col justify-center items-center p-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="mono text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#C4956A" }}>
                    10M+
                  </span>
                  <span className="mono text-[9px] tracking-[0.2em] mt-2 uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {lang === "en" ? "Products Delivered" : "产品交付"}
                  </span>
                </div>
                {/* Tool icon marquee */}
                <div className="col-span-1 row-span-1 rounded-xl overflow-hidden relative flex items-center"
                  style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                  <div className="marquee-fade w-full overflow-hidden">
                    <div className="animate-marquee-left flex gap-8 items-center py-5">
                      {[...toolIcons, ...toolIcons].map((icon, i) => (
                        <span key={i} className="text-2xl" style={{ filter: "saturate(0.2) brightness(0.5)" }}>{icon}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - Gradient Border Cards (col-span-3) */}
            <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
              {caps.map((c, i) => (
                <motion.div key={c.label}
                  className="gradient-border-card-dark p-6"
                  style={{
                    "--grad-a": gradCombos[i].a,
                    "--grad-b": gradCombos[i].b,
                  } as React.CSSProperties}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}>
                  <h3 className="mono text-sm font-bold mb-3 text-white" style={{ letterSpacing: "0.02em" }}>
                    {c.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SELECTED WORKS - Enhanced Hover with Shine Sweep ===== */}
      <section className="py-28 px-8 md:px-16" style={{ background: "#000" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-16 flex items-center justify-between"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
              {lang === "en" ? "Selected Works" : "精选作品"}
            </span>
            <Link href="/furniture" className="mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t("btn.allWorks")}
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px reveal-stagger" style={{ background: "rgba(255,255,255,0.06)" }}>
            {selected.map((p: any, idx: number) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}>
                <Link href={"/furniture/" + p.id} className="work-card group relative overflow-hidden block" style={{ background: "#000" }}>
                  <div className="shine-sweep" />
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT - with Stats Bar ===== */}
      <section className="py-28 px-8 md:px-16 section-alt-warm">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start reveal-up">
            <div className="relative w-full">
              <img src={assetPath("/images/profile/sam-portrait.jpg")} alt="Sam Lee" className="w-full aspect-[3/4] object-cover rounded-2xl" />
              <div className="grid grid-cols-4 gap-px mt-6" style={{ background: "rgba(255,255,255,0.06)" }}>
                {statsDarkData.map((s) => (
                  <motion.div key={s.num} className="stat-item"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}>
                    <div className="stat-number">{s.num}</div>
                    <div className="stat-label">{lang === "en" ? s.labelEn : s.labelZh}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <motion.div className="mb-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}>
                <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#C4956A" }}>
                  {lang === "en" ? "About" : "关于"}
                </span>
              </motion.div>
              <p className="text-lg leading-relaxed mb-8 text-white" style={{ lineHeight: "1.7" }}>{t("about.p1")}</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}>{t("about.p2")}</p>
              <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8" }}>{t("about.p3")}</p>
              <Link href="/about" className="mono inline-flex items-center gap-2 text-sm transition-all duration-300" style={{ color: "#C4956A" }}>
                {lang === "en" ? "read more" : "了解更多"} <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT - Liquid Glass CTA ===== */}
      <section className="py-24 px-8 md:px-16 section-dark border-0 relative overflow-hidden">
        <div className="glow-bg animate-gradient" style={{ width: "280px", height: "280px", top: "-100px", right: "-80px", background: "radial-gradient(circle, rgba(196,149,106,0.2) 0%, transparent 70%)" }} />
        <div className="glow-bg animate-gradient" style={{ width: "220px", height: "220px", bottom: "-60px", left: "-60px", background: "radial-gradient(circle, rgba(196,149,106,0.12) 0%, transparent 70%)" }} />

        <motion.div className="max-w-2xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="liquid-glass rounded-2xl px-10 py-16"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <span className="mono text-[10px] tracking-[0.25em] uppercase mb-8 inline-block" style={{ color: "rgba(196,149,106,0.6)" }}>
              {lang === "en" ? "Get in Touch" : "取得联系"}
            </span>
            <a href="mailto:friendbehance@gmail.com" className="contact-email-dark">
              FRIENDBEHANCE@GMAIL.COM
            </a>
            <div className="flex gap-10 justify-center mt-10">
              <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="social-link-dark">Pexels</a>
              <a href="https://www.pinterest.com/friendsz9014/" target="_blank" rel="noopener" className="social-link-dark">Pins</a>
              <a href="https://www.linkedin.com/in/sam-lee-583aa041a/" target="_blank" rel="noopener" className="social-link-dark">LinkedIn</a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
