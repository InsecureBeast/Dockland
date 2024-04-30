import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs';
import { EnvironmentService } from 'src/app/services/environment.service';
import { RemoteService } from 'src/app/services/remote.service';
import { ElementType } from 'src/app/core/element.type';
import { NavigationService } from 'src/app/services/navigation.service';

class DashboardItem {
  private readonly _type: ElementType;
  private readonly _count: number;
  
  constructor(type: ElementType, count: number = -1) {
    this._type = type;
    this._count = count;
  }

  get type(): ElementType {
    return this._type;
  }

  get count(): number {
    return this._count;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  stacks: DashboardItem = new DashboardItem(ElementType.Stack);
  containers: DashboardItem = new DashboardItem(ElementType.Container);
  images: DashboardItem = new DashboardItem(ElementType.Image);
  volumes: DashboardItem = new DashboardItem(ElementType.Volume);
  networks: DashboardItem = new DashboardItem(ElementType.Network);
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
    
    this._remoteService.containers.getContainers(this.environment)
      .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Container)))
      .subscribe(item => this.containers = item);

    this._remoteService.images.getImages(this.environment)
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
    const item = new DashboardItem(type, stacks.length);
    return item;
  }
  
}
