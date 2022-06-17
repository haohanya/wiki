# Redis安装并启动

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

# Redis集群搭建

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

# Spring集成Redis
## SpringDataRedis简介

## Redis

**Redis**是一款开源的Key-Value**数据库**，运行在内存中，由ANSI C编写。企业开发通常采用Redis来实现缓存。同类的产品还有memcache 、MongoDB等。

## Jedis

Jedis是Redis官方推出的一款面向**Java**的客户端，提供了很多接口供Java语言调用。可以在Redis官网下载，当然还有一些开源爱好者提供的客户端，如Jredis、SRP等等，推荐使用Jedis。

## Spring Data Redis

Spring-data-redis是spring大家族的一部分，提供了在srping应用中通过简单的配置访问redis服务，对reids底层开发包(Jedis, JRedis, and RJC)进行了高度封装，RedisTemplate提供了redis各种操作、异常处理及序列化，支持发布订阅，并对spring 3.1 cache进行了实现。

spring-data-redis针对jedis提供了如下功能：

1、连接池自动管理，提供了一个高度封装的“RedisTemplate”类

 2、针对jedis客户端中大量api进行了归类封装,将同一类型操作封装为operation接口

 ValueOperations：简单K-V操作

 SetOperations：set类型数据操作

 ZSetOperations：zset类型数据操作

 HashOperations：针对map类型的数据操作

 ListOperations：针对list类型的数据操作

## Spring Data Redis入门小Demo

### 1、引入依赖

```xml
<!-- 缓存 -->
<dependency> 
    <groupId>redis.clients</groupId> 
    <artifactId>jedis</artifactId> 
    <version>2.8.1</version> 
</dependency> 
<dependency> 
    <groupId>org.springframework.data</groupId> 
    <artifactId>spring-data-redis</artifactId> 
    <version>1.7.2.RELEASE</version> 
</dependency>
```

### 2、创建redis-config.properties

```properties
redis.host=127.0.0.1 
redis.port=6379 
redis.pass= 
redis.database=0 
redis.maxIdle=300 
redis.maxWait=3000 
redis.testOnBorrow=true 
```

### 3、编写redis配置文件

applicationContext-redis.xml

```xml
<context:property-placeholder location="classpath*:properties/*.properties" />   
<!-- redis 相关配置 --> 
<bean id="poolConfig" class="redis.clients.jedis.JedisPoolConfig">  
 <property name="maxIdle" value="${redis.maxIdle}" />   
 <property name="maxWaitMillis" value="${redis.maxWait}" />  
 <property name="testOnBorrow" value="${redis.testOnBorrow}" />  
</bean>  
<bean id="JedisConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory" 
   p:host-name="${redis.host}" p:port="${redis.port}" p:password="${redis.pass}" p:pool-config-ref="poolConfig"/>  

<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">  
 <property name="connectionFactory" ref="JedisConnectionFactory" />  
</bean>  
```

> maxIdle ：最大空闲数
>
> maxWaitMillis:连接时的最大等待毫秒数
>
> testOnBorrow：在提取一个jedis实例时，是否提前进行验证操作；如果为true，则得到的jedis实例均是可用的；

### 4、值类型操作

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:spring/applicationContext-redis.xml")
public class TestValue {
	@Autowired
	private RedisTemplate redisTemplate;	
	@Test
	public void setValue(){
		redisTemplate.boundValueOps("name").set("zhangsan");		
	}	
	@Test
	public void getValue(){
		String str = (String) redisTemplate.boundValueOps("name").get();
		System.out.println(str);
	}	
	@Test
	public void deleteValue(){
		redisTemplate.delete("name");;
	}	
}
```

### 5、Set类型操作

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:spring/applicationContext-redis.xml")
public class TestSet {
	@Autowired
	private RedisTemplate redisTemplate;
	/**
	 * 存入值
	 */
	@Test
	public void setValue(){
		redisTemplate.boundSetOps("nameset").add("罗志祥");		
		redisTemplate.boundSetOps("nameset").add("周扬青");	
		redisTemplate.boundSetOps("nameset").add("蝴蝶姐");
	}
	/**
	 * 提取值
	 */
	@Test
	public void getValue(){
		Set members = redisTemplate.boundSetOps("nameset").members();
		System.out.println(members);
	}
    /**
	 * 删除集合中的某一个值
	 */
	@Test
	public void deleteValue(){
		redisTemplate.boundSetOps("nameset").remove("蝴蝶姐");
	}
	
	/**
	 * 删除整个集合
	 */
	@Test
	public void deleteAllValue(){
		redisTemplate.delete("nameset");
	}
}
```

