export function assetPath(p: string): string {
  if (p.startsWith('http')) return p;
  // basePath is always /samlee-design in both dev and production
  const PREFIX = '/samlee-design';
  return PREFIX + p;
}
