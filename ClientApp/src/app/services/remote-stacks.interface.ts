import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export class StackCreationOptions {
  stackName!: string;
  gitOptions?: GitOptions;
  editor?: string;
  params: string[] = [];
}

export class GitOptions {
  url?: string;
  branchName?: string;
  credentials?: GitCredentials;
  isSecure?: boolean = true;
  composeFilename?: string;
  additionalFiles: string[] = [];
}

export class GitCredentials {
  userName: string = '';
  password: string = '';
}

export interface IRemoteStacks {
  set(environment: string, options: StackCreationOptions): Observable<boolean>;
  get(environment: string, stackName: string): Observable<boolean>;
  delete(environment: string, stackName: string): Observable<boolean>;
}

@Injectable({ providedIn: "root" })
export class RemoteStacks implements IRemoteStacks {
  
  constructor(
    private readonly _http: HttpClient, 
    @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  set(environment: string, options: StackCreationOptions): Observable<boolean> {
    const body = JSON.stringify(options);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this._http.put<boolean>(`${this._baseUrl}api/stack/${encodeURIComponent(environment)}`, body, httpOptions);
  }

  get(environment: string, stackName: string): Observable<boolean> {
    const url = `${this._baseUrl}api/stack/${encodeURIComponent(environment)}/${encodeURIComponent(stackName)}`;
    return this._http.get<boolean>(url);
  }

  delete(environment: string, stackName: string): Observable<boolean> {
    const url = `${this._baseUrl}api/stack/${encodeURIComponent(environment)}/${encodeURIComponent(stackName)}`;
    return this._http.delete<boolean>(url);
  }
}