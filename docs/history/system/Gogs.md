以下文章比较乱，抽时间重新写一遍

Docker 安装 Gogs

```shell
$ docker pull gogs/gogs
# 创建本地目录，用于存储gogs的数据文件
$ mkdir -p /data/gogs
# 将容器中的`/data`目录映射到宿主机的/data/gogs目录下,-d后台运行
$ docker run -d --name=gogs -p 10022:22 -p 10080:3000 -v /data/gogs:/data gogs/gogs
# 启动gogs
$ docker start gogs
```

启动成功之后访问 `ip:10080`进行在线安装

这里我采用了MySQL8来做数据存储


第一部分为基本的数据库设置，就不做记录

第二部分应用基本设置

需要注意点

1、仓库根目录：这里存放了所有的git仓库

2、SSH 端口号：上面我们用docker将原来的ssh端口22映射到了10022，所有这里要填写10022，10080同样

有一个git，是系统用户，需要用`$ useradd git` 添加一个

出现下面这个错误是因为用户没有目录权限，需要执行以下命令，给git用户赋予权限

>  remote: error: cannot open /data/www/haohan/wiki/.git/FETCH_HEAD: Permission denied

 ```shell
# 创建目录,注意，这里是宿主机和容器映射的目录下创建的`www`目录，如果你上面映射路径是其他的，需要改为你自己的
$ mkdir -p /data/gogs/www/
$ sudo chown git: /data/gogs/www/ -R
 ```

> git：上面添加的用户

然后登入git用户环境

```shell
$ su git
# 配置ssh密钥，一路回车就可以
$ ssh-keygen -t rsa -C "pannanx@gmail.com"
# 查看公钥，这个路径在执行上面那条命令时会打印出来
$ cat /home/git/.ssh/id_rsa.pub
```

获取到公钥之后，我们进入到`用户设置 --> SSH 密钥 --> 管理 SSH 密钥增加密钥 --> 增加密钥`

然后名称随便起一个，上面打印的密钥全部贴进去

然后用git拉取一遍仓库(ssh方式)

```shell
# 这里好像会出点问题，我是用了ssh拉取了一次，然后删了http拉取了一次
$ git clone ssh://git@git.mvvm.io:10022/haohan/wiki.git
$ cd ./wiki
$ git pull
```

然后我们去配置仓库的git钩子

`仓库设置 --> 管理Git钩子 --> 钩子文本`

将以下内容全部贴进去

```shell
#!/bin/sh
# 注意，这里是容器的路径，也就是/data，开头的后面是我们在宿主机内创建的路径
export GIT_DIR=/data/www/haohan/wiki/.git
# 这里也是容器路径
cd /data/www/haohan/wiki
git pull
```

然后我们在自己电脑上面，上传一遍数据，这里上传就省略了

成功后大概长这样

```shell
remote: From http://git.mvvm.io/haohan/wiki
remote:    6d405d9..5aaddfe  master     -> origin/master
remote: Updating 6d405d9..5aaddfe
remote: Fast-forward
remote:  doc@/index.md | 2 +-
remote:  1 file changed, 1 insertion(+), 1 deletion(-)
```

然后我们去`/data/www/haohan/wiki`下面，查看提交的内容是否发生更改

如果成功更改，说明hooks已经创建成功了，接下来就是配置nginx

```conf
server {
    listen 80;
    # 这里配置你自己的域名
    server_name wiki.mvvm.io;

    location / {
    	# 这里就是上面我们一直使用的路径
        root /data/gogs/www/haohan/wiki;
        index index.html;
    }
}
```

然后我们访问配置的域名，如果查看到内容，则以切ok


gogs 创建仓库时报错：`Invalid csrf token.`

解决方案：删除cookie重新登陆

