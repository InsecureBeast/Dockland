import { Component, Input } from '@angular/core';
import { INetwork } from 'src/app/core/network';

@Component({
  selector: 'app-network-list',
  templateUrl: './network-list.component.html',
  styleUrls: ['./network-list.component.css']
})
export class NetworkListComponent {
  
  @Input() public networks: INetwork[] | null = [];

  constructor() {
  }
}
