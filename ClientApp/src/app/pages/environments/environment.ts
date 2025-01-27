
export enum EnvironmentType {
  Http = 0,
  Local = 1,
  Agent = 2,
}

export interface IEnvironment {
  id: string;
  name: string;
  url?: string;
  tag?: string;
  type: EnvironmentType;
}