import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, combineLatest, map, of, takeUntil, tap } from 'rxjs';
import { INetwork } from '@core/network';
import { getBoolean } from '@core/utils';
import { IVolume } from '@core/volume';
import { RemoteService } from '@services/remote.service';
import { NavbarService } from '@services/navbar.service';
import { IEnvironment } from '../../environments/environment';
import { getHostFromUrl } from '@utils/url.utils';
import { ContainerModel } from '../../containers/components/container.model';
import { ImageModel } from '../../images/components/image.model';
import { EnvironmentService } from '../../environments/environment.service';
import { RemoteContainers } from '../../containers/remote-containers.service';
import { RemoteImages } from '../../images/remote-images.service';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit, OnDestroy {
  private _env: string = "";
  private _containersCount = 0;
  private _ngDestroy = new Subject<void>();
  
  url: string | undefined;
  stack: string = "";
  containers: Observable<ContainerModel[]> = of([]);
  volumes: Observable<IVolume[]> = of([]);
  networks: Observable<INetwork[]> = of([]);
  images: Observable<ImageModel[]> = of([]);

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _remoteContainers: RemoteContainers,
    private readonly _remoteImages: RemoteImages,
    private readonly _route: ActivatedRoute, 
    private readonly _toolbarService: NavbarService,
    private readonly _envService: EnvironmentService) {
    
  }

  ngOnDestroy(): void {
    this._ngDestroy.next();
    this._ngDestroy.complete();
  }

  ngOnInit() {
    const params = this._route.paramMap.pipe(takeUntil(this._ngDestroy));
    const queryParams = this._route.queryParams.pipe(takeUntil(this._ngDestroy));
    combineLatest({params, queryParams}).subscribe((obs) => {
      const stack = obs.params.get("name");
      if (!stack)
        return;
      this.stack = stack;
      const env = obs.params.get("env");
      if (!env)
        return;

      const hide = obs.queryParams.hide;
      this.initEnvironment(env)
        .pipe(takeUntil(this._ngDestroy))
        .subscribe(env => {
          this._env = env.name;
          this.url = getHostFromUrl(env.url);
          this.updateInfo();
          this._toolbarService.changeVisibility(!getBoolean(hide));
        });
    });
  }

  remove(): void {
    this._remoteService.deleteStack(this._env, this.stack).subscribe({
      next: (result) => this.updateInfo()
    }) 
  }

  isDisabled(): boolean {
    return this._containersCount == 0;
  }

  private initEnvironment(name: string): Observable<IEnvironment> {
    if (!this._envService.currentEnv || name) {
      return this._remoteService.findEnvironment(name).pipe(tap(env => {this._envService.openEnvironment(env);}));
    }

    return of(this._envService.currentEnv);
  }

  private updateInfo() : void {
    this.getStackInfo();
    this.getVolumesInfo();
    this.getNetworksInfo();
    this.getImagesInfo();
  }

  private getStackInfo(): void {
    this.containers = this._remoteContainers.getStackContainers(this._env, this.stack)
      .pipe(tap(c => this._containersCount = c.length), map(c => c.map(x => new ContainerModel(x))));
  }

  private getVolumesInfo(): void {
    this.volumes = this._remoteService.getVolumes(this._env, this.stack);
  }

  private getNetworksInfo(): void {
    this.networks = this._remoteService.getNetworks(this._env, this.stack);
  }

  private getImagesInfo(): void {
    this.images = this._remoteImages.getImages(this._env, this.stack)
      .pipe(map(i => i.map(x => new ImageModel(x))));
  }
}
