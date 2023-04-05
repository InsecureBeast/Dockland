export function getBoolean(value: any): boolean{
  switch(value){
       case true:
       case "true":
       case 1:
       case "1":
       case "on":
       case "yes":
           return true;
       default: 
           return false;
   }
}

export function getImageTagAndName(imageTags: string[]): { name:string, tag: string } {
    if (!imageTags)
      return {name: "<none>", tag: "<none>"}
    if (imageTags.length === 0)
      return {name: "", tag: "" };
    
    const imageTag = imageTags[0];
    const split = imageTag.split(":");
    if (split.length === 2)
      return { name: split[0], tag: split[1] };

    return { name: imageTag, tag: "" };
  }  