import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { RemoteContainers } from '@pages/containers/services/remote-containers.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-container-inspect',
  templateUrl: './container-inspect.component.html',
  styleUrl: './container-inspect.component.scss'
})
export class ContainerInspectComponent implements OnChanges {
  @Input() environment!: string | null;
  @Input() containerId!: string | undefined;

  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  editor!: any;

  inspect: string = '';
  editorOptions = {
    theme: 'vs-light', 
    language: 'json', 
    automaticLayout: true,
    tabSize: 4,
    formatOnType: true,
    formatOnPaste: true,
    readOnly: true
  };

  constructor(private readonly _containerService: RemoteContainers) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['environment'] && !!changes['containerId'])
      this._containerService.getContainerInspect(this.environment!, this.containerId!)
        .pipe(filter(inspect => !!inspect))
        .subscribe(inspect => {
          this.inspect = JSON.stringify(inspect, null, 4);
        });
  }
}
