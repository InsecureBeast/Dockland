
export const TEST_ENV = "pilot-saturn";

// docker compose 
export class DockerComposeLabels {
  static PROJECT: string = "com.docker.compose.project";
  static CONFIG_HASH: string = "com.docker.compose.config-hash";
  static DEPENDS_ON: string = "com.docker.compose.depends_on";
  static CONTAINER_NUMBER: string = "com.docker.compose.container-number";
  static ONE_OFF: string = "com.docker.compose.oneoff";
  static CONFIG_FILES: string = "com.docker.compose.project.config_file";
  static WORKING_DIR: string = "com.docker.compose.project.working_dir";
  static SERVICE: string = "com.docker.compose.service";
  static VERSION: string = "com.docker.compose.version";
}