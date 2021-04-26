## 防火墙

### 查看防火墙状态
``shell
firewall-cmd --state
``
> running代表防火墙正在运行中
>

### 开启防火墙

```shell
systemctl start firewalld.service
```

### 重启防火墙

```shell
systemctl restart firewalld.service
```

### 查看某个端口是否放行

```shell
firewall-cmd --query-port=端口号/tcp
```

### 放行指定端口

```shell
firewall-cmd --zone=public --add-port=端口号/tcp --permanent
```

### 重新载入配置

```shell
firewall-cmd --reload
```

## JDK 环境变量

```properties
vi /etc/profile
JAVA_HOME=/usr/java/jdk1.8.0_11
JRE_HOME=${JAVA_HOME}/jre
CLASSPATH=.:${JAVA_HOME}/lib:${JAVA_HOME}/lib
PATH=${JAVA_HOME}/bin:$PATH
```
