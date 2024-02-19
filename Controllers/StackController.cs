using Dockland.DataModels;
using Dockland.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dockland.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StackController : ControllerBase
    {
        private readonly ILogger<StacksController> _logger;
        private readonly IDockerService _dockerService;
        private readonly IStackEditorService _stackEditorService;

        public StackController(ILogger<StacksController> logger, IDockerService dockerService, IStackEditorService stackEditorService)
        {
            _logger = logger;
            _dockerService = dockerService;
            _stackEditorService = stackEditorService;
        }

        [HttpPut("{env}")]
        public bool Put(string env, [FromBody] StackCreationOptions options)
        {
            var client = _dockerService.GetService(env);
            if (client == null)
                return false;

            return _stackEditorService.SetStack(options);
        }

        [HttpGet("{env}/{stack}")]
        public StackData? Get(string env, string stack)
        {
            var client = _dockerService.GetService(env);
            if (client == null)
                return null;

            return this._stackEditorService.GetStack(stack);
        }

        [HttpDelete("{env}/{stack}")]
        public bool Delete(string env, string stack)
        {
            var client = _dockerService.GetService(env);
            if (client == null)
                return false;

            return this._stackEditorService.DeleteStack(stack);
        }
    }
}
