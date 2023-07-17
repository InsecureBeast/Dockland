using System;
using Dockland.Utils;
using LibGit2Sharp;

namespace Dockland.Services
{
    public interface IGitService
    {
        void Clone(CloneOptions options);
    }

    public class CloneOptions
    {
        public string Url { get; set; }
        public string DirectoryPath { get; set; }
        public string BranchName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsSecure { get; set; }
    }

    public class GitService: IGitService
    {
        
        public GitService() { }

        public void Clone(CloneOptions options)
        {
            var opts = new LibGit2Sharp.CloneOptions() 
            { 
                BranchName = options.BranchName,
                CredentialsProvider = (_url, _user, _cred) => CreateUsernamePasswordCredentials(options.UserName, options.Password, options.IsSecure)
            };

            var clonedRepoPath = Repository.Clone(options.Url, options.DirectoryPath, opts);
            using (var repository = new Repository(clonedRepoPath))
            {
                // todo find all file (docker-compose.yaml or dickerfile)
            }
        }

        private Credentials CreateUsernamePasswordCredentials(string user, string pass, bool secure)
        {
            if (secure)
            {
                return new SecureUsernamePasswordCredentials
                {
                    Username = user,
                    Password = SecureUtils.StringToSecureString(pass),
                };
            }

            return new UsernamePasswordCredentials
            {
                Username = user,
                Password = pass,
            };
        }
    }
}
