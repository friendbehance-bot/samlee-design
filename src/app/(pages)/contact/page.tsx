"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";

export default function Contact() {
  const { t, lang } = useLang();
  const [loaded, setLoaded] = useState(false);
  const cp = t("contactPage") as any;

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Video background */}
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
          <source src={assetPath("/videos/sam-animation.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex items-center min-h-screen px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 w-full items-start" style={{ paddingTop: "100px" }}>
          {/* Left: section title + CTA */}
          <div className="pt-8">
            <span className="inline-block px-3 py-1 rounded-full liquid-glass text-white text-xs font-semibold tracking-wider uppercase mb-6">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
              {cp.title}
            </h1>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>{cp.detail_p}</p>
            <div className="p-6 rounded-2xl liquid-glass-strong inline-block">
              <h3 className="font-bold text-base mb-2 text-white">{cp.chat_cta}</h3>
              <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{cp.chat_desc}</p>
              <a href="mailto:friendbehance@gmail.com" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C4956A] text-black font-medium text-sm hover:brightness-110 transition-all">
                {cp.send_email}
              </a>
            </div>
          </div>

          {/* Right: contact cards */}
          <div className="space-y-4 pt-16">
            {[
              {h:cp.email, v:"friendbehance@gmail.com", n:cp.reply, link:"mailto:friendbehance@gmail.com"},
              {h:cp.wechat, v:"frendsamlee", n:cp.wechat_note, link:null},
              {h:cp.pexels, v:"pexels.com/@sam-lee", n:cp.follow_photo, link:"https://www.pexels.com/@sam-lee-2162121365/"},
              {h:cp.pins, v:"pinterest.com/friendsz9014", n:cp.follow_photo, link:"https://pinterest.com/friendsz9014"},
              {h:cp.linkedin, v:"linkedin.com/in/sam-lee", n:cp.reply, link:"https://www.linkedin.com/in/sam-lee-583aa041a/"},
            ].map((item,i)=>(
              <div key={i} className={"p-5 rounded-2xl liquid-glass transition-all duration-500 "+(loaded?"opacity-100 translate-x-0":"opacity-0 translate-x-6")} style={{transitionDelay:i*80+"ms"}}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm mb-1 text-white">{item.h}</h3>
                    {item.link
                      ? <a href={item.link} target="_blank" rel="noopener" className="text-sm" style={{color:"#C4956A"}}>{item.v}</a>
                      : <p className="text-sm" style={{color:"rgba(255,255,255,0.5)"}}>{item.v}</p>
                    }
                  </div>
                  <span className="text-xs" style={{color:"rgba(255,255,255,0.3)"}}>{item.n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
