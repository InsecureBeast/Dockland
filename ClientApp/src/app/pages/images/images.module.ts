import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PipesModule } from "src/app/pipes/pipes.module";
import { ImageListComponent } from "./components/image-list.component";
import { ImagesComponent } from "./images/images.component";
import { TitleModule } from "src/app/components/title/title.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { ProgressbarConfig, ProgressbarModule } from "ngx-bootstrap/progressbar";

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true,  max: 100 });
}

@NgModule({
  declarations: [
    ImagesComponent,
    ImageListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'images', component: ImagesComponent },
    ]),
    ProgressbarModule.forRoot(),
    PipesModule,
    TitleModule,
    DirectivesModule
  ],
  exports: [RouterModule, ImageListComponent],
  providers: [
    { provide: ProgressbarConfig, useFactory: getProgressbarConfig }
  ],
})
export class ImagesModule {}