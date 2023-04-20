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

        [HttpGet("{env}/{stack?}")]
        public async Task<IEnumerable<Container>> Get(string env, string? stack)
        {
            var containers = new List<Container>();
            var containersRespose = await _dockerService.GetContainersAsync(env);
            foreach (var response in containersRespose.FilterStackContsiners(stack))
            {
                var container = response.ToContainer();
                containers.Add(container);
            }
            return containers;
        }
    }
 }
