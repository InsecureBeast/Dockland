import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { TitleModule } from 'src/app/components/title/title.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

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
    DirectivesModule
  ]
})
export class DashboardModule { }
