import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  isVisible: Observable<boolean>;

  constructor(toolbarService: NavbarService) {
    this.isVisible = toolbarService.visible;
  }
}
