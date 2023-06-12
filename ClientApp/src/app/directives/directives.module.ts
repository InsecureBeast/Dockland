import { NgModule } from '@angular/core';
import { FluidHeightDirective } from './fluid-height.directive';
import { CheckAllDirective } from './check-all.directive';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    FluidHeightDirective,
    CheckAllDirective
  ],
  exports: [
    FluidHeightDirective,
    CheckAllDirective
  ]
})
export class DirectivesModule {}