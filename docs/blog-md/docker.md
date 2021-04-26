# 安装Docker

## 1、使用yum命令在线安装

```powershell
yum install docker
# 遇事不决就选y
```

## 2、查看docker版本

```powershell
docker -v
```

## 3、启动与停止

> systemctl 命令是系统服务管理器指令，它是 service 和 chkconfig 两个命令组合

```powershell
# 启动 docker
systemctl start docker
# 停止 docker
systemctl stop docker
# 重启 docker
systemctl restart docker
# 查看 docker 状态
systemctl status docker
# 开机自启
systemctl enable docker
# 查看 docker 概要信息
docker info
# 查看 docker 帮助文档
docker --info
```

# Docker 镜像操作

## 1、列出镜像

```powershell
docker images
# REPOSITORY   镜像所在的仓库名称 
# TAG          镜像标签（版本号）
# IMAGE ID     镜像ID
# CREATE       镜像创建的时间（仓库中创建的时间）
# SIZE         镜像大小
```

## 2、搜索镜像

```powershell
docker search 镜像名称
# INDEX 
# NAME         仓库名称
# DESCRIPTION  镜像描述
# STARS        用户评价，反应一个镜像的受欢迎程度
# OFFICIAL     是否是官方
# AUTOMATED    自动构建，表示该镜像由Docker Hub自动构建流程创建的
```

## 3、拉取镜像

### 从Docker Hub上拉取

```powershell
docker pull centos:7
```

### ustc的镜像

```powershell
https://lug.ustc.edu.cn/wiki/mirrors/help/docker
```

### 阿里云镜像

1、进入阿里云

https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

2、得到镜像URL并修改daemon.json

3、重启daemon

```powershell
systemctl daemon-reload
```

4、重启docker服务

```powershell
systemctl restart docker
```

### 修改daemon.json

1、编辑文件

```powershell
vi /etc/docker/daemon.json
```

2、修改文件内容

```json
{
"registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]
}
```

3、重启

## 4、删除镜像

```powershell
# 删除指定镜像
docker rmi $IMAGE_ID
# 删除所有镜像
docker rmi `docker images -q`
```

# Docker容器操作

## 1、查看容器

```powershell
# 查看正在运行的容器
docker ps
# 查看运行过的容器
docker ps -a
# 查看最后一次运行的容器
docker ps -i
# 查看停止的容器
docker ps -f status=exited
```

## 2、创建与启动容器

创建容器常用的参数说明

```powershell
docker run  创建容器命令
-i          运行该容器
-t          表示容器启动后会进入其命令行。加入这两个参数后，容器创建就能登录进去。即分配一个伪终端。
--name      为创建的容器命名
-v          表示目录映射关系（前者是宿主机目录，后者是映射到宿主机上的目录），可以使用多个－v做多个目录或文件映射。注意：最好做目录映射，在宿主机上做修改，然后共享到容器上。
-d          在run后面加上-d参数则会创建一个守护式容器在后台运行（这样创建容器后不会自动登陆容器，如果只加-i-t两个参数，创建后就会自动进入容器）
-p          端口映射，前者是宿主机端口，后者是容器内的映射端口，可以使用多个-p做多个端口映射
```

### 交互式容器

创建一个交互式容器并命名为：mycentos

```powershell
docker run -it --name=mycentos centos:7 /bin/bash
```

使用exit命令 退出当前容器

### 创建守护式容器

创建一个守护式容器：如果对于一个需要长期运行的容器来说，我们可以创建一个守护式容器。命令如下（容器名称不能重复）

```powershell
docker run -id --name=mycentos2  centos:7
```

登陆守护式容器

```powershell
docker exec -it container_name(或者container_id) /bin/bash (exit退出时容器不会停止)
```

## 3、停止与启动容器

```powershell
# 停止正在运行的容器
docker stop $CONTAINER_NAME/ID
# 运行已停止的容器
docker start $CONTAINER_NAME/ID
```

## 4、文件拷贝

