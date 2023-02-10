# Apollo

## 什么是Apollo

Apollo（阿波罗）是携程框架部门研发的分布式配置中心，能够集中化管理应用不同环境、不同集群的配置，配置修改后能够实时推送到应用端，并且具备规范的权限、流程治理等特性，适用于微服务配置管理场景。

**Apollo包括服务端和客户端两部分**

服务端基于Spring Boot和Spring Cloud开发，打包后可以直接运行，不需要额外安装Tomcat等应用容器。

Java客户端不依赖任何框架，能够运行于所有Java运行时环境，同时对Spring/Spring Boot环境也有较好的支持。

## 特性

- 统一管理不同环境、不同集群的配置
    - Apollo提供了一个统一界面集中式管理不同环境（environment）、不同集群（cluster）、不同命名空间（namespace）的配置。
    - 同一份代码部署在不同的集群，可以有不同的配置，比如zk的地址等
    - 通过命名空间（namespace）可以很方便的支持多个不同应用共享同一份配置，同时还允许应用对共享的配置进行覆盖
    - 配置界面支持多语言（中文，English）
- 配置修改实时生效（热发布）
    - 用户在Apollo修改完配置并发布后，客户端能实时（1秒）接收到最新的配置，并通知到应用程序。
- 版本发布管理
    - 所有的配置发布都有版本概念，从而可以方便的支持配置的回滚。
- 灰度发布
    - 支持配置的灰度发布，比如点了发布后，只对部分应用实例生效，等观察一段时间没问题后再推给所有应用实例。
- 权限管理、发布审核、操作审计
    - 应用和配置的管理都有完善的权限管理机制，对配置的管理还分为了编辑和发布两个环节，从而减少人为的错误。
    - 所有的操作都有审计日志，可以方便的追踪问题。
- 客户端配置信息监控
    - 可以方便的看到配置在被哪些实例使用
- 提供Java和.Net原生客户端
    - 提供了Java和.Net的原生客户端，方便应用集成
    - 支持Spring Placeholder，Annotation和Spring Boot的ConfigurationProperties，方便应用使用（需要Spring 3.1.1+）
    - 同时提供了Http接口，非Java和.Net应用也可以方便的使用
- 提供开放平台API
    - Apollo自身提供了比较完善的统一配置管理界面，支持多环境、多数据中心配置管理、权限、流程治理等特性。
    - 不过Apollo出于通用性考虑，对配置的修改不会做过多限制，只要符合基本的格式就能够保存。
    - 在我们的调研中发现，对于有些使用方，它们的配置可能会有比较复杂的格式，如xml, json，需要对格式做校验。
    - 还有一些使用方如DAL，不仅有特定的格式，而且对输入的值也需要进行校验后方可保存，如检查数据库、用户名和密码是否匹配。
    - 对于这类应用，Apollo支持应用方通过开放接口在Apollo进行配置的修改和发布，并且具备完善的授权和权限控制
- 部署简单
    - 配置中心作为基础服务，可用性要求非常高，这就要求Apollo对外部依赖尽可能地少
    - 目前唯一的外部依赖是MySQL，所以部署非常简单，只要安装好Java和MySQL就可以让Apollo跑起来
    - Apollo还提供了打包脚本，一键就可以生成所有需要的安装包，并且支持自定义运行时参数

## 模块架构

架构图待补充

- Config Service提供配置的读取、推送等功能，服务对象是Apollo客户端
- Admin Service提供配置的修改、发布等功能，服务对象是Apollo Portal（管理界面）
- Config Service和Admin Service都是多实例、无状态部署，所以需要将自己注册到Eureka中并保持心跳
- 在Eureka之上我们架了一层Meta Server用于封装Eureka的服务发现接口
- Client通过域名访问Meta Server获取Config Service服务列表（IP+Port），而后直接通过IP+Port访问服务，同时在Client侧会做load balance、错误重试
- Portal通过域名访问Meta Server获取Admin Service服务列表（IP+Port），而后直接通过IP+Port访问服务，同时在Portal侧会做load balance、错误重试
- 为了简化部署，我们实际上会把Config Service、Eureka和Meta Server三个逻辑角色部署在同一个JVM进程中

## 各模块概要介绍

### Config Service

- 提供配置获取接口
- 提供配置更新推送接口（基于Http long polling）
    - 服务端使用[Spring DeferredResult](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/context/request/async/DeferredResult.html)实现异步化，从而大大增加长连接数量
    - 目前使用的tomcat embed默认配置是最多10000个连接（可以调整），使用了4C8G的虚拟机实测可以支撑10000个连接，所以满足需求（一个应用实例只会发起一个长连接）。
- 接口服务对象为Apollo客户端

### Admin Service

