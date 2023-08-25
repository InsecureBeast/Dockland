import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarService } from '../services/navbar.service';
import { EnvironmentService } from '../services/environment.service';
import { IEnvironment } from '../pages/environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  isVisible: Observable<boolean>;
  isOpened: Observable<IEnvironment | undefined>;

  constructor(toolbarService: NavbarService, envService: EnvironmentService) {
    this.isOpened = envService.current;
    this.isVisible = toolbarService.visible;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
