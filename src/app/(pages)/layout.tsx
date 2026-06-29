import type { Metadata } from "next";

const baseUrl = "https://friendbehance-bot.github.io/samlee-design";

export const metadata: Metadata = {
  title: "Sam Lee | 办公家具设计 & 项目管理",
  description: "Sam Lee — 办公家具设计师，从事家具事业30年。专注于办公板类产品设计、人体工学椅、电动升降桌、声学隔断系统。",
  keywords: ["办公家具设计", "人体工学椅", "电动升降桌", "声学隔断", "系统家具", "办公空间解决方案", "项目管理", "旅行摄影"],
  openGraph: {
    url: baseUrl,
    siteName: "Sam Lee Portfolio",
    locale: "zh_CN"
  },
  robots: { index: true, follow: true }
};

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}