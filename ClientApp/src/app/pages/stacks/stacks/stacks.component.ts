import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RemoteService } from 'src/app/services/remote.service';
import { Stack } from '../stack';
import { getStackName } from '../stacks.utils';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.scss']
})
export class StacksComponent implements OnInit, OnDestroy {
  private _ngDestroy = new Subject<void>();
  private _env: string = "";

  stacks: Stack[] | undefined;
  checked: Stack[] = [];

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _route: ActivatedRoute) {
    
  }

  ngOnDestroy(): void {
    this._ngDestroy.next();
    this._ngDestroy.complete();
  }

  ngOnInit() {
    this._route.paramMap
      .pipe(takeUntil(this._ngDestroy))
      .subscribe(params => {
        const env = params?.get('env');
        if (!env)
          return;

        this._env = env;
        this.stacks = undefined;
        this._remoteService.getStacks(env).subscribe({ 
          next: (result) => { this.stacks = result.map(i => i) }
        });
      });
  }

  getStack(map: Map<string, string>): string {
    return getStackName(map);
  }

  remove(): void {
    this.checked.forEach(stack => {
      this._remoteService.deleteStack(this._env, stack.name).subscribe({
        next: (result) => console.log(result), 
        error: (e) => console.error(e)
      })  
    });
  }
}
