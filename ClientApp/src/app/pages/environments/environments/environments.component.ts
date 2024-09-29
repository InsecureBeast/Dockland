import { Component, OnInit } from '@angular/core';
import { IEnvironment } from '../environment';
import { Observable, of } from 'rxjs';
import { RemoteService } from 'src/app/services/remote.service';
import { Router } from '@angular/router';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {
  environments: Observable<IEnvironment[]> = of([]);

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _envService: EnvironmentService,
    private readonly _router: Router) {
    
  }

  ngOnInit(): void {
    this.environments = this._remoteService.getEnvironments();
  }

  open(env: IEnvironment): void {
    this._envService.openEnvironment(env);
    this._router.navigateByUrl('/dashboard');
  }

  close($event: Event): boolean {
    this._envService.closeEnvironment();
    $event.stopPropagation();
    return true;
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

  isOpen(env: IEnvironment): boolean {
    return this._envService.currentEnv?.id === env.id;
  }
}
