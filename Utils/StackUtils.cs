using Docker.DotNet.Models;
using DockerW.DataModels;
using DockerW.Services;

namespace DockerW.Utils
{
    public static class StackExtensions
    {
        public static Task<IList<ContainerListResponse>> GetStacksAsync(this IDockerService service, string env)
        {
            var client = service.GetService(env);
            if (client == null)
                return Task.FromResult(Array.Empty<ContainerListResponse>() as IList<ContainerListResponse>);

            var parameters = new ContainersListParameters();
            parameters.Filters = new Dictionary<string, IDictionary<string, bool>>
            {
                ["label"] = new Dictionary<string, bool>
                {
                    [DockerComposeLabels.PROJECT] = true
                }
            };

            return client.Containers.ListContainersAsync(parameters);
        }
    }
}
