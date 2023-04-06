# Shell

## 变量

```shell
## 定义变量
key="value"
## 使用变量
echo $key

## 只读变量
name="a"
readonly name

## 删除变量
unset name

## 数组
array_name=(val1 val2 val3)
## 使用数组
echo array_name[0]
## 给数组赋值
array_name[0]=val
## 获取数组下所有的元素
echo array_name[@]
```

## 参数传递

```shell
## test.sh 文件
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

## 运算符

### 算术运算符

- `+` 相加 `expr $a + $b`
- `-`
- `*` `expr $a \* $b`
- `/`
- `=`
- `==` `[ $a == $b ]`
- `!=` `[ $a != $b ]`

### 关系运算符

- `-eq` 比较是否相等 `[ $a -eq $b ]`
- `-ne` 比较是否不相等 `[ $a -ne $b ]`
- `-gt` a是否大于b `[ $a -gt $b ]`
- `-lt` a是否小于b `[ $a -lt $b ]`
- `-gt` a是否大于等于b `[ $a -gt $b ]`
- `-le` a是否小于等于b `[ $a -le $b ]`

### 布尔运算符

- `!` 非运算
- `-o` 或运算, 有一个表达式为 true 则返回 true
- `-a` 与运算, 两个表达式都为 true 才返回 true

### 逻辑运算符

- `&&`
- `||`

### 字符串运算符

- `=` 两个字符串是否相等 `[ $a = $b ]`
- `!=` 两个字符串是否不相等 `[ $a != $b ]`
- `-z` 字符串长度是否为0 `[ -z $a ]`
- `-n` 字符串长度是否不为0 `[ -n $a ]`
- `$` 字符串是否为空, 非空为true `[ $a ]`

## test 命令

### 数值测试

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

### 字符串测试

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

### 文件测试

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

## 流程控制

### if

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

### for

```shell
for loop in 1 2 3 4 5
do
  echo "The value is: $loop"
done
```

### while

```shell
int=1
while(( $int<=5 ))
do
  echo $int
  let "int++"
done
```

### case esac

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

## 函数

```shell
[function] name() {
  echo "这是一个函数"
}

## 调用函数
name
```


# java 运行脚本

```shell
#!/usr/bin/env bash

#操作符 start(启动)|stop(停止)|restart(重启)|status(运行状态)
OPTION=$1
#项目名称 xxx.jar|xxx.war
APP_NAME=app.jar
#运行端口号 8080
APP_PORT=8080
#运行环境 dev
APP_PROFILE=dev
# 工作目录
WORK_DIR=~/workdir

JVM_OPTS=""

usage() {
  echo "Usage [start(启动)|stop(停止)|restart(重启)|status(运行状态) xxx.jar|xxx.war(项目名称) 8080(运行端口号) dev|prod|xxx(运行环境)]"
  exit 1
}

_info() {
  pid=$(ps -ef | grep "$APP_NAME" | grep "$APP_PORT" | grep java | awk 'NR==1 {print $2}')
}

_status() {
  _info
  if [[ -n "$pid" ]]; then
    return 1
  else
    return 0
  fi
}

status() {
  if _status; then
    echo '未运行'
  else
    _info
    echo "pid=$pid app_name=$APP_NAME server_port=$APP_PORT"
  fi
}

start() {
  if _status; then
    nohup java -jar "$APP_NAME" --server.port="$APP_PORT" > log.log 2>&1 &
    _info
    echo "pid=$pid app_name=$APP_NAME server_port=$APP_PORT"
  fi
}

stop() {
  if ! _status; then
    kill -9 "$pid"
    echo "stopped pid: $pid"
  else 
    echo "Not running"
  fi
}

restart() {
  stop
  start
}

case "$OPTION" in
"start") start ;;
"stop") stop ;;
"restart") restart ;;
"status") status ;;
*) usage ;;
esac
```