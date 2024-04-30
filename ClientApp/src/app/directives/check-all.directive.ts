import { AfterViewInit, Directive, ElementRef, HostListener, Input } from "@angular/core";

export interface IChecked {
  checked: boolean;
}

@Directive({
  selector: "[checkAll]",
  standalone: true
})
export class CheckAllDirective implements AfterViewInit {
  @Input("checkAllItems") items: IChecked[] = [];

  indeterminate: boolean = false;
  allChecked: boolean = false;

  private _domElement: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this._domElement = this.elementRef.nativeElement as HTMLInputElement;
  }

  ngAfterViewInit() {
  }

  @HostListener('change', ['item', '$event'])
  change(item: IChecked, event: Event): void {
    if (!item)
      this.checkAll(event);
    else
      this.check(item, event);
  }

  private check(item: IChecked, event: Event): boolean {
    item.checked = this.getCheckboxValue(event);
    
    if (this.isAllChecked()) {
      this.allChecked = true;
      this.indeterminate = false;
    } else if (this.isAnyChecked()) {
      this.allChecked = false;
      this.indeterminate = true;
    } else {
      this.allChecked = false;
      this.indeterminate = false;
    }
    this._domElement.checked = this.allChecked;
    this._domElement.indeterminate = this.indeterminate;
    return true;
  }

  private checkAll(event: Event): void {
    const checked = this.getCheckboxValue(event);
    this.items.forEach(m => m.checked = checked);
  }

  private isAllChecked(): boolean {
    if (!this.items)
      return false;

    return this.items.every(c => c.checked);
  }

  private isAnyChecked(): boolean {
    if (!this.items)
      return false;

    return this.items.some(c => c.checked);
  }

  private getCheckboxValue(event: Event): boolean {
    const check = event.target as HTMLInputElement;
    return check?.checked;
  }
}