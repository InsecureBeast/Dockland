import { Component } from '@angular/core';
import { TEST_ENV } from 'src/app/core/const';
import { RemoteService } from 'src/app/services/remote.service';
import { Container } from './container';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent {

  public containers: Container[] = [];

  constructor(private readonly _remoteService: RemoteService) {
    this._remoteService.getContainers(TEST_ENV).subscribe({ 
      next: (result) => { this.containers = result.map(i => {
        return i;
      });
      },
      error: (e) => console.error(e)
    });
  }

  toString(map: Map<string, string>): string {
    return Array.from(Object.keys(map)).map(value =>value).join('?');
  }

}
