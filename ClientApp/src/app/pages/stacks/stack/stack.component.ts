import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { TEST_ENV } from 'src/app/core/const';
import { Container, IPort } from 'src/app/core/data-classes';
import { getBoolean } from 'src/app/core/utils';
import { RemoteService } from 'src/app/services/remote.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  private _env: string = TEST_ENV; //TODO get from env database
  private _containersCount = 0;
  private _url: string = "http://0.0.0.0"; //TODO get from env database

  stack: string = '';
  containers: Observable<Container[]> = of([]);

  constructor(
    private readonly _remoteService: RemoteService, 
    private _route: ActivatedRoute, 
    private _toolbarService: ToolbarService) {
    
  }

  ngOnInit() {
    this._route.params
      .subscribe(params => {
        this.stack = params.name as string;
        this._route.queryParams.subscribe(params => {
          this._env = params.env ? params.env : TEST_ENV;
          this._url = params.url ? params.url as string : "http://0.0.0.0";
          this.getStackInfo();
          this._toolbarService.changeVisibility(!getBoolean(params.hide));
        });

      }
    );
  }

  getUrl(ports: IPort[]): string {
    if (ports.length === 0)
      return "";
    
    const port = ports[0];
    return `${this._url}:${port.publicPort}`;
  }

  remove(): void {
    this._remoteService.removeStack(this._env, this.stack).subscribe({
      next: (result) => this.getStackInfo(), 
      error: (e) => console.error(e)
    }) 
  }

  isDisabled(): boolean {
    return this._containersCount == 0;
  }

  private getStackInfo(): void {
    this.containers = this._remoteService.getStack(this._env, this.stack)
      .pipe(tap(c => this._containersCount = c.length));
  }
}
