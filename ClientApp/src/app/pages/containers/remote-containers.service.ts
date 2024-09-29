import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IContainer } from "./container";

@Injectable({providedIn: "root"})
export class RemoteContainers {
  constructor(private _http: HttpClient) {
  }
  
  getContainers(environment: string): Observable<IContainer[]> {
    return this._http.get<IContainer[]>(`api/containers/${environment}`);
  }

  getStackContainers(environment: string, stack: string): Observable<IContainer[]> {
    return this._http.get<IContainer[]>(`api/containers/${environment}/${stack}`);
  }

  stop(environment: string, container: IContainer): Observable<IContainer> {
    const body = JSON.stringify({ status: "exited" });
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this._http.put<IContainer>(`$api/containers/${environment}/${container.id}`, body, httpOptions);
  }

  start(environment: string, container: IContainer): Observable<IContainer> {
    const body = JSON.stringify({ status: "running" });
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this._http.put<IContainer>(`api/containers/${environment}/${container.id}`, body, httpOptions);
  }

  delete(environment: string, container: IContainer): Observable<boolean> {
    return this._http.delete<boolean>(`api/containers/${environment}/${container.id}`);
  }
}