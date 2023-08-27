import { IContainer } from 'src/app/core/container';
import { IChecked } from 'src/app/directives/check-all.directive';

export class ContainerModel implements IChecked {
  container: IContainer;
  checked: boolean;
  inProgress: boolean = false;

  constructor(container: IContainer, isChecked: boolean = false) {
    this.container = container;
    this.checked = isChecked;
  }
}