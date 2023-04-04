import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeComponent } from './volume/volume.component';
import { VolumesComponent } from './volumes/volumes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    VolumeComponent,
    VolumesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'volumes', component: VolumesComponent },
      { path: 'volumes/:name', component: VolumeComponent }, 
    ]),
  ],
  exports: [
    VolumeComponent, 
    VolumesComponent
  ]
})
export class VolumesModule { }
