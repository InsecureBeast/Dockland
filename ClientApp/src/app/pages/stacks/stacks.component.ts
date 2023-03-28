import { Component } from '@angular/core';
import { DockerComposeLabels, TEST_ENV } from 'src/app/core/const';
import { RemoteService } from 'src/app/services/remote.service';
import { Container } from '../containers/container';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent {

  public containers: Container[] = [];

  constructor(private readonly _remoteService: RemoteService) {
    this._remoteService.getStacks(TEST_ENV).subscribe({ 
      next: (result) => { this.containers = result.map(i => {
        return i;
      });
      },
      error: (e) => console.error(e)
    });
  }

  getStack(map: Map<string, string>): string {
    const pair = Object.entries(map).find((k) => k[0] === DockerComposeLabels.PROJECT);
    return pair?.[1] as string;
  }
}
