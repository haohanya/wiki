# MacOS 环境配置

## Docker 构建 Arm 镜像

新建并启动builder实例

```shell
docker buildx create --use --name m1_builder
docker buildx inspect --bootstrap
```

构建

```shell
docker buildx build --platform linux/arm64 --load -t tfl-back:v1 .
```

- `--platform` 指定 arm64 位架构
- `--load` 在本地使用 也可以使用 `--push` 推送到镜像仓库
- `-t` 指定 name:tag

运行

```shell
 docker run -d --name tfl-back -p 18081:8081 tfl-back:v1
```


## arm JDK

```text
azul/zulu-openjdk-alpine:17.0.4-17.36.15-arm64
```


## arm Dockerfile

```dockerfile
FROM azul/zulu-openjdk-alpine:17.0.4-17.36.15-arm64

WORKDIR application

EXPOSE 8081

ARG JAR_FILE=application.jar
COPY ${JAR_FILE} application.jar

ENV JVM_OPTS="" \
    TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

ENTRYPOINT java ${JVM_OPTS} -jar application.jar -Djava.security.egd=file:/dev/./urandom
```

## Macos 动态切换JDK版本

## 1、配置环境变量

```shell
# 编辑配置文件
> vim ~/.zshrc

# 编辑内容
export JAVA_USE_HOME="~/usejdk/Contents/Home"
export JAVA_HOME=$JAVA_USE_HOME
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
alias jdk="~/useJdk.sh"
# 编辑内容 end

# 刷新配置
> source ~/.zshrc
```

- `JAVA_USE_HOME` 此路径是存放软链接的路径，`usejdk` 可以自定义，后续使用时保持一致即可
- `alias jdk` 的值是后续存储的脚本，可以自定义位置和名称


## 2、存放脚本`useJdk.sh`

```shell
#!/bin/bash

# JDK 版本, 如果没有此参数则打印出所有的jdk版本列表
jdkVersion=$1

if [ -n "$jdkVersion" ]
then
    ln -snf "/Library/Java/JavaVirtualMachines/zulu-$jdkVersion.jdk/" ~/usejdk
    java -version
else
    ls /Library/Java/JavaVirtualMachines
fi
```

> `/Library/Java/JavaVirtualMachines/zulu-$1.jdk/` 是我jdk安装路径
>
> 路径下包含了`zulu-8.jdk`、`zulu-11.jdk`、`zulu-17.jdk` 三个版本
>
> 所以我可以直接通过一个参数传进来版本

- `ln -snf` 是将jdk软链接到 `~/usejdk` 路径

## 3、赋予脚本执行权限

```shell
chmod +x ./useJdk.sh
```

## 4、切换jdk

```shell
# 查看jdk列表
jdk
# 切换jdk
jdk 8
jdk 11
jdk 17
```