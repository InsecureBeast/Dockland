import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { TEST_ENV } from 'src/app/core/const';
import { INetwork } from 'src/app/core/network';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit, OnDestroy {
  private _destroy: Subject<void> = new Subject();
  
  networks: Observable<INetwork[]> = of([]);

  constructor(private readonly _remoteService: RemoteService) {
  }

  ngOnInit(): void {
    this.networks = this._remoteService.getNetworks(TEST_ENV);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}