import { Component, Input } from '@angular/core';
import { Container, IPort } from 'src/app/core/data-classes';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent {

  @Input() public containers: Container[] | null = [];
  @Input() public url: string  = "http://0.0.0.0";

  constructor() {
  }

  getUrl(ports: IPort[]): string {
    if (ports.length === 0)
      return "";
    
    const port = ports[0];
    return `${this.url}:${port.publicPort}`;
  }
  
}
