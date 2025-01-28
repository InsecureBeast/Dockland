import { Component, OnInit } from '@angular/core';
import { ContainersService } from '../services/containers.service';
import { IContainer } from '../container';
import { Observable } from 'rxjs';
import { EnvironmentService } from '@pages/environments/environment.service';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  container!: Observable<IContainer | null>;
  containerName: string | undefined;
  environment!: string | null;

  activatedTabs = new Set<string>();

  constructor(
    private readonly _containersService: ContainersService,
    private readonly _environmentService: EnvironmentService,
  ) {
    
  }

  ngOnInit(): void {
    this.environment = this._environmentService.getEnvironmentName();
    this.container = this._containersService.getCurrentContainer();
  }

  onTabSelected(tab: TabDirective): void {
    const id = tab.id ?? 'tab';
    if (!this.activatedTabs.has(id))
      this.activatedTabs.add(id);
  }
}
