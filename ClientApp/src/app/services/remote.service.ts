import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { first, Observable } from "rxjs";
import { Container, Image } from "../core/data-classes";
import { INetwork } from "../core/network";
import { IVolume } from "../core/volume";
import { Stack } from "../pages/stacks/stack";

@Injectable({ providedIn: 'root' })
export class  RemoteService {
  
  
  constructor(
    private _http: HttpClient, 
    @Inject('BASE_URL') private _baseUrl: string) {
    
  }

  getImages(environment: string, stack?: string):Observable<Image[]> {
    let stackRequest = stack ? `&stack=${stack}` : "";
    return this._http.get<Image[]>(`${this._baseUrl}api/images?env=${environment}` + stackRequest).pipe(first());
  }
  
  getContainers(environment: string): Observable<Container[]> {
    return this._http.get<Container[]>(`${this._baseUrl}api/containers?env=${environment}`).pipe(first());
  }

  getStacks(environment: string): Observable<Stack[]> {
    return this._http.get<Stack[]>(`${this._baseUrl}api/stacks?env=${environment}`).pipe(first());
  }

  getStack(environment: string, stack: string): Observable<Container[]> {
    return this._http.get<Container[]>(`${this._baseUrl}api/stack?env=${environment}&stack=${stack}`).pipe(first());
  }

  removeStack(environment: string, stack: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this._baseUrl}api/stack/remove?env=${environment}&stack=${stack}`).pipe(first());
  }

  getVolumes(environment: string, stack?: string): Observable<IVolume[]> {
    let stackRequest = stack ? `&stack=${stack}` : "";
    return this._http.get<IVolume[]>(`${this._baseUrl}api/volumes?env=${environment}` + stackRequest).pipe(first());
  }

  getNetworks(environment: string, stack?: string): Observable<INetwork[]> {
    let stackRequest = stack ? `&stack=${stack}` : "";
    return this._http.get<INetwork[]>(`${this._baseUrl}api/networks?env=${environment}` + stackRequest).pipe(first());
  }
}
