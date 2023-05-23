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

        [HttpGet("{id}")]
        public EnvironmentData? Get(string id)
        {
            var environment = _databaseService.Get(id);
            return environment;
        }

        [HttpPut]
        public bool Put(EnvironmentData data)
        {
            var uri = Uri.IsWellFormedUriString(data.Url, UriKind.Absolute);
            if (!uri)
                return false;
            
            var updated = _databaseService.Set(data);
            _dockerService.RegisterService(data.Name, data.Url);
            return updated;
        }

        [HttpDelete("{id}")]
        public bool Delete(string id)
        {
            return _databaseService.Delete(id);
        }

        [HttpGet]
        [Route("find/name/{name}")]
        public EnvironmentData? Find(string name)
        {
            var environment = _databaseService.Find(name);
            return environment;
        }
    }
}
