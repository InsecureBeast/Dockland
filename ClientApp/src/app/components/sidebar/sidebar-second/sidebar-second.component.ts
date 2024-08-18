import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { IEnvironment } from 'src/app/pages/environments/environment';
import { RemoteService } from 'src/app/services/remote.service';

interface IEnvironmentExt extends IEnvironment {
  get isOpen(): boolean;
}

@Component({
  selector: 'app-sidebar-second',
  templateUrl: './sidebar-second.component.html',
  styleUrls: ['./sidebar-second.component.scss']
})
export class SidebarSecondComponent implements OnInit {
  environments: Observable<IEnvironmentExt[]> = of([]);
  
  constructor(
    private readonly _remoteService: RemoteService,
    private readonly _location: Location) {
  }

  ngOnInit(): void {
    this.environments = this._remoteService.getEnvironments()
    .pipe(map(envs => envs.map(env => ({ ...env, isOpen: this.isOpen(env) })))
    );
  }

  private isOpen(env: IEnvironment): boolean {
    return this._location.path().includes(env.name + "/");
  }
}
