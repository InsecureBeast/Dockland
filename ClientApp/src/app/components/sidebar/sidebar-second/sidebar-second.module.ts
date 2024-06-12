import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarSecondComponent } from './sidebar-second.component';
import { SidebarItemComponent } from "../sidebar-item/sidebar-item.component";

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
    SidebarItemComponent
  ]
})
export class SidebarTreeModule { }