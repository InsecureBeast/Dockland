using Docker.DotNet.Models;
using DockerW.DataModels;
using DockerW.Services;
using DockerW.Utils;
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
            //var client = _dockerService.GetService(env);
            //if (env == null)
            //    return false;

            var containersRespose = await _dockerService.GetStacksAsync(env);
            //foreach (var container in containersRespose.FilterContsiners(stack))
            //{
            //    var removeParameters = new ContainerRemoveParameters();
            //    removeParameters.RemoveVolumes = true;
            //    removeParameters.Force = true;
            //    await client.Containers.RemoveContainerAsync(container.ID, removeParameters);
            //}
            return true;
        }
    }
}
