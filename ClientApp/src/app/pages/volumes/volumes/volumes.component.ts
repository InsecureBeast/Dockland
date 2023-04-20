import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { TEST_ENV } from 'src/app/core/const';
import { IVolume } from 'src/app/core/volume';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-volumes',
  templateUrl: './volumes.component.html',
  styleUrls: ['./volumes.component.css']
})
export class VolumesComponent implements OnInit, OnDestroy {
  private _destroy: Subject<void> = new Subject();
  
  volumes: Observable<IVolume[]> = of([]);

  constructor(private _remoteService: RemoteService) {
  }

  ngOnInit(): void {
    this.volumes = this._remoteService.getVolumes(TEST_ENV);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
