import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { INetwork } from 'src/app/core/network';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit, OnDestroy {
  private _destroy: Subject<void> = new Subject();
  
  networks: Observable<INetwork[]> = of([]);

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._route.paramMap
      .pipe(takeUntil(this._destroy))
      .subscribe(params => {
        const env = params.get("env");
        if (!env)
          return;
        this.networks = of([]);
        this.networks = this._remoteService.getNetworks(env);
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}