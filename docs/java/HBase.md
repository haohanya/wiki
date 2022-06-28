# 安装 HBase

## 前置条件

```shell
1、Jdk 1.8
2、CentOS 7
3、HBase 2.4.9
```

## 下载

1、访问：[https://dlcdn.apache.org/hbase/](https://dlcdn.apache.org/hbase/) 下载相应的版本，然后上传进入服务器<br />2、直链下载
```shell
cd /usr/local/
wget https://dlcdn.apache.org/hbase/2.4.9/hbase-2.4.9-bin.tar.gz
```

## 解压

```shell
tar zxvf hbase-2.4.9-bin.tar.gz
```
## 符号链接
```shell
ln -s hbase-2.4.9 hbase
```
加入符号链接后我们就可以通过 `hbase`目录进入

## 配置Jdk

这里假设你已经安装过Jdk

1、进入hbase目录
```shell
cd hbase
```
2、编辑配置文件：`conf/hbase-env.sh`
```shell
vi conf/hbase-env.sh
```
3、找到 `export JAVA_HOME`并修改为你自己的 Jdk 路径
```shell
export JAVA_HOME=/usr/local/java/jdk1.8.0_11
```
> 如果找不到 jdk 路径，可以使用 `whereis java`命令进行查找

## 启动 HBase

```shell
sh bin/start-hbase.sh
```
如果执行成功，则会在控制台输出一行内容如下
```shell
running master, logging to /usr/local/hbase/bin/../logs/hbase-root-master-localhost.localdomain.out
```

然后通过 `jps`命令，查看是否存在java进程<br />如果存在 `HMaster`则表示启动成功
```shell
[root@localhost hbase]# jps
9428 HMaster
9978 Jps
```
## 访问 HBase 控制面板

进入 `http:/127.0.0.1:16010`查看是否成功打开以下内容<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2478181/1643178401757-4f9cf18e-3104-4f6b-b5b2-475e2550c706.png#clientId=u29395970-0581-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=975&id=ue2567b1e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=975&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=74403&status=done&style=none&taskId=uc9138f76-5d44-46c0-a8e2-850ca73968a&title=&width=1920)
## 停止 HBase
停止过程可能有点久
```shell
./bin/stop-hbase.sh
```
再次使用 `jps`命令查看是否已经成功停止

## HBase 基本操作
### 连接 HBase
```shell
./bin/hbase shell
```
如果出现以下内容，则表示连接成功
```shell
hbase:001:0>
```
### 创建表
使用 `create 'test', 'cf'` 可以创建一个 `test`表 和指定 `ColumnFamily`名称
```shell
hbase:002:0> create 'test', 'cf'
Created table test
Took 1.7428 seconds                                                                                                                                                                                           
=> Hbase::Table - test
```
### 列出表
```shell
hbase:003:0> list 'test'
TABLE                                                                                                                                                                                                         
test                                                                                                                                                                                                          
1 row(s)
Took 0.0533 seconds                                                                                                                                                                                           
=> ["test"]
```
### 查看表详细信息
```shell
hbase:005:0> describe 'test'
Table test is ENABLED                                                                                                                                                                                         
test                                                                                                                                                                                                          
COLUMN FAMILIES DESCRIPTION                                                                                                                                                                                   
{NAME => 'cf', BLOOMFILTER => 'ROW', IN_MEMORY => 'false', VERSIONS => '1', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE', COMPRESSION => 'NONE', TTL => 'FOREVER', MIN_VERSIONS => '0', BLOCKC
ACHE => 'true', BLOCKSIZE => '65536', REPLICATION_SCOPE => '0'}                                                                                                                                               

1 row(s)
Quota is disabled
Took 0.2466 seconds
```
### 插入值
```shell
hbase:006:0> put 'test', 'row1', 'cf:a', 'value1'
Took 0.1723 seconds                                                                                                                                                                                           
hbase:007:0> put 'test', 'row2', 'cf:b', 'value2'
Took 0.0154 seconds                                                                                                                                                                                           
hbase:008:0> put 'test', 'row3', 'cf:c', 'value3'
Took 0.0095 seconds
```
### 扫描表数据
```shell
hbase:009:0> scan 'test'
ROW                                                  COLUMN+CELL                                                                                                                                              
 row1                                                column=cf:a, timestamp=2022-01-26T14:24:18.520, value=value1                                                                                             
 row2                                                column=cf:b, timestamp=2022-01-26T14:24:27.466, value=value2                                                                                             
 row3                                                column=cf:c, timestamp=2022-01-26T14:24:31.189, value=value3                                                                                             
3 row(s)
Took 0.0789 seconds
```
### 获取单行数据
```shell
hbase:010:0> get 'test', 'row1'
COLUMN                                               CELL                                                                                                                                                     
 cf:a                                                timestamp=2022-01-26T14:24:18.520, value=value1                                                                                                          
1 row(s)
Took 0.0145 seconds 
```
### 启用 & 禁用 表

- 禁用表使用 `disable 'test'`命令
- 启用表使用 `enable 'test'`命令

当表禁用后则无法再次操作
```shell
hbase:011:0> disable 'test'
Took 0.3864 seconds                                                                                                                                                                                           
hbase:012:0> get 'test', 'row1'
COLUMN                                               CELL                                                                                                                                                     

ERROR: Table test is disabled!

For usage try 'help "get"'

Took 0.6780 seconds                                                                                                                                                                                           
hbase:013:0> enable 'test'
Took 0.6791 seconds                                                                                                                                                                                           
hbase:014:0> get 'test', 'row1'
COLUMN                                               CELL                                                                                                                                                     
 cf:a                                                timestamp=2022-01-26T14:24:18.520, value=value1                                                                                                          
1 row(s)
Took 0.0245 seconds
```
### 删除表
在删除表之前需要禁用表
```shell
drop 'test'
```
### 退出控制台
退出 shell 控制台后，不会影响 HBase 的运行
```shell
quit
```

文档已阅读到: [https://hbase.apache.org/book.html#quickstart_pseudo](https://hbase.apache.org/book.html#quickstart_pseudo)
