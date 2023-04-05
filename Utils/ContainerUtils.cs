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
        public static IEnumerable<ContainerListResponse> FilterContsiners(this IList<ContainerListResponse> list, string? stack)
        {
            if (list == null)
                return Enumerable.Empty<ContainerListResponse>();

            var stackList = list.Where(c => c.Labels != null && c.Labels.ContainsKey(DockerComposeLabels.PROJECT));
            if (string.IsNullOrEmpty(stack))
                return stackList;
            
            return stackList.Where(c => c.Labels[DockerComposeLabels.PROJECT] == stack);
        }
    }
}
