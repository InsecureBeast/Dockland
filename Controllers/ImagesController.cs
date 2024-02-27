using Microsoft.AspNetCore.Mvc;
using Docker.DotNet.Models;
using Dockland.Services;
using Dockland.Utils;

namespace Dockland.Controllers
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
            var imagesResponse = await _dockerService.GetImagesAsync(env);
            if (imagesResponse == null)
                return Enumerable.Empty<ImagesListResponse>();

            return imagesResponse.FilterImagesAsync(stack);
        }

        [HttpDelete("{env}/{imageId}")]
        public async Task<bool> Delete(string env, string imageId)
        {
            var client = _dockerService.GetService(env);
            if (client == null)
                return false;

            var imagesResponse = await _dockerService.GetImagesAsync(env);
            if (imagesResponse == null)
                return false;

            // TODO params from client
            var removeParameters = new ImageDeleteParameters
            {
                Force = true,
                NoPrune = true
            };

            await client.Images.DeleteImageAsync(imageId, removeParameters);
            return true;
        }
    }
}
