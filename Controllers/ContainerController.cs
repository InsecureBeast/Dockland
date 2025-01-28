using Docker.DotNet.Models;
using Dockland.DataModels;
using Dockland.Services;
using Dockland.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Dockland.Controllers
{
    [Route("api/{environment}/[controller]")]
    [ApiController]
    public class ContainerController : ControllerBase
    {
        private readonly IDockerService _dockerService;

        public ContainerController(IDockerService dockerService)
        {
            _dockerService = dockerService;
        }

        [HttpGet("{id}")]
        public async Task<Container?> Get(string environment, string id)
        {
            var containerResponse = await _dockerService.GetContainerAsync(environment, id);
            return containerResponse?.ToContainer();
        }

        [HttpGet("{id}/logs")]
        public async Task<IActionResult> GetLogs(string environment, string id, [FromQuery] bool watch, CancellationToken cancellationToken)
        {
            var client = _dockerService.GetService(environment);
            if (client == null)
                return BadRequest();

            var parameters = new ContainerLogsParameters
            {
                ShowStdout = true,
                ShowStderr = true,
                Follow = watch,
                Timestamps = false
            };
            
            Response.ContentType = "text/plain";
            
            //var progress = new Progress<string>(async log => {
            //    await Response.WriteAsync(log);
            //});

            //await client.Containers.GetContainerLogsAsync(id, parameters, cancellationToken, progress);

            using var logStream = await client.Containers.GetContainerLogsAsync(id, false, parameters, cancellationToken);
            var log = await logStream.ReadOutputToEndAsync(cancellationToken);
            await Response.WriteAsync(log.stdout);

            return new EmptyResult();
        }

        private void Progress_ProgressChanged(object? sender, string e)
        {
            throw new NotImplementedException();
        }
    }
}
