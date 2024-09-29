import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isVisible: Observable<boolean>;

  constructor(private readonly _toolbarService: NavbarService) {
    this.isVisible = this._toolbarService.visible;
  }
}
