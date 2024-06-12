import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEnvironment } from 'src/app/pages/environments/environment';
import { EnvironmentService } from 'src/app/services/environment.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-sidebar-main',
  templateUrl: './sidebar-main.component.html',
  styleUrls: ['./sidebar-main.component.scss']
})
export class SidebarMainComponent {

  isVisible: Observable<boolean>;
  isOpened: Observable<IEnvironment | undefined>;
  environment: string | undefined = "Dashboard";

  constructor(toolbarService: NavbarService, 
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
