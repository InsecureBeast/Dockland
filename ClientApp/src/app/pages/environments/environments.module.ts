import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentComponent } from './environment/environment.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EnvironmentListComponent } from './environment-list/environment-list.component';
import { FluidHeightDirective } from '@directives/fluid-height.directive';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '@components/loader/loader.component';
import { TitleModule } from '@components/title/title.module';
import { EnvironmentToolbarComponent } from './environment-toolbar/environment-toolbar.component';

@NgModule({
  declarations: [
    EnvironmentComponent,
    EnvironmentsComponent,
    EnvironmentListComponent,
    EnvironmentToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      //{ path: 'environments', component: EnvironmentsComponent },
      { path: 'environment', component: EnvironmentComponent },
      { path: 'environment/:name', component: EnvironmentComponent }, 
    ]),
    ProgressbarModule.forRoot(),
    NgbTooltipModule,
    ReactiveFormsModule,
    FluidHeightDirective,
    LoaderComponent,
    TitleModule
  ],
  exports: [
    EnvironmentsComponent
  ]
})
export class EnvironmentsModule { }
