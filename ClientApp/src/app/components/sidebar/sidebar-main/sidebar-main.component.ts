import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEnvironment } from 'src/app/pages/environments/environment';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-sidebar-main',
  templateUrl: './sidebar-main.component.html',
  styleUrls: ['./sidebar-main.component.scss']
})
export class SidebarMainComponent {

  isOpened: Observable<IEnvironment | undefined>;
  environment: string | undefined = "Dashboard";
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _envService: EnvironmentService,
              private _router: Router) {
    this.isOpened = _envService.current;

    _envService.current.subscribe(env => {
      this.environment = env?.name;
    });
  }

  disconnect(): boolean {
    this._envService.closeEnvironment();
    this._router.navigate(["/"]);
    return false;
  }

  private select(): void {
    this.selected.emit("www")
  }
}
