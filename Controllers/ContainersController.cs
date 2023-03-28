﻿using Docker.DotNet.Models;
using Microsoft.AspNetCore.Mvc;
using DockerW.DataModels;
using DockerW.Services;

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

        [HttpGet]
        public async Task<IEnumerable<Container>> Get(string env)
        {
            var containers = new List<Container>();
            var param = new ContainersListParameters();
            param.All = true;
            var client = _dockerService.GetService(env);
            var imagesRespose = await client.Containers.ListContainersAsync(param);

            foreach (var response in imagesRespose)
            {
                var container = new Container();
                container.Names = response.Names;
                container.Id = response.ID;
                container.Created = response.Created;
                container.State = response.State;
                container.Status = response.Status;
                container.Command = response.Command;
                container.Image = response.Image;
                container.ImageId = response.ImageID;
                container.Labels = response.Labels;
                containers.Add(container);
            }
            return containers;
        }
    }
 }
