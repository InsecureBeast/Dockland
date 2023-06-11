import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IVolume } from 'src/app/core/volume';
import { EnvironmentService } from 'src/app/services/environment.service';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-volumes',
  templateUrl: './volumes.component.html',
  styleUrls: ['./volumes.component.scss']
})
export class VolumesComponent implements OnInit, OnDestroy {
  private _destroy: Subject<void> = new Subject();
  
  volumes: Observable<IVolume[]> = of([]);

  constructor(
    private _remoteService: RemoteService, 
    private readonly _envService: EnvironmentService) {
  }

  ngOnInit(): void {
    if (this._envService.currentEnv)
      this.volumes = this._remoteService.getVolumes(this._envService.currentEnv.name);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
