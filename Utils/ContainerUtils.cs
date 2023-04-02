using Docker.DotNet.Models;
using DockerW.DataModels;

namespace DockerW.Utils
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
                Ports = response.Ports.Select(p => ToPort(p)).ToArray()
            };
            return container;
        }

        private static DataModels.Port ToPort(Docker.DotNet.Models.Port port)
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
        public static IEnumerable<ContainerListResponse> FilterContsiners(this IList<ContainerListResponse> list, string? stack)
        {
            if (list == null)
                return Enumerable.Empty<ContainerListResponse>();

            if (string.IsNullOrEmpty(stack))
                return list;

            return list.Where(c => c.Labels[DockerComposeLabels.PROJECT] == stack);
        }
    }
}
