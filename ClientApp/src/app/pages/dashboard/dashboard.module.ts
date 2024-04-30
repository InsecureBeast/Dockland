import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { TitleModule } from 'src/app/components/title/title.module';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent },
    ]),
    TitleModule,
    FluidHeightDirective
  ]
})
export class DashboardModule { }
