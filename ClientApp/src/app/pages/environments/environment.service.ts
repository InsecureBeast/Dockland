import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { IEnvironment } from "./environment";
import { RemoteService } from "@services/remote.service";
import { extractParam } from "@utils/url.utils";

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
    return extractParam(currentRoute, 'env');
  }

  getEnvironment(): IEnvironment | undefined {
    const name = this.getEnvironmentName();
    return this._environments.getValue().find(env => env.name === name);
  }

  refreshEnvironments(): void {
    this._remoteService.getEnvironments().subscribe((environments: IEnvironment[]) => {
      this._environments.next(environments);
    });
  }
}