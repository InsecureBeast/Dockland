import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentComponent } from './environment/environment.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EnvironmentComponent,
    EnvironmentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      //{ path: 'environments', component: EnvironmentsComponent },
      { path: 'environment', component: EnvironmentComponent },
      { path: 'environment/:name', component: EnvironmentComponent }, 
    ]),
    ReactiveFormsModule
  ],
  exports: [
    EnvironmentsComponent
  ]
})
export class EnvironmentsModule { }
