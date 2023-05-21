using Dockland.DataModels;
using FASTER.core;

namespace Dockland.Services
{
    public interface IDatabaseService : IDisposable
    {
        void Set(EnvironmentData data);
        EnvironmentData? Get(string key);
        IEnumerable<EnvironmentData> GetAll();
        bool Delete(string name);
    }

    public class DatabaseService : IDatabaseService
    {
        private readonly FasterKV<string, EnvironmentData> _store;
        private readonly EnvironmentDataContext _context;

        public DatabaseService(string dbPath)
        {
            var log = Devices.CreateLogDevice(Path.Combine(dbPath, "hlog.log"), recoverDevice:true);
            var objlog = Devices.CreateLogDevice(Path.Combine(dbPath, "hlog.obj.log"), recoverDevice: true);
            var serializerSettings = new SerializerSettings<string, EnvironmentData>
                {
                    //keySerializer = () => new MyKeySerializer(),
                    valueSerializer = () => new EnvironmentDataSerializer()
                };

            _store = new FasterKV<string, EnvironmentData>
            (
                1L << 20,
                new LogSettings { LogDevice = log, ObjectLogDevice = objlog },
                serializerSettings: serializerSettings
            );

            _context = new EnvironmentDataContext();
        }

        public void Dispose()
        {
            _store.Dispose();
        }

        public bool Delete(string name)
        {
            using var session = _store.NewSession(new Functions());
            var status = session.Delete(name);
            return status.Found && status.IsCompleted;
        }

        public IEnumerable<EnvironmentData> GetAll()
        {
            var result = new List<EnvironmentData>();

            using var session =  _store.For(new Functions()).NewSession<Functions>();
            using var iter = session.Iterate();
            while (iter.GetNext(out var recordInfo))
                result.Add(iter.GetValue());
            return result;
        }

        public EnvironmentData Get(string key)
        {
            using var session = _store.NewSession(new Functions());
            var result = session.Read(key);
            if (result.status.Found && result.output.value.Name == key)
                return result.output.value;

            throw new KeyNotFoundException(key);
        }

        public void Set(EnvironmentData data)
        {
            using var session = _store.NewSession(new Functions());
            session.Upsert(data.Name, data);
            
        }
    }
}
