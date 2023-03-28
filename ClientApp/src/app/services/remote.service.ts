import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { first, Observable } from "rxjs";
import { Image } from "../core/data-classes";

@Injectable({ providedIn: 'root' })
export class  RemoteService {
  
  constructor(
    private _http: HttpClient, 
    @Inject('BASE_URL') private _baseUrl: string) {
    
  }

  getImages(environment: string):Observable<Image[]> {
    return this._http.get<Image[]>(`${this._baseUrl}api/images?env=${environment}`).pipe(first());
  }
  
}
