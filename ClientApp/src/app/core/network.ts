
export interface INetwork {
  name: string;
  ID: string;
  created: string;
  scope: string;
  driver: string;
  enableIPv6: boolean;
  IPAM: IPAM
  internal: boolean;
  attachable: boolean;
  ingress: boolean;
  ConfigFrom: IConfigReference;
  configOnly: boolean;
  containers: Map<string, IEndpoint>;
  options: Map<string, string>;
  labels: Map<string, string>;
  peers: IPeerInfo[];
  services: Map<string, IServiceInfo>;
}

export interface IPAM {
  driver: string;
  options: Map<string, string>;
  config: IPAMConfig;
}

export interface IPAMConfig {
  subnet: string;
  IPRange: string;
  gateway: string;
  auxAddress: Map<string, string>;
}

export interface IConfigReference {
  network: string;
}

export interface IEndpoint {
  name: string;
  endpointID: string;
  macAddress: string;
  iPv4Address: string;
  iPv6Address: string;
}

export interface IPeerInfo {
  name: string;
  ip: string;
}

export interface IServiceInfo {
  vip: string;
  ports: string[];
  localLBIndex: bigint;
  tasks: INetworkTask[];
}

export interface INetworkTask {
  name: string;
  endpointID: string;
  endpointIP: string;
  info: Map<string, string>;
}