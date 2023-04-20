import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers/containers.component';
import { ContainerListComponent } from './components/container-list.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [
    ContainersComponent,
    ContainerListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'containers', component: ContainersComponent },
      { path: 'containers/:name', component: ContainerComponent }, 
    ]),
  ],
  exports: [
    ContainerListComponent
  ]
})
export class ContainersModule { }
