import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { EnvironmentService } from 'src/app/services/environment.service';
import { RemoteService } from 'src/app/services/remote.service';
import { getHostFromUrl } from 'src/app/utils/url.utils';
import { ContainerModel } from '../components/container.model';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent {

  containers: Observable<ContainerModel[]> = of([]);
  url: string | undefined;
  
  constructor(
    private readonly _remoteService: RemoteService,
    envService: EnvironmentService) {
      if (envService.currentEnv) {
        this.containers = this._remoteService.getContainers(envService.currentEnv.name)
          .pipe(map(c => c.map(x => new ContainerModel(x))));

        this.url = getHostFromUrl(envService.currentEnv.url);
      }
  }

  toString(map: Map<string, string>): string {
    return Array.from(Object.keys(map)).map(value =>value).join('?');
  }
}
