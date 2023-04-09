using Docker.DotNet.Models;
using DockerW.DataModels;
using DockerW.Services;

namespace DockerW.Utils
{
    public static class StackExtensions
    {
        public static Task<IList<ContainerListResponse>> GetContainersInStackAsync(this IDockerService service, string env)
        {
            var client = service.GetService(env);
            if (client == null)
                return Task.FromResult(Array.Empty<ContainerListResponse>() as IList<ContainerListResponse>);

            var parameters = new ContainersListParameters();
            parameters.All = true;
            //parameters.Filters = new Dictionary<string, IDictionary<string, bool>>
            //{
            //    ["label"] = new Dictionary<string, bool>
            //    {
            //        [DockerComposeLabels.SERVICE] = true
            //    }
            //};

            return client.Containers.ListContainersAsync(parameters);
        }

        public static string GetStackName(this ContainerListResponse response)
        {
            return response.Labels?.FirstOrDefault(x => DockerComposeLabels.PROJECT == x.Key).Value;
        }

        public static string GetStackType(this ContainerListResponse response) 
        {
            if (response.Labels != null && response.Labels.ContainsKey(DockerComposeLabels.PROJECT))
                return "Compose";

            return "unknown";
        }
    }
}
