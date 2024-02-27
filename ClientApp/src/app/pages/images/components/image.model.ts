import { ICheckableModel } from "src/app/components/base-list/base-list.component";
import { Image } from "src/app/core/image";

export class ImageModel implements ICheckableModel {
  public readonly name: string;
  public readonly tag: string;
  public checked: boolean = false;
  public inProgress: boolean = false;

  constructor(public readonly image: Image) {
    const imageTags = this.getImageTagName(image.repoTags); 
    this.name = imageTags.name;
    this.tag = imageTags.tag;
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