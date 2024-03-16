import { Pipe, PipeTransform } from "@angular/core";
import { ImageModel } from "../pages/images/components/image.model";

@Pipe({
  name: 'imagesSort',
  standalone: true
})
export class FormatFileSizePipe implements PipeTransform {
 transform(images: ImageModel[] | null): ImageModel[] | null {
    if (!images)
      return null;
    images.sort((a, b) => a.name.localeCompare(b.name));
    return images;
 }
}