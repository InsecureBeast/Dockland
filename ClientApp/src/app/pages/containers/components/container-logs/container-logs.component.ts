import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RemoteContainers } from '@pages/containers/services/remote-containers.service';

@Component({
  selector: 'app-container-logs',
  templateUrl: './container-logs.component.html',
  styleUrl: './container-logs.component.scss'
})
export class ContainerLogsComponent implements OnChanges {

  @Input() environment!: string | null;
  @Input() containerId!: string | undefined;

  logs: string = "";
 
  constructor(private readonly _containerService: RemoteContainers) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['environment'] && !!changes['containerId'])
      this._containerService.getContainerLogs(this.environment!, this.containerId!, false)
        .subscribe(logs => this.logs = logs);
  }
}
