import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isVisible: Observable<boolean>;

  constructor(toolbarService: ToolbarService) {
    this.isVisible = toolbarService.visible;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