### 6、List类型操作

#### 6.1、右压栈

```java
/**
 * 右压栈：后添加的对象排在后边
 */
@Test
public void testSetValue1(){		
    redisTemplate.boundListOps("namelist1").rightPush("刘备");
    redisTemplate.boundListOps("namelist1").rightPush("关羽");
    redisTemplate.boundListOps("namelist1").rightPush("张飞");		
}
/**
 * 显示右压栈集合
 */
@Test
public void testGetValue1(){
    List list = redisTemplate.boundListOps("namelist1").range(0, 10);
    System.out.println(list);
}
//运行结果：[刘备, 关羽, 张飞]
```

#### 6.2、左压栈

```java
/**
 * 左压栈：后添加的对象排在前边
 */
@Test
public void testSetValue2(){		
    redisTemplate.boundListOps("namelist2").leftPush("刘备");
    redisTemplate.boundListOps("namelist2").leftPush("关羽");
    redisTemplate.boundListOps("namelist2").leftPush("张飞");		
}
/**
 * 显示左压栈集合
 */
@Test
public void testGetValue2(){
    List list = redisTemplate.boundListOps("namelist2").range(0, 10);
    System.out.println(list);
}
//运行结果：[张飞, 关羽, 刘备]
```

#### 6.3、根据索引查询元素

```java
/**
 * 查询集合某个元素
 */
@Test
public void testSearchByIndex(){
    String s = (String) redisTemplate.boundListOps("namelist1").index(1);
    System.out.println(s);
}
```

#### 6.4、移除某个元素的值

```java
/**
 * 移除集合某个元素
 */
@Test
public void testRemoveByIndex(){
    redisTemplate.boundListOps("namelist1").remove(1, "关羽");
}
```

### 7、Hash类型操作

#### 7.1、存入值

```java
@Test
public void testSetValue(){
    redisTemplate.boundHashOps("namehash").put("a", "唐僧");
    redisTemplate.boundHashOps("namehash").put("b", "悟空");
    redisTemplate.boundHashOps("namehash").put("c", "八戒");
    redisTemplate.boundHashOps("namehash").put("d", "沙僧");
}
```

#### 7.2、提取所有的KEY

```java
@Test
public void testGetKeys(){
    Set s = redisTemplate.boundHashOps("namehash").keys();		
    System.out.println(s);		
}
//运行结果：[a, b, c, d]
```

#### 7.3、提取所有的值

```java
@Test
public void testGetValues(){
    List values = redisTemplate.boundHashOps("namehash").values();
    System.out.println(values);		
}
//运行结果：[唐僧, 悟空, 八戒, 沙僧]
```

#### 7.4、根据KEY提取值

```java
@Test
public void testGetValueByKey(){
    Object object = redisTemplate.boundHashOps("namehash").get("b");
    System.out.println(object);
}
//运行结果：悟空
```

#### 7.5、根据KEY移除值

```java
@Test
public void testRemoveValueByKey(){
    redisTemplate.boundHashOps("namehash").delete("c");
}
//运行结果：[唐僧, 悟空, 沙僧]
```

### ZSet类型操作

zset是set的升级版本，它在set的基础上增加了一格顺序属性，这一属性在添加元素 的同时可以指定，每次指定后，zset会自动重新按照新的值调整顺序。可以理解为有两列 的mysql表，一列存储value，一列存储分值。

#### 存值，指定分值

```java
@Test
public void setValue(){
    redisTemplate.boundZSetOps("namezset").add("曹操",100000);
    redisTemplate.boundZSetOps("namezset").add("孙权",0);
    redisTemplate.boundZSetOps("namezset").add("刘备",1000);
}
```

#### 查询，由低到高

```java
@Test
public void getValue(){
    Set namezset = redisTemplate.boundZSetOps("namezset").range(0,  ‐1);
    System.out.println(namezset);
}
```

#### 查询，由高到低，土豪榜前10

```java
@Test
public void tuhaobang(){
    Set namezset =  redisTemplate.boundZSetOps("namezset").reverseRange(0,9);
    System.out.println(namezset);
}
```

#### 增加分数

```java
@Test
public void addScore(){
    redisTemplate.boundZSetOps("namezset").incrementScore("孙 权",2000);
}
```

### **过期时间设置**

以值类型为例：存值时指定过期时间和时间单位

```java
@Test
public void setValue(){
    redisTemplate.boundValueOps("name").set("itcast");
    redisTemplate.boundValueOps("name").expire(10,TimeUnit.SECONDS);
}
```
