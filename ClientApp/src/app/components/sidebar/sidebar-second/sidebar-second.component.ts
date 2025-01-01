import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { IEnvironment } from '@pages/environments/environment';
import { EnvironmentService } from '@pages/environments/environment.service';
import { NavigationEnd, Router } from '@angular/router';

interface IEnvironmentExt extends IEnvironment {
  get isOpen(): boolean;
}

@Component({
  selector: 'app-sidebar-second',
  templateUrl: './sidebar-second.component.html',
  styleUrls: ['./sidebar-second.component.scss']
})
export class SidebarSecondComponent implements OnInit, OnDestroy {
  private readonly _ngDestory = new Subject<void>();

  environments: Observable<IEnvironmentExt[]> = of([]);
  
  constructor(
    private readonly _router: Router,
    private readonly _environmentService: EnvironmentService) {
  }
  
  ngOnInit(): void {
    let openedItemId = "";
    this.environments = this._environmentService.environments
      .pipe(
        takeUntil(this._ngDestory),
        map(envs => envs.map(env => {
          const isOpen = this.isOpen(env);
          if (isOpen)
            openedItemId = env.id;
          return { ...env, isOpen };
        })), 
        tap(() => setTimeout(() => this.scrollToItem(openedItemId), 1)));
    this._environmentService.refreshEnvironments();
    
    this._router.events
      .pipe(
        takeUntil(this._ngDestory),
        filter((event) => event instanceof NavigationEnd)
      ) 
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.urlAfterRedirects;
          if (currentUrl.includes('/dashboard'))
            this._environmentService.refreshEnvironments();
        }
    });
  }

  ngOnDestroy(): void {
    this._ngDestory.next();
    this._ngDestory.complete();
  }

  private isOpen(env: IEnvironment): boolean {
    var envName = this._environmentService.getEnvironmentName();
    return envName === env.name;
  }

  private scrollToItem(id: string): void {
    const element = document.getElementById(id);
    const childElement = element?.querySelector('.active');
    if (childElement && !this.isElementInViewport(childElement)) {
      childElement.scrollIntoView({ inline: "nearest", behavior: 'smooth', block: 'center' });
    }
  }

  private isElementInViewport(el: Element): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
