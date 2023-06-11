import { Component, Input } from '@angular/core';
import { Image } from '../../../core/image';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html'
})
export class ImageListComponent {
  
  @Input() images: Image[] | null = [];
  @Input() fluentHeightEnabled: boolean = true;

  constructor() {   
  }

  getImageTagName(imageTags: string[]): {name:string, tag: string} {
    if (imageTags.length === 0)
      return {name: "", tag: "" };
    
    const imageTag = imageTags[0];
    const split = imageTag.split(":");
    if (split.length === 2)
      return { name: split[0], tag: split[1] };

    return { name: imageTag, tag: "" };
  }
}
