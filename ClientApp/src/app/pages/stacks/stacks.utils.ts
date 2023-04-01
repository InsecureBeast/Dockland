import { DockerComposeLabels } from "src/app/core/const";

export function getStackName(map: Map<string, string>): string {
  const pair = Object.entries(map).find((k) => k[0] === DockerComposeLabels.PROJECT);
  return pair?.[1] as string;
}