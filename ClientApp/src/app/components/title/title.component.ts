import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnDestroy {

  private _destroy: Subject<void> = new Subject();

  @Input() iconClassName: string | undefined;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;

  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap
      .pipe(takeUntil(this._destroy))
      .subscribe(params => {
        const env = params?.get('env');
        if (!env)
          return;

        this.subtitle = `Environment: ${env}`;
      });
  }
  
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
