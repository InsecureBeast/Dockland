import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeComponent } from './volume/volume.component';
import { VolumesComponent } from './volumes/volumes.component';
import { RouterModule } from '@angular/router';
import { VolumeListComponent } from './components/volume-list/volume-list.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';

@NgModule({
  declarations: [
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
    FluidHeightDirective
  ],
  exports: [
    VolumeComponent, 
    VolumesComponent,
    VolumeListComponent
  ]
})
export class VolumesModule { }
