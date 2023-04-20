using Microsoft.AspNetCore.Mvc;
using Docker.DotNet.Models;
using DockerW.Services;
using DockerW.Utils;

namespace DockerW.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly ILogger<ImagesController> _logger;
        private readonly IDockerService _dockerService;

        public ImagesController(ILogger<ImagesController> logger, IDockerService dockerService)
        {
            _logger = logger;
            _dockerService = dockerService;
        }

        [HttpGet("{env}/{stack?}")]
        public async Task<IEnumerable<ImagesListResponse>> Get(string env, string? stack)
        {
            var imagesRespose = await _dockerService.GetImagesAsync(env);
            if (imagesRespose == null)
                return Enumerable.Empty<ImagesListResponse>();

            return imagesRespose.FilterImagesAsync(stack);
        }
    }
}
