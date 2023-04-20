import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeComponent } from './volume/volume.component';
import { VolumesComponent } from './volumes/volumes.component';
import { RouterModule } from '@angular/router';
import { VolumeListComponent } from './components/volume-list/volume-list.component';

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
  ],
  exports: [
    VolumeComponent, 
    VolumesComponent,
    VolumeListComponent
  ]
})
export class VolumesModule { }
