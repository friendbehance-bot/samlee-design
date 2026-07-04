"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import projects from "@/../content/projects.json";

const selected = projects.filter((p: any) => p.featured).slice(0, 6);

export default function Home() {
  const { t, lang } = useLang();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const tmr = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(tmr);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );
    const targets = document.querySelectorAll(".reveal-up, .reveal-scale, .reveal-stagger");
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [loaded]);

  const tagline = lang === "en"
    ? (<>furniture designer<br/>from China<br/>working globally.</>)
    : (<>办公家具设计师<br/>中国原创<br/>服务全球。</>);

  const heroImg = selected[0]?.images?.[0] || "/images/furniture/panel/Dynasty_01.jpg";

  const caps = lang === "en"
    ? [
        { label: "Panel Products", desc: "30 years of panel-based furniture", icon: "\u25a4" },
        { label: "Ergonomic Seating", desc: "Chairs for all-day comfort and health", icon: "\u25d0" },
        { label: "Smart Desking", desc: "Height-adjustable electric desks", icon: "\u21c5" },
        { label: "Acoustic Systems", desc: "Modular partition solutions", icon: "\u25a6" },
      ]
    : [
        { label: "\u677f\u7c7b\u4ea7\u54c1", desc: "\u684c\u3001\u67dc\u3001\u50a8\u7269\u2014\u201430\u5e74\u677f\u5f0f\u5bb6\u5177\u79ef\u6dc0", icon: "\u25a4" },
        { label: "\u4eba\u4f53\u5de5\u5b66\u6905", desc: "\u5168\u5929\u5019\u8212\u9002\u5750\u5177\uff0c\u4e3a\u5065\u5eb7\u800c\u8bbe\u8ba1", icon: "\u25d0" },
        { label: "\u667a\u80fd\u5347\u964d\u684c", desc: "\u7535\u52a8\u5347\u964d\uff0c\u8ba9\u529e\u516c\u5728\u5750\u7ad9\u4e4b\u95f4\u81ea\u7531\u5207\u6362", icon: "\u21c5" },
        { label: "\u58f0\u5b66\u9694\u65ad", desc: "\u6a21\u5757\u5316\u9694\u65ad\u7cfb\u7edf\uff0c\u517c\u987e\u9694\u97f3\u4e0e\u901a\u900f", icon: "\u25a6" },
      ];

  const heroLabel = lang === "en" ? "AVAILABLE FOR WORK" : "\u5f00\u653e\u5408\u4f5c \u00b7 \u4e09\u5341\u5e74\u7ecf\u9a8c";

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex items-center relative px-6 overflow-hidden" style={{ background: "#F6F3EC" }}>
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center pt-20 md:pt-0 relative">
          <div className="watermark-30" style={{ bottom: "-0.15em", left: "-0.05em" }}>30</div>
          <div className={`relative z-10 ${loaded ? "" : "opacity-0"}`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-medium tracking-[0.12em] uppercase ${loaded ? "animate-fadeUp" : "opacity-0"}`}
              style={{ color: "#8B6914", borderColor: "rgba(196,149,106,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C4956A" }} />
              {heroLabel}
            </div>
            <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mt-8 mb-4 ${loaded ? "animate-fadeUp" : "opacity-0"}`}
              style={{ animationDelay: "0.1s", fontFamily: "'Azeret Mono',monospace", letterSpacing: "-0.04em" }}>
              Sam Lee
            </h1>
            <p className={`text-base sm:text-lg leading-relaxed max-w-md mb-10 ${loaded ? "animate-fadeUp" : "opacity-0"}`}
              style={{ animationDelay: "0.15s", color: "#666" }}>
              {tagline}
            </p>
            <div className={`flex gap-3 ${loaded ? "animate-fadeUp" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <Link href="/furniture" className="mono inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium transition-all duration-300"
                style={{ background: "#1A1A1A" }}>
                {t("btn.works")} <span className="text-lg">&rarr;</span>
              </Link>
              <Link href="/about" className="mono inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300"
                style={{ border: "1px solid rgba(196,149,106,0.25)", color: "#8B6914" }}>
                {t("btn.learnMore")}
              </Link>
            </div>
          </div>
          <div className={`relative z-10 ${loaded ? "animate-scaleIn" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
            <div className="picture-frame">
              <img src={assetPath(heroImg)} alt="Featured furniture design" className="w-full aspect-[4/3] object-cover img-sketch" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-4 py-2 text-[10px] mono tracking-[0.08em]"
              style={{ background: "#C4956A", color: "#fff" }}>
              SINCE 1996
            </div>
          </div>
        </div>
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] tracking-[0.2em] uppercase ${loaded ? "animate-fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "0.5s", color: "#999" }}>
          <span>{t("scroll")}</span>
          <span className="text-sm animate-bounceArrow">&darr;</span>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto reveal-up">
        <div className="stats-bar" style={{ background: "#F6F3EC" }}>
          {[
            { num: "30+", label: lang === "en" ? "Years Experience" : "\u5e74\u884c\u4e1a\u7ecf\u9a8c" },
            { num: "200+", label: lang === "en" ? "Projects Delivered" : "\u4ea4\u4ed8\u9879\u76ee" },
            { num: "50+", label: lang === "en" ? "Global Clients" : "\u670d\u52a1\u5ba2\u6237" },
          ].map((s) => (
            <div key={s.num} className="stat-item">
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F6F3EC" }}>
        <div className="max-w-6xl mx-auto reveal-up">
          <div className="text-center mb-14">
            <span className="accent-line mx-auto mb-4" />
            <h2 className="mono text-xs tracking-[0.3em] uppercase" style={{ color: "#8B6914" }}>
              {lang === "en" ? "CORE EXPERTISE" : "\u6838\u5fc3\u4e13\u957f"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            {caps.map((c) => (
              <div key={c.label} className="cap-card group">
                <div className="oak-ring mb-4">
                  <span className="text-sm" style={{ color: "#C4956A" }}>{c.icon}</span>
                </div>
                <h3 className="mono text-xs font-bold mb-2" style={{ color: "#1A1A1A", letterSpacing: "0.02em" }}>{c.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#999" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F6F3EC" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 reveal-up">
            <span className="accent-line mb-4" />
            <h2 className="mono text-xs tracking-[0.3em] uppercase" style={{ color: "#8B6914" }}>
              {lang === "en" ? "SELECTED WORKS" : "\u7cbe\u9009\u4f5c\u54c1"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
            {selected.map((p: any) => (
              <Link key={p.id} href={"/furniture/" + p.id} className="work-card group block rounded-xl overflow-hidden border border-[#1A1A1A]/6 hover:-translate-y-1 transition-all duration-500">
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden bg-[#EDE8DE]">
                    <img src={assetPath(p.images?.[0] || "")} alt={p.title}
                      className="w-full h-full object-cover img-sketch group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="work-overlay">
                    <div className="work-overlay-text">
                      <div className="text-xs font-medium tracking-wider mb-1">{p.category}</div>
                      <div className="text-sm font-bold">{p.title}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-badge">{p.category}</span>
                    {p.year && <span className="mono text-[10px] tracking-wider" style={{ color: "#bbb" }}>{p.year}</span>}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#999" }}>{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center reveal-up">
            <Link href="/furniture" className="mono inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300"
              style={{ border: "1px solid rgba(196,149,106,0.25)", color: "#8B6914" }}>
              {t("btn.allWorks")}
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 md:py-28 px-6 border-t" style={{ background: "#F6F3EC", borderColor: "rgba(26,26,26,0.06)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal-up">
          <div className="relative w-full max-w-sm mx-auto">
            <div className="picture-frame">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={assetPath("/images/profile/sam-portrait.jpg")} alt="Sam Lee" className="w-full h-full object-cover img-sketch" />
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="mono text-[10px] tracking-wider" style={{ color: "#bbb" }}>
                {lang === "en" ? "Sam Lee \u00b7 Furniture Designer" : "Sam Lee \u00b7 \u5bb6\u5177\u8bbe\u8ba1\u5e08"}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="accent-line" />
              <span className="mono text-xs tracking-[0.3em] uppercase" style={{ color: "#8B6914" }}>
                {lang === "en" ? "ABOUT" : "\u5173\u4e8e"}
              </span>
            </div>
            <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: "#1A1A1A" }}>{t("about.p1")}</p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#666" }}>{t("about.p2")}</p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#666" }}>{t("about.p3")}</p>
            <Link href="/about" className="mono inline-flex items-center gap-2 text-sm transition-all duration-300" style={{ color: "#C4956A" }}>
              {lang === "en" ? "read more" : "\u4e86\u89e3\u66f4\u591a"} <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 md:py-28 px-6 border-t" style={{ background: "#F6F3EC", borderColor: "rgba(26,26,26,0.06)" }}>
        <div className="max-w-xl mx-auto text-center reveal-up">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="accent-line" />
            <h2 className="mono text-xs tracking-[0.3em] uppercase" style={{ color: "#8B6914" }}>
              {lang === "en" ? "GET IN TOUCH" : "\u53d6\u5f97\u8054\u7cfb"}
            </h2>
          </div>
          <a href="mailto:friendbehance@gmail.com"
            className="mono text-xl sm:text-2xl md:text-3xl font-bold tracking-wider transition-all duration-300"
            style={{ color: "#1A1A1A" }}>
            FRIENDBEHANCE@GMAIL.COM
          </a>
          <div className="flex gap-6 justify-center mt-10">
            <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener"
              className="mono text-xs tracking-wider transition-all duration-300" style={{ color: "#999" }}>Pexels</a>
            <span style={{ color: "rgba(196,149,106,0.3)" }}>/</span>
            <a href="https://www.pinterest.com/friendsz9014/" target="_blank" rel="noopener"
              className="mono text-xs tracking-wider transition-all duration-300" style={{ color: "#999" }}>Pins</a>
            <span style={{ color: "rgba(196,149,106,0.3)" }}>/</span>
            <a href="https://www.linkedin.com/in/sam-lee-583aa041a/" target="_blank" rel="noopener"
              className="mono text-xs tracking-wider transition-all duration-300" style={{ color: "#999" }}>LinkedIn</a>
          </div>
        </div>
      </section>
    </>
  );
}
