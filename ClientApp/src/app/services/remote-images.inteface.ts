import { Observable } from "rxjs";
import { Image } from "../core/image";
import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";

export interface IRemoteImages {
  getImages(environment: string, stack?: string): Observable<Image[]>;
  delete(environment: string, container: Image): Observable<boolean>;
}

export class RemoteImages implements IRemoteImages {

  constructor(
    private _http: HttpClient, 
    @Inject('BASE_URL') private _baseUrl: string) {
  }
  
  getImages(environment: string, stack?: string):Observable<Image[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<Image[]>(`${this._baseUrl}api/images/${environment}` + stackRequest);
  }

  delete(environment: string, image: Image): Observable<boolean> {
    return this._http.delete<boolean>(`${this._baseUrl}api/images/${environment}/${image.id}`);
  }
}
