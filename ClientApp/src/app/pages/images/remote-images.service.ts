import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Image } from "./image";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class RemoteImages {

  constructor(private _http: HttpClient) {}
  
  getImages(environment: string, stack?: string):Observable<Image[]> {
    let stackRequest = stack ? `/${stack}` : "";
    return this._http.get<Image[]>(`api/images/${environment}` + stackRequest);
  }

  delete(environment: string, image: Image): Observable<boolean> {
    return this._http.delete<boolean>(`api/images/${environment}/${image.id}`);
  }
}
