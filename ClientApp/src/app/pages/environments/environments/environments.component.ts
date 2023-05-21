import { Component, OnInit } from '@angular/core';
import { IEnvironment } from '../environment';
import { Observable, of } from 'rxjs';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent implements OnInit {
  environments: Observable<IEnvironment[]> = of([]);

  constructor(private readonly _remoteService: RemoteService) {
    
  }
  ngOnInit(): void {
    this.environments = this._remoteService.getEnvironments();
  }
}
