using Dockland.DataModels;
using LiteDB;

namespace Dockland.Services
{
    public class LiteDatabaseService : IDatabaseService
    {
        private readonly LiteDatabase _db;

        public LiteDatabaseService(string dbPath)
        {
            if (!Directory.Exists(dbPath))
                Directory.CreateDirectory(dbPath);
            
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

        public EnvironmentData? Find(string name)
        {
            var col = GetEnvironmentCollection();
            return col.FindOne(Query.EQ("Name", name));
        }

        public EnvironmentData? Get(string id)
        {
            // Get environment collection
            var col = GetEnvironmentCollection();
            var results = col.Find(x => x.Id == id);
            return results.FirstOrDefault();
        }

        public IEnumerable<EnvironmentData> GetAll()
        {
            return GetEnvironmentCollection().FindAll();
        }

        public bool Set(EnvironmentData data)
        {
            var col = GetEnvironmentCollection();
            var existing = col.FindById(data.Id);
            if (existing != null)
                return col.Update(data);

            // Create unique index in Name field
            col.EnsureIndex(x => x.Id, true);

            // Insert new customer document (Id will be auto-incremented)
            col.Insert(data);
            return true;
        }

        private ILiteCollection<EnvironmentData> GetEnvironmentCollection()
        {
            return _db.GetCollection<EnvironmentData>("EnvironmentData");
        }
    }
}
