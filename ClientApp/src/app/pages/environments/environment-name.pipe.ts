import { Pipe } from "@angular/core";
import { EnvironmentType } from "./environment";

@Pipe({
  name: "envName"
})
export class EnvironmentNamePipe {

  transform(value: EnvironmentType | null): string | null {
    switch (value) {
      case EnvironmentType.Http:
        return "Docker remote API" 
      case EnvironmentType.Local:
        return "Local socket"
      //case EnvironmentType.Agent:
      //  return "Docland Agent"
      default:
        break;
    }
    return "";
  }
}