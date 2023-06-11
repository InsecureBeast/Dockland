import { Component, Input } from '@angular/core';
import { Container, IPort } from 'src/app/core/container';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent {

  @Input() containers: Container[] | null = [];
  @Input() url: string | undefined;
  @Input() fluentHeightEnabled: boolean = true;
  
  constructor() {
  }

  getUrl(ports: IPort[]): string {
    if (ports.length === 0)
      return "";
    
    let port = ports.find(p => p.ip === '0.0.0.0');
    if (!port)
      port = ports[0];
      
    if (!this.url)
      this.url = "http://0.0.0.0";
    
    return `${this.url}:${port.publicPort}`;
  }
  
}
