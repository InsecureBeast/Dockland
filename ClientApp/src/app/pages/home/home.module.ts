import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SidebarSecondModule } from 'src/app/components/sidebar/sidebar-second/sidebar-second.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  providers: [],
  imports: [
    CommonModule,
    RouterModule,
    SidebarSecondModule,
    EnvironmentsModule,
  ],
})
export class HomeModule {}
