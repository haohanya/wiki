# Config

## 简介

在每个微服务都有自己的配置文件，由于服务数据非常多，配置文件分散在不同的微服务项目中，管理不方便，为了方便配置文件的集中管理，就产生了分布式配置中心组件（Spring Cloud Config）

在spring Cloud config中，它支持配置文件放在配置服务的本地，也支持放在远程Git仓库（Github 和 Gitee）

配置中心本质上也是一个微服务，同样需要注册到eureka服务注册中心

## GIT配置管理

在gitee上面创建一个公开仓库

**添加文件**

注意：配置文件的命名方式` {applicaiton}-{profile}.yml`或者是 `{applicaiton}-{profile}.properties`

applicaiton:应用的名称 profile：用于区分开发环境、测试环境和生成环境等

将user-service中的配置文件application.yml内容剪切到创建的配置文件中

## 搭建配置中心微服务

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200611171529754.png)

**启动类**

```java
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }

}
```

**配置文件**

```yml
server:
  port: 12000
spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          uri: https://gitee.com/xxx/cloud-config.git #修改为自己的git地址
          skip-ssl-validation: true #不做https的验证
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
```

**启动配置中心微服务**

如果能访问到配置文件，表示成功

## **user-server微服务获取配置中心**

**添加依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

**修改配置**

删除了原来的application.yml文件

新建一个bootstrap.yml配置文件

> bootstrap.yml文件相当于项目启动时候的引导文件，内容相对固定，而 application.yml文件是微服务的一些常用配置文件，变化比较频繁

```yml
spring:
  cloud:
    config:
      #与远程仓库中配置文件的application保持一致
      name: user
      #与远程仓库中配置文件的profile保持一致
      profile: dev
      #远程仓库中版本
      label: master
      discovery:
        # 使用配置中心
        enabled: true
        # 配置中心服务id
        service-id: config-server
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
```

**启动后测试**
