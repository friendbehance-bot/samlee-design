import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const baseUrl = "https://friendbehance-bot.github.io/samlee-design";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sam Lee | 办公家具设计 & 项目管理 | Office Furniture Design",
    template: "%s | Sam Lee"
  },
  description: "Sam Lee — 办公家具设计师，从事家具事业30年。专注于办公板类产品设计、人体工学椅、电动升降桌、声学隔断系统。30 years of office furniture design, project management, and photography.",
  keywords: ["办公家具设计", "人体工学椅", "电动升降桌", "声学隔断", "系统家具", "办公空间解决方案", "项目管理", "旅行摄影", "office furniture design", "ergonomic chair", "electric height adjustable desk", "acoustic partition", "system furniture"],
  authors: [{ name: "Sam Lee" }],
  creator: "Sam Lee",
  openGraph: {
    type: "website", locale: "zh_CN", url: baseUrl, siteName: "Sam Lee Portfolio",
    title: "Sam Lee | 办公家具设计 & 项目管理",
    description: "办公家具设计师、项目管理专家、摄影爱好者。30年行业沉淀。",
    images: [{ url: baseUrl + "/images/profile/sam-lee.jpg", width: 800, height: 800 }]
  },
  twitter: { card: "summary_large_image", title: "Sam Lee | Office Furniture Design", description: "30 years of office furniture design, project management & photography." },
  robots: { index: true, follow: true },
  alternates: { canonical: baseUrl }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#000000" />
        <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Person", name: "Sam Lee",
            jobTitle: ["Office Furniture Designer", "Project Manager"],
            description: "30 years of office furniture design - panel products, ergonomic chairs, height adjustable desks, acoustic partitions.", url: baseUrl,
            sameAs: ["https://www.pexels.com/@sam-lee-2162121365/", "https://www.pinterest.com/friendsz9014/", "https://www.linkedin.com/in/sam-lee-583aa041a/"]
          })
        }} />
      </head>
      <body className="min-h-screen flex flex-col" style={{background:"#000"}}>
        <LangProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
