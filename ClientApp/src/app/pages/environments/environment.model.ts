import { ICheckableModel } from "@components/base-list/base-list.component";
import { IEnvironment } from "./environment";

export class EnvironmentModel implements ICheckableModel {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly tag?: string;

  checked: boolean = false;
  inProgress: boolean = false;
  error?: string = undefined;
  type: string = "standalone"; // todo
  state: string = "connected"; //todo

  constructor(environment: IEnvironment) {
    this.id = environment.id;
    this.name = environment.name;
    this.tag = environment.tag;
    this.url = environment.url;
  }
}