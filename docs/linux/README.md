# 文本操作

## grep

用于搜索文件的内容

### 语法

```shell
# text: 需要搜索的文本
# file: 需要搜索的文件
grep [option] <text> <file> 
```

option可选参数如下

- `-i`忽略大小写
- `-n`显示行号
- `-v`搜索除了 `text`之外的文本行
- `-r`递归查找
- `-E`正则表达式
  - `-E text` 完全匹配
  - `-E ^text`匹配以text开头的文本行
  - `-E [tT]ext`匹配text 或 Text 的文本行

### 使用示例

```shell
grep hello /usr/local/log.log
grep -n hello /usr/local/log.log
grep -E ^hello /usr/local/log.log
```

## cat

查看文件内容

### 语法
```shell
cat [option] <file>
```

常用option：

- `-b`对非空格输出行号
- `-n`对内容输出行号

### 使用示例

```shell
cat logs.log
cat -b logs.log
cat --n logs.log
```

## tail

显示文件最后几行内容

### 语法

```shell
tail [option] <file>
```

option：

- `-n 10`显示10行

### 使用示例

```shell
tail logs.log
tail -n 100 logs.log
```

# 文件操作

## find

查找文件

### 语法

```shell
find [option] <path> [exp]
```

option：

- `-name`按照文件名称查询
- `-type`按照文件类型查询

### 使用示例

```shell
# 查询当前目录下以.log结尾的文件
find . -name *.log
# 查询当前目录下不以.log结尾的文件
find . ! -name *.log
```

# 管理进程


# 更新yum源

```shell
yum clean all
yum makecache
yum update -y
```

# 查看端口占用

```shell
netstat -lnp|grep 80
```

# 关闭进程

```shell
kill -9 18874
```

# 防火墙

## 查看防火墙状态

```shell
kill -9 18874
```


> running代表防火墙正在运行中


## 开启防火墙

```shell
systemctl start firewalld.service
```

## 重启防火墙

```shell
systemctl restart firewalld.service
```

## 查看某个端口是否放行

```shell
firewall-cmd --query-port=端口号/tcp
```

## 放行指定端口

```shell
firewall-cmd --zone=public --add-port=端口号/tcp --permanent
```

## 重新载入配置

> 修改防火墙后一定要重载配置


```shell
firewall-cmd --reload
```

# JDK 环境变量

```shell
vi /etc/profile
```

```properties
JAVA_HOME=/usr/java/jdk1.8.0_11
JRE_HOME=${JAVA_HOME}/jre
CLASSPATH=.:${JAVA_HOME}/lib:${JAVA_HOME}/lib
PATH=${JAVA_HOME}/bin:$PATH
```

```shell
source /etc/profile
```

# Java 运行脚本 platform.sh

```shell
# 程序jar包地址
APP_NAME_PLATFORM=/root/app/halo.jar
# 输出日志地址
APP_LOG_FILE_PATH=/root/app/log/halo.out

# 提示信息
usage() {
    echo "sh platform.sh [(start | stop | restart | status | log)]"
    exit 1
}

# 检查程序是否在运行
is_exist() {
    pid=`ps -ef|grep $APP_NAME_PLATFORM|grep -v grep|awk '{print $2}' `
    if [ -z "${pid}" ]
    then
        return 1
    else
        return 0
    fi
}

# 启动
start() {
    is_exist
    if [ $? -eq "0" ]
    then
        echo "${APP_NAME_PLATFORM} is already running. pid=${pid} ."
    else
        nohup java -jar $APP_NAME_PLATFORM Xms=512m -Xmx=1024m > $APP_LOG_FILE_PATH 2>&1 &
        echo "${APP_NAME_PLATFORM} 已启动."
    fi
}

# 状态
status() {
    is_exist
    if [ $? -eq "0" ]
    then
        echo "${APP_NAME_PLATFORM} 正在运行"
    else
        echo "${APP_NAME_PLATFORM} 未启动"
    fi
}

# 停止
stop() {
    is_exist
    if [ $? -eq "0" ]
    then
        kill -9 $pid
        echo "${APP_NAME_PLATFORM} 已停止."
    else
        echo "${APP_NAME_PLATFORM} 已停止"
    fi
}

# 查看日志
log() {
    is_exist
    if [ $? -eq "0" ]
    then
        tail -f $APP_LOG_FILE_PATH
    else
        echo "${APP_NAME_PLATFORM} 未启动"
    fi
}

# 部署项目
deploy() {
    stop
    start
}

# 重启
restart() {
    stop
    start
}

# 根据输入参数,选择执行对应方法,不输入则执行使用说明
case "$1" in
"start") start
;;
"stop") stop
;;
"status") status
;;
"restart") restart
;;
"deploy") deploy
;;
"log") log
;;
*) usage
;;
esac
```

# 简单启动jar

```shell
java -jar xxx.jar
```

## 后台启动

```shell
nohup java -jar xxx.jar Xms=512m -Xmx=1024m > xxx.out 2>&1 &
```

## 查看日志

```shell
tail -f xxx.out
```


