using Docker.DotNet.Models;
using Microsoft.AspNetCore.Mvc;
using DockerW.DataModels;
using DockerW.Services;

namespace DockerW.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ContainersController : ControllerBase
    {
        private readonly ILogger<ImagesController> _logger;
        private readonly IDockerService _dockerService;

        public ContainersController(ILogger<ImagesController> logger, IDockerService dockerService)
        {
            _logger = logger;
            _dockerService = dockerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Container>> Get(string env)
        {
            var cobtainers = new List<Container>();
            try
            {
                var param = new ContainersListParameters();
                var client = _dockerService.GetService(env);
                var imagesRespose = await client.Containers.ListContainersAsync(param);

                foreach (var response in imagesRespose)
                {
                    var container = new Container();
                    //image.Labels = response.Labels;
                    //image.ID = response.ID;
                    //image.RepoTags = response.RepoTags;
                    //image.RepoDigests = response.RepoDigests;
                    //image.ParentID = response.ParentID;
                    //image.Containers = response.Containers;
                    //image.Created = response.Created;
                    //image.Size = response.Size;
                    cobtainers.Add(container);
                }
            }
            catch (Exception e)
            {
                var t = e;
                throw;
            }


            return cobtainers;
        }
    }
 }
