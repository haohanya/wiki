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
