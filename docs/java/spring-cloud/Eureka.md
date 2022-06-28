# Eureka

## 什么是Eureka

> 百度百科：[什么是Eureka](https://baike.baidu.com/item/Eureka/22402835?fr=aladdin)

### 问题分析

刚才的案例，user-service对外提供服务，需要对外暴漏自己的地址。user-web需要记录服务提供者的地址。将来地址出现变更，还需要及时的去更新。这在服务较少的时候不会觉得有什么，但是在大型的互联网项目中，一个项目可能差分处几十个微服务，此时如果还是人为的管理，不仅开发困难，奖励啊测试、发布上线都会有大麻烦

```
与DevOps思想违背：就是系统可以通过一组过程、方法或者是系统，提高应用发布和运维的效率，降低管理成本
```

### Eureka做什么

好比是房产中介，负责管理、记录服务提供者的信息。服务调用者就无需自己去找服务，而是把自己的需求告诉Eureka，然后Eureka把符合你要求的服务告诉你

同时，服务的提供方与Eureka之间通过“心跳”机制进行监控，当某个服务提供方出现问题，Eureka自然会把它从服务列表中剔除

这就实现了服务的自动注册、发现和状态监控

## Eureka注册中心说明

Eureka的主要功能是进行服务管理，定期检查服务状态，返回服务地址列表。

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591806137091.png)

## 入门案例

1、创建springboot项目并添加依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

2、在启动类中添加注解

```java
@SpringBootApplication
@EnableEurekaServer     //声明当前应用是eureka服务
public class EurekaServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServiceApplication.class, args);
    }
}
```

3、配置eureka

```yaml
#端口号
server:
  port: 10086
spring:
  application:
    name: eureka-server   #应用名称，会在eureka中作为服务的id标识

#配置eurkea
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
    register-with-eureka: false       #不注册自己，默认值是true（如果搭建eureka集群，需要相互之间注册）
    fetch-registry: false   #不拉取自己的服务列表
```

4、启动服务

访问：http://localhost:10086/

## 服务注册

> 注册服务，就是在服务上添加Eureka的客户端依赖，客户端代码会自动把服务注册到EurekaService中

添加依赖

```xml
<dependency>
	<groupId>tk.mybatis</groupId>
	<artifactId>mapper-spring-boot-starter</artifactId>		 
	<version>2.0.3</version>
</dependency>
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
</dependency>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<scope>runtime</scope>
</dependency>
```

1、修改启动类

```java
@SpringBootApplication
@MapperScan(basePackages = "com.cn.mapper")  //扫描mapper包，如果使用的是tb.mybatis
@EnableEurekaClient     //开启Eureka客户端发现功能
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

}
```

2、修改配置文件

```yml
#端口号
server:
  port: 9091
#数据源
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/springcloud?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
    username: root
    password: root
  application:
    name: user-service   #应用名
#添加Eureka注册的配置
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
```

3、测试

启动user-service工程

## 服务发现

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

1、修改启动类

```java
@SpringBootApplication
@EnableDiscoveryClient     //开启Eureak客户端
public class UserWebApplication {
    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

    public static void main(String[] args) {
        SpringApplication.run(UserWebApplication.class, args);
    }

}
```

2、修改配置文件

```yml
server:
  port: 8080
spring:
  application:
    name: user-web     #应用名称
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka    #eurekaSerer地址
```

3、修改处理器

```java
package com.cn.controller;

import com.cn.pojo.User;
import com.netflix.appinfo.InstanceInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/consumer")
public class ConsumerController {
    @Autowired
    private RestTemplate restTemplate;
    //DiscoveryClient的用springCloud包中的
    @Autowired(required = false)
    private DiscoveryClient discoveryClient;

    @RequestMapping("/{id}")
    public User getByid(@PathVariable("id") Long id){
        /*
        //通过http的方式实现系统之间的通讯
        String url = "http://localhost:9091/user/" + id;//这个是user-service提供的rest api风格的接口
        User user = restTemplate.getForObject(url, User.class);
        return user;
         */
        //从eurekaServer注册中心去获取user-service的实例列表
        List<ServiceInstance> instancesList = discoveryClient.getInstances("user-service");
        //因为我就一个服务，所以我就拿集合中的第一个就成
        ServiceInstance serviceInstance = instancesList.get(0);
        //服务的resutApi接口
        String url = "http://" + serviceInstance.getHost() + ":" + serviceInstance.getPort() + "/user/" + id;
        return restTemplate.getForObject(url,User.class);
    }
}
```

4、测试

## Eureak总结

三个角色

- 服务注册中心
    - Eureka的服务端应用，提供服务注册和发现功能，就是我们建立的eureka-server
- 服务提供者
    - 提供服务的应用，可以是springBoot应用，也可以是其他任意技术实现，只要对外提供的是Rest风格服务就可。就是我们建立的user-service
- 服务消费者
    - 消费者应用就是从注册中心获取服务列表，从而得知每个服务放的信息，知道去哪里调用服务，就是我们建立的user-web
   
# Eureka高可用

## 高可用的Eureka Server

