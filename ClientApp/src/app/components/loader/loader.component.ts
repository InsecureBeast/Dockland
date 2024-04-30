import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoaderCountPipe } from "../../pipes/loader-count.pipe";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      LoaderCountPipe
    ]
})
export class LoaderComponent implements OnChanges {
  @Input() rowsCount: number = 0;
  @Input() columnsCount: number = 0;

  rows: number[] = [];
  columns: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["rowsCount"]) {
      this.rows = new Array(this.rowsCount);
    } 
    if (changes["columnsCount"]) {
      this.columns = new Array(this.columnsCount);
    }
  }
}
