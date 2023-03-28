export interface Container {
  id: string;
  names: string[];
  image: string;
  imageId: string;
  command: string;
  created: string;
  ports: IPort[];
  sizeRw: bigint;
  sizeRootFs: bigint;
  labels: Map<string, string>;
  state: string;
  status: string;
  networkSettings: ISummaryNetworkSettings;
  mounts: IMountPoint[];
}

export interface IMountPoint {
  type: string;
  name: string;
  source: string;
  destination: string;
  driver: string;
  mode: string;
  rw: boolean;
  propagation: string;
}

export interface IPort {
  ip: string;
  privatePort: number;
  publicPort: number;
  type: string;
}

export interface ISummaryNetworkSettings {
  networks: Map<string, IEndpointSettings>;
}

export interface IEndpointSettings {
  IPAMConfig: EndpointIPAMConfig;
  links: string[];
  aliases: string[];
  networkID: string;
  endpointID: string;
  gateway: string;
  IPAddress: string;
  IPPrefixLen: bigint;
  IPv6Gateway: string;
  globalIPv6Address: string;
  globalIPv6PrefixLen: bigint;
  macAddress: string;
  driverOpts: Map<string, string>;
}

export interface EndpointIPAMConfig {
  IPv4Address: string;
  IPv6Address: string;
  linkLocalIPs: string[];
}