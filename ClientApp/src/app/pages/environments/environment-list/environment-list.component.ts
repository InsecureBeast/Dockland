import { Component } from '@angular/core';
import { BaseListComponent } from '@components/base-list/base-list.component';
import { EnvironmentModel } from '../environment.model';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrl: './environment-list.component.scss'
})
export class EnvironmentListComponent extends BaseListComponent<EnvironmentModel> {
  
}
