import { Pipe, PipeTransform } from "@angular/core";
import { ImageModel } from "../components/image.model";

@Pipe({
  name: 'imagesSort',
  standalone: true
})
export class ImagesSortPipe implements PipeTransform {
  
 transform(images: ImageModel[] | null): ImageModel[] | null {
    if (!images)
      return null;
    images.sort((a, b) => a.name.localeCompare(b.name));
    return images;
 }
}