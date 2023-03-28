namespace DockerW.DataModels
{
    public class Container
    {
        public string Id { get; set; }
        public IList<string> Names { get; set; } = new List<string>();
        public string Image { get; set; }
        public string ImageId { get; set; }
        public string Command { get; set; }
        public DateTime Created { get; set; }
        
        //  ports: IPort[];
        //  sizeRw: bigint;
        //  sizeRootFs: bigint;
        public IDictionary<string, string> Labels { get; set; } = new Dictionary<string, string>();
        public string State { get; set; }
        public string Status { get;set; }

        //  networkSettings: ISummaryNetworkSettings;
        //  mounts: IMountPoint[];
    }
}
