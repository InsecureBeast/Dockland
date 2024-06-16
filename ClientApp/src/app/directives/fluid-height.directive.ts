import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnDestroy, Renderer2} from "@angular/core";
import { Subject, fromEvent } from "rxjs";
import { debounceTime, takeUntil, throttleTime } from "rxjs/operators";

@Directive({
  selector: "[fluidHeight]",
  standalone: true
})
export class FluidHeightDirective implements AfterViewInit, OnDestroy {
  private _domElement: HTMLElement;
  private _destroy: Subject<void> = new Subject<void>();

  @Input() minHeight: number | undefined;
  @Input("fluidHeight") topOffset: number | undefined;
  @Input("fluidHeightBottomPadding") bottomPadding: number = 0;
  @Input("fluidHeightEnabled") enabled: boolean | undefined; 
  @Input("fluidHeightTopOffsetElementName") topElementName: string | undefined;
  
  @HostBinding('style.overflow-y') overflowY = 'auto';
  @HostBinding('style.overflow-x') overflowX = 'hidden';

  constructor(
    private readonly _renderer: Renderer2, 
    private readonly _elementRef: ElementRef) {
    
    this._domElement = this._elementRef.nativeElement as HTMLElement;

    // register on window resize event
    fromEvent(window, "resize")
      .pipe(
        takeUntil(this._destroy),
        throttleTime(500), 
        debounceTime(500))
      .subscribe(() => this.setHeight());
  }

  ngAfterViewInit() {
    this.setHeight();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
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
    this._renderer.setStyle(this._domElement, "height", `${height}px`);
  }

  private calcTopOffset(): number {
    try {
      const rect = this._domElement.getBoundingClientRect();
      let top = rect.top;
      if (this.topElementName) {
        const parentElement = this.findParentByTag(this.topElementName, this._domElement);
        if (parentElement) {
          const parentRect = parentElement.getBoundingClientRect();
          top -= parentRect.top;
        }
      }
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return top + scrollTop;
    } catch (e) {
      return 0;
    }
  }

  private findParentByTag(tag: string, element: HTMLElement | null): HTMLElement | null {
    if (!element)
      return null;

    if (element.tagName.toLowerCase() === tag.toLowerCase())
      return element;
    
    return this.findParentByTag(tag, element.parentElement);
  }
}