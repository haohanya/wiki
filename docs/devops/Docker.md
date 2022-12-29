https://docs.docker.com/engine/install/

```shell
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