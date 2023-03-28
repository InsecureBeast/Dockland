import { Component, OnDestroy, OnInit } from '@angular/core';
import { Image } from '../../core/data-classes';
import { RemoteService } from '../../services/remote.service';
import { TEST_ENV } from '../../core/const';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit, OnDestroy {
  private _destroy: Subject<void> = new Subject();
  public images: Image[] = [];

  constructor(private _remoteService: RemoteService) {
    
  }

  ngOnInit(): void {
    this._remoteService.getImages(TEST_ENV).pipe(takeUntil(this._destroy)).subscribe({
      next: (result) => { this.images = result.map(i => {
        const tag = this.getImageTagName(i.repoTags);
        i.name = tag.name;
        i.tag = tag.tag;
        return i;
      });
      },
      error: (e) => console.error(e)
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private getImageTagName(imageTags: string[]): {name:string, tag: string} {
    if (imageTags.length === 0)
      return {name: "", tag: "" };
    
    const imageTag = imageTags[0];
    const split = imageTag.split(":");
    if (split.length === 2)
      return { name: split[0], tag: split[1] };

    return { name: imageTag, tag: "" };
  }
}
