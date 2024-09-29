export interface Image {
  id: string;
  name: string;
  tag: string;
  status: string;
  created: string;
  size: number;
  sharedSize: number;
  virtualSize: number;
  repoDigests: string[];
  repoTags: string[];
  labels: string[];
}