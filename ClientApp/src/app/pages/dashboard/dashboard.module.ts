import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    TitleModule,
    FluidHeightDirective
  ]
})
export class DashboardModule { }
