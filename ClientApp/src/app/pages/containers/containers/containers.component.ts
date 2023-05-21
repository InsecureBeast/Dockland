import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Container } from 'src/app/core/container';
import { EnvironmentService } from 'src/app/services/environment.service';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent {

  public containers: Observable<Container[]> = of([]);

  constructor(
    private readonly _remoteService: RemoteService,
    envService: EnvironmentService) {
      if (envService.currentEnv)
        this.containers = this._remoteService.getContainers(envService.currentEnv.name);
  }

  toString(map: Map<string, string>): string {
    return Array.from(Object.keys(map)).map(value =>value).join('?');
  }

}
