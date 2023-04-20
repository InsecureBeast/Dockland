using Microsoft.AspNetCore.Mvc;
using DockerW.DataModels;
using DockerW.Services;
using DockerW.Utils;

namespace DockerW.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VolumesController : ControllerBase
    {
        private readonly ILogger<VolumesController> _logger;
        private readonly IDockerService _dockerService;

        public VolumesController(ILogger<VolumesController> logger, IDockerService dockerService)
        {
            _logger = logger;
            _dockerService = dockerService;
        }

        [HttpGet("{env}/{stack?}")]
        public async Task<IEnumerable<Volume>> Get(string env, string? stack)
        {
            var volumes = new List<Volume>();
            var volumesRespose = await _dockerService.GetVolumesAsync(env);
            if (volumesRespose == null)
                return volumes;

            foreach (var response in volumesRespose.FilterVolumes(stack))
            {
                var volume = response.ToVolume();
                volumes.Add(volume);
            }
            
            return volumes;
        }
    }

}
