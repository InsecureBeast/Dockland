
namespace Dockland.DataModels
{
    public class Stack
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public DateTime Created { get; set; }
    }

    public class StackCreationOptions
    {
        public string StackName = "";
        public GitOptions? GitOptions;
        public string? Editor;
        public string[] Params = Array.Empty<string>();
    }

    public class GitOptions
    {
        public string Url = "";
        public string? BranchName;
        public GitCredentials? Credentials;
        public bool IsSecure = true;
        public string? ComposeFilename;
        public string[]? AdditionalFiles;
    }

    public class GitCredentials
    {
        public string UserName = "";
        public string Password = "";
    }

    public class StackData
    {
        public string Name = "";
        public string ComposeCode = "";
        public string[] EnvironmentVariables = Array.Empty<string>();
    }
}
