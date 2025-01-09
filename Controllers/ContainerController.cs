using Docker.DotNet.Models;
using Dockland.DataModels;
using Dockland.Services;
using Dockland.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Text;

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

            //using var reader = new StreamWriter();
            //while (!reader.EndOfStream)
            //{
            //    var line = await reader.ReadLineAsync();
            //    yield return line;
            //}

            //var progress = new Progress<string>(log => Console.WriteLine(log));
            //progress.ProgressChanged += (object? sender, string e) => 
            //{
            //    yield return e;
            //};

            //if (!watch)
            //{
            var logBuilder = new StringBuilder();
            //logBuilder.Capacity = int.MaxValue;

            var progress = new Progress<string>(log => Console.WriteLine(log));
            await client.Containers.GetContainerLogsAsync(id, parameters, cancellationToken, progress);
            return Content(logBuilder.ToString(), "text/plain");
            //}
            //else
            //{
            //var writer = Response.BodyWriter;
            //var progress = new Progress<string>(async log =>
            //{
            //    var bytes = Encoding.UTF8.GetBytes(log + Environment.NewLine);
            //    await writer.WriteAsync(bytes, cancellationToken);

            //});

            //Response.ContentType = "text/plain; charset=utf-8";
            //await client.Containers.GetContainerLogsAsync(id, parameters, cancellationToken, progress);
            //await writer.CompleteAsync();
            //return Ok();
            //}
        }

        private void Progress_ProgressChanged(object? sender, string e)
        {
            throw new NotImplementedException();
        }
    }

    class Progress : IProgress<string>
    {
        public void Report(string value)
        {
            Console.WriteLine(value);
        }
    }
}
