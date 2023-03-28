using Docker.DotNet;

namespace DockerW.Services
{
    public interface IDockerService
    {
        IDockerClient GetService(string name);
        void RegisterService(string name, string? url);
    }

    class DockerService : IDockerService
    {
        private readonly Dictionary<string, IDockerClient> _dockerServices = new Dictionary<string, IDockerClient>();

        public DockerService()
        {
            //Временно, пока не реализована регистрация окружений
            RegisterService("pilot-saturn", "http://10.128.2.20:2375");
        }

        public void RegisterService(string name, string? url)
        {
            if (_dockerServices.ContainsKey(name))
                return;
            
            IDockerClient client = string.IsNullOrEmpty(url) 
                ? new DockerClientConfiguration().CreateClient() 
                : new DockerClientConfiguration(new Uri(url)).CreateClient();

            _dockerServices.Add(name, client);
        }

        public IDockerClient GetService(string name)
        {
            if (!_dockerServices.ContainsKey(name))
                throw new InvalidOperationException("Service doen't exists. Please register service first.");
            
            return _dockerServices[name];
        }
    }
}
