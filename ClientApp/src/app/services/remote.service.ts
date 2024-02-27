import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { INetwork } from "../core/network";
import { IVolume } from "../core/volume";
import { Stack } from "../pages/stacks/stack";
import { IEnvironment } from "../pages/environments/environment";
import { IRemoteContainers, RemoteContainers } from "./remote-containers.interface";
import { IRemoteStacks, RemoteStacks } from "./remote-stacks.interface";
import { IRemoteImages, RemoteImages } from "./remote-images.inteface";

@Injectable({ providedIn: 'root' })
export class  RemoteService {
  private _remoteContainers: IRemoteContainers;
  private _remoteStacks: IRemoteStacks;
  private _remoteImages: IRemoteImages;

  constructor(
    private _http: HttpClient, 
    @Inject('BASE_URL') private _baseUrl: string) {
      this._remoteContainers = new RemoteContainers(_http, _baseUrl);
      this._remoteStacks = new RemoteStacks(_http, _baseUrl);
      this._remoteImages = new RemoteImages(_http, _baseUrl);
  }

  get containers(): IRemoteContainers {
    return this._remoteContainers;
  }

  get stacks(): IRemoteStacks {
    return this._remoteStacks;
  }

  get images(): IRemoteImages {
    return this._remoteImages;
  }

  getStacks(environment: string): Observable<Stack[]> {
    return this._http.get<Stack[]>(`${this._baseUrl}api/stacks/${environment}`);
  }

  deleteStack(environment: string, stack: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this._baseUrl}api/stacks/${environment}/${stack}`);
  }

  getVolumes(environment: string, stack?: string): Observable<IVolume[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<IVolume[]>(`${this._baseUrl}api/volumes/${environment}` + stackRequest);
  }

  getNetworks(environment: string, stack?: string): Observable<INetwork[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<INetwork[]>(`${this._baseUrl}api/networks/${environment}` + stackRequest);
  }

  getEnvironments(): Observable<IEnvironment[]> {
    return this._http.get<IEnvironment[]>(`${this._baseUrl}api/environments`);
  }

  getEnvironment(id: string): Observable<IEnvironment> {
    return this._http.get<IEnvironment>(`${this._baseUrl}api/environments/${id}`);
  }

  setEnvironment(env: IEnvironment): Observable<boolean> {
    return this._http.put<boolean>(`${this._baseUrl}api/environments`, env);
  }

  deleteEnvironment(id: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this._baseUrl}api/environments/${id}`);
  }

  findEnvironment(name: string): Observable<IEnvironment> {
    return this._http.get<IEnvironment>(`${this._baseUrl}api/environments/find/name/${name}`);
  }
}
