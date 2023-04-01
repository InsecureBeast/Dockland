import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StackComponent } from "./stack/stack.component";
import { StacksComponent } from "./stacks/stacks.component";

@NgModule({
  declarations: [
    StacksComponent,
    StackComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'stacks', component: StacksComponent },
      { path: 'stacks/:name', component: StackComponent }, 
    ]),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [StacksComponent, StackComponent]
})
export class StacksModule {}