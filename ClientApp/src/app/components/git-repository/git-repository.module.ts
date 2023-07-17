import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitRepositoryComponent } from './git-repository.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GitRepositoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    GitRepositoryComponent
  ]
})
export class GitRepositoryModule { }