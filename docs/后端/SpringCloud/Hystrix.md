# 熔断器Hystrix

## 简介

hystrix在英文里的意思是豪猪，它的logo就是一头豪猪，刺让我想到的是自我保护，hystrix它就是一款提供保护机制额组件，它和eureka一样也是Netflix公司开发的

## 雪崩问题

微服务中，服务之间调用关系是错综复杂的，一个请求，可能需要调用多个微服务绝口才能实现，会形成非常复杂的调用链路

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592150428504.png)

> 如图：一次业务请求，需要调用A、P、H、I四个服务，这四个服务又有可能调用了其他的服务。

如果此时，某个服务出现了异常：

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592150432891.png)

例如：微服务I出现了异常，请求就会阻塞，用球请求就会得不到响应，则tomcat的这个线程就不会释放，于是越来越多的用户请求到来，越来越多额线程会阻塞

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592150437036.png)

服务器支持的线程和并发数是有限的，请求一直阻塞，会导致服务器的资源耗尽，从而导致所有额其他服务都不可用，形成雪崩效应。

这就好比：村里都用一个变压器，有一家用热得快烧水导致电路短路最终烧了电路，结果却导致村里所有家庭都无法用电（解决方案：每家每户都装一个保险丝，一家烧毁，不想赢其他家庭用电）

这也好比：一个汽车生产线，生成不同的汽车，需要的是不同的零件，若果某个零件因为种种原因无法使用，那么就会早成整台车无法装配，陷入了等待零件的状态，知道零件到位，才能继续组装件，此时如果有很多的车型都需要这个零件，那么整个工厂就将陷入等待状态，导致所有的生成都瘫痪，一个零件的剥茧范围不断的扩大.这就是雪崩

Hystrix解决的雪崩问题的手段主要是服务降级，包括：

- 线程隔离
- 服务熔断

## 线程隔离&服务降级

### 原理

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592150445282.png)

解读该图：

Hystrix为每个依赖服务调用分配一个小的线程池，如果线程池已满调用就会被立即拒绝，默认不采用排队，加速失败判定时间。

用户的请求将不再直接访问服务，而是通过线程池中的空闲线程来访问服务，如果线程池已经满了，或者是请求超时，则会进行降级处理

> （服务降级：有限保证核心服务，而非核心服务不可用或弱可用）

用户的请求故障的时候，不会被阻塞，更不会无休止的等待或者是看到系统崩溃，至少可以看到一个执行的结果（一个友好的界面）

服务降级虽然会导致请求失败，但是不会导致阻塞，而且最多会影响这个依赖服务对应的线程池中的资源，对其它服务完全没有影响。

hysrix服务降级的情况

- 线程池已满
- 请求超时

### 案例

#### 在user-web工程中依赖hystrix

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```

#### 开启熔断

在启动类上添加注解 `@EnableCircuitBreaker`

```java
@SpringBootApplication
@EnableDiscoveryClient  //开启发现服务
@EnableCircuitBreaker
public class UserWebApplication {
    ...
}
```

可以看到，类上面的注解越来越多了，在微服务中，经常引入上面的三个注解，学习一个组合注解`@SpringCloudApplication`

它的源码如下：

```java
@SpringBootApplication
@EnableDiscoveryClient
@EnableCircuitBreaker
public @interface SpringCloudApplication {
}
```

所以我们就可以直接使用该注解

```java
@SpringCloudApplication
public class UserWebApplication {
    ....
}
```

#### 编写降级逻辑

当目标服务的调用出现故障，我们希望快速失败，给用户一个友好的提示，因此需要提前编写好失败的时候的降级逻辑，使用HystrixCommand来完成

对User-web中的controller进行改造

```java
@RestController
@RequestMapping("/consumer")
public class ConsumerController {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DiscoveryClient discoveryClient;

    @RequestMapping("/{id}")
    @HystrixCommand(fallbackMethod = "queryByIdFallback")
    public User getByyid(@PathVariable("id") Long id){
        //使用负载均衡（Ribbon）
        String url = "http://user-service/user/" + id;
        return restTemplate.getForObject(url,User.class);
    }
    //熔断的方法：方法名和正常的方法名一致，参数一致
    public User queryByIdFallback(Long id){
        User user = new User();
        user.setId(id);
        user.setNote("对不起网络太用拥挤了！");
        return user;
    }
}
```

可以停掉user-service服务，在进行use-web的访问测试

说明：@HystrixCommand(fallbackMethod = "queryByIdFallback")；用来声明一个降级逻辑的方法

#### 默认的fallback

刚才是吧fallback写在了某个业务的方法上，如果这样的方法多了，就会导致每个方法都写一个fallback，实际上可能意义不大，我们就可以写默认的fallback

对controller改造

```java
@RestController
@RequestMapping("/consumer")
@DefaultProperties(defaultFallback = "defaultFallback")
public class ConsumerController {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DiscoveryClient discoveryClient;

    @RequestMapping("/{id}")
    //@HystrixCommand(fallbackMethod = "queryByIdFallback")
    @HystrixCommand
    public User getByyid(@PathVariable("id") Long id){
        //使用负载均衡（Ribbon）
        String url = "http://user-service/user/" + id;
        return restTemplate.getForObject(url,User.class);
    }
    //熔断的方法：方法名和正常的方法名一致，参数一致
    public User queryByIdFallback(Long id){
        User user = new User();
        user.setId(id);
        user.setNote("对不起网络太用拥挤了！");
        return user;
    }

    //默认服务熔断
    public User defaultFallback(){
        User user = new User();
        user.setNote("默认提示：对不起,网络太用拥挤了！");
        return user;
    }
}
```

#### 超时设置

在案例中，请求在超过1秒后都会返回错误信息，这是因为Hystirx的默认超时时间是1秒

```yml
hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 2000
```

这个配置会作用于全局所有的方法

为了演示这个效果，我先将上面的2000恢复到默认值是1000，然后修改了user-service中的service方法，给2秒的访问延迟

```java
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public User getUserById(Long id) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return userRepository.findUserById(id);
    }
}
```

接着我们再访问user-web，发现即使user-service服务是能正常提供服务，但是他们的通讯时间超过了1秒还是会出现问题。接下来，将上面的配置改为3000毫秒，接下来就能正常访问了

## 服务熔断

### 原理

在服务熔断中，使用的是熔断器，也叫断路器，英文叫：Circuit Breaker

熔断器跟家用的保险丝原理类似：当如果电路发生了短路的时候能够立即熔断电路，避免灾难的发生。在分布式系统的应用中应用服务熔断后，服务调用方可以自己进行判断哪些服务反应慢或者是存在大量的超时，可以针对这些服务进行主动熔断，防止整个系统被拖垮

Hystrix的服务熔断机制，可以实现弹性容错，当服务请求情况好转之后，可以自动重连。通过短路的方式，将后续请求直接拒绝，一段时间（默认时间是5秒）之后允许部分请求通过，如果调用成功则回到断路器关闭状态，否则将继续打开，拒绝请求的服务。
