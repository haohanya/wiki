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

# 变量

```shell
# 定义变量
key="value"
# 使用变量
echo $key

# 只读变量
name="a"
readonly name

# 删除变量
unset name

# 数组
array_name=(val1 val2 val3)
# 使用数组
echo array_name[0]
# 给数组赋值
array_name[0]=val
# 获取数组下所有的元素
echo array_name[@]
```

# 参数传递

```shell
# test.sh 文件
echo "执行文件名: $0"
echo "参数1: $1"
echo "参数2: $2"
echo "参数3: $3"
```

```shell
./test.sh 1 2 3
```

- `$#` 传递到脚本的参数数量
- `$*` 将参数全部输出
- `$$` 获取当前脚本的进程ID号
- `$!` 后台运行的最后一次进程Id号
- `$@` 与 `$*` 相同, 但是会在每个参数加入引号
- `$-` 显示Shell使用的当前选项
- `$?` 显示最后命令的退出状态, 0表示没有错误, 其他任何值表明有错误

# 运算符

## 算术运算符

- `+` 相加 `expr $a + $b`
- `-`
- `*` `expr $a \* $b`
- `/`
- `=`
- `==` `[ $a == $b ]`
- `!=` `[ $a != $b ]`

## 关系运算符

- `-eq` 比较是否相等 `[ $a -eq $b ]`
- `-ne` 比较是否不相等 `[ $a -ne $b ]`
- `-gt` a是否大于b `[ $a -gt $b ]`
- `-lt` a是否小于b `[ $a -lt $b ]`
- `-gt` a是否大于等于b `[ $a -gt $b ]`
- `-le` a是否小于等于b `[ $a -le $b ]`

## 布尔运算符

- `!` 非运算
- `-o` 或运算, 有一个表达式为 true 则返回 true
- `-a` 与运算, 两个表达式都为 true 才返回 true

## 逻辑运算符

- `&&`
- `||`

## 字符串运算符

- `=` 两个字符串是否相等 `[ $a = $b ]`
- `!=` 两个字符串是否不相等 `[ $a != $b ]`
- `-z` 字符串长度是否为0 `[ -z $a ]`
- `-n` 字符串长度是否不为0 `[ -n $a ]`
- `$` 字符串是否为空, 非空为true `[ $a ]`

# test 命令

## 数值测试

```shell
num1=100
num2=200
if test $[ $num1 -eq $num2 ]
then
  echo "相等"
else 
  echo "不相等"
fi
```

## 字符串测试

```shell
num1="hello"
num2="word"
if test $[ $num1 = $num2 ]
then
  echo "相等"
else 
  echo "不相等"
fi
```

## 文件测试

- `-e` 如果文件存在则为真
- `-r` 如果文件存在且可读则为真
- `-w` 如果文件存在且可写则为真
- `-x` 如果文件存在且可执行则为真
- `-s` 如果文件存在且至少有一个字符则为真
- `-d` 如果文件存在且为目录则为真
- `-f` 如果文件存在且为普通文件则为真
- `-c` 如果文件存在且为字符型特殊文件则为真
- `-b` 如果文件存在且为块特殊文件则为真

```shell
if test -e /usr/local/app.jar
then
  echo '文件已存在!'
else
  echo '文件不存在!'
fi
```

# 流程控制

## if

```shell
if [ $a == $b ]
then
  echo "ok"
elif [ $b == $c ]
  echo "c ok"
else 
  echo "no"  
fi
```

## for

```shell
for loop in 1 2 3 4 5
do
  echo "The value is: $loop"
done
```

## while

```shell
int=1
while(( $int<=5 ))
do
  echo $int
  let "int++"
done
```

## case esac

```shell
case $num in
  1)  echo '1'
  ;;
  2)  echo '2'
  ;;
  3)  echo '3'
  ;;
  4)  echo '4'
  ;;
  *)  echo '其他'
  ;;
esac
```

# 函数

```shell
[function] name() {
  echo "这是一个函数"
}

# 调用函数
name
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


