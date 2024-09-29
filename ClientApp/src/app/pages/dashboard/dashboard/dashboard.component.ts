import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, first, map, takeUntil } from 'rxjs';
import { RemoteService } from '@services/remote.service';
import { ElementType } from '@core/element.type';
import { NavigationService } from '@services/navigation.service';
import { RemoteContainers } from 'src/app/pages/containers/remote-containers.service';
import { RemoteImages } from '../../images/remote-images.service';

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
export class DashboardComponent implements OnInit, OnDestroy {
  private _ngDestroy = new Subject<void>();

  stacks: DashboardItem = new DashboardItem(ElementType.Stack);
  containers: DashboardItem = new DashboardItem(ElementType.Container);
  images: DashboardItem = new DashboardItem(ElementType.Image);
  volumes: DashboardItem = new DashboardItem(ElementType.Volume);
  networks: DashboardItem = new DashboardItem(ElementType.Network);
  environment: string | undefined;

  constructor(
    private readonly _remoteService: RemoteService,
    private readonly _remoteImages: RemoteImages,
    private readonly _remoteContainers: RemoteContainers,
    private readonly _route: ActivatedRoute,
    private readonly _navigationService: NavigationService) {
  }

  ngOnDestroy(): void {
    this._ngDestroy.next();
    this._ngDestroy.complete();
  }

  ngOnInit(): void {
    this._route.paramMap
      .pipe(takeUntil(this._ngDestroy))
      .subscribe(params => {
        this.stacks = new DashboardItem(ElementType.Stack);
        this.containers = new DashboardItem(ElementType.Container);
        this.images = new DashboardItem(ElementType.Image);
        this.volumes = new DashboardItem(ElementType.Volume);
        this.networks = new DashboardItem(ElementType.Network); 
        const env = params?.get('env');
        if (!env)
          return;
        
        this.environment = env;
        this._remoteService.getStacks(this.environment)
          .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Stack)))
          .subscribe(item => this.stacks = item);
        
        this._remoteContainers.getContainers(this.environment)
          .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Container)))
          .subscribe(item => this.containers = item);

        this._remoteImages.getImages(this.environment)
          .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Image)))
          .subscribe(item => this.images = item);

        this._remoteService.getVolumes(this.environment)
          .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Volume)))
          .subscribe(item => this.volumes = item);
        
        this._remoteService.getNetworks(this.environment)
          .pipe(first(), map(s => this.toDashboardItem(s, ElementType.Network)))
          .subscribe(item => this.networks = item);
    });
  }

  open(item: DashboardItem): void {
    this._navigationService.navigate(this.environment, item.type);
  }

  private toDashboardItem(stacks: any[], type: ElementType): DashboardItem {
    const item = new DashboardItem(type, stacks.length);
    return item;
  }
  
}
