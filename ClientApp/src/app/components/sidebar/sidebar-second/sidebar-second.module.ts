import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { SidebarSecondComponent } from './sidebar-second.component';
import { SidebarItemComponent } from "../sidebar-item/sidebar-item.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SidebarSecondComponent,
  ],
  exports: [
    SidebarSecondComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    SidebarItemComponent
  ]
})
export class SidebarSecondModule { }