import { AfterViewInit, Directive, ElementRef, Input, Renderer2,} from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, throttleTime } from "rxjs/operators";

@Directive({
  selector: "[fluidHeight]",
})
export class FluidHeightDirective implements AfterViewInit {
  @Input() minHeight: number | undefined;
  @Input("fluidHeight") topOffset: number | undefined;
  @Input("fluidHeightBottomPadding") bottomPadding: number = 0;
  @Input("fluidHeightEnabled") enabled: boolean | undefined; 

  private _domElement: HTMLElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this._domElement = this.elementRef.nativeElement as HTMLElement;

    // register on window resize event
    fromEvent(window, "resize")
      .pipe(throttleTime(500), debounceTime(500))
      .subscribe(() => this.setHeight());
  }

  ngAfterViewInit() {
    this.setHeight();
  }

  private setHeight() {
    if (!this.enabled)
      return;

    const windowHeight = window?.innerHeight;
    const topOffset = this.topOffset || this.calcTopOffset();
    let height = windowHeight - topOffset;

    // set min height instead of the calculated
    if (this.minHeight && height < this.minHeight) {
      height = this.minHeight;
    }

    height -= this.bottomPadding;
    this.renderer.setStyle(this._domElement, "height", `${height}px`);
  }

  private calcTopOffset(): number {
    try {
      const rect = this._domElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      return rect.top + scrollTop;
    } catch (e) {
      return 0;
    }
  }
}