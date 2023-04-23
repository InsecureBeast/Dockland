# Dockland

start doker in WSL2
```bash
 sudo dockerd  -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock --containerd=/run/containerd/containerd.sock
```


docker build -t %image% . 
docker tag %image% insecurebeast/%image%:1.0

docker login --username %user% --password %password%
docker push %docker_hub_name%/%image%:%version%