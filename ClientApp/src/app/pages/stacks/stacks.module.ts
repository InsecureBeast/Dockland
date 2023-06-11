import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PipesModule } from "src/app/pipes/pipes.module";
import { ContainersModule } from "../containers/containers.module";
import { ImagesModule } from "../images/images.module";
import { NetworksModule } from "../networks/networks.module";
import { VolumesModule } from "../volumes/volumes.module";
import { StackComponent } from "./stack/stack.component";
import { StacksComponent } from "./stacks/stacks.component";
import { TitleModule } from "src/app/components/title/title.module";

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
    PipesModule,
    ImagesModule,
    ContainersModule,
    VolumesModule,
    NetworksModule,
    TitleModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [StacksComponent, StackComponent]
})
export class StacksModule {}