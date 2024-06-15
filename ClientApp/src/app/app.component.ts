import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'app';
  isVisible?: Observable<boolean>;
  selectedSection!: string;

  constructor(private readonly _toolbarService: NavbarService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = this._toolbarService.visible;
    });
  }
}
