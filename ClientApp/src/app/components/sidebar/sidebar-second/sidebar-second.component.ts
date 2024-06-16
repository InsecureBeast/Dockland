import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEnvironment } from 'src/app/pages/environments/environment';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-sidebar-second',
  templateUrl: './sidebar-second.component.html',
  styleUrls: ['./sidebar-second.component.scss']
})
export class SidebarSecondComponent implements OnInit {
  environments: Observable<IEnvironment[]> = of([]);
  
  constructor(
    private readonly _remoteService: RemoteService) {
  }

  ngOnInit(): void {
    this.environments = this._remoteService.getEnvironments();
  }
}
