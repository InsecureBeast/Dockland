import { Component, Input } from '@angular/core';
import { IVolume } from 'src/app/core/volume';

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html',
  styleUrls: ['./volume-list.component.scss']
})
export class VolumeListComponent {

  @Input() volumes!: IVolume[] | null;
  @Input() fluentHeightEnabled: boolean = true;

  constructor() {
  }

}
