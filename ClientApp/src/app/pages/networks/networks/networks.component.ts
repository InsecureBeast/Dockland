import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { INetwork } from 'src/app/core/network';
import { EnvironmentService } from 'src/app/services/environment.service';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit, OnDestroy {
  private _destroy: Subject<void> = new Subject();
  
  networks: Observable<INetwork[]> = of([]);

  constructor(private readonly _remoteService: RemoteService, private readonly _envService: EnvironmentService) {
  }

  ngOnInit(): void {
    if (this._envService.currentEnv)
      this.networks = this._remoteService.getNetworks(this._envService.currentEnv.name);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}