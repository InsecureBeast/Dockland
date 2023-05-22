using Dockland.DataModels;
using LiteDB;

namespace Dockland.Services
{
    public class LiteDatabaseService : IDatabaseService
    {
        private readonly LiteDatabase _db;

        public LiteDatabaseService(string dbPath)
        {
            _db = new LiteDatabase(Path.Combine(dbPath, "data.dlndb"));
        }

        public bool Delete(string name)
        {
            var count = GetEnvironmentCollection().DeleteMany(Query.EQ("Name", name));
            return count > 0;
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        public EnvironmentData? Get(string key)
        {
            // Get environment collection
            var col = GetEnvironmentCollection();
            var results = col.Find(x => x.Name == key);
            return results.FirstOrDefault();
        }

        public IEnumerable<EnvironmentData> GetAll()
        {
            return GetEnvironmentCollection().FindAll();
        }

        public void Set(EnvironmentData data)
        {
            var col = GetEnvironmentCollection();
            // Create unique index in Name field
            col.EnsureIndex(x => x.Name, true);
            // Insert new customer document (Id will be auto-incremented)
            col.Insert(data);
        }

        private ILiteCollection<EnvironmentData> GetEnvironmentCollection()
        {
            return _db.GetCollection<EnvironmentData>("EnvironmentData");
        }
    }
}
