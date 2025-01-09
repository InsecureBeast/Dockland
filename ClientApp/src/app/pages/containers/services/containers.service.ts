import { Injectable } from "@angular/core";
import { IContainer } from "../container";
import { Router } from "@angular/router";
import { BehaviorSubject, filter, from, mergeMap, Observable, of } from "rxjs";
import { RemoteContainers } from "./remote-containers.service";
import { EnvironmentService } from "@pages/environments/environment.service";
import { extractParam } from "@utils/url.utils";

@Injectable()
export class ContainersService {

private readonly _containers = new BehaviorSubject<IContainer[]>([]);

  constructor(
    private readonly _router: Router,
    private readonly _environmentService: EnvironmentService,
    private readonly _remoteService: RemoteContainers) {
  }

  get containers(): Observable<IContainer[]> {
    return this._containers.asObservable();
  }

  getCurrentContainer(): Observable<IContainer | null> {
    const envName = this._environmentService.getEnvironmentName();
    if (!envName)
      return of(null);

    const id = this.getCurrentContainerId();
    if (!id)
      return of(null);
    
    return this._remoteService.getContainer(envName, id);
  }

  refreshContainers(): void {
    const envName = this._environmentService.getEnvironmentName();
    if (!envName)
      return;

    this._remoteService.getContainers(envName).subscribe((containers: IContainer[]) => {
      this._containers.next(containers);
      this._containers.complete();
    });
  }
  
  private getCurrentContainerId(): string | null {
    const currentRoute = this._router.routerState.snapshot.root;
    return extractParam(currentRoute, 'id');
  }

  private getContainer(id: string): Observable<IContainer | null> {
    const envName = this._environmentService.getEnvironmentName();
    if (!envName)
      return of(null);

    return this._remoteService.getContainer(envName, id);
  }
}