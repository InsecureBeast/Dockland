namespace DockerW.DataModels
{
    public class DockerComposeLabels
    {
        public const string PROJECT = "com.docker.compose.project";
        public const string CONFIG_HASH = "com.docker.compose.config-hash";
        public const string DEPENDS_ON = "com.docker.compose.depends_on";
        public const string CONTAINER_NUMBER = "com.docker.compose.container-number";
        public const string ONE_OFF = "com.docker.compose.oneoff";
        public const string CONFIG_FILES = "com.docker.compose.project.config_file";
        public const string WORKING_DIR = "com.docker.compose.project.working_dir";
        public const string SERVICE = "com.docker.compose.service";
        public const string VERSION = "com.docker.compose.version";
    }
}
