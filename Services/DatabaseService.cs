using Dockland.DataModels;

namespace Dockland.Services
{
    public interface IDatabaseService : IDisposable
    {
        bool Set(EnvironmentData data);
        EnvironmentData? Get(string key);
        IEnumerable<EnvironmentData> GetAll();
        bool Delete(string name);
        EnvironmentData? Find(string name);
    }
}
