import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DockerComposeLabels, TEST_ENV } from 'src/app/core/const';
import { getBoolean } from 'src/app/core/utils';
import { RemoteService } from 'src/app/services/remote.service';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { Container } from '../containers/container';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {

  containers: Container[] = [];
  checked: Container[] = [];

  constructor(
    private readonly _remoteService: RemoteService, 
    private _route: ActivatedRoute, 
    private _toolbarService: ToolbarService) {
    
  }

  ngOnInit() {
    this._route.queryParams
      .subscribe(params => {
        console.log(params); // { name: "stack-name" }
        const stackName = params.name;
        const env = params.env ? params.env : TEST_ENV;

        this._remoteService.getStacks(env, stackName).subscribe({ 
          next: (result) => { this.containers = result.map(i => i) }, 
          error: (e) => console.error(e)
        });

        this._toolbarService.changeVisibility(!getBoolean(params.hide));
      }
    );
  }

  getStack(map: Map<string, string>): string {
    const pair = Object.entries(map).find((k) => k[0] === DockerComposeLabels.PROJECT);
    return pair?.[1] as string;
  }

  remove(): void {
    this.checked.forEach(container => {
      this._remoteService.removeStack(TEST_ENV, this.getStack(container.labels)).subscribe({
        next: (result) => console.log(result), 
        error: (e) => console.error(e)
      })  
    });
  }
}