- 提供配置管理接口
- 提供配置修改、发布等接口
- 接口服务对象为Portal

### Meta Server

- Portal通过域名访问Meta Server获取Admin Service服务列表（IP+Port）
- Client通过域名访问Meta Server获取Config Service服务列表（IP+Port）
- Meta Server从Eureka获取Config Service和Admin Service的服务信息，相当于是一个Eureka Client
- 增设一个Meta Server的角色主要是为了封装服务发现的细节，对Portal和Client而言，永远通过一个Http接口获取Admin Service和Config Service的服务信息，而不需要关心背后实际的服务注册和发现组件
- Meta Server只是一个逻辑角色，在部署时和Config Service是在一个JVM进程中的，所以IP、端口和Config Service一致

### Eureka

- 基于[Eureka](https://github.com/Netflix/eureka)和[Spring Cloud Netflix](https://cloud.spring.io/spring-cloud-netflix/)提供服务注册和发现
- Config Service和Admin Service会向Eureka注册服务，并保持心跳
- 为了简单起见，目前Eureka在部署时和Config Service是在一个JVM进程中的（通过Spring Cloud Netflix）

### Portal

- 提供Web界面供用户管理配置
- 通过Meta Server获取Admin Service服务列表（IP+Port），通过IP+Port访问服务
- 在Portal侧做load balance、错误重试

### Client

- Apollo提供的客户端程序，为应用提供配置获取、实时更新等功能
- 通过Meta Server获取Config Service服务列表（IP+Port），通过IP+Port访问服务
- 在Client侧做load balance、错误重试

## 安装

> 本次安装采用Windows和Apollo1.7.1版本

### 1、下载Apollo

下载SQL文件，Apollo需要使用到两个数据库

https://github.com/ctripcorp/apollo/tree/master/scripts/sql

下载后解压到：`apollo-sql`目录

下载Apollo的三个端

https://github.com/ctripcorp/apollo/releases/tag/v1.7.1

```
apollo-adminservice-1.7.1-github.zip
```

下载后解压到：`apollo-adminservice`目录

```
apollo-configservice-1.7.1-github.zip
```

下载后解压到：`apollo-configservice`目录

```
apollo-portal-1.7.1-github.zip
```

下载后解压到：`apollo-portal`目录

### 2、执行SQL

执行`apollo-sql`路径下面的两个sql文件到MySQL数据库中

### 3、启动Apollo

#### 启动ConfigService服务

**修改配置**

编辑`apollo-configservice/config/application-github.properties`

将数据库信息修改为上一步导入的数据库

这个数据库应该对应的是`apolloconfigdb.sql`

**启动服务**

1. 进入`apollo-configservice/scripts`目录
2. 在这个目录打开`GitBash`
3. 执行`./startup.sh`

**测试**

大概这样子就是启动成功

![image-20201010001755911](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010001755911.png)

访问`localhost:8080`，如果是Eureka页面则启动成功

因为ConfigService服务底层帮我们封装了Eureka，所以才会有Eureka面板。

#### 启动AdminService服务

**修改配置**

和ConfigService服务一样

**启动服务**

和ConfigService服务一样

**测试**

访问`http://localhost:8080/`

查看AdminService服务是否注册到Eureka

也可也访问`http://localhost:8090/`查看是否打印出：apollo-adminservice

![image-20201009235042277](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201009235042277.png)

#### 启动Portal服务

**修改配置**

`application-github.properties`配置文件和上面一样

Protal服务还有一个`apollo-env.properties`配置文件

它主要是配置不同环境的Eureka，用来连接AdminService

将其他的注释起来，只保留一个dev.meat，这个的value是eureka的地址，ConfigService中集成了Eureka;

这个环境配置是根据`ApolloPortalDB.ServerConfig`表中的`apollo.portal.envs`决定的。

> SELECT * FROM ApolloPortalDB.ServerConfig WHERE Key = 'apollo.portal.envs';

```properties
#local.meta=http://localhost:8080
dev.meta=http://localhost:8080
#fat.meta=http://fill-in-fat-meta-server:8080
#uat.meta=http://fill-in-uat-meta-server:8080
#lpt.meta=${lpt_meta}
#pro.meta=http://fill-in-pro-meta-server:8080
```

**测试**

访问`localhost:8070`

得到这个界面后表示启动成功（注意，Portal服务不会注册到Eureka中）

默认的账号密码是：`apollo / admin`

![image-20201010102935031](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010102935031.png)

## 和Java集成

本次集成采用到了服务发现`Consul 1.7.1`和`Apollo 1.7.1`

### 创建工程

创建`spring-cloud-apollo`工程

**加入依赖**

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
 
     <!-- Apollo -->
     <dependency>
         <groupId>com.ctrip.framework.apollo</groupId>
         <artifactId>apollo-client</artifactId>
         <version>1.7.0</version>
     </dependency>
 
 </dependencies>
```

**创建启动类**

这里创建了一个SpringBoot的启动类，并将这个工程注册到Consul中

并且还有一个Controller，用来测试，这个@Value里的Key，待会我们会在Apollo中配置

```java
 package io.mvvm;
 
 import org.springframework.beans.factory.annotation.Value;
 import org.springframework.boot.SpringApplication;
 import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
 import org.springframework.web.bind.annotation.GetMapping;
 import org.springframework.web.bind.annotation.RestController;
 
 import javax.annotation.Resource;
 
 @SpringBootApplication
 @EnableDiscoveryClient
 public class ApolloApplication {
 
     public static void main(String[] args) {
         SpringApplication.run(ApolloApplication.class, args);
     }
 
     @RestController
     class DemoController{
 
         @Value("${apollo.version}")
         private String apolloVersion;
 
         @GetMapping("/getV")
         public String getVersion(){
             return apolloVersion;
         }
     }
 }
```

**创建配置文件**

创建`application.properties`

这里发现很奇特的一个问题。application.yml和application.properties在Apollo中居然不一样。

用yml报错。properties就正常。

```properties
 spring.cloud.consul.host=127.0.0.1
 spring.cloud.consul.port=8500
 server.port=2333
 spring.application.name=spring-cloud-apollo
 apollo.bootstrap.enabled=true
 apollo.meta=http://localhost:8080
 apollo.cacheDir=C:\\Users\\dell\\Desktop\\springcloudalibaba
 apollo.accesskey.secret=9562c487f36d47eb948b6a07e9f8ed6b
 app.id=202010100102
 env=DEV
```

| KEY | 描述 |
| ------------------------ | --------------------------------------------------- |
| spring.cloud.consul.host | Consul服务器的地址                                  |
| spring.cloud.consul.port | Consul的端口                                        |
| app.id                   | AppId唯一标识，在Apollo的Portal服务创建项目时自定义 |
| apollo.meta              | 这个其实就是Eureka的地址，但是Apollo在ConfigService中已经帮我们实现了集成，所以一般就是填入ConfigService服务的IP+8080 |
| apollo.cacheDir | 自定义配置文件缓存到本地的路径，也就是说，Apollo会将配置文件从ConfigService中拿到配置文件后缓存到本地，如果遇到网络波动的时候也可也保证配置文件的正常读取 |
| apollo.accesskey.secret | 访问密钥，如果在Apollo中设置了密钥，那么需要在这里填入你设置的密钥才能访问 |
| apollo.bootstrap.enabled | 当有些配置如果需要在服务启动阶段就注入的话，那么就需要添加这个为true |
| env | 自定义环境(DEV、FAT、UAT、PRO) |

### 添加配置

接下来我们需要在Apollo中添加一个`apollo.version`的数据

**1、创建项目**

![image-20201010103233631](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010103233631.png)

![image-20201010103342706](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010103342706.png)

> AppId可以自定义但是一定要和${app.id}一致
>
> 应用名称一般直接写模块名称也可以

创建成功之后会进入到项目中

然后我们来添加一个配置信息

![image-20201010103738053](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010103738053.png)

> 首先点击添加配置，然后编写K/V不多说，然后环境DEV，如果是其他环境，可以勾选。
>
> 然后提交

提交之后，还不能被服务发现，因为在Apollo中需要手动发布才行

![image-20201010103912309](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010103912309.png)

上面我们说到了密钥的配置，这里是在左下角有一个**管理密钥**按钮

![image-20201010104113930](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010104113930.png)

添加之后我们需要启用这个密钥

![image-20201010104134495](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010104134495.png)

然后将密钥复制到配置文件中

### 测试

启动`spring-cloud-apollo`服务

访问：http://localhost:2333/getV

![image-20201010110230027](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010110230027.png)

得到1.0则配置成功，接下来测试动态修改数据

回到Portal服务

在操作中编辑Key为`apollo.version`

将1.0修改为2.0后保存

注意：当配置文件修改后，需要手动发布才能被服务监听到刷新配置

![image-20201010110443961](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201010110443961.png)

点击发布之后，查看控制台

```verilog
2020-10-10 11:05:26.146  INFO 9144 --- [Apollo-Config-2] c.f.a.s.p.AutoUpdateConfigChangeListener : Auto update apollo changed value successfully, new value: 2.0, key: apollo.version, beanName: io.mvvm.ApolloApplication$DemoController, field: io.mvvm.ApolloApplication$DemoController.apolloVersion
```

再次访问http://localhost:2333/getV

查看是否打印出2.0
