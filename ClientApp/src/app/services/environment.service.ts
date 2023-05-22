import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IEnvironment } from "../pages/environments/environment";

@Injectable({ providedIn: "root"})
export class EnvironmentService {

  private readonly _current$ = new Subject<IEnvironment>();
  private _current: IEnvironment | undefined;

  constructor() {
    const envString = localStorage.getItem("env");   
    if (envString) {
      const env = JSON.parse(envString) as IEnvironment;
      this.setEnvironment(env);
    }
  }
  
  get current(): Observable<IEnvironment> {
    return this._current$.asObservable();
  }

  get currentEnv(): IEnvironment | undefined {
    return this._current;
  }

  openEnvironment(env: IEnvironment): void {
    this.setEnvironment(env);
    localStorage.setItem("env", JSON.stringify(env));
  }

  private setEnvironment(env: IEnvironment): void {
    this._current = env;
    this._current$.next(env);
  }
}