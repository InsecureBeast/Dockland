using Docker.DotNet.Models;
using System.Runtime.Serialization;
using System.Xml.Linq;

namespace DockerW.DataModels
{
    public class Volume
    {
        public string? CreatedAt { get; set; }
        public string? Driver { get; set; }
        public IDictionary<string, string> Labels { get; set; } = new Dictionary<string, string>();
        public string? Mountpoint { get; set; }
        public string? Name { get; set; }
        public IDictionary<string, string> Options { get; set; } = new Dictionary<string, string>();
        public string? Scope { get; set; }
        public IDictionary<string, object> Status { get; set; } = new Dictionary<string, object>();
        public VolumeUsageData? UsageData { get; set; }
    }

    public class VolumeUsageData
    {
        public VolumeUsageData(Docker.DotNet.Models.VolumeUsageData usageData)
        {
            if (usageData == null)
                return;

            RefCount = usageData.RefCount;
            Size = usageData.Size;
        }

        public long RefCount { get; set; }
        public long Size { get; set; }
    }
}
