import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseListComponent } from '@components/base-list/base-list.component';
import { ActionModel } from '@pages/actions/action.model';

@Component({
  selector: 'app-actions-list-toolbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './actions-list-toolbar.component.html',
  styleUrl: './actions-list-toolbar.component.scss'
})
export class ActionsListToolbarComponent extends BaseListComponent<ActionModel> {

  delete() {
    
  }
}
