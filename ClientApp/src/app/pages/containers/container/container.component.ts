import { Component, Input, OnInit } from '@angular/core';
import { ContainerModel } from '../components/container.model';
import { ContainersService } from '../services/containers.service';
import { IContainer } from '../container';
import { Observable } from 'rxjs';
import { RemoteContainers } from '../services/remote-containers.service';
import { EnvironmentService } from '@pages/environments/environment.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  container!: Observable<IContainer | null>;
  containerName: string | undefined;
  environment!: string | null;

  constructor(
    private readonly _containersService: ContainersService,
    private readonly _environmentService: EnvironmentService,
    private readonly _containersRemote: RemoteContainers
  ) {
    
  }

  ngOnInit(): void {
    this.environment = this._environmentService.getEnvironmentName();
    this.container = this._containersService.getCurrentContainer();
  }
}
