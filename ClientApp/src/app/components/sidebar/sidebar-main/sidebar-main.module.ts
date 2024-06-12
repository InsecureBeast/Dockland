import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMainComponent } from './sidebar-main.component';
import { RouterModule } from '@angular/router';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

@NgModule({
  declarations: [
    SidebarMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarItemComponent
  ],
  exports: [
    SidebarMainComponent
  ]
})
export class SidebarModule { }
