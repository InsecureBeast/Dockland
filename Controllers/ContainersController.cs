using Docker.DotNet.Models;
using Microsoft.AspNetCore.Mvc;
using DockerW.DataModels;
using DockerW.Services;
using DockerW.Utils;

namespace DockerW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContainersController : ControllerBase
    {
        private readonly ILogger<ContainersController> _logger;
        private readonly IDockerService _dockerService;

        public ContainersController(ILogger<ContainersController> logger, IDockerService dockerService)
        {
            _logger = logger;
            _dockerService = dockerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Container>> Get(string env)
        {
            var containers = new List<Container>();
            var param = new ContainersListParameters();
            param.All = true;
            var containerssRespose = await _dockerService.GetContainersAsync(env);
            foreach (var response in containerssRespose)
            {
                var container = response.ToContainer();
                containers.Add(container);
            }
            return containers;
        }
    }
 }
