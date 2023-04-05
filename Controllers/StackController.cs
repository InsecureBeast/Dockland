using Microsoft.AspNetCore.Mvc;
using Docker.DotNet;
using Docker.DotNet.Models;
using DockerW.DataModels;
using DockerW.Services;
using DockerW.Utils;

namespace DockerW.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StackController : ControllerBase
    {
        private readonly ILogger<StacksController> _logger;
        private readonly IDockerService _dockerService;

        public StackController(ILogger<StacksController> logger, IDockerService dockerService)
        {
            _logger = logger;
            _dockerService = dockerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Container>> Get(string env, string stack)
        {
            var containers = new List<Container>();
            var containersRespose = await _dockerService.GetStacksAsync(env);
            foreach (var response in containersRespose.FilterContsiners(stack))
            {
                var container = response.ToContainer();
                containers.Add(container);
            }
            return containers;
        }

        [HttpDelete("{id}")]
        public async Task<bool> Remove(string env, string stack)
        {
            var client = _dockerService.GetService(env);
            if (client == null)
                return false;

            var containersRespose = await _dockerService.GetStacksAsync(env);
            var containers = containersRespose.FilterContsiners(stack).ToList();
            foreach (var container in containers)
            {
                var removeParameters = new ContainerRemoveParameters();
                removeParameters.RemoveVolumes = true;
                removeParameters.Force = true;
                //await client.Containers.StopContainerAsync(container.ID, new ContainerStopParameters());
                await client.Containers.RemoveContainerAsync(container.ID, removeParameters);
            }

            var firstContainer = containers.FirstOrDefault();
            if (firstContainer == null)
                return false;

            foreach (var mount in firstContainer.Mounts)
            {
                await client.Volumes.RemoveAsync(mount.Name, true); //TODO Force
            }
            foreach (var network in firstContainer.NetworkSettings.Networks)
            {
                await client.Networks.DeleteNetworkAsync(network.Value.NetworkID);
            }

            containers = containersRespose.FilterContsiners(stack).ToList();
            foreach (var container in containers)
            {
                await RemoveImagesSafe(client, container);
            }

            return true;
        }

        private async Task RemoveImagesSafe(IDockerClient client, ContainerListResponse container)
        {
            try
            {
                var imageParams = new ImageDeleteParameters();
                imageParams.Force = true; //TODO Force
                await client.Images.DeleteImageAsync(container.ImageID, imageParams);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
            }
        }
    }
}
