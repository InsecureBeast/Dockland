import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RemoteService } from '../../../services/remote.service';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { ImageModel } from '../components/image.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ImageListComponent } from '../components/image-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { parseDeleteImageErrorMessage } from './error.parser';
import { remove } from '../../../utils/array-utils'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: [ './images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {

  private _destroy: Subject<void> = new Subject();
  private _checked: ImageModel[] = [];
  private _env: string = '';

  @ViewChild(ImageListComponent) private _imageListComponent: ImageListComponent | undefined;
  
  images: Observable<ImageModel[]> = of([]);

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _route: ActivatedRoute,
    private readonly _dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._route.paramMap
      .pipe(takeUntil(this._destroy))
      .subscribe(params => {
        const env = params.get("env");
        if (!env)
          return;
        this._env = env;
        this.images = of([]);
        this.images = this._remoteService.images.getImages(env)
          .pipe(map(i => i.map(x => new ImageModel(x))));
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  onChecked(checked: ImageModel[]) {
    this._checked = checked;
  }

  remove(): void {
    if (this._checked.length === 0)
      return;
    
    this._dialogService.openConfirmationDialog()?.subscribe(res => {
      if (!res) 
        return
      
      this._imageListComponent?.setProcessType("danger");
      this._checked.forEach(model => {
        if (this._env) {
          model.inProgress = true;
          this._remoteService.images.delete(this._env, model.image)
            .subscribe({
              next : result => {
                if (result && this._imageListComponent) {
                  this._imageListComponent.remove(model);
                  remove(this._checked, model);
                }  
              },
              error(err: HttpErrorResponse) {
                model.inProgress = false;
                model.error = parseDeleteImageErrorMessage(err.error);
              }
          });
        }
      });

    });
  }
  
  isAnyChecked(): boolean {
    return this._checked.length > 0;
  }

  selectImages(event: ImageModel[]): void {
    this._checked = event;
  }
}
