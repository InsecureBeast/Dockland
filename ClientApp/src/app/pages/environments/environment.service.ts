import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { IEnvironment } from "./environment";

@Injectable({ providedIn: "root"})
export class EnvironmentService {

  private readonly _current$ = new ReplaySubject<IEnvironment | undefined>();
  private _current: IEnvironment | undefined;

  constructor() {
    const envString = localStorage.getItem("env");   
    if (envString) {
      const env = JSON.parse(envString) as IEnvironment;
      this.setEnvironment(env);
    }
  }
  
  get current(): Observable<IEnvironment | undefined> {
    return this._current$.asObservable();
  }

  get currentEnv(): IEnvironment | undefined {
    return this._current;
  }

  openEnvironment(env: IEnvironment): void {
    this.setEnvironment(env);
    localStorage.setItem("env", JSON.stringify(env));
  }

  closeEnvironment(): void {
    this.setEnvironment(undefined);
    localStorage.removeItem("env");
  }

  private setEnvironment(env: IEnvironment | undefined): void {
    this._current = env;
    this._current$.next(env);
  }
}