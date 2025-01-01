import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, of, share, Subject, takeUntil } from 'rxjs';
import { IEnvironment } from '../environment';
import { RemoteService } from '@services/remote.service';
import { EnvironmentModel } from '../environment.model';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit, OnDestroy {
  private readonly _ngDestroy = new Subject<void>();

  environments: Observable<EnvironmentModel[]> = of([]);

  constructor(
    private readonly _environmentService: EnvironmentService,
    private readonly _remoteService: RemoteService) {
    
  }
  
  ngOnInit(): void {
    this.environments = this._environmentService.environments
      .pipe(
        takeUntil(this._ngDestroy),
        map(environments => environments.map(env => new EnvironmentModel(env))), 
        share()
      );
    this._environmentService.refreshEnvironments();
  }

  ngOnDestroy(): void {
    this._ngDestroy.next();
    this._ngDestroy.complete();
  }

  delete(environments: IEnvironment[]): boolean {
    const self = this;
    environments.forEach(env => {
      this._remoteService.deleteEnvironment(env.name).subscribe({
        next() {
          self._environmentService.refreshEnvironments();
        },
        error(err) {
          alert(err.message);
        },
      });  
    });
    return true;
  }
}
