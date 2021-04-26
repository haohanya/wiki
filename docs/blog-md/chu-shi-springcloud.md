# 系统架构的演变

随着互联网的发展，网站的应用规模不断扩大，需求的激增，带来的是技术上的压力。系统架构也因此在不断的演变、升级、迭代。

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591797493895.png)

## 集中式架构

当网站流量很小的时候，只需要一个应用，将所有的功能都部署到一起，以减少部署节点和成本。

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591797514846.png)

优点：系统开发速度快，维护成本低，适合开发并发要求较低的系统

缺点：单点容错率低，并发能力差

## 垂直应用架构

当访问量逐渐增大，单一应用无法满足需求，此时为了应对更高的并发和业务需求，我们根据业务功能对系统进行拆分：

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591797530176.png)

**优点**

系统拆分实现了流量分担，解决了并发问题

可以针对不同的模块进行优化

方便水平扩展，负载均衡，容错率高

**缺点**

系统之间相互独立，开发中会有很多重复代码，影响开发效率

## 分布式服务

当垂直应用越来越多的时候，应用之间交互不可避免，作为独立的服务，逐渐形成稳定的服务中心，是前段应用能更快速的影响多变的市场需求

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591797545349.png)

**优点：**将基础服务进行了抽取，系统之间互相通用，提高了代码的重用性和开发效率

**缺点：**系统之间耦合较高，调用关系复杂，难以维护

## 面向服务架构

SOA(Service Oriented Architecure)面向服务的架构：它是一种设计方法，其中包含了多个服务，服务与服务之间通过互相依赖最终提供一系列的功能。一个服务通常以独立的形式存在与操作系统进行中，各个服务之间通过网络调用。

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591797558773.png)

ESB(企业服务总线)：简单的说ESB就是一根管道，用来连接各个服务节点，为了继承不同系统，不同协议的服务，ESB做了消息的转换解释和路由工作，让不同的服务互联互通

**SOA缺点**

每个供应商的ESB产品有偏差，自身实现较为复杂；应用服务粒度较大，ESB继承整合所有的服务和协议，数据转换使得运维、测试和部署比较困难，所有的服务都通过一个通路通讯，直接降低了通信速度

(dubbo要比这个优化，系统之间通讯采用RPC这种方式，这种方式是直接使用二进制，效率比较高)

## 微服务架构

微服务架构是使用`一套小服务开发单个应用的方式或途径`，每个服务基于单一业务能力构建（职能单一），运行在自己的进程中，并使用轻量级机制通信，通常是Http API，并能够通过自动化部署机制来独立部署，这些服务可以使用不同的编程语言，以及不同的数据存储技术，并保持最低的集中式管理

(dubbo：使用RPC协议通讯，采用的就是二进制通讯，如果要使用dubbo实现系统之间的通讯，必须保证项目是java语言开发的。dubbo是不能实现跨语言平台通讯

dubbox：后来是当当网对它进行升级，让dubbo在支持RPC的同时，也支持Http API（RestAPI）通讯 )

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1591797585782.png)

API Gateway: 网关是一个服务器，是系统的唯一入口，为每个客户端提供了一个定制的API。API网关核心是，所有的客户端和消费端都通过统一的网关介入微服务，在网管层处理所有的非业务功能。如它还可以具有其他职责：身份验证、监控、负载均衡、缓存、请求分片与管理。通常网关提供RESTFUL/http的方式访问服务，而服务端通过服务注册中心进行服务注册和管理

### 微服务特点

- 单一职责：微服务中每个服务都对应唯一的业务能力,做到单一职责
- 微：微服务的服务拆分粒度很小，例如一个用户管理就可以作为一个服务，每个服务虽然小，但是“五脏俱全”
- 面向服务：每个服务都要对外暴漏Rest风格服务接口API。并不关心服务的技术实现，做到与平台和语言无关，也不限定用什么技术实现，只要提供Rest的接口即可
- 自治：服务之间相互独立，互不干扰
    - 团队独立：每个服务都可以一个独立的团队开发，人数不能过多
    - 技术独立：面向的是服务，提供Rest接口，使用什么技术没有人干涉
    - 前后端分离：采用前后端分离开发，提供统一Rest接口，后端不用再为PC、移动端开发不同的接口
    - 部署独立：服务之间虽然有调用，但是要做到服务器重启不影响其他的服务器。有利于持续集成和持续交付。每个服务都是独立的组件，可以复用、可以替换、降低了耦合度，易于维护

> 互联网精神：先上线，后迭代

微服务架构与SOA都是对系统进行了拆分；微服务架构师基于SOA思想，可以把微服务当作去除了ESB总线的SOA。ESB是SOA架构中的中心总线

# 服务调用方式

## 常见的远程调用方式

#### 1、RPC

