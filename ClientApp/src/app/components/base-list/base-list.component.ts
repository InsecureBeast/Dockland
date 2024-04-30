import { Directive, Input } from "@angular/core";

export type ProcessType = "success" | "info" | "warning" | "danger";

export interface ICheckableModel {
  checked: boolean;
}

@Directive({
  selector: 'app-image-base-list',
})
export class BaseListComponent<T extends ICheckableModel> {
  @Input() items: T[] | null = [];

  public indeterminate: boolean = false;
  public allChecked: boolean = false;
  public processType: ProcessType;

  constructor() {
    this.processType = 'success';
  }

  check(model: T, event: Event): boolean {
    model.checked = this.getCheckboxValue(event);
    
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
    return true;
  }

  checkAll(event: Event): void {
    const checked = this.getCheckboxValue(event);
    this.items?.forEach(m => this.isDisabled(m) ? m.checked = false : m.checked = checked);
  }

  isAnyChecked(): boolean {
    if (!this.items)
      return false;

    return this.items.some(c => c.checked);
  }

  isDisabled(model: T): boolean {
    return false;
  }

  protected getSelected(): T[] {
    return this.items?.filter(c => c.checked) ?? [];
  }

  private getCheckboxValue(event: Event): boolean {
    const check = event.target as HTMLInputElement;
    return check?.checked;
  }

  private isAllChecked(): boolean {
    if (!this.items)
      return false;

    return this.items.filter(m => !this.isDisabled(m)).every(c => c.checked);
  }
}