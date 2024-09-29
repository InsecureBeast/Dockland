import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { INetwork } from "../core/network";
import { IVolume } from "../core/volume";
import { Stack } from "../pages/stacks/stack";
import { IEnvironment } from "../pages/environments/environment";

@Injectable({ providedIn: 'root' })
export class  RemoteService {

  constructor(private _http: HttpClient) {
  }

  getStacks(environment: string): Observable<Stack[]> {
    return this._http.get<Stack[]>(`api/stacks/${environment}`);
  }

  deleteStack(environment: string, stack: string): Observable<boolean> {
    return this._http.delete<boolean>(`api/stacks/${environment}/${stack}`);
  }

  getVolumes(environment: string, stack?: string): Observable<IVolume[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<IVolume[]>(`api/volumes/${environment}` + stackRequest);
  }

  getNetworks(environment: string, stack?: string): Observable<INetwork[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<INetwork[]>(`api/networks/${environment}` + stackRequest);
  }

  getEnvironments(): Observable<IEnvironment[]> {
    return this._http.get<IEnvironment[]>(`api/environments`);
  }

  getEnvironment(id: string): Observable<IEnvironment> {
    return this._http.get<IEnvironment>(`api/environments/${id}`);
  }

  setEnvironment(env: IEnvironment): Observable<boolean> {
    return this._http.put<boolean>(`api/environments`, env);
  }

  deleteEnvironment(id: string): Observable<boolean> {
    return this._http.delete<boolean>(`api/environments/${id}`);
  }

  findEnvironment(name: string): Observable<IEnvironment> {
    return this._http.get<IEnvironment>(`api/environments/find/name/${name}`);
  }
}
