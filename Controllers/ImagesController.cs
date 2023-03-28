using DockerW.DataModels;
using Microsoft.AspNetCore.Mvc;
using Docker.DotNet.Models;
using DockerW.Services;

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

        [HttpGet]
        public async Task<IEnumerable<Image>> Get(string env)
        {
            var images = new List<Image>();
            try
            {
                var param = new ImagesListParameters();
                param.All = true;
                param.Digests = true;
                
                var client = _dockerService.GetService(env);
                var imagesRespose = await client.Images.ListImagesAsync(param);
                
                foreach (var response in imagesRespose)
                {
                    var image = new Image();
                    image.Labels = response.Labels;
                    image.ID = response.ID;
                    image.RepoTags = response.RepoTags;
                    image.RepoDigests = response.RepoDigests;
                    image.ParentID = response.ParentID;
                    image.Containers = response.Containers;
                    image.Created = response.Created;
                    image.Size = response.Size;
                    images.Add(image);
                }

                var sysInfo = await client.System.GetSystemInfoAsync();
                var sysInfo1 = await client.System.GetVersionAsync();
            }
            catch (Exception e)
            {
                var t = e;
                throw;
            }
            

            return images;
        }
    }
}
