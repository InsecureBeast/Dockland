import { Injectable } from "@angular/core";
import { ElementType } from "../core/element.type";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class NavigationService {

  constructor(private readonly _router: Router) {
  }

  navigate(env: string | undefined, elementType: ElementType): void {
    switch (elementType) {
      case ElementType.Stack:
        this._router.navigate(['environments', env, 'stacks']);
        break;
      case ElementType.Container:
        this._router.navigate(['environments', env, 'containers']);
        break;
      case ElementType.Image:
        this._router.navigate(['environments', env, 'images']);
        break;
      case ElementType.Network:
        this._router.navigate(['environments', env, 'networks']);
        break;
      case ElementType.Volume:
        this._router.navigate(['environments', env, 'volumes']);
        break;
    
      default:
        this._router.navigateByUrl("/");
        break;
    }
  }
}