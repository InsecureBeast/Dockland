import { Component } from '@angular/core';
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
  isOpened: Observable<IEnvironment>;
  environment: string = "Dashboard";

  constructor(toolbarService: ToolbarService, envService: EnvironmentService) {
    this.isOpened = envService.current;
    this.isVisible = toolbarService.visible;

    envService.current.subscribe(env => {
      this.environment = env?.name;
    });
  }
}
