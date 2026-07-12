"use client";
import { useLang } from"@/lib/i18n";
import { assetPath } from"@/lib/asset";
import data from"@/../content/i18n.json";

export default function About() {
  const { t, lang } = useLang();
  const tl = ((data as any)[lang]?.aboutTimeline) || [];
  return (
    <section className="pt-32 pb-24" style={{background:"#000"}}>
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-block px-3 py-1 rounded-full liquid-glass-gold text-white text-xs font-semibold tracking-wider uppercase mb-4">About</span>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
          <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 liquid-glass">
            <img src={assetPath("/images/profile/sam-lee.jpg")} alt="Sam Lee" className="w-full h-full object-cover"/>
          </div>
          <div><h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white">{t("aboutTitle")}</h1><p className="text-sm text-white/50 font-medium">{t("hero.subtitle")}</p></div>
        </div>
        <p className="text-lg text-white/60 leading-relaxed mb-8">{t("about.p1")}</p>
        <p className="text-white/50 leading-relaxed mb-4">{t("about.p2")}</p>
        <p className="text-white/50 leading-relaxed mb-12">{t("about.p3")}</p>
        <h2 className="text-2xl font-bold mb-8 text-white">{t("careerTitle")}</h2>
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10"/>
          <div className="space-y-10">
            {tl.map((item:any)=>(
              <div key={item.year+item.title} className="relative pl-10">
                <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-2 border-[#C4956A] flex items-center justify-center bg-black">
                  <div className="w-2 h-2 rounded-full bg-[#C4956A]"/>
                </div>
                <div className="text-xs text-white/60 font-semibold mb-1">{item.year}</div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                {item.company&&<p className="text-sm text-white/50">{item.company}</p>}
                <p className="text-sm text-white/50 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
