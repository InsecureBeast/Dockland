import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";

@Injectable({ providedIn: "root"})
export class EnvironmentService {

  constructor(private readonly _router: Router) {}

  getEnvironmentName(): string | null {
    const currentRoute = this._router.routerState.snapshot.root;
    return this.extractParam(currentRoute, 'env');
  }

  private extractParam(route: ActivatedRouteSnapshot, paramName: string): string | null {
    if (route.paramMap.has(paramName))
      return route.paramMap.get(paramName);
    
    for (const childRoute of route.children) {
      const param = this.extractParam(childRoute, paramName);
      if (param)
        return param;
    }
    return null;
  }
}