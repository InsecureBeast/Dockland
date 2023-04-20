import { Component, Input } from '@angular/core';
import { IVolume } from 'src/app/core/volume';

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html',
  styleUrls: ['./volume-list.component.css']
})
export class VolumeListComponent {

  
  @Input() public volumes: IVolume[] | null = [];

  constructor() {
    
  }

}