```powershell
# 将文件拷贝到容器内
docker cp 宿主机内要拷贝的文件或目录 容器名称:拷贝到容器目录
# 将容器内的文件拷贝出来
docker cp 容器名称:容器要拷贝出开的文件或目录 拷贝到宿主机那个目录
```

## 5、目录挂载

> 我们可以在创建容器的时候，将宿主机的目录与容器内的目录进行映射，这样我们就可以通过修改宿主机某个目录的文件从而去影响容器。
>
> 创建容器 添加-v参数 后边为 宿主机目录:容器目录
>
> 如果共享多级目录可能会出现权限不足的情况
>
> 这是因为CentOS7中的安全模块selinux把权限禁掉了，我们需要添加参数 --privileged=true 来解决挂载的目录没有权限的问题

```powershell
docker run -di -v /usr/test:/usr/test --name=mycentos centos:7
```

## 6、查看容器IP地址

```powershell
# 可以通过以下命令查看容器运行的各种数据
docker inspect container_name
# 也可以直接执行下面的命令直接输出IP地址
docker inspect --format='{{.NetworkSettings.IPAddress}}' container_name
```

## 7、删除容器

```powershell
# 删除指定容器
docker rm container_id/name
# 删除所有容器（以停止运行的）
docker rm `docker ps -a -q`
```

# 部署应用

## MySQL部署

1、拉取MySQL镜像

```powershell
docker pull mysql
```

2、创建MySQL容器

```powershell
# -p 宿主机映射端口:容器运行端口
# -e 表示添加环境变量，MYSQL_ROOT_PASSWORD 为root用户的登陆密码
docker run -di --name=jd_mysql -p 33306:3306 -e MYSQL_ROOT_PASSWORD=root mysql
```

3、进入MySQL容器

```powershell
docker exec -it jd_mysql /bin/bash
```

4、登陆MySQL

```powershell
# -u 用户名，-u后面需要打空格
# -p密码，-p后面没有空格,加了空格会再输入一遍密码
mysql -u root -proot
```

5、退出MySQL

```powershell
# 退出mysql
quit
# 退出容器
exit
```

## Tomcat部署

1、拉取Tomcat镜像

```powershell
docker pull tomcat:7-jre7
```

2、创建tomcat容器

> 创建容器用于部署单点登录系统（CAS） -p表示地址映射

```powershell
docker run -di --name=jd_tomcat -p 9100:8080 -v /usr/local/webapps:/usr/local/tomcat/webapps --privileged=true tomcat:7-jre7
```

3、访问ip:9100/cas

> 登陆测试，如果出现Invalid credentials重启.
>
> docker restart jd_tomcat

## nginx部署

1、拉取镜像

```powershell
docker pull nginx
```

2、创建容器

```powershell
docker run -di --name=mynginx -p 80:80 nginx /bin/bash
```

3、测试

无法访问需要手动启动nginx

```powershell
docker exec -it jd_nginx /bin/bash
/etc/init.d/nginx start
```

4、编辑配置文件

```powershell
# 将nginx配置文件复制出来
docker cp jd_nginx:/etc/nginx/nginx.conf  nginx.conf
# 修改nginx.conf
.......
# 将文件拷贝到容器
docker cp nginx.conf jd_nginx:/etc/nginx/nginx.conf
#重启容器
docker restart jd_nginx
```

## Redis部署

1、拉取镜像

```powershell
docker pull redis
```

2、创建容器

```powershell
docker run -di --name=jd_redis -p 6379:6379 redis
```

3、测试连接

```powershell
redis Desktop
```

# 备份与迁移

## 1、将容器保存为镜像

```powershell
docker commit jd_nginx mynginx
```

> jd_nginx：容器名称
>
> mynginx：新镜像名称

## 2、镜像备份

```powershell
docker save -o mynginx.tar mynginx
```

> -o ：输出到的文件

## 3、镜像恢复与迁移

```powershell
docker load -i mynginx.tar
```

> -i ：输入的文件
