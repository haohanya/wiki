# Docker 

https://docs.docker.com/engine/install/

```shell
rpm -qa |grep docker
yum list installed |grep docker
yum -y remove xxx 
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

sudo yum install -y yum-utils

sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

yum list docker-ce --showduplicates | sort -r

sudo systemctl start docker

sudo docker run hello-world

docker run --name mysql57 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=dQ5X4wFLkBsW3cq -d mysql:5.7
```



如果您想以非 root 用户身份运行 docker，则需要将其添加到 docker 组。

1.  如果不存在则创建 docker 组

```bash
sudo groupadd docker
```

2.  将您的用户添加到 docker 组。

```bash
sudo usermod -aG docker $USER
```

3.  登录到新`docker`组（以避免必须注销/重新登录；但如果不够，请尝试重新启动）：

```bash
newgrp docker
```

4.  检查docker是否可以在没有root的情况下运行

```bash
docker run hello-world
```

如果仍然出现错误，请重新启动

```bash
reboot
```