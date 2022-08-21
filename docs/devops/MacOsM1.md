# Docker 构建 Arm 镜像

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