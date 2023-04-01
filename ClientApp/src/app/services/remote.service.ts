import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { first, Observable } from "rxjs";
import { Image } from "../core/data-classes";
import { Container } from "../pages/containers/container";

@Injectable({ providedIn: 'root' })
export class  RemoteService {
  
  
  constructor(
    private _http: HttpClient, 
    @Inject('BASE_URL') private _baseUrl: string) {
    
  }

  getImages(environment: string):Observable<Image[]> {
    return this._http.get<Image[]>(`${this._baseUrl}api/images?env=${environment}`).pipe(first());
  }
  
  getContainers(environment: string): Observable<Container[]> {
    return this._http.get<Container[]>(`${this._baseUrl}api/containers?env=${environment}`).pipe(first());
  }

  getStacks(environment: string, stack?: string): Observable<Container[]> {
    let stackRequest = stack ? `&&stack=${stack}` : "";
    return this._http.get<Container[]>(`${this._baseUrl}api/stacks?env=${environment}` + stackRequest).pipe(first());
  }

  removeStack(environment: string, stack: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this._baseUrl}api/stacks/remove?env=${environment}&stack=${stack}`).pipe(first());
  }
}
