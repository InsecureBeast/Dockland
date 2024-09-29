import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEnvironment } from '../environment';
import { RemoteService } from '@services/remote.service';
import { NavigationService } from '@services/navigation.service';
import { ElementType } from '@core/element.type';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {
  environments: Observable<IEnvironment[]> = of([]);

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _navigation: NavigationService) {
    
  }

  ngOnInit(): void {
    this.environments = this._remoteService.getEnvironments();
  }

  open(env: IEnvironment): void {
    this._navigation.navigate(env.name, ElementType.Dashboard);
  }

  delete(env: IEnvironment, event: Event): boolean {
    const self = this;
    this._remoteService.deleteEnvironment(env.name).subscribe({
      next(value) {
        self.environments = self._remoteService.getEnvironments();
      },
      error(err) {
        alert(err.message);
      },
    });
    
    event.stopPropagation();
    return true;
  }
}
