import { Component, Input } from '@angular/core';
import { IContainer, IPort } from 'src/app/core/container';
import { ContainerModel } from './container.model';
import { RemoteService } from 'src/app/services/remote.service';
import { EnvironmentService } from 'src/app/services/environment.service';
import { remove } from 'src/app/utils/array-utils';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { DialogService } from 'src/app/services/dialog.service';

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true,  max: 100 });
}

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class ContainerListComponent {

  @Input() containers: ContainerModel[] | null = [];
  @Input() url: string | undefined;
  @Input() fluentHeightEnabled: boolean = true;
  @Input() isInteractive: boolean = true;
  
  indeterminate: boolean = false;
  allChecked: boolean = false;
  processType: 'success' | 'info' | 'warning' | 'danger' = 'info';
  
  constructor(private readonly _remoteService: RemoteService, 
              private readonly _envService: EnvironmentService,
              private readonly _dialogService: DialogService) {
    this.processType = 'success';
  }

  getUrl(port: IPort): string {
    if (!port)
      return "";
    
    if (!this.url)
      this.url = "http://0.0.0.0";
    
    return `${this.url}:${port.publicPort}`;
  }

  getPublishedPort(port: IPort): string {
    if (!port || port.ip !== "0.0.0.0")
      return "";
    
    return `${port.privatePort}:${port.publicPort}`;
  }

  getAcceptablePorts(ports: IPort[]): IPort[] {
    return ports.filter(p => p.ip === '0.0.0.0');
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
    this.containers?.forEach(m => this.isDisabled(m) ? m.checked = false : m.checked = checked);
  }

  isAnyChecked(): boolean {
    if (!this.containers)
      return false;

    return this.containers.some(c => c.checked);
  }

  isStopped(): boolean {
    if (!this.containers)
      return false;

    const checked = this.containers.filter(c => c.checked);
    return checked.some(c => c.container.state !== 'running');
  }

  isStarted(): boolean {
    if (!this.containers)
      return false;

    const checked = this.containers.filter(c => c.checked);
    return checked.some(c => c.container.state === 'running');
  }

  isDisabled(model: ContainerModel): boolean {
    return model.container.names.includes("/dockland");
  }

  stop(): boolean {
    if (!this.containers)
      return false;

    this.processType = "success";
    const checked = this.containers?.filter(c => c.checked);
    checked?.forEach(model => {
      if (this._envService.currentEnv) {
        model.inProgress = true;
        this._remoteService.containers.stop(this._envService.currentEnv?.name, model.container)
          .subscribe(container => {
            this.update(container, model);
        });
      }
    });
    
    return true;
  }

  start(): boolean {
    if (!this.containers)
      return false;

    this.processType = "success";
    const checked = this.containers.filter(c => c.checked);
    checked.forEach(model => {
      if (this._envService.currentEnv) {
        model.inProgress = true;
        this._remoteService.containers.start(this._envService.currentEnv?.name, model.container)
          .subscribe(container => {
            this.update(container, model);
        });
      }
    });

    return true;
  }

  remove(): void {
    if (!this.containers)
      return;
    
    this._dialogService.openConfirmationDialog()?.subscribe(res => {
      if (!res) 
        return
  
      this.processType = "danger";
      const checked = this.containers?.filter(c => c.checked);
      checked?.forEach(model => {
        if (this._envService.currentEnv) {
          model.inProgress = true;
          this._remoteService.containers.delete(this._envService.currentEnv?.name, model.container)
            .subscribe(result => {
              if (result && this.containers)
                remove(this.containers, model);
          });
        }
      });

    });
  }

  private isAllChecked(): boolean {
    if (!this.containers)
      return false;

    return this.containers.filter(m => !this.isDisabled(m)).every(c => c.checked);
  }

  private getCheckboxValue(event: Event): boolean {
    const check = event.target as HTMLInputElement;
    return check?.checked;
  }

  private update(container: IContainer, model: ContainerModel): void {
    if (container) {
      model.container = container;
      model.checked = false;
      this.allChecked = false;
      this.indeterminate = false;
      model.inProgress = false;
    }
  }
}
