import { Component, Input } from '@angular/core';
import { AccordionPanelComponent } from './accordion-group/accordion-group.component';

@Component({
  selector: 'app-accordion',
  template: `<ng-content></ng-content>`,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.aria-multiselectable]': 'closeOthers',
    role: 'tablist',
    class: 'panel-group',
    style: 'display: block'
  }
})
export class AccordionComponent {
  /** turn on/off animation */
  @Input() isAnimated = false; 
  /** if `true` expanding one item will close all others */
  @Input() closeOthers = false;

  protected groups: AccordionPanelComponent[] = [];

  constructor() {
  }

  closeOtherPanels(openGroup: AccordionPanelComponent): void {
    if (!this.closeOthers) {
      return;
    }

    this.groups.forEach((group: AccordionPanelComponent) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  addGroup(group: AccordionPanelComponent): void {
    group.isAnimated = this.isAnimated;
    this.groups.push(group);
  }

  removeGroup(group: AccordionPanelComponent): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}
