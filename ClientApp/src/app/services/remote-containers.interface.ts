import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable, first } from "rxjs";
import { IContainer } from "../core/container";

export interface IRemoteContainers {
  getContainers(environment: string): Observable<IContainer[]>;
  getStackContainers(environment: string, stack: string): Observable<IContainer[]>;
  stop(environment: string, container: IContainer): Observable<IContainer>
  start(environment: string, container: IContainer): Observable<IContainer>;
}

export class RemoteContainers implements IRemoteContainers{
  constructor(
    private _http: HttpClient, 
    @Inject('BASE_URL') private _baseUrl: string) {
  }

  getContainers(environment: string): Observable<IContainer[]> {
    return this._http.get<IContainer[]>(`${this._baseUrl}api/containers/${environment}`).pipe(first());
  }

  getStackContainers(environment: string, stack: string): Observable<IContainer[]> {
    return this._http.get<IContainer[]>(`${this._baseUrl}api/containers/${environment}/${stack}`).pipe(first());
  }

  stop(environment: string, container: IContainer): Observable<IContainer> {
    const body = JSON.stringify({ status: "exited" });
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this._http.put<IContainer>(`${this._baseUrl}api/containers/${environment}/${container.id}`, body, httpOptions).pipe(first());
  }

  start(environment: string, container: IContainer): Observable<IContainer> {
    const body = JSON.stringify({ status: "running" });
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this._http.put<IContainer>(`${this._baseUrl}api/containers/${environment}/${container.id}`, body, httpOptions).pipe(first());
  }
}