import { Component, OnInit } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { IEnvironment } from 'src/app/pages/environments/environment';
import { EnvironmentService } from '@pages/environments/environment.service';

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
    private readonly _environmentService: EnvironmentService) {
  }

  ngOnInit(): void {
    let openedItemId = "";
    this.environments = this._environmentService.environments
      .pipe(
        map(envs => envs.map(env => {
          const isOpen = this.isOpen(env);
          if (isOpen)
            openedItemId = env.id;
          return { ...env, isOpen };
        })), 
        tap(() => setTimeout(() => this.scrollToItem(openedItemId), 1)));
    this._environmentService.refreshEnvironments();
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
