import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs';
import { EnvironmentService } from 'src/app/services/environment.service';
import { RemoteService } from 'src/app/services/remote.service';
import { ElementType } from 'src/app/core/element.type';
import { NavigationService } from 'src/app/services/navigation.service';

class DashboardItem {
  count: number = 0;
  type: ElementType = ElementType.None;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  stacks: DashboardItem = new DashboardItem();
  containers: DashboardItem = new DashboardItem();
  images: DashboardItem = new DashboardItem();
  volumes: DashboardItem = new DashboardItem();
  networks: DashboardItem = new DashboardItem();
  environment: string | undefined;

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _envService: EnvironmentService,
    private readonly _navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.environment = this._envService.currentEnv?.name;
    if (!this.environment)
      return;

    this._remoteService.getStacks(this.environment)
      .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Stack)))
      .subscribe(item => this.stacks = item);
    
    this._remoteService.getContainers(this.environment)
      .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Container)))
      .subscribe(item => this.containers = item);

    this._remoteService.getImages(this.environment)
      .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Image)))
      .subscribe(item => this.images = item);

    this._remoteService.getVolumes(this.environment)
      .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Volume)))
      .subscribe(item => this.volumes = item);
    
    this._remoteService.getNetworks(this.environment)
      .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Network)))
      .subscribe(item => this.networks = item);

  }

  open(item: DashboardItem): void {
    this._navigationService.navigate(item.type);
  }

  private toDashboardItem(stacks: any[], type: ElementType): DashboardItem {
    const item = new DashboardItem();
    item.count = stacks.length;
    item.type = type;
    return item;
  }
  
}
