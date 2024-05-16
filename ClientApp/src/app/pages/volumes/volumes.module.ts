import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeComponent } from './volume/volume.component';
import { VolumesComponent } from './volumes/volumes.component';
import { RouterModule } from '@angular/router';
import { VolumeListComponent } from './components/volume-list/volume-list.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';
import { LoaderComponent } from "../../components/loader/loader.component";

@NgModule({
    declarations: [
        VolumeComponent,
        VolumesComponent,
        VolumeListComponent
    ],
    exports: [
        VolumeComponent,
        VolumesComponent,
        VolumeListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot([
            { path: 'volumes', component: VolumesComponent },
            { path: 'volumes/:name', component: VolumeComponent },
        ]),
        TitleModule,
        FluidHeightDirective,
        LoaderComponent
    ]
})
export class VolumesModule { }
