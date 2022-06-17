# 环境备注

```shell
操作系统 CentOS 7.7 64bit
MySQL 64bit 8.0.27 Linux - Generic 
```

# 通用二进制文件方式

## 此方式安装优势

- 避免与其它依赖冲突 
- 使用编译器进行预编译后构建性能更佳

## 安装环境

### 清理 mariadb

查找是否存在 `mariadb` 

```shell
rpm -qa|grep mariadb
# ubuntu
find / -name mariadb
```

如果存在，则删除

```shell
rpm -e --nodeps mariadb-libs
# ubuntu
sudo apt-get --purge remove mariadb
```

### libaio 库

搜索 libaio 库

```shell
# yum 系统
yum search libaio
# apt 系统
apt-cache search libaio
```

如果没有 libaio 库，则需要执行安装；
如果有，则跳过下一步

```shell
# yum 系统
sudo yum install -y libaio
# apt 系统
sudo apt-get install -y libaiol
```

!> 注意：如果安装了 `libaio` 库后，还提示 `libaio.so.1` 等类似的库，直接运行 `yum install xxx` 即可，缺什么install什么

### 检查配置文件

检查 `/etc/my.cnf` 和 `/etc/mysql` 文件，如果存在则删除它们

```shell
sudo rm -rf /etc/my.cnf
sudo rm -rf /etc/mysql
```


## 下载 MySQL

