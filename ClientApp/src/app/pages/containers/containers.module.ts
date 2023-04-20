import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers/containers.component';
import { ContainerListComponent } from './components/container-list.component';

@NgModule({
  declarations: [
    ContainersComponent,
    ContainerListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainersComponent,
    ContainerListComponent
  ]
})
export class ContainersModule { }
