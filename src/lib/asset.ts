const PREFIX = "/samlee-design";
export function assetPath(p: string): string {
  if (p.startsWith("http")) return p;
  return PREFIX + p;
}
