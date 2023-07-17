using Microsoft.AspNetCore.Mvc;
using Dockland.DataModels;
using Dockland.Services;
using Dockland.Utils;
using Docker.DotNet.Models;
using Docker.DotNet;

namespace Dockland.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StacksController : ControllerBase
    {
        private readonly ILogger<StacksController> _logger;
        private readonly IDockerService _dockerService;
        private readonly IGitService _gitService;

        public StacksController(ILogger<StacksController> logger, IDockerService dockerService, IGitService gitService)
        {
            _logger = logger;
            _dockerService = dockerService;
            _gitService = gitService;
        }

        [HttpGet("{env}")]
        public async Task<IEnumerable<Stack>> Get(string env)
        {
            var stacks = new Dictionary<string, Stack>();
            var containersRespose = await _dockerService.GetContainersAsync(env);

            foreach (var response in containersRespose.FilterContsinersInStacks())
            {
                var stack = new Stack
                {
                    Name = response.GetStackName(),
                    Type = response.GetStackType(),
                    Created = response.Created
                };
                if (stack.Name != null)
                    stacks[stack.Name] = stack;
            }
            return stacks.Values;
        }

        [HttpDelete("{env}/{stack}")]
        public async Task<bool> Delete(string env, string stack)
        {
            var client = _dockerService.GetService(env);
            if (client == null)
                return false;

            var containersRespose = await _dockerService.GetContainersAsync(env);
            var containers = containersRespose.FilterStackContsiners(stack).ToList();
            foreach (var container in containers)
            {
                var removeParameters = new ContainerRemoveParameters();
                removeParameters.RemoveVolumes = true;
                removeParameters.Force = true;
                await client.Containers.RemoveContainerAsync(container.ID, removeParameters);
            }

            var firstContainer = containers.FirstOrDefault();
            if (firstContainer == null)
                return false;

            foreach (var mount in firstContainer.Mounts)
            {
                await client.Volumes.RemoveAsync(mount.Name, true); //TODO Force
            }
            foreach (var network in firstContainer.NetworkSettings.Networks)
            {
                await client.Networks.DeleteNetworkAsync(network.Value.NetworkID);
            }

            containers = containersRespose.FilterStackContsiners(stack).ToList();
            foreach (var container in containers)
            {
                await RemoveImagesSafe(client, container);
            }

            return true;
        }

        [HttpDelete("{env}")]
        public bool Put(string env, [FromBody] StackCreationOptions options)
        {
            var client = _dockerService.GetService(env);
            if (client == null)
                return false;

            var cloneOptions = new CloneOptions();
            cloneOptions.IsSecure = options.GitOptions.IsSecure;
            cloneOptions.BranchName = options.GitOptions.BranchName;
            cloneOptions.UserName = options.GitOptions.Credentials.UserName;
            cloneOptions.Password = options.GitOptions.Credentials.Password;
            cloneOptions.Url = options.GitOptions.Url;
            cloneOptions.DirectoryPath = "/temp!!!!!";

            _gitService.Clone(cloneOptions);
            return true;
        }

        private async Task RemoveImagesSafe(IDockerClient client, ContainerListResponse container)
        {
            try
            {
                var imageParams = new ImageDeleteParameters();
                imageParams.Force = true; //TODO Force
                await client.Images.DeleteImageAsync(container.ImageID, imageParams);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
            }
        }
    }
}
