import { Metadata } from "next";
import projects from "@/../content/projects.json";
import { FurnitureDetailClient } from "./client";

const baseUrl = "https://friendbehance-bot.github.io/samlee-design";

export function generateStaticParams() {
  return projects.map((p: any) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = projects.find((pr: any) => pr.id === id);
  if (!p) return { title: "Project Not Found" };
  const desc = p.descriptionEn || p.description;
  const tags = p.tagsEn?.length ? p.tagsEn : p.tags || [];
  return {
    title: p.titleEn || p.title,
    description: desc,
    keywords: tags,
    openGraph: {
      title: (p.titleEn || p.title) + " | Sam Lee",
      description: desc,
      images: p.images?.[0] ? [{ url: baseUrl + p.images[0] }] : []
    }
  };
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <FurnitureDetailClient />;
}