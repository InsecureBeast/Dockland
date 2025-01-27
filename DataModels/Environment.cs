namespace Dockland.DataModels
{
    public enum EnvironmentType
    {
        Http = 0,
        Local = 1,
        Agent = 2,
    }

    public class EnvironmentData
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Url { get; set; } = string.Empty;
        public string? Tag { get; set; }
        public EnvironmentType Type { get; set; } = EnvironmentType.Http;
    }
}
