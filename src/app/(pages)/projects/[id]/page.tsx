import cases from "@/../content/cases.json";
import { CaseDetailClient } from "./client";

export function generateStaticParams() {
  return cases.map((c: any) => ({ id: c.id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <CaseDetailClient />;
}