using System.Runtime.Serialization;
using System.Xml.Linq;

namespace DockerW.DataModels
{
    public class Image
    {
        public long Containers { get; set; }
        public DateTime Created { get; set; }
        public string Name { get; set; }
        public string Tag { get; set; }
        public string ID { get; set; }
        public IDictionary<string, string> Labels { get; set; } = new Dictionary<string, string>();
        public string ParentID { get; set; }
        public IList<string> RepoDigests { get; set; } = new List<string>();
        public IList<string> RepoTags { get; set; } = new List<string>();
        public long SharedSize { get; set; }
        public long Size { get; set; }
        public long VirtualSize { get; set; }
    }
}
