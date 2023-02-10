# Nacos

## 什么是Nacos

Nacos 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。
Nacos 帮助您更敏捷和容易地构建、交付和管理微服务平台。 Nacos 是构建以“服务”为中心的现代应用架构 (例如微服务范式、云原生范式) 的服务基础设施。
简单来说，Nacos给我们提供了服务的注册与发现、配置中心、服务总线等，Nacos一个组件相当于Eureka、Config、Bus三个组件

## Nacos安装

### 版本选择

进入https://github.com/alibaba/nacos/releases后选择相应的版本后下载。

这里我采用的是1.3.1的Windows版本

### 修改配置

#### 1、打开conf/application.properties文件

将33-41行配置修改为自己的数据库配置

```properties
spring.datasource.platform=mysql
### Count of DB:
db.num=1
### Connect URL of DB:
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user=root
db.password=root
```

#### 2、导入SQL

将conf/nacos-mysql.sql的sql导入到上面配置的nacos数据库中

#### 3、启动

配置完成后，进入到bin/startup.cmd，双击运行

![image-20201004142515675](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201004142515675.png)

出现这个界面，如果没有报错，说明启动成功

我们访问Console的地址

![image-20201004142550364](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201004142550364.png)

用户名和密码都是：nacos

登陆成功后即可看到下图效果

![image-20201004142623794](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201004142623794.png)

## 注册服务

### 搭建工程

**搭建父工程：**spring-cloud

pom

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.10.RELEASE</version>
</parent>
<properties>
    <spring-cloud-alibaba.version>2.2.3.RELEASE</spring-cloud-alibaba.version>
    <spring-cloud-gateway.version>2.2.5.RELEASE</spring-cloud-gateway.version>
    <spring-cloud-openfeign.version>2.2.5.RELEASE</spring-cloud-openfeign.version>
</properties>

