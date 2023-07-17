import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebEditorComponent } from './web-editor.component';

@NgModule({
  declarations: [
    WebEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    WebEditorComponent
  ]
})
export class WebEditorModule { }
