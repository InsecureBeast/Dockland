import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { IEnvironment } from "./environment";
import { RemoteService } from "@services/remote.service";

@Injectable({ providedIn: "root"})
export class EnvironmentService {

  private readonly _environments = new BehaviorSubject<IEnvironment[]>([]);

  constructor(
    private readonly _router: Router,
    private readonly _remoteService: RemoteService) {

  }

  get environments(): Observable<IEnvironment[]> {
    return this._environments.asObservable();
  }

  getEnvironmentName(): string | null {
    const currentRoute = this._router.routerState.snapshot.root;
    return this.extractParam(currentRoute, 'env');
  }

  refreshEnvironments(): void {
    this._remoteService.getEnvironments().subscribe((environments: IEnvironment[]) => {
      this._environments.next(environments);
    });
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