﻿using DockerW.DataModels;
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
            var param = new ImagesListParameters
            {
                All = true,
                Digests = true
            };

            var client = _dockerService.GetService(env);
            if (client == null)
                return images;

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

            return images;
        }
    }
}
