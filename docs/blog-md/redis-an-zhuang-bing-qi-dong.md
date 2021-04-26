## 安装gcc

```powershell
yum install gcc-c++
```

## 解压源码

```powershell
tar -zxvf redis-3.0.0.tar.gz
```

## 进入解压后的目录进行编译

```powershell
cd /usr/local/redis-3.0.0
make PREFIX=/usr/local/redis install
```

## 拷贝配置文件到安装目录下

```powershell
cd /usr/local/redis
mkdir conf
cp /usr/local/redis-3.0.0/redis.conf  /usr/local/redis/bin
```

## 运行

```powershell
bin/redis-server
```

## 后端模式运行

```powershell
修改redis.conf文件 : daemonize yes
./bin/redis-server redis.conf
```

