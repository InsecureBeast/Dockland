using Docker.DotNet.Models;
using DockerW.DataModels;
using DockerW.Services;

namespace DockerW.Utils
{
    public class VolumeUtils
    {
    }

    public static class VolumeExtensions
    {
        public static Task<VolumesListResponse> GetVolumesAsync(this IDockerService service, string env)
        {
            var client = service.GetService(env);
            if (client == null)
                return Task.FromResult(new VolumesListResponse());

            var parameters = new VolumesListParameters();
            //parameters.Filters = new Dictionary<string, IDictionary<string, bool>>
            //{
            //    ["label"] = new Dictionary<string, bool>
            //    {
            //        [DockerComposeLabels.SERVICE] = true
            //    }
            //};

            return client.Volumes.ListAsync(parameters);
        }

        public static Volume ToVolume(this VolumeResponse response)
        {
            var volume = new Volume
            {
                Status = response.Status,
                Name = response.Name,
                Options = response.Options,
                Labels = response.Labels,
                CreatedAt = response.CreatedAt,
                Driver = response.Driver,
                UsageData = new DataModels.VolumeUsageData(response.UsageData),
                Mountpoint = response.Mountpoint,
                Scope = response.Scope
            };

            return volume;
        }

        public static IEnumerable<VolumeResponse> FilterVolumes(this VolumesListResponse list, string? stack)
        {
            if (list == null)
                return Enumerable.Empty<VolumeResponse>();

            var volumeList = list.Volumes.Where(c => c.Labels != null && c.Labels.ContainsKey(DockerComposeLabels.PROJECT));
            if (string.IsNullOrEmpty(stack))
                return volumeList;

            return volumeList.Where(c => c.Labels[DockerComposeLabels.PROJECT] == stack);
        }
    }
}
