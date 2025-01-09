import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseListComponent } from '@components/base-list/base-list.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { TitleModule } from '@components/title/title.module';
import { FluidHeightDirective } from '@directives/fluid-height.directive';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionModel } from '@pages/actions/action.model';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@Component({
  selector: 'app-actions-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProgressbarModule,
    NgbTooltipModule,
    FluidHeightDirective,
    LoaderComponent,
    TitleModule
  ],
  templateUrl: './actions-list.component.html',
  styleUrl: './actions-list.component.scss'
})
export class ActionsListComponent extends BaseListComponent<ActionModel> {

}
