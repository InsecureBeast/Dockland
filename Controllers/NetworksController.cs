using Microsoft.AspNetCore.Mvc;
using Docker.DotNet.Models;
using DockerW.Services;
using DockerW.Utils;


namespace DockerW.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NetworksController : ControllerBase
    {
        private readonly ILogger<NetworksController> _logger;
        private readonly IDockerService _dockerService;

        public NetworksController(ILogger<NetworksController> logger, IDockerService dockerService)
        {
            _logger = logger;
            _dockerService = dockerService;
        }

        [HttpGet("{env}/{stack?}")]
        public async Task<IEnumerable<NetworkResponse>> Get(string env, string? stack)
        {
            var volumesRespose = await _dockerService.GetNetworksAsync(env);
            if (volumesRespose == null)
                return Enumerable.Empty<NetworkResponse>();
            
            return volumesRespose.FilterNetworks(stack);
        }
    }
}
