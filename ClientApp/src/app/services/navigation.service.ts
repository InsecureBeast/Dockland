import { Injectable } from "@angular/core";
import { ElementType } from "../core/element.type";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class NavigationService {

  constructor(private readonly _router: Router) {
  }

  navigate(elementType: ElementType): void {
    switch (elementType) {
      case ElementType.Stack:
        this._router.navigateByUrl("/stacks");
        break;
      case ElementType.Container:
        this._router.navigateByUrl("/containers");
        break;
      case ElementType.Image:
        this._router.navigateByUrl("/images");
        break;
      case ElementType.Network:
        this._router.navigateByUrl("/networks");
        break;
      case ElementType.Volume:
        this._router.navigateByUrl("/volumes");
        break;
    
      default:
        this._router.navigateByUrl("/");
        break;
    }
  }
}