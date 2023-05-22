
export function getHostFromUrl(url: string): string {
  const lastIndexOf = url.lastIndexOf(":");
  const split = url.slice(0, lastIndexOf);
  return split;
}