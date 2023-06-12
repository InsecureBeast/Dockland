import { Component, Input } from '@angular/core';
import { IPort } from 'src/app/core/container';
import { ContainerModel } from './container.model';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent {

  @Input() containers: ContainerModel[] | null = [];
  @Input() url: string | undefined;
  @Input() fluentHeightEnabled: boolean = true;
  
  indeterminate: boolean = false;
  allChecked: boolean = false;
  
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

  check(model: ContainerModel, event: Event): boolean {
    model.checked = this.getCheckboxValue(event);
    
    if (this.isAllChecked()) {
      this.allChecked = true;
      this.indeterminate = false;
    } else if (this.isAnyChecked()) {
      this.allChecked = false;
      this.indeterminate = true;
    } else {
      this.allChecked = false;
      this.indeterminate = false;
    }
    return true;
  }

  checkAll(event: Event): void {
    const checked = this.getCheckboxValue(event);
    this.containers?.forEach(m => m.checked = checked);
  }

  private isAllChecked(): boolean {
    if (!this.containers)
      return false;

    return this.containers.every(c => c.checked);
  }

  private isAnyChecked(): boolean {
    if (!this.containers)
      return false;

    return this.containers.some(c => c.checked);
  }

  private getCheckboxValue(event: Event): boolean {
    const check = event.target as HTMLInputElement;
    return check?.checked;
  }
}
