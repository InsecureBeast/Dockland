import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, filter, map, mergeMap, of, takeUntil, toArray } from 'rxjs';
import { EnvironmentService } from 'src/app/services/environment.service';
import { RemoteService } from 'src/app/services/remote.service';
import { getHostFromUrl } from 'src/app/utils/url.utils';
import { ContainerModel } from '../components/container.model';
import { ActivatedRoute } from '@angular/router';
import { IContainer } from 'src/app/core/container';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit, OnDestroy {

  private _ngDestroy = new Subject<void>();

  containers: Observable<ContainerModel[]> = of([]);
  url: string | undefined;
  
  constructor(
    private readonly _remoteService: RemoteService,
    private readonly _route: ActivatedRoute,
    private readonly _envService: EnvironmentService,
    private readonly _navbarService: NavbarService) {
  }

  ngOnInit(): void {
    this._route.queryParams.pipe(takeUntil(this._ngDestroy))
    .subscribe(params => {
      
      const envName = params.env ? params.env : this._envService.currentEnv?.name;
      if (!envName)
        return;

      if (!this._envService.currentEnv)
        return;
      
      this.containers = this._remoteService.containers.getContainers(envName)
        .pipe(
          mergeMap(c => c),
          filter(c => this.filterContainer(c, params.name)), 
          map(c => new ContainerModel(c, !!params.name)),
          toArray()
        );

      this.url = getHostFromUrl(this._envService.currentEnv.url);
      this._navbarService.changeVisibility(!params.hide);
    });
  }

  ngOnDestroy(): void {
    this._ngDestroy.next();
    this._ngDestroy.complete();  
  }

  toString(map: Map<string, string>): string {
    return Array.from(Object.keys(map)).map(value =>value).join('?');
  }

  private filterContainer(container: IContainer, name: string): boolean {
    // not set
    if (!name)
      return true;
    
    return container.names[0].slice(1) === name;
  }
}