> Remote Produce Call。基于Socket的通讯（是用最底层的方式来实现通讯，采用二进制的形式，通讯的效率最高的）。工作在会话层。自定义数据格式，速度快，效率高。早期的webservice，现在热门的dubbox，都是RPC的典型代表（只能是java语言编写的服务之间通讯）

#### 2、Http

> http其实是一种网络传输协议，基于TCP，工作在应用层，规定了数据传输的格式。现在客户端浏览器与服务器通讯基本上都是采用的http协议，也可以用来进行远程服务调用。缺点是消息封装臃肿，优势是对服务的提供和调用方没有任何技术限定（可以跨语言），自由灵活，更符合微服务的理念

> 如果你们的公司全部采用的java技术栈，那么使用dubbo作为微服务架构师一个不错的选择。
>
> 相反如果公司的技术栈多样化，而且你更加青睐于Spring家族，那么SpringCloud搭建微服务就是不二选择，在我们的项目中，会所选择SpringCloud套件，因此会使用http方式来实现微服务之间的调用

## Http客户端工具

既然微服务选择了http，那么我们就需要考虑自己来实现对请求和响应的处理，不过开源世界已经有很多的http客户端工具，能够帮助我们做这些事情，例如：

- HttpClient
- OkHttp
- URLConnection

他们之间的API各不相同，而spring也有对http的客户端工具进行了封装（这三种都有），提供了工具类：RestTemplate

## Spring的RestTemplate

> 使用spring提供的一个RestTemplate来实现http的交互

创建springboot项目

#### 1、创建业务逻辑层(user-service)

依赖

```xml
<!-- mapper启动器(准备使用mybatis作为持久层) -->
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-spring-boot-starter</artifactId>
    <version>2.0.3</version>
</dependency>
<!-- mysql驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
<!-- 为了开发方便，我这里引入lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

pojo

```java
@Data
@Table(name = "tb_user")
public class User {
    @Id
    @KeySql(useGeneratedKeys = true)
    private Long id;
    private String userName;        /*用户名*/
    private String password;        /*密码*/
    private String name;            /*姓名*/
    private Integer age;            /*年龄*/
    private Integer sex;            /*性别，1男性，2女性*/
    private Date birthday;          /*生日*/
    private String note;            /*备注*/
    private Date created;           /*创建时间*/
    private Date updated;           /*修改时间*/
}
```

mapper接口

```java
import tk.mybatis.mapper.common.Mapper;
public interface UserMapper extends Mapper<User> {
}
```

在启动类中扫描mapper

```java
@SpringBootApplication
@MapperScan(basePackages = "com.cn.mapper")
public class UserServiceApplication {
   
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

}
```

service

```java
public interface UserService {
    /**
     * 根据主键查询对象
     * @param id     主键
     * @return       对象
     */
    User getUserById(Long id);
}
-------------
@Service
public class UserServiceImpl implements UserService {
    @Autowired(required = false)
    private UserMapper userMapper;

    @Override
    public User getUserById(Long id) {
        return userMapper.selectByPrimaryKey(id);
    }
}
```

编写控制层提供Rstful接口

```java
@RestController
@RequestMapping("/user")
public class UserContorller {
    @Autowired
    private UserService userService;

    @RequestMapping("/{id}")
    public User getById(@PathVariable("id") Long id){
        return userService.getUserById(id);
    }
}
```

2、创建表现层（user-web）

pojo：同上

启动类配置RestTemplate

```java
@SpringBootApplication
public class UserWebApplication {
    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
    public static void main(String[] args) {
        SpringApplication.run(UserWebApplication.class, args);
    }
}
import com.cn.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/consumer")
public class ConsumerController {
    @Autowired
    private RestTemplate restTemplate;
    @RequestMapping("/{id}")
    public User getByid(@PathVariable("id") Long id){
        //通过http的方式实现系统之间的通讯
        String url = "http://localhost:9091/user/" + id;//这个是user-service提供的rest api风格的接口
        User user = restTemplate.getForObject(url, User.class);
        return user;
    }
}
```

> 上面的操作我们是使用user-service对外提供了根据主键查询用户的接口，然后在user-web通过RestTemplate调用service的接口
>
> 这样写会存在硬编码的问题，不方便后期维护，并且我们需要记住url的地址，如果发生改变，收不到通知，地址将会失效
>
> web层并不知道service层的状态，例如服务器宕机
>
> service层也只有一台，不具备高可用
>
> 即便是service搭建成了集群，web还需要去实现负载均衡

其实上面说的问题，概括一下就是分布式服务必然要面临的问题：

- 服务管理
    - 如何自动注册和发现
    - 如何实现状态监控
    - 如何实现动态路由
- 服务如何实现负载均衡
- 服务如何解决容灾问题
- 服务如何实现统一配置
