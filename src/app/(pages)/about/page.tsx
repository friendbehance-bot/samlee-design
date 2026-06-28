"use client";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import data from "@/../content/i18n.json";

export default function About() {
  const { t, lang } = useLang();
  const tl = ((data as any)[lang]?.aboutTimeline) || [];
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-block px-3 py-1 rounded-full bg-[#b8860b]/10 text-[#b8860b] text-xs font-semibold tracking-wider uppercase mb-4">About</span>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
          <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#e5e5e0] dark:border-[#2a2a2a]">
            <img src={assetPath("/images/profile/sam-lee.jpg")} alt="Sam Lee" className="w-full h-full object-cover"/>
          </div>
          <div><h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{t("aboutTitle")}</h1><p className="text-sm text-[#b8860b] font-medium">{t("hero.subtitle")}</p></div>
        </div>
        <p className="text-lg text-[#6b7280] dark:text-[#9ca3af] leading-relaxed mb-8">{t("about.p1")}</p>
        <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed mb-4">{t("about.p2")}</p>
        <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed mb-12">{t("about.p3")}</p>
        <h2 className="text-2xl font-bold mb-8">{t("careerTitle")}</h2>
        <div className="relative"><div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#e5e5e0] dark:bg-[#2a2a2a]"/><div className="space-y-10">{tl.map((item:any)=><div key={item.year+item.title} className="relative pl-10"><div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-white dark:bg-[#111] border-2 border-[#b8860b] flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-[#b8860b]"/></div><div className="text-xs text-[#b8860b] font-semibold mb-1">{item.year}</div><h3 className="font-semibold">{item.title}</h3>{item.company&&<p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">{item.company}</p>}<p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">{item.desc}</p></div>)}</div></div>
      </div>
    </section>
  );
}
