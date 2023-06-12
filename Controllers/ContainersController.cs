using Microsoft.AspNetCore.Mvc;
using Dockland.DataModels;
using Dockland.Services;
using Dockland.Utils;
using Docker.DotNet.Models;
using System.Text.Json;

namespace Dockland.Controllers
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="env"></param>
        /// <param name="containerId"></param>
        /// <param name="jsonElement">json like this: { status: "running" }</param>
        /// <returns></returns>
        [HttpPut("{env}/{containerId}")]
        public async Task<Container?> Put(string env, string containerId, [FromBody] JsonElement jsonElement)
        {
            var client = _dockerService.GetService(env);
            if (client == null)
                return null;

            var status = jsonElement.GetProperty("status").GetString();

            if (status == "running")
                await client.Containers.StartContainerAsync(containerId, new ContainerStartParameters());
            if (status == "exited")
                await client.Containers.StopContainerAsync(containerId, new ContainerStopParameters());

            var containersRespose = await _dockerService.GetContainerAsync(env, containerId);
            return containersRespose?.ToContainer();
        }
    }
 }
