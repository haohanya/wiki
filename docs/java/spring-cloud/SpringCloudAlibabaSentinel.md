## 什么是Sentinel

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 是面向分布式服务架构的流量控制组件，主要以流量为切入点，从限流、流量整形、熔断降级、系统负载保护、热点防护等多个维度来帮助开发者保障微服务的稳定性。

### Sentinel特性

- **丰富的应用场景**：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
- **完备的实时监控**：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
- **广泛的开源生态**：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Dubbo、gRPC 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。
- **完善的 SPI 扩展点**：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。

**Sentinel 的主要特性：**

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/50505538-2c484880-0aaf-11e9-9ffc-cbaaef20be2b.png)

**Sentinel 的开源生态：**

![Sentinel-opensource-eco](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/84338449-a9497e00-abce-11ea-8c6a-473fe477b9a1.png)

**Sentinel 分为两个部分:**

- 核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。

## Sentinel基本概念

### 资源

资源是 Sentinel 的关键概念。它可以是 Java 应用程序中的任何内容，例如，由应用程序提供的服务，或由应用程序调用的其它应用提供的服务，甚至可以是一段代码。在接下来的文档中，我们都会用资源来描述代码块。

只要通过 Sentinel API 定义的代码，就是资源，能够被 Sentinel 保护起来。大部分情况下，可以使用方法签名，URL，甚至服务名称作为资源名来标示资源。

### 规则

围绕资源的实时状态设定的规则，可以包括流量控制规则、熔断降级规则以及系统保护规则。所有规则可以动态实时调整。

## Sentinel 功能和设计理念

### 流量控制

#### 什么是流量控制

流量控制在网络传输中是一个常用的概念，它用于调整网络包的发送数据。然而，从系统稳定性角度考虑，在处理请求的速度上，也有非常多的讲究。任意时间到来的请求往往是随机不可控的，而系统的处理能力是有限的。我们需要根据系统的处理能力对流量进行控制。Sentinel 作为一个调配器，可以根据需要把随机的请求调整成合适的形状

#### 流量控制设计理念

流量控制有以下几个角度:

- 资源的调用关系，例如资源的调用链路，资源和资源之间的关系；
- 运行指标，例如 QPS、线程池、系统负载等；
- 控制的效果，例如直接限流、冷启动、排队等。

Sentinel 的设计理念是让您自由选择控制的角度，并进行灵活组合，从而达到想要的效果。

### 熔断降级

#### 什么是熔断降级

> java -Dserver.port=8800 -jar sentinel-dashboard-1.8.0.jar

Sentinel 和 Hystrix 的原则是一致的: 当检测到调用链路中某个资源出现不稳定的表现，例如请求响应时间长或异常比例升高的时候，则对这个资源的调用进行限制，让请求快速失败，避免影响到其它的资源而导致级联故障。

#### 熔断降级设计理念

在限制的手段上，Sentinel 和 Hystrix 采取了完全不一样的方法。

Hystrix 通过 [线程池隔离](https://github.com/Netflix/Hystrix/wiki/How-it-Works#benefits-of-thread-pools) 的方式，来对依赖（在 Sentinel 的概念中对应 *资源*）进行了隔离。这样做的好处是资源和资源之间做到了最彻底的隔离。缺点是除了增加了线程切换的成本（过多的线程池导致线程数目过多），还需要预先给各个资源做线程池大小的分配。

Sentinel 对这个问题采取了两种手段:

- 通过并发线程数进行限制

和资源池隔离的方法不同，Sentinel 通过限制资源并发线程的数量，来减少不稳定资源对其它资源的影响。这样不但没有线程切换的损耗，也不需要您预先分配线程池的大小。当某个资源出现不稳定的情况下，例如响应时间变长，对资源的直接影响就是会造成线程数的逐步堆积。当线程数在特定资源上堆积到一定的数量之后，对该资源的新请求就会被拒绝。堆积的线程完成任务后才开始继续接收请求。

- 通过响应时间对资源进行降级

除了对并发线程数进行控制以外，Sentinel 还可以通过响应时间来快速降级不稳定的资源。当依赖的资源出现响应时间过长后，所有对该资源的访问都会被直接拒绝，直到过了指定的时间窗口之后才重新恢复。

### 系统自适应保护

Sentinel 同时提供系统维度的自适应保护能力。防止雪崩，是系统防护中重要的一环。当系统负载较高的时候，如果还持续让请求进入，可能会导致系统崩溃，无法响应。在集群环境下，网络负载均衡会把本应这台机器承载的流量转发到其它的机器上去。如果这个时候其它的机器也处在一个边缘状态的时候，这个增加的流量就会导致这台机器也崩溃，最后导致整个集群不可用。

针对这个情况，Sentinel 提供了对应的保护机制，让系统的入口流量和系统的负载达到一个平衡，保证系统在能力范围之内处理最多的请求。

## Sentinel 是如何工作的

Sentinel 的主要工作机制如下：

- 对主流框架提供适配或者显示的 API，来定义需要保护的资源，并提供设施对资源进行实时统计和调用链路分析。
- 根据预设的规则，结合对资源的实时统计信息，对流量进行控制。同时，Sentinel 提供开放的接口，方便您定义及改变规则。
- Sentinel 提供实时的监控系统，方便您快速了解目前系统的状态。

## Sentinel Dashboard安装

### 下载

点击下载[sentinel-dashboard-1.8.0.jar](https://github.com/alibaba/Sentinel/releases/download/v1.8.0/sentinel-dashboard-1.8.0.jar)

### 启动

> java -Dserver.port=8800 -jar sentinel-dashboard-1.8.0.jar
>
> 注意：Sentinel控制台需要JDK1.8及以上版本才行
> 解释：-Dserver.port=8800：指定Sentinel控制台端口为8800

```java
java -Dserver.port=8800 -jar sentinel-dashboard-1.8.0.jar
```

启动成功之后，访问http://localhost:8800/

在Sentinel1.6版本之后都加入了鉴权模块，默认账号密码为：`sentinel`

![image-20201006191258217](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201006191258217.png)

登陆成功后即可看到如下界面，正如你所见，什么都没有。

![image-20201006191423993](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201006191423993.png)

## 使用Sentinel

### 搭建工程

根据上一篇的项目结构，创建一个子模块

spring-cloud-alibaba-sentinel

pom

```xml
 <dependencies>
     <!-- spring boot web -->
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
     </dependency>
 
     <!-- sentinel -->
     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
     </dependency>
 </dependencies>
```

application.yml

```yml
 server:
   port: 6677
 spring:
   application:
     name: spring-cloud-alibaba-sentinel
   cloud:
     sentinel:
       transport:
         dashboard: 127.0.0.1:8800
         port: 8719
```

> 这里的`${spring.cloud.sentinel.transport.port}`端口会在对应的机器上启动一个Http Server，该Server会和Sentinel控制台做交互。
> 比如：在Sentinel控制台添加了一个限流规则，会把规则数据push给这个Http Server接收，Http Server再将规则注册到Sentinel中

DemoController

```java
 package io.mvvm.controller;
 
 import org.springframework.web.bind.annotation.GetMapping;
 import org.springframework.web.bind.annotation.RestController;
 
 @RestController
 public class DemoController {
 
     @GetMapping("/demo")
     public String demo(){
         return "hello";
     }
 
 }
```

### 测试

访问http://localhost:6677/demo后浏览器中打印了：hello

我们再回到Sentinel 控制台中，发现现在已经有了数据

![image-20201006193128833](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201006193128833.png)

Git地址：https://gitee.com/aumu/spring-cloud-alibaba-demo
