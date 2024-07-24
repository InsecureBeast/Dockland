import { ICheckableModel } from "src/app/components/base-list/base-list.component";
import { Image } from "src/app/core/image";
import { getImageTagAndName } from "src/app/core/utils";

export class ImageModel implements ICheckableModel {
  public readonly name: string;
  public readonly tag: string;
  public checked: boolean = false;
  public inProgress: boolean = false;
  public error?: string;

  constructor(public readonly image: Image) {
    const imageTags = getImageTagAndName(image.repoTags); 
    this.name = imageTags.name;
    this.tag = imageTags.tag;
  }
}