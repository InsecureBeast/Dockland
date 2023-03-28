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
        public async Task<IEnumerable<Container>> Get(string env)
        {
            var stacks = new List<Stack>();
            var containers = new List<Container>();
            var param = new ContainersListParameters();
            param.All = true;
            var client = _dockerService.GetService(env);
            var containersRespose = await client.Containers.ListContainersAsync(param);
            
            foreach (var response in containersRespose)
            {
                if (!response.Labels.ContainsKey("com.docker.compose.image"))
                    continue;

                var container = new Container();
                container.Names = response.Names;
                container.Id = response.ID;
                container.Created = response.Created;
                container.State = response.State;
                container.Status = response.Status;
                container.Command = response.Command;
                container.Image = response.Image;
                container.ImageId = response.ImageID;
                container.Labels = response.Labels;
                containers.Add(container);
            }
            return containers;
        }
    }
}
