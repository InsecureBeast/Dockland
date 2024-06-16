import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class SidebarItemComponent implements AfterViewInit {
  @Input() icon: string | undefined;
  @Input() name: string | undefined;
  @Input() link: string | any[] | null | undefined;
  @Input() captionClass: string | undefined;

  @ViewChild("itemName", {static: false}) itemName!: ElementRef<HTMLSpanElement>;

  isCollapsed = false;

  ngAfterViewInit(): void {
  }
}
