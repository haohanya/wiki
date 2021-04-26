## 搭建Redis-Cluster

### 搭建要求

> 需要 6 台 redis 服务器。搭建伪集群。
>
> 需要 6 个 redis 实例。
>
> 需要运行在不同的端口 7001-7006

### 准备工作

#### 1、安装gcc

```powershell
yum install gcc-c++
```

#### 2、使用yum命令安装 ruby （我们需要使用ruby脚本来实现集群搭建）

```powershell
yum install ruby
yum install rubygems
```

> 以上两步遇到选择y/N直接填y即可

#### 3、将redis源码包上传到 linux 系统 ，解压redis源码包

> tar -zxvf redis-3.0.0.tar.gz

#### 4、编译redis源码 ，进入redis源码文件夹

```powershell
cd redis-3.0.0
make
```

#### 5、创建目录/usr/local/redis-cluster目录， 安装6个redis实例，分别安装在以下目录

```powershell
mkdir /usr/local/redis-cluster
cd redis-3.0.0
make install PREFIX=/usr/local/redis-cluster/redis-1
......
make install PREFIX=/usr/local/redis-cluster/redis-6
```

#### 6、复制配置文件 将 /redis-3.0.0/redis.conf 复制到redis下的bin目录下

```powershell
cp redis.conf /usr/local/redis-cluster/redis-1/bin
......
cp redis.conf /usr/local/redis-cluster/redis-6/bin
```

### 配置集群

1、修改每个redis节点的配置文件redis.conf

> 修改运行端口为7001 （7002 7003 .....）(45行)
>
> 将cluster-enabled yes 前的注释去掉(632行)
>
> daemonize no 改为yes （43行）

```powershell
cd /usr/local/redis-cluster/
vi redis-1/bin/redis.conf
......
vi redis-6/bin/redis.conf
```

2、启动每个redis实例

```powershell
cd redis-1/bin/
./redis-server redis.conf
.......
```

3、上传redis-3.0.0.gem ，安装 ruby用于搭建redis集群的脚本。

```powershell
cd ~
cp redis-3.0.0.gem /usr/local/redis-cluster/
cd redis-3.0.0/src/
cp redis-trib.rb /usr/local/redis-cluster/
cd /usr/local/redis-cluster/
gem install redis-3.0.0.gem
```

4、使用 ruby 脚本搭建集群。

> 进入redis源码目录中的src目录 执行下面的命令

```powershell
./redis-trib.rb create --replicas 1 192.168.25.144:7001 192.168.25.144:7002 192.168.25.144:7003 192.168.25.144:7004 192.168.25.144:7005 192.168.25.144:7006
```

5、查看是否启动成功

```powershell
ps -ef | grep redis
```

### SpringDataRedis连接Redis集群

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<beans xmlns="http://www.springframework.org/schema/beans" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p" 
  xmlns:context="http://www.springframework.org/schema/context" 
  xsi:schemaLocation="http://www.springframework.org/schema/beans   
            http://www.springframework.org/schema/beans/spring-beans.xsd   
            http://www.springframework.org/schema/context   
            http://www.springframework.org/schema/context/spring-context.xsd">  
	<!-- 加载配置属性文件 -->  
<context:property-placeholder ignore-unresolvable="true" location="classpath:properties/redis-cluster-config.properties" />  
<bean id="redis-clusterConfiguration" class="org.springframework.data.redis.connection.redis-clusterConfiguration">  
	<property name="maxRedirects" value="${redis.maxRedirects}"></property>  
	<property name="clusterNodes">  
	<set>  
		<bean class="org.springframework.data.redis.connection.redis-clusterNode">  
			<constructor-arg name="host" value="${redis.host1}"></constructor-arg>  
			<constructor-arg name="port" value="${redis.port1}"></constructor-arg>  
		</bean>  
		<bean class="org.springframework.data.redis.connection.redis-clusterNode">  
			<constructor-arg name="host" value="${redis.host2}"></constructor-arg>  
			<constructor-arg name="port" value="${redis.port2}"></constructor-arg>  
		</bean>  
		<bean class="org.springframework.data.redis.connection.redis-clusterNode">  
			<constructor-arg name="host" value="${redis.host3}"></constructor-arg>  
			<constructor-arg name="port" value="${redis.port3}"></constructor-arg>  
		</bean>  
	     <bean class="org.springframework.data.redis.connection.redis-clusterNode">  
	         <constructor-arg name="host" value="${redis.host4}"></constructor-arg>  
	         <constructor-arg name="port" value="${redis.port4}"></constructor-arg>  
	      </bean>  
	      <bean class="org.springframework.data.redis.connection.redis-clusterNode">  
	         <constructor-arg name="host" value="${redis.host5}"></constructor-arg>  
	         <constructor-arg name="port" value="${redis.port5}"></constructor-arg>  
	      </bean>  
		 <bean class="org.springframework.data.redis.connection.redis-clusterNode">  
			<constructor-arg name="host" value="${redis.host6}"></constructor-arg>  
			<constructor-arg name="port" value="${redis.port6}"></constructor-arg>  
		 </bean>  
	   </set>  
	 </property>  
</bean>  
<bean id="jedisPoolConfig"   class="redis.clients.jedis.JedisPoolConfig">  
	   <property name="maxIdle" value="${redis.maxIdle}" />   
	   <property name="maxTotal" value="${redis.maxTotal}" />   
</bean>  
<bean id="jeidsConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory"  >  
		<constructor-arg ref="redis-clusterConfiguration" />  
		<constructor-arg ref="jedisPoolConfig" />  
</bean>    
<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">  
		<property name="connectionFactory" ref="jeidsConnectionFactory" />  
</bean>  
</beans>
```

redis-cluster-config.properties

```xml
redis.host1=192.168.25.140
redis.port1=7001

redis.host2=192.168.25.140
redis.port2=7002

redis.host3=192.168.25.140
redis.port3=7003

redis.host4=192.168.25.140
redis.port4=7004

redis.host5=192.168.25.140
redis.port5=7005

redis.host6=192.168.25.140
redis.port6=7006

redis.maxRedirects=3
redis.maxIdle=100
redis.maxTotal=600
```

## 模拟集群异常测试

关闭节点命令

```powershell
./redis-cli -p 端口 shutdown 
```

> 测试关闭7001 和7004, 看看会发生什么。
>
> 测试关闭7001、7002、7003 会发生什么。
