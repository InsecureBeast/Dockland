import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageListComponent } from './components/image-list.component';
import { ImagesComponent } from './images/images.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { ProgressbarConfig, ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ImagesSortPipe } from './pipes/images.sort.pipe';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';
import { LoaderCountPipe } from "../../pipes/loader-count.pipe";
import { LoaderComponent } from "../../components/loader/loader.component";
import { FormatFileSizePipe } from 'src/app/pipes/format-file-size.pipe';

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), {
    animate: true,
    striped: true,
    max: 100,
  });
}

@NgModule({
    declarations: [
      ImagesComponent, 
      ImageListComponent
    ],
    exports: [
      RouterModule, 
      ImageListComponent
    ],
    providers: [
      { provide: ProgressbarConfig, useFactory: getProgressbarConfig }
    ],
    imports: [
      CommonModule,
      RouterModule.forRoot([{ path: 'images', component: ImagesComponent }]),
      ProgressbarModule.forRoot(),
      TitleModule,
      ImagesSortPipe,
      FormatFileSizePipe,
      FluidHeightDirective,
      NgbTooltipModule,
      LoaderCountPipe,
      LoaderComponent,
    ]
})
export class ImagesModule {}
