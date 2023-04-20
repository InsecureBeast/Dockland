namespace DockerW.DataModels
{
    public class Container
    {
        public string? Id { get; set; }
        public IList<string> Names { get; set; } = new List<string>();
        public string? Image { get; set; }
        public string? ImageId { get; set; }
        public string? Command { get; set; }
        public DateTime Created { get; set; }

        public IList<Port> Ports { get; set; } = new List<Port>();
        //  sizeRw: bigint;
        //  sizeRootFs: bigint;
        public IDictionary<string, string> Labels { get; set; } = new Dictionary<string, string>();
        public string? State { get; set; }
        public string? Status { get;set; }

        //  networkSettings: ISummaryNetworkSettings;
        //  mounts: IMountPoint[];
    }

    public class Port
    {
        public string Ip { get; set; } = String.Empty;   
        public ushort PrivatePort { get; set; }
        public ushort PublicPort { get; set; }
        public string Type { get; set; } = String.Empty;
    }
}
