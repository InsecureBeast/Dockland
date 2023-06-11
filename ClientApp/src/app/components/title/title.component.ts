import { Component, Input } from '@angular/core';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  @Input() iconClassName: string | undefined;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;

  constructor(envService: EnvironmentService) {
    this.subtitle = `Environment: ${envService.currentEnv?.name}`;
  }
}
