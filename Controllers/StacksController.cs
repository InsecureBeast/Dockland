using Microsoft.AspNetCore.Mvc;
using DockerW.DataModels;
using DockerW.Services;
using DockerW.Utils;

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
        public async Task<IEnumerable<Stack>> Get(string env)
        {
            var stacks = new Dictionary<string, Stack>();
            var containersRespose = await _dockerService.GetContainersInStackAsync(env);

            foreach (var response in containersRespose.FilterStackContsiners(null))
            {
                var stack = new Stack
                {
                    Name = response.GetStackName(),
                    Type = response.GetStackType(),
                    Created = response.Created
                };
                stacks[stack.Name] = stack;
            }
            return stacks.Values;
        }
    }
}
