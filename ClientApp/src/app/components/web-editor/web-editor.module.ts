import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebEditorComponent } from './web-editor.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: './assets', // configure base path for monaco editor. Starting with version 8.0.0 it defaults to './assets'. Previous releases default to '/assets'
  defaultOptions: { 
    //scrollBeyondLastLine: false,
    theme: 'vs-light', 
    minimap: {enabled: false},
    lineNumbersMinChars: 3,
    scrollbar: {
      alwaysConsumeMouseWheel: false,
      verticalScrollbarSize: 5,
      horizontalScrollbarSize: 5,
      useShadows: false
    },
    cursorSurroundingLines: 3
  }, // pass default options to be used
};

@NgModule({
  declarations: [
    WebEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  exports:[
    WebEditorComponent
  ]
})
export class WebEditorModule { }
