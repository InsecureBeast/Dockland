import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SidebarItemComponent  {
  @Input() icon: string | undefined;
  @Input() name: string | undefined;
  @Input() link: string | unknown[] | null | undefined;
  @Input() captionClass: string | undefined;
  @Input() exact: boolean = false;

  @ViewChild("itemName", {static: false}) itemName!: ElementRef<HTMLSpanElement>;
}
