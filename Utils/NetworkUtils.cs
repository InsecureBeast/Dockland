using Docker.DotNet.Models;
using DockerW.DataModels;
using DockerW.Services;

namespace DockerW.Utils
{
    public class NetworkUtils
    {
    }

    public static class NetworkExtensions
    {
        public static Task<IList<NetworkResponse>> GetNetworksAsync(this IDockerService service, string env)
        {
            var client = service.GetService(env);
            if (client == null)
                return Task.FromResult(new List<NetworkResponse>() as IList<NetworkResponse>);

            var parameters = new NetworksListParameters();
            //parameters.Filters = new Dictionary<string, IDictionary<string, bool>>
            //{
            //    ["label"] = new Dictionary<string, bool>
            //    {
            //        [DockerComposeLabels.SERVICE] = true
            //    }
            //};

            return client.Networks.ListNetworksAsync(parameters);
        }

        public static IEnumerable<NetworkResponse> FilterNetworks(this IList<NetworkResponse> list, string? stack)
        {
            if (list == null)
                return Enumerable.Empty<NetworkResponse>();

            var networkList = list.Where(c => c.Labels != null && c.Labels.ContainsKey(DockerComposeLabels.PROJECT));
            if (string.IsNullOrEmpty(stack))
                return networkList;

            return networkList.Where(c => c.Labels[DockerComposeLabels.PROJECT] == stack);
        }
    }
}
