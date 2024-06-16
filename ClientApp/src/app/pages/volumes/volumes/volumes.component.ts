import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { IVolume } from 'src/app/core/volume';
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
    private readonly _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._route.paramMap
      .pipe(takeUntil(this._destroy))
      .subscribe(params => {
        const env = params.get("env");
        if (!env)
          return;
        this.volumes = of([]);
        this.volumes = this._remoteService.getVolumes(env);
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
