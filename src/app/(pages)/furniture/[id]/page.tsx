import projects from "@/../content/projects.json";
import { FurnitureDetailClient } from "./client";

export function generateStaticParams() {
  return projects.map((p: any) => ({ id: p.id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <FurnitureDetailClient />;
}