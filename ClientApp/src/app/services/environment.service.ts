import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IEnvironment } from "../pages/environments/environment";

@Injectable({ providedIn: "root"})
export class EnvironmentService {

  private readonly _current$ = new Subject<IEnvironment>();
  private _current: IEnvironment | undefined;
  
  get current(): Observable<IEnvironment> {
    return this._current$.asObservable();
  }

  get currentEnv(): IEnvironment | undefined {
    return this._current;
  }

  openEnvironment(env: IEnvironment): void {
    this._current$.next(env);
    this._current = env;
  }
}