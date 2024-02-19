import { Component, EventEmitter, Input, Output } from '@angular/core';

export class WebEditorOptions {
  language: string = "";
  codeLens: boolean = false;
  lineNumbersMinChars?: number = 4;
}

@Component({
  selector: 'app-web-editor',
  templateUrl: './web-editor.component.html',
  styleUrls: ['./web-editor.component.scss']
})
export class WebEditorComponent {

  editorOptions = {};

  @Output() isEmpty: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  set options(value: WebEditorOptions) {
    this.editorOptions = {
      language: value.language,
      codeLens: value.codeLens,
      lineNumbersMinChars: value.lineNumbersMinChars
    };
  }

  @Input() code!: string;
  @Output() codeChange = new EventEmitter<string>();

  onInit(editor: any): void {
    editor.onDidChangeModelContent = (changes: any) => {
      const content = editor.getValue();
      const isEmpty = /^\s*$/.test(content);
      this.isEmpty.emit(isEmpty);
      this.codeChange.emit(content);
    }
  }
}
