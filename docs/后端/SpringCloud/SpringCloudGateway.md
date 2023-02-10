# Gateway

## 介绍

- Spring Cloud Gateway是用来替代NetFlix Zull（目前Zull处于维护阶段）
- Spring Cloud Gateway是Spring官网基于Spring5.0、springBoot2.0等技术开发的网关服务
- Spring Cloud Gateway基于Filter练提供网关基本功能：安全、监控/埋点、限流等
- Spring Cloud Gateway为微服务架构提供简单、有效且统一的API路由管理方式

Spring Cloud Gateway 组件的核心是一系列的过滤器，通过这些过滤器可以将客户端发送的请求转发（路由）到对应的微服务。Spring Cloud Gateway是加载整个微服务的防火墙和代理器，隐藏微服务节点IP端口信息，从而加强安全保护，Spring Cloud Gateway本身也是一个微服务，需要注册到Eurkea服务注册中心

> 网关的核心功能：过滤和路由

## **Spring Cloud Gateway加入后的架构**

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1.png)

不管来自于PC还是移动端的请求，还是服务内部调用。一切对服务的请求都可经过网关，然后再由网关来实现鉴权、动态路由等等操作。Gateway就是我们服务的统一入口

## **网关中的核心概念**

- 路由（route）路由信息的组成：由一个ID，一个目的URL，一个断言工厂，一组Filter组成。如果路由断言为真，说明请求URL和配置路由匹配
- 断言 ：网关中的断言函数输入类型是spring 5.0框架中的ServerWebExchange。Spring Cloud Gateway的断言函数允许开发者去定义匹配来自于Http Request中的任何信息比如请求头和参数
- 过滤器（Filter）一个标准的Spring WebFilter。Spring Cloud Gateway中的Filter分为两种类型的filter，分别是Gateway Filter和Global Filter，过滤器Filter将会对请求和想I有那个进行修改处理

## 快速入门

**创建一个新工程**

项目名取名：mvvm-gateway

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

**在工程的启动类中添加发现服务的注解**

```java
@SpringBootApplication
@EnableDiscoveryClient          //发现服务
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
```

**编写配置**

```yml
server:
  port: 10010
spring:
  application:
    name: api-gateway
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    prefer-ip-address: true
```

**编写路由规则**

需要用网关代理user-service服务，先看看服务的状态

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200611150256637.png)

ip:127.0.0.1

端口号：9091

```yml
server:
  port: 10010
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        # 路由的id，可以随便写
        - id: user-service-route
          #代理的服务地址
          uri: http://127.0.0.1:9091
          #路由断音，可以配置映射路径
          predicates:
            - Path=/user/**
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    prefer-ip-address: true
```

将符合Path规则的一切请求，都代理到uri参数指定的地址

**启动测试**

## 面向服务的路由

在刚才的路由规则中，把路径对应的服务地址写死了！如果同一个服务有多个实例，这样显然是不合理的，应该根据服务的名称，去Eureka注册中心去查找服务对应的所有的实例列表，然后进行动态路由@

**修改映射配置**

```yml
server:
  port: 10010
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        # 路由的id，可以随便写
        - id: user-service-route
          #代理的服务地址
          #uri: http://127.0.0.1:9091
          #通过代理的服务地址，根据loadbleance获取具体的服务
          uri: lb://user-service
          #路由断言，可以配置映射路径
          predicates:
            - Path=/user/**
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    prefer-ip-address: true
```

路由配置中的uri所用的协议为lb，gateway将使用loadBalancerClient把user-service通过eurkea解析为实际的主机和端口，并且进行ribbon负载均衡

**启动测试**

## **路由前缀**

在gateway中可以通过配置路由的过滤器PrefixPath，实现映射路径中地址的添加:

**添加前缀**

```yml
server:
  port: 10010
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        # 路由的id，可以随便写
        - id: user-service-route
          #代理的服务地址
          #uri: http://127.0.0.1:9091
          #通过代理的服务地址，根据loadbleance获取具体的服务
          uri: lb://user-service
          #路由断言，可以配置映射路径
          predicates:
            - Path=/**
          filters:
            #添加请求路径的前缀
            - PrefixPath=/user
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    prefer-ip-address: true
```

通过PrefixPath=/xx来指定路由要添加的前缀

PrefixPath=/user http://localhost:10010/2 --->等同于 http://localhost:10010/user/2

PrefixPath=/user/abc http://localhost:10010/2 --->等同于 http://localhost:10010/user/abc/2

