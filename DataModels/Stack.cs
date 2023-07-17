using Dockland.Services;

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
        public GitOptions? GitOptions;
        public string? Editor;
        public string[]? Params;
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
}
