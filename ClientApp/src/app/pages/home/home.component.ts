import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEnvironment } from '../environments/environment';
import { RemoteService } from 'src/app/services/remote.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  
  environments: Observable<IEnvironment[]>;
  isVisible: Observable<boolean>;

  constructor(private readonly _remoteService: RemoteService, toolbarService: NavbarService) {
    this.environments = of([]);
    this.isVisible = toolbarService.visible;
  }
  
  ngOnInit(): void {
    this.environments.subscribe() //TODO temp
  }
}