依次类推

**去除前缀**

在gateway中可以通过配置路由的过滤器StripPrefix实现映射路径中地址的去除：

```yml
server:
  port: 10010
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        # 路由的id，可以随便写
        - id: user-service-route
          #代理的服务地址
          #uri: http://127.0.0.1:9091
          #通过代理的服务地址，根据loadbleance获取具体的服务
          uri: lb://user-service
          #路由断言，可以配置映射路径
          predicates:
            - Path=/api/user/**
          filters:
            #表示过滤1个路径，2表示两个路径，依次类推
            - StripPrefix=1
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    prefer-ip-address: true
```

通过StripPrefix=1来指定了路由要去掉的前缀个数。如：- Path=/api/user/** 通过 - StripPrefix=1处理就去掉了1个路径

也就是访问 http://localhost:10010/api/user/1 ---> 将会被代理到 http://localhost:10010/user/1

如：
StripPrefix=1 http://localhost:10010/api/user/1 --> http://localhost:10010/user/1
StripPrefix=2 http://localhost:10010/api/user/1 --> http://localhost:10010/1
依次类推

## **过滤器**

### **简介**

Spring Cloud Gateway作为网关的其中一个重要功能，就是实现请求的鉴权。而这个动作往往通过网关提供的过滤器来实现的。前面的路由前缀章节中的共更难也是使用过滤器实现的。

Spring Cloud Gateway自带的过滤器有几十个，常见的有：

| 过滤器名称          | 说明                         |
| ------------------- | ---------------------------- |
| AddRequestHeader    | 对匹配上的请求加上Header     |
| AddRequestParameter | 对匹配上的请求路由添加参数   |
| AddResponseHeader   | 对从网关返回的响应添加Header |
| StripPrefix         | 对匹配上的请求路径去除前缀   |

### 配置全局默认过滤器

这些自带的过滤器可以和使用路由前缀章节中的用法类似，也可以将这些过滤器配置成不只是针对某个路由：而是可以对所有的路由生效，也就是配置默认过滤器:

```yml
server:
  port: 10010
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        # 路由的id，可以随便写
        - id: user-service-route
          #代理的服务地址
          #uri: http://127.0.0.1:9091
          #通过代理的服务地址，根据loadbleance获取具体的服务
          uri: lb://user-service
          #路由断言，可以配置映射路径
          predicates:
            - Path=/api/user/**
          filters:
            #表示过滤1个路径，2表示两个路径，依次类推
            - StripPrefix=1
      #默认的过滤器，对所有路由生效
      default-filters:
        - AddResponseHeader=X-Response-Default-MyName,HaoHan
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    prefer-ip-address: true
```

重启网关服务，访问：http://127.0.0.1:10010/api/user/1，那么可以从响应中查看到如下信息

```
X-Response-Default-MyName: HaoHan
```

过滤器类型:Gateway实现方式上，有两种过滤器:

- 局部过滤器：通过`spring.cloud.gateway.routes.filters`配置在具体的路由下，只作用于当前路由上；自爱的过滤器都可以配置或者自定义按照自带过滤器的方式，如果配``spring.cloud.gateway.default-filters`上会对所有的路由生效也算是全局的过滤器；但是这些过滤器的实现上都是要实现GatewayFilterFactroy接口
- 全局过滤器：不需要在配置文件中配置，作用在所有的路由上，实现GlobaFilter接口即可.

### **使用场景**

- 请求鉴权：做访问权限控制。一般`GatewayFilterChain`执行filter方法前
- 异常处理：记录异常并且返回。一般`GatewayFilterChain`执行filter方法后
- 服务调用市场统计：`GatewayFilterChain`执行filter方法前后

### 自定义过滤器

#### **局部过滤器**

在`mvvm-gateway`工程中编写过滤器工厂类

```java
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
@Component      //交给spring管理
public class MyParamGatewayFilterFactory extends AbstractGatewayFilterFactory<MyParamGatewayFilterFactroy.Config> {
    private static final String PARAM_NAME = "param";

    public MyParamGatewayFilterFactroy() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            if (request.getQueryParams().containsKey(config.param)) {

                request.getQueryParams().get(config.param)
                        .forEach(value -> System.out.printf("-------------局部过滤器------------%s----------------%s-------",config.param,value));
            }
            return chain.filter(exchange);
        };
    }
    @Override
    public List<String> shortcutFieldOrder() {
        return Arrays.asList(PARAM_NAME);
    }
    public static class Config{
        private String param;

        public String getParam() {
            return param;
        }
        public void setParam(String param) {
            this.param = param;
        }
    }
}
```

注意：自定义过滤器的命名必须是： GatewayFilterFactory

修改配置文件

```yml
server:
  port: 10010
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        # 路由的id，可以随便写
        - id: user-service-route
          #代理的服务地址
          #uri: http://127.0.0.1:9091
          #通过代理的服务地址，根据loadbleance获取具体的服务
          uri: lb://user-service
          #路由断言，可以配置映射路径
          predicates:
            - Path=/api/user/**
          filters:
            #表示过滤1个路径，2表示两个路径，依次类推
            - StripPrefix=1
            # 自定义过滤器
            - MyParam=name
      #默认的过滤器，对所有路由生效
      default-filters:
        - AddResponseHeader=X-Response-Default-MyName,HaoHan
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    prefer-ip-address: true
```

访问测试：

[http://127.0.0.1:10010/api/user/1?name=HaoHan](http://127.0.0.1:10010/api/user/1?name=yanmin) 检查后台是否输出name 和HaoHan

#### **自定义全局过滤器**

需求：模拟一个登录的校验。基本逻辑`如果请求中带有token参数，则认为请求有效，那么放行`

在kgc-gateway工程中编写全局过滤器类MyGlobalFilter

```java
@Component
public class MyGlobalFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        System.out.println("----------------------全局过滤器-----------------");
        String token = exchange.getRequest().getQueryParams().getFirst("token");
        //如果请求url中不带有token
        if(StringUtils.isEmpty(token)){
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        //带有token，那么放行
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        //值越小越是先执行
        return 1;
    }
}
```

访问： http://127.0.0.1:10010/api/user/1

访问：http://127.0.0.1:10010/api/user/1?token=123 （带了token）

## **负载均衡和熔断**

Spring Cloud Gateway中默认就已经集成了Ribbon负载君和和Hystrix熔断机制。但是所有的超时策略都是走的默认值，比如熔断超时时间只有1秒，很容就触发了，因此建议手动进行配置

```yml
hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 6000
ribbon:
  ConnectionTimeout: 1000
  ReadTimeout: 2000
  MaxAutoRetries: 3
  MaxAutoRetriesNextServer: 3
```

## **Gateway跨域配置**

一般网关都是所有微服务的统一入口，必然在调用的时候会出现跨域问题

跨域：在js请求访问中，如果访问的地址与当前服务器的域名、ip或者是端口号不一致则成为跨域请求。如果不解决则不能获取到对应地址的返回结果

如：http://localhost:9091 中的js访问http://localhost:9090 的数据，则因为端口号不同，所以是跨域请求

在访问spring cloud gateway网关服务的时候，出现跨域问题的化，可以在网关服务中通过配置解决，允许哪些服务是可以跨域请求的

```yml
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        # 路由的id，可以随便写
        - id: user-service-route
          #代理的服务地址
          #uri: http://127.0.0.1:9091
          #通过代理的服务地址，根据loadbleance获取具体的服务
          uri: lb://user-service
          #路由断言，可以配置映射路径
          predicates:
            - Path=/api/user/**
          filters:
            #表示过滤1个路径，2表示两个路径，依次类推
            - StripPrefix=1
            # 自定义过滤器
            - MyParam=name
      globalcors:
        cors-configurations:
          '[/**]':
            # alloweOrigins:这种写法或就表示是跨域
            alloweOrigins:
              - "http://docs.spring.io"
            allowdMethods:
              - GET
```

上述配置表示：可以允许来自http://docs.spring.io的get请求方式获取服务数据

alloweOrigins 指定允许访问的服务器地址，如：http://localhsot:100000也是可以的

[/**]表示对所有的访问到网关服务器的请求地址

## 高可用

启动多个Gatway服务，自动注册到eureka中，形成集群，如果是服务内部访问，访问Gateway，自动负载均衡没问题

但是，geteway更多的是外部访问,他们无法通过eureka进行负载均衡，怎么办？

可以使用其他的服务网关，来对Gateway进行代理，比如：Nginx（可以通过ngxin搭建geteway集群）

## Gateway和feign区别

Gateway作为整个应用的流量入口，接受所有的请求，并且将不同的请求转发到不同的处理微服务模块中，大部分情况下用作：鉴权、服务端流量控制

Feign则是将当前的微服务的部分服务接口暴漏出来，并且主要用于各个微服务之间的服务调用
