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
  @Input() routerLink: string | undefined;

  @ViewChild("itemName", {static: false}) itemName!: ElementRef<HTMLSpanElement>;

  @Input() captionClass: string | undefined;

  ngAfterViewInit(): void {
    const nameElement = this.itemName.nativeElement;
    const rect = nameElement.getBoundingClientRect();
    // if (rect.width <= 84)
    //   nameElement.style.display = "none !important";
    // else
    //   nameElement.style.display = "block";
      //this.captionClass = "d-none";
    //else 
    //this.captionClass = "d-block";
  }
}
