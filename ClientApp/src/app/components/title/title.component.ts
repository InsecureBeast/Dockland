import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnDestroy, AfterViewInit {

  private _destroy: Subject<void> = new Subject();

  @Input() iconClassName: string | undefined;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;

  constructor(private readonly _envService: EnvironmentService) {
    
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    setTimeout(() => {
      this._envService.current.pipe(takeUntil(this._destroy)).subscribe(env => {
        this.subtitle = `Environment: ${env?.name}`;
      });  
    });
  }
  
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
