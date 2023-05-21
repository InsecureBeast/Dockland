import { Component, OnDestroy, OnInit } from '@angular/core';
import { Image } from '../../../core/image';
import { RemoteService } from '../../../services/remote.service';
import { Observable, of, Subject } from 'rxjs';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit, OnDestroy {
  private _destroy: Subject<void> = new Subject();
  
  images: Observable<Image[]> = of([]);

  constructor(
    private _remoteService: RemoteService, 
    private readonly _envService: EnvironmentService) {
  }

  ngOnInit(): void {
    if (this._envService.currentEnv)
      this.images = this._remoteService.getImages(this._envService.currentEnv?.name);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
