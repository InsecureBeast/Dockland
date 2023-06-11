import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEnvironment } from 'src/app/pages/environments/environment';
import { EnvironmentService } from 'src/app/services/environment.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isVisible: Observable<boolean>;
  isOpened: Observable<IEnvironment | undefined>;
  environment: string | undefined = "Dashboard";

  constructor(toolbarService: ToolbarService, 
              private _envService: EnvironmentService,
              private _router: Router) {
    this.isOpened = _envService.current;
    this.isVisible = toolbarService.visible;

    _envService.current.subscribe(env => {
      this.environment = env?.name;
    });
  }

  disconnect(): boolean {
    this._envService.closeEnvironment();
    this._router.navigate(["/"]);
    return false;
  }
}
