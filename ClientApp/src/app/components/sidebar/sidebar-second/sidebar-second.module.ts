import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarSecondComponent } from './sidebar-second.component';
import { SidebarItemComponent } from "../sidebar-item/sidebar-item.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from '../../accordion/accordion.module';

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
    SidebarItemComponent,
    AccordionModule
  ]
})
export class SidebarSecondModule { }