import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TEST_ENV } from 'src/app/core/const';
import { getBoolean } from 'src/app/core/utils';
import { RemoteService } from 'src/app/services/remote.service';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { Container } from '../../containers/container';
import { getStackName } from '../stacks.utils';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  private _env: string = TEST_ENV;
  stack: string = '';

  containers: Container[] = [];

  constructor(
    private readonly _remoteService: RemoteService, 
    private _route: ActivatedRoute, 
    private _toolbarService: ToolbarService) {
    
  }

  ngOnInit() {
    this._route.params
      .subscribe(params => {
        console.log(params); // { name: "stack-name" }
        this.stack = params.name as string;

        this._route.queryParams.subscribe(params => {
          this._env = params.env ? params.env : TEST_ENV;
          this._remoteService.getStacks(this._env, this.stack).subscribe({ 
            next: (result) => { this.containers = result.map(i => i) }, 
            error: (e) => console.error(e)
          });
    
          this._toolbarService.changeVisibility(!getBoolean(params.hide));
        });

      }
    );
  }

  getStack(map: Map<string, string>): string {
    return getStackName(map);
  }

  remove(): void {
    this._remoteService.removeStack(this._env, this.stack).subscribe({
      next: (result) => console.log(result), 
      error: (e) => console.error(e)
    }) 
  }
}