MySQL各种版本下载地址：[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

- `32位` 选择：[Linux - Generic (glibc 2.12) (x86, 32-bit), Compressed TAR Archive](https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.29-linux-glibc2.12-i686.tar.xz)
- `64位` 选择：[Linux - Generic (glibc 2.12) (x86, 64-bit), Compressed TAR Archive](https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.27-linux-glibc2.12-x86_64.tar.xz)

```shell
# https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.27-linux-glibc2.12-x86_64.tar.xz
cd /usr/local/
sudo wget https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.27-linux-glibc2.12-x86_64.tar.xz
```

## 添加用户组
```shell
sudo groupadd mysql
sudo useradd -r -g mysql -s /bin/false mysql
```
## 解压文件
```shell
sudo tar xvf mysql-8.0.27-linux-glibc2.12-x86_64.tar.xz
```
## 创建符号链接
```shell
sudo ln -s /usr/local/mysql-8.0.27-linux-glibc2.12-x86_64 mysql
```
## 赋予权限
```shell
cd mysql
sudo mkdir mysql-files
sudo chmod 750 mysql-files
sudo chown -R mysql .
sudo chgrp -R mysql .
```
## 初始化 MySQL

### my.cnf（配置忽略表名大小写, 可选）

由于需要设置表名忽略大小写，所以需要在 `my.cnf` 中加入以下内容

```shell
[mysqld]
lower_case_table_names=1
```

!> 注意：如果没有 `my.cnf` 则手动在 `/etc/my.cnf` 创建一个

### initialize

!> 注意：如果选择不配置忽略表名大小写，这里的`--lower-case-table-names=1`需要去掉

```shell
sudo bin/mysqld --initialize --user=mysql --lower-case-table-names=1
```

> 初始化完成后，会打印出一个临时密码，日志如下
> 密码要记住，待会需要使用这个密码登陆mysql

```shell
2022-01-01T08:26:50.458169Z 0 [System] [MY-013169] [Server] /usr/local/mysql-8.0.27-linux-glibc2.12-x86_64/bin/mysqld (mysql ver in progress as process 12616
2022-01-01T08:26:50.473404Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-01-01T08:26:51.700329Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-01-01T08:26:53.536812Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
2022-01-01T08:26:53.536866Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
2022-01-01T08:26:53.651742Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: k+sETpaqg0Tz 
```

经测试，随机生成的密码如果包含了：“;”、“>”、“_”等符号，在登陆 MySQL时无法识别
需要在特殊符号前面加上**“\”**转义字符
## 设置 SSL 

```shell
sudo bin/mysql_ssl_rsa_setup
```

!> 如果提示 `mysql_ssl_rsa_setup: [Warning] World-writable config file '/etc/my.cnf' is ignored.` 说明 `my.cnf`读写权限太大，可以通过修改权限来解决 `sudo chmod 644 /etc/my.cnf`然后重新执行

## 设置所有权

- 将二进制文件的所有权更改为 root
- 将数据文件的所有权更改为 mysql

```shell
sudo chown -R root .
sudo chown -R mysql mysql-files
```

## 复制启动脚本到 init.d

```shell
sudo cp support-files/mysql.server /etc/init.d/mysql
```

## 设置环境变量
此方式是临时的，如果关闭就没了
```shell
export PATH=$PATH:/usr/local/mysql/bin
```
可以在配置文件中永久配置
```shell
sudo vi /etc/profile

# profile 底部添加
MYSQL_HOME=/usr/local/mysql
PATH=$PATH:$MYSQL_HOME/bin
export MYSQL_HOME
```
## 目录展示

- `bin` 			mysqld 服务器、客户端和工具集程序
- `data`			日志文件、数据库
- `docs`			info 格式的 MySQL 手册
- `include`		包含（header）文件
- `lib`			库
- `LICENSE`
- `man`			UNIX 手册页面
- `mysql-files`
- `README`
- `share`			其他支持文件，包括错误消息、示例配置文件以及用于数据库安装的 SQL 语句
- `support-files`

# 启动 MySQL
## 使用服务
```shell
sudo service mysql start
```
## 使用 init.d
```shell
sudo /etc/init.d/mysql start
```

> 如果没找到此命令，则查看上面步骤：[复制启动脚本到 init.d](#复制启动脚本到-initd)
> 
> ubuntu 中，如果启动失败，可以使用`sudo support-files/mysql.server start`启动
> 
> 第一次启动成功后，会打印如下日志，意思是将启动日志放入了此路径

```shell
Starting MySQL.Logging to '/usr/local/mysql/data/localhost.localdomain.err'.
. SUCCESS! 
```

如果出现错误，则说明没有权限，需要赋予目录权限

```shell
Starting MySQL.Logging to '/usr/local/mysql/data/VM-8-15-centos.err'.
 ERROR! The server quit without updating PID file (/usr/local/mysql/data/VM-8-15-centos.pid).
```

# 登陆 MySQL

```shell
mysql -u root -pk+sETpaqg0Tz
```

> -p：后面拼接的是上面日志打印的密码， 需要换成你自己的

!> 经测试，Ubuntu 20.x 版本中执行mysql命令会出现如下问题

```shell
./bin/mysql: error while loading shared libraries: libtinfo.so.5: cannot open shared object file: No such file or directory
```

这里如果使用 `sudo apt-get install -y libtinfo.so.5`命令提示找不到
可以通过 `ls /lib/x86_64-linux-gnu/libtinfo.so*`查找是否存在，我这里找到了如下内容

```shell
# ls /lib/x86_64-linux-gnu/libtinfo.so*
/lib/x86_64-linux-gnu/libtinfo.so.6  /lib/x86_64-linux-gnu/libtinfo.so.6.2
```

然后通过软连接方式

```shell
sudo ln -s /lib/x86_64-linux-gnu/libtinfo.so.6.2 /lib/x86_64-linux-gnu/libtinfo.so.5
```

# 自定义 root 用户密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysql2022';
```

> mysql2022：是自定义的密码

# 退出登陆

```shell
exit
```

# 停止 MySQL

## 安全停止

```shell
mysqladmin -uroot -p shutdown
```

## 使用服务

```shell
sudo service mysql stop
```

## 使用 init.d

```shell
sudo /etc/init.d/mysql stop
```

# 查看状态

## 使用服务

```shell
sudo service mysql status
```

## 使用 init.d

```shell
sudo /etc/init.d/mysql status
```

# 卸载 MySQL

## 移除符号链接

### 检查 mysql 指向位置

```shell
sudo ls -lh mysql
```

### 删除 mysql

```shell
sudo rm mysql
sudo rm -r mysql-8.0.27-linux-glibc2.12-x86_64
sudo rm /etc/init.d/mysql
```

# 密码忘记怎么办？

## 使用 --init-file 重置密码

```shell
# 创建文件并写入以下内容
cd /usr/local/mysql/mysql-files/
echo 'ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysql0102';' > mysql-init-password
# 停止mysql
/etc/init.d/mysql stop
# 启动mysql(注意：加上 --init-file)
/etc/init.d/mysql start --init-file=/usr/local/mysql/mysql-files/mysql-init-password
# 登陆mysql
# 使用旧密码、新密码登陆测试查看是否修改成功
```

## 使用 --skip-grant-tables 免密登陆

> 使用 `--skip-grant-tables` 启动mysql，不会加载授权表，这样就可以实现免密登陆，然后通过 `flush privileges`重新加载授权，这样就可以实现密码的修改
> 在使用此参数会自动启用 `--skip-networking`来禁止远程连接，所以我们修改完毕后记得正常重新启动

```shell
# 停止mysql
/etc/init.d/mysql stop
# 启动mysql
/etc/init.d/mysql start --skip-grant-tables
# 登陆mysql（密码直接回车即可）
mysql -u root -p
# 执行sql，刷新权限，如果不执行此指令，会报错`ERROR 1290 (HY000): The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement`
flush privileges;
# 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
# 然后重启mysql
/etc/init.d/mysql restart
# 使用新密码登陆测试
mysql -u root -p123456
```

## 重装

- 备份
- 卸载
- 安装

# 修改数据路径

!> 注意：在做任何对数据相关的东西时，建议先备份；由于我是测试环境，就不备份了；

## 停止 MySQL

```powershell
sudo /etc/init.d/mysql stop
```

## 创建目录

```shell
sudo mkdir -pv /data
# 将目前权限给mysql用户组
sudo chown -R mysql:mysql /data/
```

## 复制原有的数据

```shell
sudo cp -r /usr/local/mysql/data/. /data/
```

## 编辑 my.cnf

在 `[mysqld]`后面追加 `datadir=/data`

```shell
[mysqld]
lower_case_table_names=1
datadir=/data
```

## 重启并检查

```sql
# 查看数据目录是否修改为 /data
show variables like '%datadir%';
```

如果修改成功，则检查数据库是否完整，如果检查是ok的，那么可以删除旧的数据目录

```shell
sudo rm -rf /usr/local/mysql/data
```

# my.cnf 通用配置

```shell
[mysqld]
# 使用mysql账号运行
user=mysql
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=/usr/local/mysql
# 设置mysql数据库的数据的存放目录
datadir=/data
# 允许最大连接数
max_connections=1000
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=100
# 服务端使用的字符集默认为UTF8
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
#是否对sql语句大小写敏感，1表示不敏感
lower_case_table_names = 1
#MySQL连接闲置超过一定时间后(单位：秒)将会被强行关闭
#MySQL默认的wait_timeout  值为8个小时, interactive_timeout参数需要同时配置才能生效
interactive_timeout = 1800
wait_timeout = 1800
#Metadata Lock最大时长（秒）， 一般用于控制 alter操作的最大时长sine mysql5.6
#执行 DML操作时除了增加innodb事务锁外还增加Metadata Lock，其他alter（DDL）session将阻塞
lock_wait_timeout = 3600
#内部内存临时表的最大值。
#比如大数据量的group by ,order by时可能用到临时表，
#超过了这个值将写入磁盘，系统IO压力增大
tmp_table_size = 64M
max_heap_table_size = 64M
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
# 错误日志文件
log-error=/data/logs/mysqld.log
# ssl(x509)相关
# ca证书路径
ssl-ca=/data/ca.pem
# 客户端证书
ssl-cert=/data/server-cert.pem
# 客户端密钥
ssl-key=/data/server-key.pem
# 强制使用 ssl
require_secure_transport=ON
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8mb4
```

# 二进制日志（binlog）

> 启用二进制日志，需要设置 `log_bin` 和 `server_id` 
> 如果将 `big_bin` 设置为 `/data/binlogs/` 那么，二进制日志就会存储在 这个目录下的 `server1.00001` 和 `server1.00002` 等日志文件中
> 每当服务器启动或刷新日志时，或者当前日志的大小达到 `max_binlog_size`（默认1GB）时，服务器都会新建一个文件；
> 每个日志文件都会在 `server1.index` 文件中维护

## 查看是否启用二进制日志

```sql
show variables like '%log_bin%';

+---------------------------------+--------------------+
| Variable_name                   | Value              |
+---------------------------------+--------------------+
| log_bin                         | ON                 |
| log_bin_basename                | /data/binlog       |
| log_bin_index                   | /data/binlog.index |
| log_bin_trust_function_creators | OFF                |
| log_bin_use_v1_row_events       | OFF                |
| sql_log_bin                     | ON                 |
+---------------------------------+--------------------+

# 显示当前服务器所有的二进制日志
show master logs;
show binary logs;
+---------------+-----------+-----------+
| Log_name      | File_size | Encrypted |
+---------------+-----------+-----------+
| binlog.000001 |       477 | No        |
| binlog.000002 |       156 | No        |
+---------------+-----------+-----------+

# 获取当前的二进制日志位置
show master status;
+---------------+----------+--------------+------------------+-------------------+
| File          | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+---------------+----------+--------------+------------------+-------------------+
| binlog.000002 |      156 |              |                  |                   |
+---------------+----------+--------------+------------------+-------------------+
```
## 修改日志位置

> 需要先停止mysql

```shell
# 创建日志存储目录
mkdir /data/binlogs/server1
# 给mysql用户组权限
sudo chown -R mysql:mysql /data/binlogs/server1
```

### 修改my.cnf

> 在 `[mysqld]`追加第四、五行
> 
> 注意：`log_bin` 这个路径表示：日志文件存储在`/data/binlogs`目录，前缀以`server1`命名
> 
> 这样生成的文件如下
> 
> `server_id`保持唯一
> 
> `/data/binlogs`
> 
> - server1
> - server1.000001
> - server1.index


修改完毕后重启，再次执行上面的sql查看是否修改成功

```shell

[mysqld]
lower_case_table_names=1
datadir=/data
log_bin=/data/binlogs/server1
server_id=100
```

## 修改 `max_binlog_size` 

> 当日志文件达到设置的标准后，将会新建一个日志文件存储（默认1GB），所以我们可以动态的修改此值，无需重启

```sql
set @@global.max_binlog_size=536870912;
```

### 查看

```sql
select @@global.max_binlog_size;
```

## 切换到下一个日志文件

```sql
flush logs;
```

> 执行后可以使用查看日志sql查看效果

## 清理日志

### 1、设置日志过期时间

```sql
# 以秒为单位设置过期时间
set @@global.binlog_expire_logs_seconds=10000;
```

### 2、手动清除日志

#### 方式1

> 手动清除可以使用sql `purge binary logs to 'log_name';`来删除，
> 其中`log_name`需要注意
> 例如：有日志文件：server1.000001、server1.000002、server1.000003
> 如果 log_name 填入 server1.000002，那么表示，server1.000001 会被删除
> 如果 log_name 填入 server1.000003，那么表示，server1.000001、server1.000002 都会被删除
> 即：填入的会删除比自身小的日志文件，但不包含自己

#### 按照日期删除

> `purge binary logs before '2022-01-02 14:30:00';`

### 删除所有日志从头开始

```sql
reset master;
```

!> 不建议使用

## 提取日志

### 设置二进制格式

```sql
# 基于语句的复制 （SBR）
set @@global.binlog_format='STATEMENT';
# 基于行的复制（RBR）
set @@global.binlog_format='ROW';
# 基于 MIXED 格式
set @@global.binlog_format='MIXED';
```

> global 级别的修改需要断开连接重新连接

### 提取日志

```shell
mysqlbinlog /data/binlogs/server1.000001
```

> 根据时间和位置抽取：

```shell
mysqlbinlog /data/binlogs/server1.000001 \
--start-datetime="2022-01-02 15:00:00" \
--stop-datetime="2022-01-02 19:00:00" \
> binlog_extract
```

> 根据数据库提取

```shell
mysqlbinlog /data/binlogs/server1.000001 \
--database=test \
> binlog_extract
```

```shell
# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 4
#220102 19:31:31 server id 100  end_log_pos 125 CRC32 0xba41dff0        Start: binlog v 4, server v 8.0.27 created 220102 19:31:31 at startup
# Warning: this binlog is either in use or was not closed properly.
ROLLBACK/*!*/;
BINLOG '
E43RYQ9kAAAAeQAAAH0AAAABAAQAOC4wLjI3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAATjdFhEwANAAgAAAAABAAEAAAAYQAEGggAAAAICAgCAAAACgoKKioAEjQA
CigB8N9Bug==
'/*!*/;
# at 125
#220102 19:31:31 server id 100  end_log_pos 156 CRC32 0x14d6d966        Previous-GTIDs
# [empty]
# at 156
#220102 19:32:10 server id 100  end_log_pos 235 CRC32 0x0c1d9e4c        Anonymous_GTID  last_committed=0        sequence_number=1       rbr_only=no     original_committed_timestamp=1641123130966660    immediate_commit_timestamp=1641123130966660     transaction_length=309
# original_commit_timestamp=1641123130966660 (2022-01-02 19:32:10.966660 CST)
# immediate_commit_timestamp=1641123130966660 (2022-01-02 19:32:10.966660 CST)
/*!80001 SET @@session.original_commit_timestamp=1641123130966660*//*!*/;
/*!80014 SET @@session.original_server_version=80027*//*!*/;
/*!80014 SET @@session.immediate_server_version=80027*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 235
#220102 19:32:10 server id 100  end_log_pos 317 CRC32 0xf41a257f        Query   thread_id=25    exec_time=0     error_code=0
SET TIMESTAMP=1641123130/*!*/;
SET @@session.pseudo_thread_id=25/*!*/;
SET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1168113696/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C utf8mb4 *//*!*/;
SET @@session.character_set_client=255,@@session.collation_connection=255,@@session.collation_server=255/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;
BEGIN
/*!*/;
# at 317
#220102 19:32:10 server id 100  end_log_pos 434 CRC32 0x375ef53a        Query   thread_id=25    exec_time=0     error_code=0
use `test`/*!*/;
SET TIMESTAMP=1641123130/*!*/;
insert into table_1 values (2, '张三')
/*!*/;
# at 434
#220102 19:32:10 server id 100  end_log_pos 465 CRC32 0xcffe53e0        Xid = 175
COMMIT/*!*/;
# at 465
#220102 19:32:59 server id 100  end_log_pos 544 CRC32 0xd12df013        Anonymous_GTID  last_committed=1        sequence_number=2       rbr_only=yes    original_committed_timestamp=1641123179339229    immediate_commit_timestamp=1641123179339229     transaction_length=317
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
# original_commit_timestamp=1641123179339229 (2022-01-02 19:32:59.339229 CST)
# immediate_commit_timestamp=1641123179339229 (2022-01-02 19:32:59.339229 CST)
/*!80001 SET @@session.original_commit_timestamp=1641123179339229*//*!*/;
/*!80014 SET @@session.original_server_version=80027*//*!*/;
/*!80014 SET @@session.immediate_server_version=80027*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 544
#220102 19:32:59 server id 100  end_log_pos 628 CRC32 0x06cd606a        Query   thread_id=26    exec_time=0     error_code=0
SET TIMESTAMP=1641123179/*!*/;
BEGIN
/*!*/;
# at 628
#220102 19:32:59 server id 100  end_log_pos 689 CRC32 0xd823f6d4        Table_map: `test`.`table_1` mapped to number 164
# at 689
#220102 19:32:59 server id 100  end_log_pos 751 CRC32 0x00f5fa0a        Update_rows: table id 164 flags: STMT_END_F

BINLOG '
a43RYRNkAAAAPQAAALECAAAAAKQAAAAAAAEABHRlc3QAB3RhYmxlXzEAAgMPAvwDAgEBAAID/P8A
1PYj2A==
a43RYR9kAAAAPgAAAO8CAAAAAKQAAAAAAAEAAgAC//8AAgAAAAYA5byg5LiJAAIAAAAGAOi1teS/
oQr69QA=
'/*!*/;
# at 751
#220102 19:32:59 server id 100  end_log_pos 782 CRC32 0x75c1558f        Xid = 185
COMMIT/*!*/;
# at 782
#220102 19:33:24 server id 100  end_log_pos 861 CRC32 0xa3f54f52        Anonymous_GTID  last_committed=2        sequence_number=3       rbr_only=no     original_committed_timestamp=1641123204180632    immediate_commit_timestamp=1641123204180632     transaction_length=334
# original_commit_timestamp=1641123204180632 (2022-01-02 19:33:24.180632 CST)
# immediate_commit_timestamp=1641123204180632 (2022-01-02 19:33:24.180632 CST)
/*!80001 SET @@session.original_commit_timestamp=1641123204180632*//*!*/;
/*!80014 SET @@session.original_server_version=80027*//*!*/;
/*!80014 SET @@session.immediate_server_version=80027*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 861
#220102 19:33:24 server id 100  end_log_pos 952 CRC32 0x72a8370a        Query   thread_id=27    exec_time=0     error_code=0
SET TIMESTAMP=1641123204/*!*/;
BEGIN
/*!*/;
# at 952
#220102 19:33:24 server id 100  end_log_pos 1085 CRC32 0xe89627c1       Query   thread_id=27    exec_time=0     error_code=0
SET TIMESTAMP=1641123204/*!*/;
update table_1 set name = '韩信' where id = 2
/*!*/;
# at 1085
#220102 19:33:24 server id 100  end_log_pos 1116 CRC32 0xafc6ecf9       Xid = 194
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
```

> `# at 1540`后面的数字表示二进制文件中事件的起始位置（文件偏移量）
> 
> 第二行包含了语句在服务器上启用的时间戳，时间戳后面跟随了`server id`、`end_log_pos`、`thread_id`、`exec_time`、`error_code`

- `server id` 产生该事件的服务器的 server_id值（就在上面设置的那个server id）
- `end_log_pos` 下一个事件的开始位置
- `exec_time` 在住服务器上，它代表执行事件的事件；在从服务器上，它代表服务器的最终执行时间与主服务器的开始执行时间之间的差值，这个差值可以做为备份相对于主服务器滞后多少的指标
- `error_code` 代表执行事件的结果；0表示没有错误发生

# 使用X509设置加密连接

## 查看SSL状态

```sql
show status like 'Ssl_cipher';

+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| Ssl_cipher    |       |
+---------------+-------+
```

> 如果未设置ssl，则Ssl_cipher是空白的

所有与SSL（X590）相关的文件`ca.pem、server-cert.pem、server-key.pem、client-cert.pem、client-key.pem`都由mysql在安装过程中创建并保存在数据目录下

服务端需要用到 `ca.pem、server-cert.pem、server-key.pem` 

客户端需要用到 `client-cert.pem、client-key.pem`才能连接到 mysql服务端

## 服务端配置

### 配置my.cnf

> 从第7行开始，以 `ssl-`开头的配置

```shell
[mysqld]
lower_case_table_names=1
datadir=/data
log_bin=/data/binlogs/server1
server_id=100

ssl-ca=/data/ca.pem
ssl-cert=/data/server-cert.pem
ssl-key=/data/server-key.pem
```

### 重启

```shell
/etc/init.d/mysql restart
```

## 客户端配置

客户端需要用到 `client-cert.pem、client-key.pem`，所以我们需要先下载出来

然后使用ssl连接mysql

```shell
mysql --ssl-cert=client-cert.pem --ssl-key=client-key.pem -h ip地址 -P 3306 -u admin -p123456
```

执行命令，查看是否成功使用 SSL

```sql
mysql> show status like 'ssl_cipher';
+---------------+-----------------------------+
| Variable_name | Value                       |
+---------------+-----------------------------+
| Ssl_cipher    | ECDHE-RSA-AES128-GCM-SHA256 |
+---------------+-----------------------------+
```

## 设置强制使用 x509 连接

```sql
alter user `admin`@'%' require x509;
```

此方式设置admin用户强制使用ssl连接

还可以在my.cnf中配置
`require_secure_transport=ON`来设置强制使用ssl

或者在运行时动态配置
`SETPERSIST require_secure_transport=ON;`

### 测试非ssl连接

说明配置生效了

```shell
mysql -h ip地址 -P 3306 -u admin -p123456

mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 1045 (28000): Access denied for user 'admin'@'ip地址' (using password: YES)
```

#### 工具连接测试

以下是以 `navicat`工具测试
在ssl选项中分别配置进入密钥和证书即可

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2478181/1641133745691-381d4259-caf7-4034-93dc-a265255beef4.png#clientId=ua0138f1d-3fa7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=153&id=ueb919fae&margin=%5Bobject%20Object%5D&name=image.png&originHeight=306&originWidth=585&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14282&status=done&style=none&taskId=u44fbc00b-3aaa-400e-ae7e-96fa08b62e5&title=&width=292.5)

# 备份

## 使用 mysqldump 备份

### 格式

```shell
# mysqldump [options] 
# --user <username> or -u <username>
# --password <password> or -p<password>
```

### 示例

```powershell
# 整库备份
mysqldump -u root -pmysql2022 --all-databases > alldump.sql
# 时间点恢复
mysqldump -u root -p123456 --databases test --single-transaction --master-data > master-dump.sql
# 备份指定表
mysqldump -u root -p123456 --databases test --tables table_1 > table_1-dump.sql
# 忽略表
mysqldump -u root -p123456 --databases test --ignore-table=test.table_1 > ignore-table-dump.sql
# 指定行(假设备份test数据库中 table_1表 id大于2的 10条 数据)
mysqldump -u root -p123456 --databases test --tables table_1 --where="id > 2 limit 10" > where-dump.sql
# 远程备份: [] 包裹的是可选的，作用是使用ssl，如果没有启用可以不加
mysqldump --all-databases --routines --events --triggers -h <IP地址> -P 3306 -u <用户名> -p<密码> [--ssl-cert=client-cert.pem --ssl-key=client-key.pem] > host-dump.sql
# 备份不包含数据的sql
mysqldump -u root -p123456 --databases test --tables table_1 --no-data > no-data-dump.sql
# 仅备份insert：--complete-insert 表示，在 insert sql中，加入要插入的列名
mysqldump -u root -p123456 --databases test --tables table_1 --no-create-db --no-create-info --complete-insert > insert-dump.sql
# 新数据替换
# 假设需要将数据从生产数据恢复到以有一些数据的开发服务器；将生产数据合并到开发过程中，可以使用 --reokact 选项
# 该选项将使用 replace info 语句而不是 insert 语句；
mysqldump -u root -p123456 --databases test --tables table_1 --skip-add-drop-table --no-create-info --replace > replace-dump.sql
# 二进制备份（备份始终在从服务器上进行;要获取备份时主服务器的二进制日志位置，可以使用--dump-slave; 如果从主服务器上进行二进制日志备份，需要使用--master-data）
mysqldump --all-databases -h 27.50.161.163 -P 3306 -u admin -p123456 --ssl-cert=client-cert.pem --ssl-key=client-key.pem --single-transaction --master-data > master.sql
```

> --all-databases：备份整库，如果需要备份指定数据库，则使用 `--databases test`
> 
> 此命令默认不会备份存储过程和事件，如果需要备份则需要加入以下参数；在 --all-databases 后面加入
> 
> --routines：备份存储过程
> 
> --events：备份事件
> 
> --single-transaction：此参数将事务隔离模式更改为 `REPEATABLE READ`模式，并执行 `START TRANSACTION`来提供一致的备份；适用于 InnoDB 之类的事务表，因为它在`START TRANSACTION`执行时可以保存数据库的一致状态而不阻塞任何应用程序
> 
> --master-data：选择将服务器的二进制日志的位置输出到 master-dump.sql 文件，如果 --master-data=2，他将打印注释，他也使用 `FLUSH TABLES WITH READ LOCK`语句来获取二进制日志的快照

## 使用 mysqlpump 备份

```shell
# 并行处理 --default-parallelism：表示指定4个线程同时处理
mysqlpump -u root -p123456 --default-parallelism=4 > parallelism-pump.sql
# 给某一个库指定线程 --parallel-schemas=2:test：表示给test数据库设置两个线程处理，其他默认4个线程处理；多个数据库,分割；可以设置多个--parallel-schemas
mysqlpump -u root -p123456 --default-parallelism=4 --parallel-schemas=2:test > parallel-schemes-pump.sql
# 使用正则表达式 --include-databases：表示 备份以tes开头的数据库; 匹配符号包含：%任意多个字符；_任意一个字符
mysqlpump -u root -p123456 --include-databases=tes% > include-pump.sql
# 排除表
mysqlpump -u root -p123456 --include-databases=tes% --exclude-tables=table_1 > exclude-tables-pump.sql
# 备份用户
mysqlpump -u root -p123456 --exclude-databases=% --users > user.pump.sql

# 压缩备份-lz4
mysqlpump -u root -p123456 --compress-output=lz4 > lz4.pump.lz4
# 翻译压缩备份-lz4
lz4_decompress lz4.pump.lz4 lz4.pump.sql

# 压缩备份-zlib
mysqlpump -u root -p123456 --compress-output=zlib > zlib.pump.zlib
# 翻译压缩备份-zlib
zlib_decompress zlib.pump.zlib zlib.pump.sql
```

## 使用 mydumper 备份

mydumper 是一个类似于mysqlpump的逻辑备份工具

与mysqldump相比如下

- 并行（速度更快）和性能（避免使用复杂的字符集转换例程，因而代码总体上很高效）
- 一致性。mydumper维护所有线程快照，提供准确的主库和从库日志位置等。mysqlpump不保证一致性
- 更易于管理输出（将表个元数据文件分离，并且方便查看/解析数据）。mysqlpump将所有内容写入一个文件，这限制了加载部分数据库对象的选项
- 使用正则表达式包含和排除数据库对象
- 有用于终止阻塞备份和所有后续查询的长事务的选项

看起来很美好对吗，但是他的最大缺点就是没有在mysql中集成，需要单独安装

## 使用 binlog 备份

```shell
mysqlbinlog -h 27.50.161.163 -P 3306 -u admin -p123456 --ssl-cert=client-cert.pem --ssl-key=client-key.pem --read-from-remote-server --stop-never --to-last-log --raw server1.000001 --result-file=F:\linux\ &
```

> --read-from-remote-server：读取远程日志
> 
> --to-last-log：从 server1.000001 之后的所有二进制日志
> 
> --stop-never：保持连接，不断的拉取最新的日志

# 恢复数据

## 使用 mysqldump、mysqlpump恢复

```sql
# 暂时关掉binlog（session级别，断开连接即失效）
set SQL_LOG_BIN=0; 
source dump.sql;
```

## 使用二进制恢复

### master

在上面使用了 mysqldump --master-data 进行备份后，需要进行如下操作，获取到二进制文件以及起始位置

```shell
head -30 master.sql
```

此命令最终打印结果如下

```sql
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 27.50.161.163    Database: test
-- ------------------------------------------------------
-- Server version       8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Position to start replication or point-in-time recovery from
--

CHANGE MASTER TO MASTER_LOG_FILE='server1.000006', MASTER_LOG_POS=7830;

--
-- Current Database: `test`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `test`;
```

我们可以看到第21行：`CHANGE MASTER TO MASTER_LOG_FILE='server1.000006', MASTER_LOG_POS=7830;`

这行sql表示，本次备份的master的日志文件是从server1.000006的7830坐标开始备份，这两个值需要记住，待会要用

开始使用mysqlbinlog进行恢复

```shell
mysqlbinlog --start-position=7830 --disable-log-bin /data/binlogs/server1.000006 | mysql -u root -p123456 -f
```

> --start-position：此参数就是上面看到的 `MASTER_LOG_POS` 
> 
> --disable-log-bin：`MASTER_LOG_FILE`
> 
> -f：表示即使断开连接，mysql也会继续执行恢复操作


### slave

在上面使用了 mysqldump --dump-slave 进行备份后，需要进行如下操作，获取到二进制文件以及起始位置

和master 同理

# 日志管理

## 日志筛选器

```sql
select @@global.log_error_services;

+----------------------------------------+
| @@global.log_error_services            |
+----------------------------------------+
| log_filter_internal; log_sink_internal |
+----------------------------------------+
```

> 表示日志事件首选穿过内置的筛选器组件 log_filter_internal ，然后穿过内置的日志写入组件 log_sink_internal。组件是按照列出顺序执行的
> 
> 在 log_error_services 的值中，指定的任何可加载（非内置）组件都需要通过 `install component`进行安装

## 配置错误日志

错误日志记录由 `log_error`变量（在启动脚本使用`--log-error`）控制

如果没有给出`--log-error`，则默认的目标文件是控制台

如果没有命名文件的情况下给出了`--log-error`，则默认是目标文件是一个在数据目录中名为`host_name.err`的文件

如果`--log-error`被制定来命名一个文件，默认的目标文件就是该文件（如果文件没有后缀，则自动添加一个`.err`后缀）如果没有用一个绝对路径来指定别的位置，那么这个文件就位于数据目录下

系统变量 `log_error_verbsity`控制着服务器将错误、警告和注释信息记录到错误日志的冗余情况。可以使用的值有如下：

- 1：只输出错误
- 2：输出错误和警告
- 3：输出错误、警告、注释（默认）

如果需要修改错误日志的位置，则需要修改`my.cnf`并重启

### 修改日志目录

#### 创建目录

```shell
sudo mkdir /data/logs
# 手动创建一个日志文件
echo "" > logs/mysqld.log
sudo chown -R mysql:mysql /data/logs
```

#### 修改my.cnf

```shell
sudo vi /etc/my.cnf

# 增加 log-error

[mysqld]
log-error=/data/logs/mysqld.log
```

#### 重启mysql

```shell
sudo /etc/init.d/mysql restart
# 查看日志
cat logs/mysqld.log
# 登陆mysql查看是否修改成功
show variables like 'log_error';
```

### 调整冗余信息

log_error_verbsity 可以动态修改，修改后无需重启mysql

```sql
set @@global.log_error_verbosity=2;

# 查看修改结果
 select @@global.log_error_verbosity;
```

系统变量 `log_error_verbsity`控制着服务器将错误、警告和注释信息记录到错误日志的冗余情况。可以使用的值有如下：

- 1：只输出错误
- 2：输出错误和警告
- 3：输出错误、警告、注释（默认）

### 轮转错误日志

当日志文件过大时，我们需要分离出多个文件

```shell
sudo mv /data/logs/mysqld.log /data/logs/mysqld.log.0
mysqladmin -u root -p123456 flush-logs

# 合并执行
sudo mv /data/logs/mysqld.log /data/logs/mysqld.log.0 && mysqladmin -u root -p123456 flush-logs
```

> 当执行第二行后，会新建一个mysqld.log文件
> 
> 在第五行，可以使用cron计划，每天定时执行


## 通用查询日志 & 慢查询日志

## 通用查询日志

修改日志文件配置

```sql
# 查看日志文件路径
select @@global.general_log_file;
# 修改日志文件路径
set @@global.general_log_file='/data/query_log/query.log';
```

> 注意：如果在修改日志文件路径时出错，那么需要将目录权限设为mysql
> 
> `sudo chown -R mysql:mysql /data/query_log/`


开启日志记录

```sql
# 查看日志是否开启（ON是开，OFF是关）
show variables like 'general_log';
# 开启日志
set global general_log=on;
```

然后查看 query.log 文件，可以看到每次查询的sql都会在这里记录

```shell
cat /data/query_log/query.log
```

如果我们将日志写入方式修改为 table

```sql
# 查看日志写入方式（文件file和、数据表table）
show variables like 'log_output';
# 更改日志写入方式
set global log_output='table';
```

那么现在查看日志的方式就是

```sql
# 查询日志信息
select * from mysql.general_log;
```

!> 注意：通用查询日志会造成巨大的日志，所以启用需谨慎

## 慢查询日志

慢查询日志包含了执行时间超过了 `long_query_time`秒（默认10秒），或者至少扫描了 `max_examined_row_limit`行（默认0）的SQL语句

修改慢查询日志的最大时间

```sql
# 查询超时时间
select @@global.long_query_time;
# 修改超时时间
set @@global.long_query_time=1;
```

修改慢查询日志的日志路径

```shell
# 创建目录 & 文件 略：/data/slow_query/slow_query.log
# 目录授权
sudo chown -R mysql:mysql /data/slow_query/
```

```sql
# 查询慢查询日志文件路径
select @@global.slow_query_log_file;
# 修改日志文件路径
set @@global.slow_query_log_file='/data/slow_query/slow_query.log';
```

刷新日志

```sql
flush logs;
```

启用慢查询日志

```sql
# 查看是否启用（0未启用1已启用）
select @@global.slow_query_log;
# 启用慢查询日志
set @@global.slow_query_log=1;
```

如果将 `log_output`设置为了table，那么将会在如下表中记录

```sql
select * from mysql.slow_log;
```

## 切换日志表

如果数据表数量过大，可以创建一个新的表来替代

```sql
drop table if exists mysql.general_log_new;
create table mysql.general_log_new like mysql.general_log;
rename table mysql.general_log to mysql.general_log_1, mysql.general_log_new to mysql.general_log;
```

# 用户相关

## 查看用户相关信息

```sql
use mysql;
select host, user, authentication_string, plugin from user;
```

## 创建用户

```sql
create user 
if not exists 
'admin'@'localhost' 
identified with mysql_native_password by '123456'
with max_queries_per_hour 500
max_updates_per_hour 100
```

> 'admin' ：用户名
> 
> 'localhost' ：仅从 loaclhost 访问，可以通过对 IP 限制：10.10.%.%；也可已给 % 让用户可以在任何主机访问
> 
> '123456' ：密码
> 
> mysql_native_password ：使用默认身份验证（可以指定其他身份验证：caching_sha2_password(8.0默认)、sha256_password、LDAP、Kerberos）
> 
> max_queries_per_hour ：用户在一小时内执行的最大查询数量为500
> 
> max_updates_per_hour ：用户可以在一小时内执行最大更新次数为100次

## 删除用户

```sql
drop user 'admin'@'localhost';
```

## 修改用户密码

```sql
# 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysql2022';
# 修改密码和身份验证方式
ALTER USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql2022';
```

> mysql_native_password ：使用默认身份验证（可以指定其他身份验证：caching_sha2_password(8.0默认)、sha256_password、LDAP、Kerberos）

## 修改用户 Host

```sql
# update 语句修改, 然后使用 flush privileges 来刷新权限即可生效；
update mysql.user set host = '%' where user = 'admin';
flush privileges;
```

> host 用来指定什么机器可以连接，如果设置为 % 则表示谁都可以连接；
> 如果设置为 `localhost`表示只有本地可以连接
> 当然，也可以指定明确的IP或者利用%模糊匹配IP

## 授予用户权限

```sql
# select 权限
grant select on mysql.* to 'remote'@'%';
# 多个权限
grant update,delete,update on mysql.* to 'remote'@'%';
# 全部权限
grant all on *.* to 'admin'@'%';
```

- select：授权范围
  - all：全部权限
  - select：查询权限
  - insert,update,delete：多个权限

mysql：给用户mysql数据库的权限，如果用 * 表示所有数据库

> *：数据库的表名，如果使用 `*` 表示所有表，如果指定明确表，多个表使用`,`分割
> 
> remote：授权给这个用户
> 
> %：授权个remote用户的%IP

##  创建一个管理员用户

> 为了避免使用 root 用户操作

```sql
create user 'admin'@'%' identified with mysql_native_password by '123456'
# all表示给最高权限（除grant指令外）
grant all on *.* to 'admin'@'%';
# 也可以手动授予grant权限
grant grant option on *.* to 'admin'@'%';
```

## 查询用户权限

```sql
show grants for 'admin'@'%';
```

## 撤销权限

```sql
revoke insert on mysql.* from 'admin'@'%';
```

## 重新加载表

> 在mysql.user 表中，如果使用create、drop等sql，mysql会自动通知刷新权限，而如果使用update、delete等sql，则不会自动通知，除非手动重启服务器或者执行以下命令进行刷新

```sql
flush privileges;
```

# information_schema

> 此数据库是由所有数据库元数据组成的视图集合


此库中的表分为两种类型的元数据

- 静态表元数据：`TABLE_SCHEMA、TABLE_NAME、TABLE_TYPE、ENGINE`
- 动态表元数据：`AUTO_INCREMENT、AVG_ROW_LENGTH、DATA_FREE`

## tables 表

> 此表存放了数据表的定义

```sql
select * from tables;
```

## columns 表

> 存放所有的列定义

```sql
select * from columns;
```

# 性能调优

# 数据类型优化

## 如何选择数据类型

### 最小的数据类型

在 MySQL 中支持的数据类型非常多，我们在选择存储的数据类型时，通常选择最小的数据类型为最优，因为这样他们占用更少的磁盘、内存和CPU缓存

例如：只需要存储 `0-200`我们可以选择使用 `tinyint unsigned`更好

### 最简单的数据类型

简单的数据类型的操作通常比复杂的数据类型使用更少的CPU周期；

例如：整型比字符串操作代价更低。因为字符集和校对规则（排序规则）让字符串比较比整形更复杂。

优先使用 MySQL 内建的数据类型，而非字符串。比如 `date``time``datatime`

如果是 IP 则应该转换为 `整型`后存储

### 避免使用 NULL

在 MySQL 中，对于 NULL 值会加大索引、索引统计和之比较的复杂度，更能难以进行优化。

并且使用 NULL 的列需要更多的存储空间，在 MySQL 中也需要进行特殊处理。

如果 NULL 列被索引时，每个索引记录需要一个额外的字节，

在MyISAM里甚至还可能导致固定大小的索引（例如只有一个整数列的索引）变成可变大小的索引。

通常我们可以使用 `NOT NULL` 或者 设置默认值 `DEFAULT`来解决此问题

注意：通常把 NULL 值改为 NOT NULL 带来的性能优化并没有太多，所以在新建表时注意即可，已有的没必要去做修改，除非非常确定这个列会导致慢SQL，或者此列使用了索引。

> 有些情况下，是需要此列为 NULL 时，是可以不做限制。没必要过度优化


## 选择具体的数据类型

### 整数类型

在 MySQL 中，整数类型有：

- `TINYINT`8位
- `SMALLINT`16位
- `MEDIUMINT`24位
- `INT`32位
- `BIGINT`64位

> 他们可以存储的值的范围从 `-1(N-1)`到 `2(N-1)`
> 
> `N`表示存储空间的位数


存储整数类型有可选的`UNSIGEND`属性，表示不允许有负值，这样可以让正数的上线提高一倍。

> 例如：`TINYINT UNSIGNED`可以存储的范围是 `0-255`；而`TINYINT`可以存储的值是 `-128 ~ 127`


有符号和无符号类型使用的存储空间是相同的，并且有相同的性能，因此可以根据实际情况选择合适的类型。

> 举个例子：商品的价格字段，就不适合负数（也不适合整数，只是例子）


整数计算一班使用 64位的 `BIGINT`整数，即使在 32位 的环境也是如此，一些聚合函数除外，它们会使用`DECIMAL`或`DOUBLE`进行计算

MySQL 可以为整数类型指定宽度，例如 `INT(11)`，但是他不会限制值的合法范围，只是规定了 MySQL 的一些交互工具用来显示字符的个数
实际存储中`INT(1)`和 `INT(20)`是一样的

### 实数类型

实数是带`有小数部分的数字

- `FLOAT`和 `DOUBLE`类型支持标准的浮点运算进行近似运算
- `DECIMAL`类型用于存储精确的小数。(也可以用来存储比`BIGINT`更大的整数)

> 浮点和DECIMAL 都支持指定精度。
> 
> 但是`DECIMAL`可以指定小数点前后允许的最大位数。
> 
> 这个会影响列的空间消耗。在 MySQL5.0以上的版本中，将数字打包保存到一个二进制字符串中（每4个字节存储9个数字）。
> 
> `FLOAT`占用4个字节
> 
> `DOUBLE`占用8个字节，相对于`FLOAT`，拥有更大的精度和范围


由于 CPU 并不支持对 `DECIMAL`的直接计算，所以在MySQL5.0以上版本中自身实现了对`DECIMAL`的高精度计算，相对于原生浮点数来说，CPU支持直接计算，所以效率会高很多
而对于 `DECIMAL`而言，需要MySQL自身计算，需要额外的空间和计算开销，所以应该尽量只在需要对小数进行精确计算时使用`DECIMAL`。

> 存储金额时，建议将金额转换为整型，将`DECIMAL`替换为`BIGINT`，只需要将存储的货币单位根据小数的位数乘以相应的倍数即可
> 
> 这样可以同时解决高精度计算问题以及`DECIMAL`计算代价高的问题


### 字符串类型

#### VARCHAR

`VARCHAR`类型用于存储可变长字符串，是最常见的一种字符串数据类型。因为它仅使用必要的空间（例如，越短的字符串使用的空间就越少），所以它比定常类型更节省空间

在 MySQL 中，也可以使用 `ROW_FORMAT=FIXED`来指定定常存储，但是这样会更浪费空间（`InnoDB`存储引擎不支持）

`VARCHAR`需要使用1-2个额外字节记录字符串的长度

如果`VARCHAR`存储的值<=255个字节，则使用一个字节表示，否则使用两个字节。

什么时候使用`VARCHAR`最合适？

- 字符串列的最大长度比平均长度大很多
- 列的更新很少，所以碎片不是问题
- 使用了像`UTF-8`这样复杂的字符集，每个字符都是用不同的字节数进行存储

#### CHAR

`CHAR`类型是定长的，当值不足所定长度时会自动填补，当存储`CHAR`值时，MySQL会自动将末尾的空格给删除；
`CHAR`更适合用于存储长度固定，或者长度相近的数据。对于经常变更的数据，也会比 `VARCHAR`更好，因为定常的`CHAR`类型不容易产生碎片。

对于非常短的列，`CHAR`比`VARCHAR`更有存储空间上的优势

> 例如：存储Y或N的值，在`CHAR`中定为`CHAR(1)`；在`VARCHAR`中定义为`VARCHAR(1)`；
> 
> 但是我们上面刚刚已经提到了，在`VARCHAR`中，会额外的增加1-2个字节记录字符串长度，所以在此例子中，`VARCHAR`始终会比 `CHAR`多一个字节

# 分组排序 获取最新一条数据

## Limit方法

```sql
SELECT * 
FROM (
  SELECT * FROM `table` ORDER BY update_time DESC LIMIT 10000
) tab 
GROUP BY tab.parent_id
```

## Max函数

```sql
SELECT * 
FROM `table` tab
	INNER JOIN (
    SELECT MAX(id) as id 
    FROM `table` 
    GROUP BY open_id
  ) itab 
	ON tab.id = itab.id
ORDER BY tab.update_time
```

# ONLY_FULL_GROUP_BY 问题

```sql
# 1、执行SQL得到一个值
select @@sql_mode;
# 2、备份此值
# 3、去掉ONLY_FULL_GROUP_BY后的值
SET GLOBAL sql_mode='去掉ONLY_FULL_GROUP_BY后的值';
```

# 乐观锁

> 以版本号为锁, 更新数据时将旧版本号作为条件, 并修改版本号
> 
> 此 version 字段可以定义为时间等其他类型数据

```sql
update `table` set `name` = 'newValue', `version` = 2 where id = 1 and version = 1
```

# SQL 片段

## 时间条件

```sql
-- 今天
select * from 表名 where to_days(时间字段名) = to_days(now());
-- 昨天
SELECT * FROM 表名 where DATE_SUB(CURDATE(), INTERVAL 1 DAY) <= date(时间字段名)
-- 近7天
SELECT * FROM 表名 where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(时间字段名)
-- 近30天
SELECT * FROM 表名 where DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(时间字段名)
-- 本月
SELECT * FROM 表名 WHERE DATE_FORMAT(时间字段名, '%Y%m') = DATE_FORMAT(CURDATE() , '%Y%m')
-- 上一月
SELECT * FROM 表名 WHERE PERIOD_DIFF(date_format(now() , '%Y%m'), date_format(时间字段名, '%Y%m')) = 1
-- 查询本季度数据
select * from 表名 where QUARTER(时间字段名) = QUARTER(now());
-- 查询上季度数据
select * from 表名 where QUARTER(时间字段名) = QUARTER(DATE_SUB(now(), interval 1 QUARTER));
-- 查询本年数据
select * from 表名 where YEAR(时间字段名) = YEAR(NOW());
-- 查询上年数据
select * from 表名 where year(时间字段名) = year(date_sub(now(), interval 1 year));
-- 查询当前这周的数据
SELECT * FROM 表名 WHERE YEARWEEK(date_format(时间字段名, '%Y-%m-%d')) = YEARWEEK(now());
-- 查询上周的数据
SELECT * FROM 表名 WHERE YEARWEEK(date_format(时间字段名, '%Y-%m-%d')) = YEARWEEK(now()) - 1;
-- 查询上个月的数据
select * from 表名 where date_format(时间字段名, '%Y-%m') = date_format(DATE_SUB(curdate(), INTERVAL 1 MONTH), '%Y-%m');
select * from 表名 where DATE_FORMAT(时间字段名, '%Y%m') = DATE_FORMAT(CURDATE(), '%Y%m') ; 
select * from 表名 where WEEKOFYEAR(FROM_UNIXTIME(时间字段名, '%y-%m-%d')) = WEEKOFYEAR(now()) 
select * from 表名 where MONTH(FROM_UNIXTIME(时间字段名, '%y-%m-%d')) = MONTH(now()) 
select * from 表名 where YEAR(FROM_UNIXTIME(时间字段名, '%y-%m-%d')) = YEAR(now()) and MONTH(FROM_UNIXTIME(时间字段名, '%y-%m-%d')) = MONTH(now()) 
select * from 表名 where 时间字段名 between 上月最后一天 and 下月第一天
-- 查询当前月份的数据
select * from 表名 where date_format(时间字段名, '%Y-%m') = date_format(now(),'%Y-%m')
```