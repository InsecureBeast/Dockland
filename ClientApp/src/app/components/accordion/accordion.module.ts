import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './accordion-group/accordion-group.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [ AccordionComponent, AccordionPanelComponent ],
  exports: [
    AccordionComponent,
    AccordionPanelComponent
  ],
  imports: [
    CommonModule,
    CollapseModule
  ]
})
export class AccordionModule { }
