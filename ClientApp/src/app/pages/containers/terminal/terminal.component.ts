import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';
import { Terminal } from 'xterm';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TerminalComponent implements AfterViewInit {
  
  private readonly prompt = '\n' + FunctionsUsingCSI.cursorColumn(1) + '$ ';
  private baseTheme = {
    foreground: '#F8F8F8',
    background: '#2D2E2C',
    selectionBackground: '#5DA5D533',
    black: '#1E1E1D',
    brightBlack: '#262625',
    red: '#CE5C5C',
    brightRed: '#FF7272',
    green: '#5BCC5B',
    brightGreen: '#72FF72',
    yellow: '#CCCC5B',
    brightYellow: '#FFFF72',
    blue: '#5D5DD3',
    brightBlue: '#7279FF',
    magenta: '#BC5ED1',
    brightMagenta: '#E572FF',
    cyan: '#5DA5D5',
    brightCyan: '#72F0FF',
    white: '#F8F8F8',
    brightWhite: '#FFFFFF',
    border: '#85858a'
  };

  underlying?: Terminal;
  @ViewChild('term', {static: false}) ngTerminal?: NgTerminal;

  ngAfterViewInit(): void {
    
    if(!this.ngTerminal)
      return;

    this.underlying = this.ngTerminal.underlying!!;
    //this.underlying.options.fontSize = 20;
    //this.underlying.loadAddon(new WebLinksAddon());
    this.ngTerminal.setXtermOptions({
      fontFamily: '"Cascadia Code", Menlo, monospace',
      //theme: this.baseTheme,
      cursorBlink: true
    });
    this.ngTerminal.write('$ NgTerminal Live Example');
    this.ngTerminal.write(this.prompt);
    this.ngTerminal.onData().subscribe((input) => {
      if(!this.ngTerminal)
        return;
      if (input === '\r') { // Carriage Return (When Enter is pressed)
        this.ngTerminal.write(this.prompt);
      } else if (input === '\u007f') { // Delete (When Backspace is pressed)
        if (this.ngTerminal.underlying!!.buffer.active.cursorX > 2)
          this.ngTerminal.write('\b \b');
      } else if (input === '\u0003') { // End of Text (When Ctrl and C are pressed)
          this.ngTerminal.write('^C');
          this.ngTerminal.write(this.prompt);
      }else
        this.ngTerminal.write(input);
    })

    this.ngTerminal.onKey().subscribe(e => {
      //onData() is commonly used.
    });
  }
}
