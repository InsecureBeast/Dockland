import { ICheckableModel } from "@components/base-list/base-list.component";

export class ActionModel implements ICheckableModel {
  checked: boolean = false;
  inProgress: boolean = false;
  name!: string;
  error!: string;
  state!: string;
  type!: string;

}