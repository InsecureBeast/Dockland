import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest, filter, map, mergeMap, of, takeUntil, toArray } from 'rxjs';
import { RemoteService } from '@services/remote.service';
import { getHostFromUrl } from '@utils/url.utils';
import { ContainerModel } from '../components/container.model';
import { ActivatedRoute } from '@angular/router';
import { IContainer } from '@pages/containers/container';
import { RemoteContainers } from '@pages/containers/remote-containers.service';
import { NavbarService } from '@services/navbar.service';

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
    private readonly _remoteContainers: RemoteContainers,
    private readonly _route: ActivatedRoute,
    private readonly _navbarService: NavbarService) {
  }

  ngOnInit(): void {
    const params = this._route.paramMap.pipe(takeUntil(this._ngDestroy));
    const queryParams = this._route.queryParams.pipe(takeUntil(this._ngDestroy));

    combineLatest({params, queryParams}).subscribe((obs) => {
      const envName = obs.params.get('env');
      if (!envName)
        return;

      // TODO move to another service which controls this parameter
      this._navbarService.changeVisibility(!obs.queryParams.hide);

      this._remoteService.findEnvironment(envName).subscribe(env => { 
        this.url = getHostFromUrl(env.url);
      });

      this.containers = this._remoteContainers.getContainers(envName)
        .pipe(
          mergeMap(c => c),
          filter(c => this.filterContainer(c, obs.queryParams.name)), 
          map(c => new ContainerModel(c, !!obs.queryParams.name)),
          toArray()
        );
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
    
    return container.names[0].slice(1).toLocaleLowerCase() === name.toLocaleLowerCase();
  }
}
