import { NgModule } from '@angular/core';
import { FormatFileSizePipe } from './format-file-size.pipe';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    FormatFileSizePipe
  ],
  exports: [
    FormatFileSizePipe
  ]
})
export class PipesModule {}