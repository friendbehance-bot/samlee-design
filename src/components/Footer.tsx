"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden" style={{ background: "#000" }}>
      <div className="glow-bg" style={{ width: "240px", height: "240px", top: "-80px", left: "20%", background: "radial-gradient(circle, rgba(196,149,106,0.12) 0%, transparent 70%)" }} />
      <div className="glow-bg" style={{ width: "180px", height: "180px", bottom: "-60px", right: "10%", background: "radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)" }} />

      <motion.div className="max-w-4xl mx-auto px-8 md:px-16 pt-16 pb-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}>
        <div className="liquid-glass rounded-2xl px-8 py-12 md:py-16 text-center"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
          <span className="mono text-[10px] tracking-[0.25em] uppercase mb-4 inline-block" style={{ color: "#C4956A" }}>
            {lang === "en" ? "Let's Create Together" : "一起创造"}
          </span>
          <h2 className="mono text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] mb-6 text-white" style={{ letterSpacing: "-0.03em" }}>
            {lang === "en" ? "Have a project in mind?" : "有项目想要聊聊？"}
          </h2>
          <p className="text-sm max-w-md mx-auto mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            {lang === "en"
              ? "Office furniture design · Product development · Project management consulting"
              : "办公家具设计 · 产品开发 · 项目管理咨询"}
          </p>
          <a href="mailto:friendbehance@gmail.com"
            className="mono inline-flex items-center gap-2 px-8 py-3 text-sm font-medium transition-all duration-300 hover:bg-[#C4956A]"
            style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}>
            {lang === "en" ? "Start a Conversation" : "开始对话"} <span className="text-lg">&rarr;</span>
          </a>
        </div>
      </motion.div>

      <div className="border-t py-10 relative z-10" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-6 text-xs">
            <Link href="/furniture" className="transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>{t("nav.furniture")}</Link>
            <Link href="/projects" className="transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>{t("nav.projects")}</Link>
            <Link href="/photography" className="transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>{t("nav.photography")}</Link>
            <Link href="/travel" className="transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>{t("nav.travel")}</Link>
            <Link href="/contact" className="transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>{t("nav.contact")}</Link>
          </div>
          <div className="flex gap-4 text-xs">
            <a href="https://www.pexels.com/@sam-lee-2162121365/" target="_blank" rel="noopener" className="transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>Pexels</a>
            <a href="https://www.pinterest.com/friendsz9014/" target="_blank" rel="noopener" className="transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>Pins</a>
            <a href="https://www.linkedin.com/in/sam-lee-583aa041a/" target="_blank" rel="noopener" className="transition-all duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>LinkedIn</a>
          </div>
          <p className="text-xs" style={{ color: "rgba(196,149,106,0.4)" }}>
            &copy; {year} Sam<span style={{ color: "#C4956A" }}>.</span>Lee
          </p>
        </div>
      </div>
    </footer>
  );
}
