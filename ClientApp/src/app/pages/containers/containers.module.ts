import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers.component';

@NgModule({
  declarations: [
    ContainersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainersComponent
  ]
})
export class ContainersModule { }
