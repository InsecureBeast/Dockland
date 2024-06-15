import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers/containers.component';
import { ContainerListComponent } from './components/container-list.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { TerminalComponent } from './terminal/terminal.component';
import { NgTerminalModule } from 'ng-terminal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';
import { LoaderCountPipe } from 'src/app/pipes/loader-count.pipe';
import { LoaderComponent } from "../../components/loader/loader.component";

@NgModule({
    declarations: [
        ContainersComponent,
        ContainerListComponent,
        TerminalComponent
    ],
    exports: [
        ContainerListComponent
    ],
    imports: [
        CommonModule,
        ProgressbarModule.forRoot(),
        TitleModule,
        NgTerminalModule,
        FluidHeightDirective,
        LoaderCountPipe,
        LoaderComponent
    ]
})
export class ContainersModule { }
