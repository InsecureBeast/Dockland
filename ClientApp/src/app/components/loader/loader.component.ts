import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoaderCountPipe } from "../../pipes/loader-count.pipe";

export type LoaderType = "table" | "block";

@Component({
    selector: 'app-table-loader',
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
  @Input() type: LoaderType = "table";

  rows: number[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["rowsCount"]) {
      this.rows = new Array(this.rowsCount);
    } 
  }
}
