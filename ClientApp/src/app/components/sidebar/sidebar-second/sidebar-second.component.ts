import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { map, Observable, of, tap, timeout } from 'rxjs';
import { IEnvironment } from 'src/app/pages/environments/environment';
import { RemoteService } from 'src/app/services/remote.service';

interface IEnvironmentExt extends IEnvironment {
  get isOpen(): boolean;
}

@Component({
  selector: 'app-sidebar-second',
  templateUrl: './sidebar-second.component.html',
  styleUrls: ['./sidebar-second.component.scss']
})
export class SidebarSecondComponent implements OnInit {
  environments: Observable<IEnvironmentExt[]> = of([]);
  
  constructor(
    private readonly _remoteService: RemoteService,
    private readonly _location: Location) {
  }

  ngOnInit(): void {
    let openedItemId = "";
    this.environments = this._remoteService.getEnvironments()
      .pipe(
        map(envs => envs.map(env => {
          const isOpen = this.isOpen(env);
          if (isOpen)
            openedItemId = env.id;
          return { ...env, isOpen };
        })), 
        tap(() => setTimeout(() => this.scrollToItem(openedItemId), 1)));
  }

  private isOpen(env: IEnvironment): boolean {
    return this._location.path().includes(env.name + "/");
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
