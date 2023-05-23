import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { first, Observable } from "rxjs";
import { INetwork } from "../core/network";
import { IVolume } from "../core/volume";
import { Stack } from "../pages/stacks/stack";
import { IEnvironment } from "../pages/environments/environment";
import { Image } from "../core/image";
import { Container } from "../core/container";

@Injectable({ providedIn: 'root' })
export class  RemoteService {
  
  
  constructor(
    private _http: HttpClient, 
    @Inject('BASE_URL') private _baseUrl: string) {
    
  }

  getImages(environment: string, stack?: string):Observable<Image[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<Image[]>(`${this._baseUrl}api/images/${environment}` + stackRequest).pipe(first());
  }
  
  getContainers(environment: string): Observable<Container[]> {
    return this._http.get<Container[]>(`${this._baseUrl}api/containers/${environment}`).pipe(first());
  }
  
  getStacks(environment: string): Observable<Stack[]> {
    return this._http.get<Stack[]>(`${this._baseUrl}api/stacks/${environment}`).pipe(first());
  }

  getStackContainers(environment: string, stack: string): Observable<Container[]> {
    return this._http.get<Container[]>(`${this._baseUrl}api/containers/${environment}/${stack}`).pipe(first());
  }

  deleteStack(environment: string, stack: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this._baseUrl}api/stacks/${environment}/${stack}`).pipe(first());
  }

  getVolumes(environment: string, stack?: string): Observable<IVolume[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<IVolume[]>(`${this._baseUrl}api/volumes/${environment}` + stackRequest).pipe(first());
  }

  getNetworks(environment: string, stack?: string): Observable<INetwork[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<INetwork[]>(`${this._baseUrl}api/networks/${environment}` + stackRequest).pipe(first());
  }

  getEnvironments(): Observable<IEnvironment[]> {
    return this._http.get<IEnvironment[]>(`${this._baseUrl}api/environments`).pipe(first());
  }

  getEnvironment(id: string): Observable<IEnvironment> {
    return this._http.get<IEnvironment>(`${this._baseUrl}api/environments/${id}`).pipe(first());
  }

  setEnvironment(env: IEnvironment): Observable<boolean> {
    return this._http.put<boolean>(`${this._baseUrl}api/environments`, env).pipe(first());
  }

  deleteEnvironment(id: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this._baseUrl}api/environments/${id}`).pipe(first());
  }

  findEnvironment(name: string): Observable<IEnvironment> {
    return this._http.get<IEnvironment>(`${this._baseUrl}api/environments/find/name/${name}`).pipe(first());
  }
}
