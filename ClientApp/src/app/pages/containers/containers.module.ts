import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers/containers.component';
import { ContainerListComponent } from './components/container-list.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { TerminalComponent } from './terminal/terminal.component';
import { NgTerminalModule } from 'ng-terminal';

@NgModule({
  declarations: [
    ContainersComponent,
    ContainerListComponent,
    TerminalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'containers', component: ContainersComponent },
      { path: 'containers/:name', component: ContainerComponent }, 
      { path: 'containers/:name/terminal', component: TerminalComponent }, 
    ]),
    TitleModule,
    DirectivesModule,
    NgTerminalModule
  ],
  exports: [
    ContainerListComponent
  ]
})
export class ContainersModule { }
