import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RemoteContainers } from '@pages/containers/services/remote-containers.service';

@Component({
  selector: 'app-container-logs',
  templateUrl: './container-logs.component.html',
  styleUrl: './container-logs.component.scss'
})
export class ContainerLogsComponent implements OnInit, OnChanges {

  @Input() environment!: string | null;
  @Input() containerId!: string | undefined;
 
  constructor(private readonly _containerService: RemoteContainers) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['environment'] && !!changes['containerId'])
      this._containerService.getContainerLogs(this.environment!, this.containerId!, true).subscribe(e => console.log(e));
  }
  
  ngOnInit(): void {
    
  }

}
