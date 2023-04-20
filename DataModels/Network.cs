using Docker.DotNet.Models;
using System.Runtime.Serialization;
using System.Xml.Linq;

namespace DockerW.DataModels
{
    public class Network
    {
        public string Name { get; set; } = string.Empty;
        public string ID { get; set; } = string.Empty;
        public DateTime Created { get; set; }
        public string Scope { get; set; } = string.Empty;
        public string Driver { get; set; } = string.Empty;
        public bool EnableIPv6 { get; set; }
        public IPAM? IPAM { get; set; }
        public bool Internal { get; set; }
        public bool Attachable { get; set; }
        public bool Ingress { get; set; }
        public Config? ConfigFrom { get; set; }
        public bool ConfigOnly { get; set; }
        public IDictionary<string, Endpoint> Containers { get; set; } = new Dictionary<string, Endpoint>();
        public IDictionary<string, string> Options { get; set; } = new Dictionary<string, string>();
        public IDictionary<string, string> Labels { get; set; } = new Dictionary<string, string>();
        public IList<PeerInfo> Peers { get; set; } = new List<PeerInfo>();
        public IDictionary<string, ServiceInfo> Services { get; set; } = new Dictionary<string, ServiceInfo>();
    }

    public class Endpoint
    {
        public Endpoint(EndpointResource resource)
        {
            Name = resource.Name;
            EndpointID = resource.EndpointID;
            MacAddress = resource.MacAddress;
            IPv4Address = resource.IPv4Address;
            IPv6Address = resource.IPv6Address;
        }

        public string Name { get; set; }
        public string EndpointID { get; set; }
        public string MacAddress { get; set; }
        public string IPv4Address { get; set; }
        public string IPv6Address { get; set; }
    }

    public class ServiceInfo
    {
        public ServiceInfo(Docker.DotNet.Models.ServiceInfo info)
        {
            if (info == null)
                return;

            VIP = info.VIP;
            Ports = info.Ports;
            LocalLBIndex = info.LocalLBIndex;
            Tasks = info.Tasks; 
        }

        public string VIP { get; set; } = string.Empty;
        public IList<string> Ports { get; set; } = new List<string>();
        public long LocalLBIndex { get; set; } 
        public IList<NetworkTask> Tasks { get; set; } = new List<NetworkTask>();
    }

    public class PeerInfo
    {
        public PeerInfo(Docker.DotNet.Models.PeerInfo peerInfo)
        {
            if (peerInfo == null)
                return;

            Name = peerInfo.Name;
            IP = peerInfo.IP;
        }

        public string Name { get; set; } = string.Empty;
        public string IP { get; set; } = string.Empty;
    }

    public class Config
    {
        public Config(ConfigReference configFrom)
        {
            if (configFrom == null)
                return;

            Network = configFrom.Network;
        }

        public string Network { get; set; } = string.Empty;
    }

    public class IPAM
    {
        public IPAM(Docker.DotNet.Models.IPAM ipam)
        {
            Driver = ipam.Driver;
            Options = ipam.Options;
            if (ipam.Config != null)
                Config = ipam.Config.Select(c => new IPAMConfig(c)).ToArray();
        }

        public string Driver { get; set; } = string.Empty;
        public IDictionary<string, string> Options { get; set; } = new Dictionary<string, string>();
        public IList<IPAMConfig> Config { get; set; } = new List<IPAMConfig>();
    }

    public class IPAMConfig
    {
        public IPAMConfig(Docker.DotNet.Models.IPAMConfig config)
        {
            if (config == null)
                return;

            Subnet = config.Subnet;
            IPRange = config.IPRange;
            Gateway = config.Gateway;
            AuxAddress = config.AuxAddress;
        }

        public string Subnet { get; set; } = string.Empty;
        public string IPRange { get; set; } = string.Empty;
        public string Gateway { get; set; } = string.Empty;
        public IDictionary<string, string> AuxAddress { get; set; } = new Dictionary<string, string>();
    }
}