<dependencyManagement>
    <dependencies>
        <!-- spring cloud alibaba -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>${spring-cloud-alibaba.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>

        <!-- gateway 服务网关 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-gateway-dependencies</artifactId>
            <version>${spring-cloud-gateway.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>

        <!-- openfeign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-openfeign-dependencies</artifactId>
            <version>${spring-cloud-openfeign.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

**搭建provider工程：**spring-cloud-alibaba-nacos-discovery-provider

pom

```xml
<parent>
     <artifactId>spring-cloud-alibaba</artifactId>
     <groupId>io.mvvm</groupId>
     <version>1.0-SNAPSHOT</version>
 </parent>
 <dependencies>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
     </dependency>
 
     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
     </dependency>
 </dependencies>
```

application.yml

```yml
spring:
   application:
     name: spring-cloud-alibaba-nacos-discovery-provider
   cloud:
     nacos:
       discovery:
         server-addr: 127.0.0.1:8848
 server:
   port: 8888
```

NacosDiscoveryProviderApplication.java

```java
package io.mvvm;
 
 import org.springframework.boot.SpringApplication;
 import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
 import org.springframework.web.bind.annotation.GetMapping;
 import org.springframework.web.bind.annotation.PathVariable;
 import org.springframework.web.bind.annotation.RestController;
 
 @SpringBootApplication
 @EnableDiscoveryClient  //开启服务注册与发现
 public class NacosDiscoveryProviderApplication {
     public static void main(String[] args) {
         SpringApplication.run(NacosDiscoveryProviderApplication.class, args);
     }
 }
```

### 测试启动

启动后，我们查看Nacos中的服务列表

![image-20201004152830644](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201004152830644.png)

## 服务消费者

**搭建工程：**spring-cloud-alibaba-nacos-discovery-consumer

pom

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
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
spring:
  application:
    name: spring-cloud-alibaba-nacos-discovery-consumer
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
server:
  port: 8899
```

NacosDiscoveryConsumerApplication.java

```java
package io.mvvm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient  //开启服务注册与发现
@EnableFeignClients     // 开启OpenFeign
public class NacosDiscoveryConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(NacosDiscoveryConsumerApplication.class, args);
    }
}
```

ConsumerClient.java

这里我们调用上面写的服务提供者的echo接口

@FeignClient中的value填入${spring.application.name}即可，openfeign底层采用了ribbon做负载均衡

```java
package io.mvvm.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("spring-cloud-alibaba-nacos-discovery-provider")
public interface ConsumerClient {

    @GetMapping("/echo/{string}")
    String echo(@PathVariable String string);

}
```

ConsumerController.java

```java
package io.mvvm.controller;

import io.mvvm.client.ConsumerClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class ConsumerController {

    @Resource
    private ConsumerClient consumerClient;

    @GetMapping("/get/{str}")
    public String echo(@PathVariable("str") String string){
        return consumerClient.echo(string);
    }

}
```

测试

访问localhost:8899/get/123

## 配置中心

### 搭建工程

**在父工程下搭建子工程：**spring-cloud-alibaba-nacos-config

pom

```xml
<dependencies>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
     </dependency>
 
     <!-- 服务注册 -->
     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
     </dependency>
 
     <!-- 配置中心 -->
     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
     </dependency>
 </dependencies>
```

bootstrap.yml

```yml
 server:
   port: 9999
 spring:
   application:
     name: spring-cloud-alibaba-nacos-config
   profiles:
     active: dev
   cloud:
     nacos:
       config:
         server-addr: 127.0.0.1:8848
         file-extension: yaml
# 配置中心文件名称拼接方式  # ${prefix}-${spring.profiles.active}.${file-extension}
```

 NacosConfigApplication.java

```java
package io.mvvm;
 
 import org.springframework.beans.factory.annotation.Value;
 import org.springframework.boot.SpringApplication;
 import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
 import org.springframework.cloud.context.config.annotation.RefreshScope;
 import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RestController;
 
 @SpringBootApplication
 @EnableDiscoveryClient  //开启服务注册与发现
 public class NacosConfigApplication {
     public static void main(String[] args) {
         SpringApplication.run(NacosConfigApplication.class, args);
     }
 
     @RestController
     @RefreshScope       // 动态刷新配置信息
     class ConfigController {
         @Value("${config.version}")
         private String configVersion;
 
         @RequestMapping("/get")
         public String get() {
             return configVersion;
         }
     }
 }
```

### 添加配置

访问Nacos面板，进入到：`配置管理->配置列表->+`

![image-20201004153509856](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201004153509856.png)

其中Data ID一般为`${prefix}-${spring.profiles.active}.${file-extension}`

后缀的yaml不要简写成yml，刚刚测试出错。

配置格式一般根据${file-extension}决定

设置完毕后点击发布即可

### 测试

启动工程

访问url（忽略数据不一样，这是之前测试的图）

![image-20201004153737381](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201004153737381.png)

### NAMESPACE & GROUP

在Nacos中有一个命名空间和分组的概念。

其中命名空间帮助我们实现了多租户的隔离作用

这里有很多种方案

命名空间以不同的环境进行管理，而分组以项目区分管理，

也可以将命名空间以项目作为管理，分组作为不同环境管理

#### 添加命名空间

添加一个新在命名空间

其中ID一般留空即可，Nacos会使用UUID生成

命名空间名：我这里就以不同环境作为隔离，所以添加一个dev

描述：一些描述，避免一觉醒来忘记了

![image-20201005232259456](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201005232259456.png)

#### 添加配置文件

首先要选择上方的dev环境，然后点击加号

![image-20201005232457767](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201005232457767.png)

这里的Group可以自定义，一般大写。

其他参考上面写的配置添加Demo

#### 修改工程配置

namespace：这里是命名空间的ID，可以在命名空间列表中看到

group：就是刚刚在添加的时候自定义的，填进去就好了

```yml
 server:
   port: 9999
 spring:
   application:
     name: spring-cloud-alibaba-nacos-config
   profiles:
     active: dev
   cloud:
     nacos:
       config:
         server-addr: 127.0.0.1:8848  # nacos address
         file-extension: yaml
         namespace: c686d204-8595-4bcb-acad-fad2693bc5ae
         group: SPRINGCLOUDALIBABA_GROUP
 # 以上配置表示：在${namespace}命名空间中找到${group}分组中的${prefix}-${spring.profiles.active}.${file-extension}配置文件
```

#### 测试

启动测试。

Git地址：https://gitee.com/aumu/spring-cloud-alibaba-demo
