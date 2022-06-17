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
