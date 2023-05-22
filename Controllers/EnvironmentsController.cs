using Docker.DotNet.Models;
using Dockland.DataModels;
using Dockland.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dockland.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnvironmentsController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;
        private readonly IDockerService _dockerService;

        public EnvironmentsController(IDatabaseService databaseService, IDockerService dockerService) 
        {
            _databaseService = databaseService;
            _dockerService = dockerService;
        }

        [HttpGet]
        public IEnumerable<EnvironmentData> Get()
        {
            var environments = _databaseService.GetAll();
            return environments;
        }

        [HttpGet("{name}")]
        public EnvironmentData? Get(string name)
        {
            var environment = _databaseService.Get(name);
            return environment;
        }

        [HttpPut]
        public bool Put(EnvironmentData data)
        {
            var uri = Uri.IsWellFormedUriString(data.Url, UriKind.Absolute);
            if (!uri)
                return false;
            
            _databaseService.Set(data);
            _dockerService.RegisterService(data.Name, data.Url);
            return true;
        }

        [HttpDelete("{name}")]
        public bool Delete(string name)
        {
            return _databaseService.Delete(name);
        }
    }
}
