import { NgModule } from '@angular/core';
import { FluidHeightDirective } from './fluid-height.directive';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    FluidHeightDirective
  ],
  exports: [
    FluidHeightDirective
  ]
})
export class DirectivesModule {}