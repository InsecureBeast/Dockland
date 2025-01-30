import { Component, Input } from '@angular/core';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { remove } from '@utils/array-utils';
import { ContainerModel } from '../container.model';
import { IContainer, IPort } from '@pages/containers/container';
import { RemoteContainers } from '@pages/containers/services/remote-containers.service';
import { DialogService } from '@services/dialog.service';
import { EnvironmentService } from '../../../environments/environment.service';
import { BaseListComponent } from '@components/base-list/base-list.component';

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true,  max: 100 });
}

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class ContainerListComponent extends BaseListComponent<ContainerModel> {

  @Input() url: string | undefined;
  @Input() fluentHeightEnabled: boolean = true;
  @Input() isInteractive: boolean = true;
  @Input() parentComponentName: string | undefined;

  indeterminate: boolean = false;
  allChecked: boolean = false;
  processType: 'success' | 'info' | 'warning' | 'danger' = 'info';
    
  constructor(private readonly _remoteContainers: RemoteContainers, 
              private readonly _envService: EnvironmentService,
              private readonly _dialogService: DialogService) {
    super();
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

  isStopped(): boolean {
    if (!this.items)
      return false;

    const checked = this.items.filter(c => c.checked);
    return checked.some(c => c.container.state !== 'running');
  }

  isStarted(): boolean {
    if (!this.items)
      return false;

    const checked = this.items.filter(c => c.checked);
    return checked.some(c => c.container.state === 'running');
  }

  isDisabled(model: ContainerModel): boolean {
    return model.container.names.includes("/dockland");
  }

  stop(): void {
    if (!this.items)
      return;

    const env = this._envService.getEnvironmentName();
    if (!env)
      return;

    this.processType = "success";
    const checked = this.items.filter(c => c.checked);
    checked.forEach(model => {
      model.inProgress = true;
      this._remoteContainers.stop(env, model.container).subscribe(container => {
        this.update(container, model);
      });
    });
  }

  start(): void {
    if (!this.items)
      return;

    const env = this._envService.getEnvironmentName();
    if (!env)
      return;

    this.processType = "success";
    const checked = this.items.filter(c => c.checked);
    checked.forEach(model => {
      model.inProgress = true;
      this._remoteContainers.start(env, model.container).subscribe(container => {
        this.update(container, model);
      });
    });
  }

  restart(): void {
    this.stop();
    this.start();
  }

  remove(): void {
    const env = this._envService.getEnvironmentName();
    if (!env)
      return;

    this._dialogService.openConfirmationDialog().subscribe(res => {
      if (!res)
        return
      
      if (!this.items)
        return;

      this.processType = "danger";
      const checked = this.items.filter(c => c.checked);
      checked.forEach(model => {
        model.inProgress = true;
        this._remoteContainers.delete(env, model.container).subscribe(result => {
          if (result && this.items)
            remove(this.items, model);
        });
      });
    });
  }

  private update(container: IContainer, model: ContainerModel): void {
    if (!container)
      remove;

    model.container = container;
    model.checked = false;
    this.allChecked = false;
    this.indeterminate = false;
    model.inProgress = false;
  }
}
