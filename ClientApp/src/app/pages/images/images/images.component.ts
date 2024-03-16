import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RemoteService } from '../../../services/remote.service';
import { map, Observable, of, Subject } from 'rxjs';
import { EnvironmentService } from 'src/app/services/environment.service';
import { ImageModel } from '../components/image.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ImageListComponent } from '../components/image-list.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit, OnDestroy {

  private _destroy: Subject<void> = new Subject();
  private _checked: ImageModel[] = [];

  @ViewChild(ImageListComponent) private _imageListComponent: ImageListComponent | undefined;
  
  images: Observable<ImageModel[]> = of([]);

  constructor(
    private _remoteService: RemoteService, 
    private readonly _envService: EnvironmentService,
    private readonly _dialogService: DialogService) {
  }

  ngOnInit(): void {
    if (this._envService.currentEnv)
      this.images = this._remoteService.images.getImages(this._envService.currentEnv?.name)
        .pipe(map(i => i.map(x => new ImageModel(x))));
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
        if (this._envService.currentEnv) {
          model.inProgress = true;
          this._remoteService.images.delete(this._envService.currentEnv?.name, model.image)
            .subscribe(result => {
              if (result && this._imageListComponent) {
                this._imageListComponent.remove(model);
                this._imageListComponent?.setProcessType("success");
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
