namespace Dockland.Model
{
    public static class DirectoryProvider
    {
        private const string VENDOR_FOLDER = "Dockland";

        public static string DatabaseFolder
        {
            get
            {
                return Path.Combine(CommonApplicationData, "database");
            }
        }

        private static string CommonApplicationData
        {
            get
            {
                return Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), VENDOR_FOLDER);
            }
        }
    }
}
