```shell  
# gcc --version 或者 whereis gcc# 如果没有通过 yum install gcc 安装  
  
cd /usr/local/wget http://download.redis.io/releases/redis-6.2.7.tar.gztar

-xvf redis-6.2.7.tar.gzsudo 

ln -s /usr/local/redis-6.2.7 redis

make  

make install

redis-server --version  

vim redis.conf  

# 开启后台运行  
daemonize yes
# 设置密码  
requirepass 123456
# 安全模式,no外网可访问，yes不可访问  
protected-mode yes
# 允许访问的地址，默认是127.0.0.1  
bind 127.0.0.1
# 启动端口  
port 6379  


# 启动
redis-server ./redis.conf
# 停止  
redis-cli  shutdown  
# 测试连接  
redis-cli  -h  127.0.0.1 -p 6379

# 查看状态
ps -ef | grep redis
ps -aux | grep redis
netstat -tunple | grep 6379
lsof -i :6379
```