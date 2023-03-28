import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StacksComponent } from "./stacks.component";

@NgModule({
  declarations: [
    StacksComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [StacksComponent]
})
export class StacksModule {}