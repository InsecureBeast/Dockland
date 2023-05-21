using Dockland.Services;

namespace Dockland.Model
{
    public static class AppInitializerExtensions
    {
        public static IApplicationBuilder UseApplicationInitialization(this IApplicationBuilder builder)
        {
            var dbService = builder.ApplicationServices.GetService<IDatabaseService>();
            var dockerService = builder.ApplicationServices.GetService<IDockerService>();

            if (dbService == null || dockerService == null)
                return builder;

            var environments = dbService.GetAll();
            foreach ( var environment in environments )
            {
                dockerService.RegisterService(environment.Name, environment.Url);
            }

            return builder;
        }
    }
}
