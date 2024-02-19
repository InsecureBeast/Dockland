using Dockland.DataModels;

namespace Dockland.Services
{
    public interface IStackEditorService
    {
        StackData? GetStack(string stackName);
        bool SetStack(StackCreationOptions options);
        bool DeleteStack(string stackName);
    }

    class StackEditorService : IStackEditorService
    {
        private readonly IStackDatabaseService _stackDatabaseService;
        private readonly IGitService _gitService;

        public StackEditorService(IStackDatabaseService stackDatabaseService, IGitService gitService)
        {
            _stackDatabaseService = stackDatabaseService;
            _gitService = gitService;
        }

        public bool DeleteStack(string stackName)
        {
            return this._stackDatabaseService.DeleteStack(stackName);
        }

        public StackData? GetStack(string stackName)
        {
            return this._stackDatabaseService.GetStack(stackName);
        }

        public bool SetStack(StackCreationOptions options)
        {
            // editor
            if (options.Editor != null)
            {
                var data = new StackData
                {
                    ComposeCode = options.Editor,
                    EnvironmentVariables = options.Params,
                    Name = options.StackName
                };
                return this._stackDatabaseService.SetStack(data);
            }

            // git
            if (options.GitOptions != null)
            {
                // TODO
                var cloneOptions = new CloneOptions
                {
                    IsSecure = options.GitOptions.IsSecure,
                    BranchName = options.GitOptions.BranchName,
                    UserName = options.GitOptions.Credentials.UserName,
                    Password = options.GitOptions.Credentials.Password,
                    Url = options.GitOptions.Url,
                    DirectoryPath = "/temp!!!!!"
                };

                _gitService.Clone(cloneOptions);
                return false;
            }
            

            return false;
        }
    }
}