我们只有一个Eureak，事实上可以搭建一个集群，形成一个高可用的Eureka注册中心

> 服务同步

多个EurekaServer之间会相互注册为服务，当服务提供者注册到EurekaServer结群中的某个节点的时候，该节点会把服务的信息同步到集群中的每个节点，从而实现数据的同步，一旦有一个节点挂掉了，那么其他的节点依然能提供服务注册和发现的功能

### 1、修改EurekaServer配置

```yml
#端口号
server:
  port: ${port:10086}
spring:
  application:
    name: eureka-server   #应用名称，会在eureka中作为服务的id标识

#配置eurkea
eureka:
  client:
    service-url:
      defaultZone: ${defualtZone:http://127.0.0.1:10086/eureka}
    #register-with-eureka: false       #不注册自己，默认值是true（如果搭建eureka集群，需要相互之间注册）
    #fetch-registry: false   #不拉取自己的服务列表
```

2、修改启动配置文件

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591806205847.png)

3、复制一份并修改VM options

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591806216118.png)

4、启动eureka集群

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591806227522.png)

## 服务注册Eureka集群

因为Eureka不止一个，修改user-service关于注册中心的配置

服务提供者在启动的时候，会检测配置属性中`eureka.client.register-with-eureka=true`参数是否正确，事实上默认是true，所以我们没有配置，如果值确实是true，则会向EurekaServer发起一个Rest请求，并且携带自己的元数据信息，EurekaServer会把这些信息保存到一个双层的Map结构中

- 第一层Map的key就是服务的id，一般就是配置`spring.applicaton.name`属性
- 第二层Map的key就是服务的实例id，一般host + serviceId + port，例如：localhost:user-service:9091
- 值则是服务的实例对象，也就是说一个服务，可以同时启动多个不同的实例，形成集群

默认注册的时候是主机名或者是localhost，如果想用ip进行注册，可以在`user-server` 中添加配置

```yml
#端口号
server:
  port: 9091
#数据源
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/springcloud?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
    username: root
    password: root
  application:
    name: user-service   #应用名
#添加Eureka注册的配置
eureka:
  client:
    service-url:  #EurekaServer地址，多个地址之间用逗号分隔
      defaultZone: http://127.0.0.1:10086/eureka,http://127.0.0.1:10087/eureka
  instance:
    ip-address: 127.0.0.1    #ip地址
    prefer-ip-address: true  #更倾向于使用ip，而不是host名    
```

修改完成后重启`user-server`工程和`user-web`工程

> 可以测试一下，先关掉10086，然后在测试是否能正常通讯

## 失效的剔除和自我保护

服务续约

> 在注册服务完成以后，服务提供者会持续一个心跳（定时向EurekaServer发起Rest请求），告诉EurekaServer：“我还活着”，这个我们就称之为服务的续约(renew)；

向user-server工程配置文件中添加如下配置

```yml
#添加Eureka注册的配置
eureka:
  client:
    service-url:  #EurekaServer地址，多个地址之间用逗号分隔
      defaultZone: http://127.0.0.1:10086/eureka,http://127.0.0.1:10087/eureka
  instance:
    ip-address: 127.0.0.1    #ip地址
    prefer-ip-address: true  #更倾向于使用ip，而不是host名
    lease-expiration-duration-in-seconds: 5 #服务续约的时间间隔，默认是30秒，现在我这里设置为5秒
    lease-renewal-interval-in-seconds: 5  #服务失效时间，默认是90秒，我这里设置为5秒
```

> 也就是说，默认情况下每个30秒服务会向注册中心发送一次心跳，证明自己还活着，如果超过90秒还没有发送心跳，EurekaServer就会认为该服务已经宕机，会定时从服务列表中移除，这两个值在生产环境中不要修改（我这里修改是为了方便测试）

服务下线

> 当服务进行正常关闭操作的时候，它会触发一个服务下线的REST请求给EurekaSever，告诉服务注册中心：“我要下线了”。服务中心接收到请求之后，会讲该服务置为下线状态

失效剔除

自我保护

> 我们关停一个服务，很可能会在eureka面板出现一条警告：

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591806244663.png)

> 这个就是eureka的自我保护机制。当服务未按时进行心跳续约，Eureka会统计服务实例最近15分钟心跳续约的比例是否低于85%，在生产环境下，因为网络延迟等原因，心跳失败实例的比例很有可能会超标，但是此时就把服务剔除列表并不妥当，因为服务并没有宕机。Erueka在这段时间内不会剔除任何服务实例，直到网络恢复正常。生产环境下这很有效,因此服务调用者必须做好服务的失败容错
>
> 可以关闭自我保护（生产环境下，千万别干这事！）

```yml
#配置eurkea
eureka:
  client:
    service-url:
      defaultZone: ${defualtZone:http://127.0.0.1:10086/eureka}
    #register-with-eureka: false       #不注册自己，默认值是true（如果搭建eureka集群，需要相互之间注册）
    #fetch-registry: false   #不拉取自己的服务列表
  server:
    enable-self-preservation: false  #关闭自我保护模式(缺省为打开)
```
