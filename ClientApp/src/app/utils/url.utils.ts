import { ActivatedRouteSnapshot } from "@angular/router";

export function getHostFromUrl(url: string): string {
  const lastIndexOf = url.lastIndexOf(":");
  const split = url.slice(0, lastIndexOf);
  return split;
}

export function extractParam(route: ActivatedRouteSnapshot, paramName: string): string | null {
  if (route.paramMap.has(paramName))
    return route.paramMap.get(paramName);
  
  for (const childRoute of route.children) {
    const param = extractParam(childRoute, paramName);
    if (param)
      return param;
  }
  return null;
}