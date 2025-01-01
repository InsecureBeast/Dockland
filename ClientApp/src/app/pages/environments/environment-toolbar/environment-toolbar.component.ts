import { Component, EventEmitter, Output } from '@angular/core';
import { EnvironmentModel } from '../environment.model';
import { BaseListComponent } from '@components/base-list/base-list.component';

@Component({
  selector: 'app-environment-toolbar',
  templateUrl: './environment-toolbar.component.html',
  styleUrl: './environment-toolbar.component.scss'
})
export class EnvironmentToolbarComponent extends BaseListComponent<EnvironmentModel> {

  @Output() deleted = new EventEmitter<EnvironmentModel[]>();

  delete(): void {
    const selected = this.getSelected();
    this.deleted.emit(selected);
  }

  getFirstSelected(): EnvironmentModel | null {
    const selected = super.getSelected();
    if (selected.length >= 1)
      return selected[0];
    return null;
  }

  isOneChecked(): boolean {
    if (!this.items)
      return false;

    return this.items.filter(c => c.checked).length == 1;
  }
}
