import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { Container } from 'src/app/core/container';
import { Image } from 'src/app/core/image';
import { INetwork } from 'src/app/core/network';
import { getBoolean } from 'src/app/core/utils';
import { IVolume } from 'src/app/core/volume';
import { EnvironmentService } from 'src/app/services/environment.service';
import { RemoteService } from 'src/app/services/remote.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit {
  private _env: string = "";
  private _containersCount = 0;
  
  url: string | undefined;
  stack: string = '';
  containers: Observable<Container[]> = of([]);
  volumes: Observable<IVolume[]> = of([]);
  networks: Observable<INetwork[]> = of([]);
  images: Observable<Image[]> = of([]);

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _route: ActivatedRoute, 
    private readonly _toolbarService: ToolbarService,
    private readonly _envService: EnvironmentService) {
    
  }

  ngOnInit() {
    this._route.params
      .subscribe(params => {
        this.stack = params.name as string;
        this._route.queryParams.subscribe(params => {
          this._env = params.env ? params.env : this._envService.currentEnv?.name;
          this.url = params.url ? params.url as string : undefined;
          this.updateInfo();
          this._toolbarService.changeVisibility(!getBoolean(params.hide));
        });
      }
    );
  }

  remove(): void {
    this._remoteService.deleteStack(this._env, this.stack).subscribe({
      next: (result) => this.updateInfo(), 
      error: (e) => console.error(e)
    }) 
  }

  isDisabled(): boolean {
    return this._containersCount == 0;
  }

  private updateInfo() : void {
    this.getStackInfo();
    this.getVolumesInfo();
    this.getNetworksInfo();
    this.getImagesInfo();
  }

  private getStackInfo(): void {
    this.containers = this._remoteService.getStackContainers(this._env, this.stack)
      .pipe(tap(c => this._containersCount = c.length));
  }

  private getVolumesInfo(): void {
    this.volumes = this._remoteService.getVolumes(this._env, this.stack);
  }

  private getNetworksInfo(): void {
    this.networks = this._remoteService.getNetworks(this._env, this.stack);
  }

  private getImagesInfo(): void {
    this.images = this._remoteService.getImages(this._env, this.stack);
  }
}
