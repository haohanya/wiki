本次GitLab私服搭建环境版本如下

Centos 7

Docker 1.13.1

GitLab CE latest

Git 2.27.0.windows.1

建议配置：内存4g+

## GitLab社区版安装

**安装Docker**

```shell
yum install docker
```

> 安装过程中会出现选择 y/n 一路选y即可

**查看版本**

```shell
docker -v
```

> 如果出现了docker的版本信息，那么就说明安装成功 `Docker version 1.13.1, build 0be3e21/1.13.1`

**修改Docker镜像**

```shell
vi /etc/docker/daemon.json

{
  "registry-mirrors": ["阿里云镜像的地址"]
}
```

> 阿里云镜像的地址获取地址：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

**启动Docker**

```shell
# 启动 docker
systemctl start docker
# 查看 docker 状态
systemctl status docker
```

**拉取GitLab**

```shell
docker pull gitlab/gitlab-ce
```

**查看镜像**

```shell
docker images
```

> 如果出现了以下内容，则表示拉取成功了
>
> REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
> docker.io/gitlab/gitlab-ce   latest              3da89f9f05d7        4 days ago          2.09 GB

**设置环境变量**

> 在设置其他所有内容之前，先配置一个新的环境变量`$GITLAB_HOME` ，该变量指向配置，日志和数据文件将驻留的目录。

```shell
export GITLAB_HOME=/srv/gitlab
```

GitLab容器使用主机安装的卷来存储持久数据

|        本地路径       |  容器路径          | 用法                     |
| :-------------------- | :---------------- | :----------------------- |
| `$GITLAB_HOME/data`   | `/var/opt/gitlab` | 用于存储应用程序数据。   |
| `$GITLAB_HOME/logs`   | `/var/log/gitlab` | 用于存储日志。           |
| `$GITLAB_HOME/config` | `/etc/gitlab`     | 用于存储GitLab配置文件。 |

**运行GitLab**

```shell
docker run --detach \
    --publish 8443:443 --publish 8080:80 --publish 8022:22 \
    --name gitlab \
    --restart always \
    --volume $GITLAB_HOME/config:/etc/gitlab:Z \
    --volume $GITLAB_HOME/logs:/var/log/gitlab:Z \
    --volume $GITLAB_HOME/data:/var/opt/gitlab:Z \
    gitlab/gitlab-ce:latest
```

**放行端口**

我们需要放行端口，避免被防护墙拦截掉。

```shell
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload
```

> 需要放行8080、8443、8022等端口

**访问测试**

访问地址：`http://192.168.25.148:8080/`

然后我们会看到如下页面。此页面是让你初始化管理员的密码，我这里测试，设置为了`123456789`

如果是503页面的话。可能是因为内存不足。或者是GitLab还未启动完成。等一等就可以了。其他情况还未遇到。等遇到会来记录

![image-20201228211052350](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228211052350.png)

设置完毕后会进入到登陆页面

这里的账号为：`root`

密码是刚刚在上一步设置的密码

![image-20201228211215600](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228211215600.png)

## 使用式例

**创建仓库**

![image-20201228211930028](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228211930028.png)

![image-20201228212009994](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228212009994.png)

> 这里选择创建一个空白项目

![image-20201228212249952](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228212249952.png)

> 我这里创建了一个私有的仓库

![image-20201228212630657](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228212630657.png)

**创建工程**

在自己电脑中创建一个工程目录

并且在工程中创建一个`HelloWord.txt`文件

然后在git bash中执行命令

```shell
git init
git remote add origin http://192.168.25.148:8080/root/helloword.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

它会提示我们需要登陆，因为我们仓库是私有的

![image-20201228213815810](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228213815810.png)

登陆成功后，就会开始提交文件

![image-20201228213943470](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228213943470.png)

然后我们访问GitLab仓库查看

![image-20201228214005424](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201228214005424.png)

我们的HelloWord文件成功的上传到仓库中！

