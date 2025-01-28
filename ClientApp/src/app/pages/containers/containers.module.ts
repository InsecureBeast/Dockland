import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers/containers.component';
import { ContainerListComponent } from './components/container-list/container-list.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { TerminalComponent } from './terminal/terminal.component';
import { NgTerminalModule } from 'ng-terminal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';
import { LoaderCountPipe } from 'src/app/pipes/loader-count.pipe';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ContainersService } from './services/containers.service';
import { ContainerLogsComponent } from './components/container-logs/container-logs.component';
import { ContainerInspectComponent } from "./components/container-inspect/container-inspect.component";
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContainersComponent,
    ContainerListComponent,
    ContainerComponent,
    ContainerLogsComponent,
    TerminalComponent,
    ContainerInspectComponent
  ],
  exports: [
    ContainerListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    MonacoEditorModule.forRoot(),
    TitleModule,
    NgTerminalModule,
    FluidHeightDirective,
    LoaderCountPipe,
    LoaderComponent,
],
  providers: [
    ContainersService
  ]
})
export class ContainersModule {}
