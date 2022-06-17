## 什么是Consul

consul 是一个支持多数据中心分布式高可用，用于服务发现和配置共享的工具。

Consul包含多个组件,但是作为一个整体,为你的基础设施提供服务发现和服务配置的工具.他提供以下关键特性:

**服务发现** Consul的客户端可用提供一个服务,比如 api 或者mysql ,另外一些客户端可用使用Consul去发现一个指定服务的提供者.通过DNS或者HTTP应用程序可用很容易的找到他所依赖的服务.

**健康检查** Consul客户端可用提供任意数量的健康检查,指定一个服务(比如:webserver是否返回了200 OK 状态码)或者使用本地节点(比如:内存使用是否大于90%). 这个信息可由operator用来监视集群的健康.被服务发现组件用来避免将流量发送到不健康的主机.

**Key/Value存储** 应用程序可用根据自己的需要使用Consul的层级的Key/Value存储.比如动态配置,功能标记,协调,领袖选举等等,简单的HTTP API让他更易于使用.

**多数据中心**: Consul支持开箱即用的多数据中心.这意味着用户不需要担心需要建立额外的抽象层让业务扩展到多个区域.

## 安装Consul

### 下载Consul

进入https://www.consul.io/downloads

选择自己的系统后下载，这里以Windows版的1.7.1版本演示

下载完毕后解压得到一个consul.exe

### 运行

在cmd中执行：`consul agent -dev`

执行后如果看到了`Consul agent running!`则代表运行成功

![image-20201008004146313](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201008004146313.png)

然后我们访问地址：http://127.0.0.1:8500/

![image-20201008004210732](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201008004210732.png)

## 注册服务

### 创建工程

首先在父工程加入依赖

```xml
 <spring-cloud-consul-discovery.version>2.2.0.RELEASE</spring-cloud-consul-discovery.version>
 <dependencyManagement>
         <dependencies>
             <dependency>
                 <groupId>org.springframework.cloud</groupId>
                 <artifactId>spring-cloud-starter-consul-discovery</artifactId>
                 <version>${spring-cloud-consul-discovery.version}</version>
             </dependency>
         </dependencies>
 </dependencyManagement>
```

创建子工程：`spring-cloud-consul-discovery-provider`

pom

```xml
 <dependencies>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
     </dependency>
 
     <!-- consul注册中心 -->
     <dependency>
         <groupId>org.springframework.cloud</groupId>
         <artifactId>spring-cloud-starter-consul-discovery</artifactId>
     </dependency>
 
     <!-- 健康检查 -->
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-actuator</artifactId>
     </dependency>
 </dependencies>
```

application.yml

```yml
 server:
   port: 4444
 spring:
   application:
     name: spring-cloud-consul-discovery-provider
   cloud:
     consul:
       host: 127.0.0.1 # consul注册中心的地址
       port: 8500      #              的端口
 
 management:
   endpoints:
     web:
       exposure:
         include: '*'
```

ConsulDiscoveryProviderApplication.java

```java
 package io.mvvm;
 
 import org.springframework.boot.SpringApplication;
 import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
 
 @SpringBootApplication
 @EnableDiscoveryClient
 public class ConsulDiscoveryProviderApplication {
 
     public static void main(String[] args) {
         SpringApplication.run(ConsulDiscoveryProviderApplication.class,args);
     }
 
 }
```

DemoController.java

```java
 package io.mvvm.controller;
 
 import org.springframework.web.bind.annotation.GetMapping;
 import org.springframework.web.bind.annotation.PathVariable;
 import org.springframework.web.bind.annotation.RestController;
 
 @RestController
 public class DemoController {
 
     @GetMapping("/get/{str}")
     public String get(@PathVariable("str") String str){
         System.out.println("provider");
         System.out.println("------" + str + "-------");
         return str;
     }
 
 }
```

### 测试

启动服务后访问Consul注册中心的面板，查看是否注册成功

（忽略其他的服务，做到这一步只会有两个services）

![image-20201008013524909](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201008013524909.png)

## 消费服务

### 创建工程

创建子工程：`spring-cloud-consul-discovery-consumer`

pom

```xml
 <dependencies>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
     </dependency>
 
     <!-- consul注册中心 -->
     <dependency>
         <groupId>org.springframework.cloud</groupId>
         <artifactId>spring-cloud-starter-consul-discovery</artifactId>
     </dependency>
 
     <!-- 健康检查 -->
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-actuator</artifactId>
     </dependency>
 
     <!-- openfeign -->
     <dependency>
         <groupId>org.springframework.cloud</groupId>
         <artifactId>spring-cloud-starter-openfeign</artifactId>
     </dependency>
 </dependencies>
```

application.yml

```yml
 server:
   port: 4433
 spring:
   application:
     name: spring-cloud-consul-discovery-consumer
   cloud:
     consul:
       host: 127.0.0.1 # consul注册中心的地址
       port: 8500      #              的端口
 
 management:
   endpoints:
     web:
       exposure:
         include: '*'
```

ConsulDiscoveryConsumerApplication.java

```java
 package io.mvvm;
 
 import org.springframework.boot.SpringApplication;
 import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
 import org.springframework.cloud.openfeign.EnableFeignClients;
 
 @SpringBootApplication
 @EnableDiscoveryClient
 @EnableFeignClients(basePackages = "io.mvvm.client")    // 扫描openfeign的包
 public class ConsulDiscoveryConsumerApplication {
 
     public static void main(String[] args) {
         SpringApplication.run(ConsulDiscoveryConsumerApplication.class,args);
     }
 
 }
```

DemoClient.java

```java
package io.mvvm.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("spring-cloud-consul-discovery-provider")
public interface DemoClient {

    @GetMapping("/get/{str}")
    String get(@PathVariable("str") String str);

}
```

DemoController.java

```java
package io.mvvm.controller;

import io.mvvm.client.DemoClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class DemoController {

    @Resource
    private DemoClient demoClient;

    @GetMapping("/consumer/{str}")
    public String get(@PathVariable("str") String str){
        System.out.println("consumer");
        String client = demoClient.get(str);
        System.out.println("------" + client + "-------");
        return client;
    }

}
```

### 测试

访问http://localhost:4433/getc/123

查看是否调用了`provider`服务的controller



代码地址：https://gitee.com/aumu/spring-cloud-alibaba-demo
