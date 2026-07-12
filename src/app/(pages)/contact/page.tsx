"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";

export default function Contact() {
  const { t, lang } = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{setMounted(true);},[]);
  const cp = t("contactPage") as any;

  return (
    <section className="pt-32 pb-24 section-dark">
      <div className="max-w-3xl mx-auto px-6">
        {/* Video in liquid-glass frame */}
        <div className="mb-16 max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden liquid-glass-gold">
            <video
              src={assetPath("/videos/sam-animation.mp4")}
              className="w-full aspect-video object-cover video-hide-bar"
              autoPlay muted playsInline controls preload="metadata" controlsList="nodownload noremoteplayback"
              onEnded={(e)=>{const t=e.target as HTMLVideoElement; t.style.opacity="1"}}
            />
          </div>
        </div>

        <div className="mb-12">
          <span className="inline-block px-3 py-1 rounded-full liquid-glass text-white text-xs font-semibold tracking-wider uppercase mb-4">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{color:"rgba(255,255,255,0.9)"}}>{cp.title}</h1>
          <p className="text-lg text-white/50">{cp.detail_p}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {h:cp.email,v:"friendbehance@gmail.com",n:cp.reply,link:"mailto:friendbehance@gmail.com"},
            {h:cp.wechat,v:"frendsamlee",n:cp.wechat_note,link:null},
            {h:cp.pexels,v:"pexels.com/@sam-lee",n:cp.follow_photo,link:"https://www.pexels.com/@sam-lee-2162121365/"},
            {h:cp.pins,v:"pinterest.com/friendsz9014",n:cp.follow_photo,link:"https://pinterest.com/friendsz9014"},
            {h:cp.linkedin,v:"linkedin.com/in/sam-lee",n:cp.reply,link:"https://www.linkedin.com/in/sam-lee-583aa041a/"},
          ].map((item,i)=>(
            <div key={i} className={"p-6 rounded-2xl liquid-glass transition-all duration-500 "+(mounted?"opacity-100 translate-y-0":"opacity-0 translate-y-4")} style={{transitionDelay:i*100+"ms"}}>
              <h3 className="font-bold mb-3" style={{color:"rgba(255,255,255,0.9)"}}>{item.h}</h3>
              {item.link
                ? <a href={item.link} target="_blank" rel="noopener" className="text-[#C4956A] hover:text-[#D4A87C] text-sm">{item.v}</a>
                : <p className="text-sm text-[rgba(255,255,255,0.5)]">{item.v}</p>
              }
              <p className="text-xs text-[rgba(255,255,255,0.4)] mt-2">{item.n}</p>
            </div>
          ))}
        </div>

        <div className={"p-8 rounded-2xl liquid-glass-strong text-center transition-all duration-700 "+(mounted?"opacity-100 scale-100":"opacity-0 scale-95")}>
          <h3 className="font-bold text-lg mb-2 text-white">{cp.chat_cta}</h3>
          <p className="text-sm text-[rgba(255,255,255,0.5)] mb-4">{cp.chat_desc}</p>
          <a href="mailto:friendbehance@gmail.com" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C4956A] text-black font-medium text-sm hover:brightness-110 transition-all">{cp.send_email}</a>
        </div>
      </div>
    </section>
  );
}
