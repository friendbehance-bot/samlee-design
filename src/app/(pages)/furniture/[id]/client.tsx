"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { assetPath } from "@/lib/asset";
import projects from "@/../content/projects.json";

export function FurnitureDetailClient() {
  const params = useParams();
  const { t, lang } = useLang();
  const project = projects.find((p:any)=>p.id===params.id);
  if (!project) return <section className="pt-32 pb-24" style={{background:"#000"}}><div className="max-w-4xl mx-auto px-6 text-center"><h1 className="text-2xl font-bold mb-4 text-white">404</h1><p className="text-white/50">Project not found</p><Link href="/furniture" className="text-[#C4956A] hover:underline">Back to Works</Link></div></section>;

  const dl = t("detailLabels") as any;
  const detailsLines = project.details ? project.details.split(String.fromCharCode(10)) : [];

  return (
    <section className="pt-32 pb-24" style={{background:"#000"}}>
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/furniture" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-[#C4956A] transition-colors mb-8">{dl.back}</Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full liquid-glass text-white text-xs font-semibold">{project.category}</span>
          <span className="text-sm text-white/50">{project.year}</span>
          <span className="text-sm text-white/50">| {dl.role}: {project.role}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white">{project.title}</h1>
        {project.images.length>0&&<div className="grid gap-4 mb-12">{project.images.map((img:string,i:number)=><div key={i} className="rounded-2xl overflow-hidden liquid-glass"><img decoding="async" src={assetPath(img)} alt={project.title+" - "+(i+1)} className="w-full object-cover" loading="lazy"/></div>)}</div>}
        <div className="max-w-none">
          <h2 className="text-xl font-bold mb-4 text-white">{dl.info}</h2>
          <p className="text-white/60 leading-relaxed">{project.description}</p>

          {project.processImages && project.processImages.length > 0 && (
            <div className="mt-12 mb-8">
              <h2 className="text-xl font-bold mb-6 text-white">{lang==="en" ? "Sketch & Prototype" : "手稿与打样"}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.processImages.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden liquid-glass">
                    <img src={assetPath(img)} alt={lang==="en" ? (i === 0 ? "Design sketch" : "Prototype photo") : (i === 0 ? "设计手稿" : "打样照片")} className="w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {project.story && (
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-6 text-white">{lang==="en" ? "Design Story" : "设计故事"}</h2>
              <div className="prose prose-sm max-w-none">
                {lang==="en" ? (
                  <div className="text-white/50 leading-relaxed whitespace-pre-line">
                    {project.storyEn?.split("**").map((part, i) =>
                      i % 2 === 1 ? <span key={i} className="font-bold text-white">{part}</span> : <span key={i}>{part}</span>
                    )}
                  </div>
                ) : (
                  <div className="text-white/50 leading-relaxed whitespace-pre-line">
                    {project.story?.split("**").map((part, i) =>
                      i % 2 === 1 ? <span key={i} className="font-bold text-white">{part}</span> : <span key={i}>{part}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {detailsLines.length>0&&<><h2 className="text-xl font-bold mt-10 mb-4 text-white">{dl.specs}</h2><div className="rounded-2xl p-6 liquid-glass"><table className="w-full text-sm"><tbody>{detailsLines.map((line:string,i:number)=>{const ci=line.indexOf(": ");if(ci===-1)return null;const key=line.substring(0,ci);const val=line.substring(ci+2);return <tr key={i} className="border-b border-white/10 last:border-0"><td className="py-3 pr-4 font-semibold text-white whitespace-nowrap">{key}</td><td className="py-3 text-white/50">{val}</td></tr>})}</tbody></table></div></>}
          {project.id==="zoom-booth"&&<><h2 className="text-xl font-bold mt-10 mb-4 text-white">{dl.sampling}</h2><p className="text-sm text-white/50 mb-4">{dl.samplingDesc}</p><div className="grid sm:grid-cols-3 gap-4">{["zoom-1.png","zoom-2.png","zoom-3.png"].map((img,i)=><div key={i} className="rounded-xl overflow-hidden liquid-glass"><img src={assetPath("/images/furniture/phone-proof/"+img)} alt={"Zoom booth sample "+(i+1)} className="w-full aspect-[4/3] object-cover" loading="lazy"/></div>)}</div></>}
          <div className="flex flex-wrap gap-2 mt-8">{project.tags?.map((tag:string)=><span key={tag} className="px-3 py-1 rounded-full text-sm text-white/40 border border-white/10">#{tag}</span>)}</div>
          {project.driveLink&&<div className="mt-10 p-6 rounded-2xl liquid-glass"><p className="font-semibold mb-2 text-white">{dl.download}</p><p className="text-sm text-white/50 mb-4">{dl.downloadDesc}</p><a href={project.driveLink} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C4956A] text-black font-semibold text-sm hover:brightness-110 transition-colors">{dl.downloadBtn}</a></div>}
        </div>
      </div>
    </section>
  );
}
