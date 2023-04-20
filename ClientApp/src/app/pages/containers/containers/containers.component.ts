import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TEST_ENV } from 'src/app/core/const';
import { Container } from 'src/app/core/data-classes';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent {

  public containers: Observable<Container[]> = of([]);

  constructor(private readonly _remoteService: RemoteService) {
    this.containers = this._remoteService.getContainers(TEST_ENV);
  }

  toString(map: Map<string, string>): string {
    return Array.from(Object.keys(map)).map(value =>value).join('?');
  }

}
