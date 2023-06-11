import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolbarService } from './services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  isVisible: Observable<boolean>;

  constructor(toolbarService: ToolbarService) {
    this.isVisible = toolbarService.visible;
  }
}
