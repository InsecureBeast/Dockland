import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable, first } from "rxjs";

export class StackCreationOptions {
  gitOptions?: GitOptions;
  editor?: string;
  params?: string[];
}

export class GitOptions {
  url?: string;
  branchName?: string;
  credentials?: GitCredentials;
  isSecure?: boolean = true;
  composeFilename?: string;
  additionalFiles?: string[] = new Array();
}

export class GitCredentials {
  userName: string = '';
  password: string = '';
}

export interface IRemoteStacks {
  createNew(environment: string, options: StackCreationOptions): Observable<boolean>;
}

export class RemoteStacks implements IRemoteStacks {
  
  constructor(
    private readonly _http: HttpClient, 
    @Inject('BASE_URL') private readonly _baseUrl: string) {
  }
  
  createNew(environment: string, options: StackCreationOptions): Observable<boolean> {
    const body = options;
    return this._http.put<boolean>(`${this._baseUrl}api/stacks/${environment}`, body).pipe(first());
  }

}