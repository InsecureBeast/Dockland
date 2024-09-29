import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

@Injectable({ providedIn: "root" })
export class RemoteStacks {
  
  constructor(private readonly _http: HttpClient) {}

  set(environment: string, options: StackCreationOptions): Observable<boolean> {
    const body = JSON.stringify(options);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this._http.put<boolean>(`api/stack/${encodeURIComponent(environment)}`, body, httpOptions);
  }

  get(environment: string, stackName: string): Observable<boolean> {
    const url = `api/stack/${encodeURIComponent(environment)}/${encodeURIComponent(stackName)}`;
    return this._http.get<boolean>(url);
  }

  delete(environment: string, stackName: string): Observable<boolean> {
    const url = `api/stack/${encodeURIComponent(environment)}/${encodeURIComponent(stackName)}`;
    return this._http.delete<boolean>(url);
  }
}