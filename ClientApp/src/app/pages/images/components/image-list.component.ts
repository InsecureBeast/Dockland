import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseListComponent, ProcessType } from 'src/app/components/base-list/base-list.component';
import { ImageModel } from './image.model';
import { remove } from 'src/app/utils/array-utils';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html'
})
export class ImageListComponent extends BaseListComponent<ImageModel> {

  @Input() fluentHeightEnabled: boolean = true;
  @Output() onChecked = new EventEmitter<ImageModel[]>();

  override isDisabled(model: ImageModel): boolean {
    return model.name.includes("/dockland");
  }

  override check(model: ImageModel, event: Event): boolean {
    super.check(model, event);
    this.onChecked.emit(this.getSelected());
    return true;
  }

  override checkAll(event: Event): void {
    super.checkAll(event);
    this.onChecked.emit(this.getSelected());
  }

  remove(model: ImageModel) {
    if (this.items) {
      this.processType = "danger";
      remove(this.items, model);
    }
  }

  setProcessType(type: ProcessType): void {
    this.processType = type;
  }
}
