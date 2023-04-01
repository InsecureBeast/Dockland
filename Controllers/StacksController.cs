using Docker.DotNet.Models;
using DockerW.DataModels;
using DockerW.Services;
using Microsoft.AspNetCore.Mvc;

namespace DockerW.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StacksController : ControllerBase
    {
        private readonly ILogger<StacksController> _logger;
        private readonly IDockerService _dockerService;

        public StacksController(ILogger<StacksController> logger, IDockerService dockerService)
        {
            _logger = logger;
            _dockerService = dockerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Container>> Get(string env, string? stack)
        {
            var containers = new List<Container>();
            var containersRespose = await GetStacksAsync(env);

            foreach (var response in containersRespose.FilterContsiners(stack))
            {
                var container = ToContainer(response);
                containers.Add(container);
            }
            return containers;
        }

        [HttpDelete("{id}")]
        public async Task<bool> Remove(string env, string stack)
        {
            var containersRespose = await GetStacksAsync(env);
            foreach (var container in containersRespose.FilterContsiners(stack))
            {
                var removeParameters = new ContainerRemoveParameters();
                removeParameters.RemoveVolumes = true;
                removeParameters.Force = true;
                //await client.Containers.RemoveContainerAsync(container.ID, removeParameters);
            }
            return true;
        }

        private Task<IList<ContainerListResponse>> GetStacksAsync(string env)
        {
            var client = _dockerService.GetService(env);
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

        private Container ToContainer(ContainerListResponse response)
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
                Labels = response.Labels
            };
            return container;
        }
    }

    static class ContainerListResponseExtensions
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
