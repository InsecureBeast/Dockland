import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DockerComposeLabels, TEST_ENV } from 'src/app/core/const';
import { RemoteService } from 'src/app/services/remote.service';
import { Container } from '../containers/container';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {

  containers: Container[] = [];
  checked: Container[] = [];

  constructor(private readonly _remoteService: RemoteService, private _route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this._route.queryParams
      .subscribe(params => {
        console.log(params); // { name: "stack-name" }
        const stackName = params.name;
        this._remoteService.getStacks(TEST_ENV, stackName).subscribe({ 
          next: (result) => { this.containers = result.map(i => i) }, 
          error: (e) => console.error(e)
        });
      }
    );
  }

  getStack(map: Map<string, string>): string {
    const pair = Object.entries(map).find((k) => k[0] === DockerComposeLabels.PROJECT);
    return pair?.[1] as string;
  }

  remove(): void {
    this.checked.forEach(container => {
      this._remoteService.removeStack(TEST_ENV, this.getStack(container.labels)).subscribe({
        next: (result) => console.log(result), 
        error: (e) => console.error(e)
      })  
    });
  }
}
