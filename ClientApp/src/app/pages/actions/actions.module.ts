import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions/actions.component';
import { RouterModule, Routes } from '@angular/router';
import { TitleModule } from "../../components/title/title.module";
import { ActionsListComponent } from "./components/actions-list/actions-list.component";
import { ActionsListToolbarComponent } from "./components/actions-list-toolbar/actions-list-toolbar.component";

const routes: Routes = [
  { path: '', component: ActionsComponent },
];

@NgModule({
  declarations: [
    ActionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TitleModule,
    ActionsListComponent,
    ActionsListToolbarComponent
],
  exports: [
    RouterModule
  ]
})
export class ActionsModule { }
