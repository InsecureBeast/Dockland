
export interface IVolume {
  createdAt: string;
  driver: string;
  labels: Map<string, string>;
  mountpoint: string;
  name: string;
  options: Map<string, string>;
  scope: string;
  status: Map<string, object>;
  usageData: IVolumeUsageData;
}

export interface IVolumeUsageData {
  refCount: bigint;
  size: bigint;
}