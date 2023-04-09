import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TEST_ENV } from 'src/app/core/const';
import { RemoteService } from 'src/app/services/remote.service';
import { Stack } from '../stack';
import { getStackName } from '../stacks.utils';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {

  private _env: string = TEST_ENV;

  stacks: Stack[] = [];
  checked: Stack[] = [];

  constructor(
    private readonly _remoteService: RemoteService, private _route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this._route.queryParams
      .subscribe(params => {
        this._env = params.env ? params.env : TEST_ENV;
        this._remoteService.getStacks(this._env).subscribe({ 
          next: (result) => { this.stacks = result.map(i => i) }, 
          error: (e) => console.error(e)
        });
      }
    );
  }

  getStack(map: Map<string, string>): string {
    return getStackName(map);
  }

  remove(): void {
    this.checked.forEach(stack => {
      this._remoteService.removeStack(this._env, stack.name).subscribe({
        next: (result) => console.log(result), 
        error: (e) => console.error(e)
      })  
    });
  }
}
