using Docker.DotNet.Models;
using Dockland.DataModels;
using Dockland.Services;

namespace Dockland.Utils
{
    public static class ContainerExtensions
    {
        public static Container ToContainer(this ContainerListResponse response)
        {
            var container = new Container
            {
                Names = response.Names,
                Id = response.ID,
                Created = response.Created,
                State = response.State,
                Status = response.Status,
                Command = response.Command,
                Image = response.Image,
                ImageId = response.ImageID,
                Labels = response.Labels,
                Ports = response.Ports.Select(p => p.ToPort()).ToArray()
            };
            return container;
        }

        private static DataModels.Port ToPort(this Docker.DotNet.Models.Port port)
        {
            return new DataModels.Port
            {
                Ip = port.IP,
                PrivatePort = port.PrivatePort,
                PublicPort = port.PublicPort,
                Type = port.Type
            };
        }
    }

    public static class ContainerListResponseExtensions
    {
        public static IEnumerable<ContainerListResponse> FilterStackContsiners(this IList<ContainerListResponse> list, string? stack)
        {
            if (list == null)
                return Enumerable.Empty<ContainerListResponse>();

            if (string.IsNullOrEmpty(stack))
                return list;

            var stackList = list.Where(c => c.Labels != null && c.Labels.ContainsKey(DockerComposeLabels.PROJECT));
            return stackList.Where(c => c.Labels[DockerComposeLabels.PROJECT] == stack);
        }

        public static IEnumerable<ContainerListResponse> FilterContsinersInStacks(this IList<ContainerListResponse> list)
        {
            if (list == null)
                return Enumerable.Empty<ContainerListResponse>();

            var stackList = list.Where(c => c.Labels != null && c.Labels.ContainsKey(DockerComposeLabels.PROJECT));
            return stackList;
        }

        public static async Task<ContainerListResponse?> GetContainerAsync(this IDockerService service, string env, string containerId)
        {
            var client = service.GetService(env);
            if (client == null)
                return null;

            var parameters = new ContainersListParameters();
            parameters.All = true;
            parameters.Filters = new Dictionary<string, IDictionary<string, bool>>
            {
                ["id"] = new Dictionary<string, bool>
                {
                    [containerId] = true
                }
            };


            var list = await client.Containers.ListContainersAsync(parameters);
            return list.FirstOrDefault();
        }
    }
}
