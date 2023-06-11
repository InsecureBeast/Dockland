import { Component, Input } from '@angular/core';
import { INetwork } from 'src/app/core/network';

@Component({
  selector: 'app-network-list',
  templateUrl: './network-list.component.html',
  styleUrls: ['./network-list.component.scss']
})
export class NetworkListComponent {
  
  @Input() networks: INetwork[] | null = [];
  @Input() fluentHeightEnabled: boolean = true;

  constructor() {
  }
}
