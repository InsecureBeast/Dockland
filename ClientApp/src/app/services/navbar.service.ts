import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class  NavbarService {

  private _visibility$: BehaviorSubject<boolean>;
  
  constructor() {
    this._visibility$ = new BehaviorSubject<boolean>(true);
  }

  get visible(): Observable<boolean> {
    return this._visibility$ as Observable<boolean>;
  }

  changeVisibility(value: boolean): void {
    this._visibility$.next(value);
  }
}