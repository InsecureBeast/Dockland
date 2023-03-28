# DockerW

start doker in WSL2
```bash
 sudo dockerd  -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock --containerd=/run/containerd/containerd.sock
```