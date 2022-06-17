在前面的代码中，使用Ribbon负载均衡功能，大大的简化了远程调用的代码

```java
@RequestMapping("/{id}")
//@HystrixCommand(fallbackMethod = "queryByIdFallback")
@HystrixCommand
public User getByyid(@PathVariable("id") Long id){
    //使用负载均衡（Ribbon）
    String url = "http://user-service/user/" + id;
    return restTemplate.getForObject(url,User.class);
}
```

如果就这样写代码的话，你会发现会有很多的重复性代码，格式基本相同，也就参数不同，那么有没有什么更优雅的方式呢

## Feign简介 

Feign可以把Rest的请求进行隐藏，伪装成类似SpringMVC的Controller一样，你不用再自己拼接url，拼接参数等等操作，一切都交给Feign去做

## 快速入门

**添加feign的依赖**

```xml
<!-- 添加feign的依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

**编写Feign的客户端**

```java
import io.mvvm.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
/**
 * Feign的客户端要和Rest API接口映射
 */
@FeignClient("user-service")
public interface UserClient {
    @GetMapping("/user/{id}")
    User queryById(@PathVariable("id") Long id);
}
```

- 首先这是一个接口，Feign会通过动态代理，帮助我们生成实现类。这点类似于mybatis的mapper
- @FeignClient，声明这是一个Feign的客户端，同时通过value属性指定服务名称
- 接口中的定义方法，完全采用SpringMVC注解，Feign会根据注解帮我们生成URL，并且访问获取结果
- @GetMapping中的/user，请不要忘记，因为Feign需要拼接访问的地址

**在consumer中的controller中使用Feign**

```java
@Autowired(required = false)
private UserClient userClient;

@RequestMapping("/{id}")
public User getByyid(@PathVariable("id") Long id){
    return userClient.queryById(id);
}
```

**在启动类上开启Feign功能**

```java
@SpringCloudApplication
@EnableFeignClients     //开启Feign功能
public class UserWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserWebApplication.class, args);
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

> Feign已经集成了Ribbon负载均衡，因此不需要自定义RestTemplate，保持原来的代码不变就行

## Feign的负载均衡

Feign本身已经集成了Ribbon依赖和自动配置

因此不需要额外引入依赖，也不要再次注册RestTemplate对象

Feign内置的Ribbon默认设置了请求超时时长，默认是1000，我们可以通过手动配置来修改这个超时时长

```yml
ribbon:
  ReadTimeout: 2000   #读取超时的时长
  ConnectionTimeout: 1000 #建立连接的超时时长
```

因为Ribbon内部有重试机制，一旦超时，会自动重新发起请求，如果不希望重试，可以添加配置:

```yml
ribbon:
  ReadTimeout: 2000   #读取超时的时长
  ConnectionTimeout: 1000 #简历连接的超时市场
  MaxAutoRetries: 0  #当前服务器的重试次数
  MaxAutoRetriesNextServer: 0  #重试多少次服务
  OkToRetryOnAllOperations: false #是否对所有的请求方式都重试
```

可以在UserServiceImpl中添加2秒的线程休眠来进行测试

## **Hystrix支持**

### **在user-web中开启hystrix**

```yml
feign:
  hystrix:
    enabled: true  #开启Feign的熔断功能
```

**定义一个类，作为fallback的处理类**

```java
import io.mvvm.client.UserClient;
import io.mvvm.domain.User;
import org.springframework.stereotype.Component;

@Component
public class UserClientFallback implements UserClient {
    @Override
    public User queryById(Long id) {
        User user = new User();
        user.setNote("用户异常");
        return user;
    }
}
```

**然后在UserFeignClient中，指定fallback类**

```java
/**
 * Feign的客户端要和Rest API接口映射
 */
@FeignClient(value = "user-service",fallback = UserClientFallback.class)
public interface UserClient {

    @GetMapping("/user/{id}")
    User queryById(@PathVariable("id") Long id);
}
```

**测试**

关掉user-service工程，查看是否会熔断服务

## **请求压缩**

Spring Cloud Feign支持对请求和响应进行GZIP压缩，以减少通信过程中的性能损耗

通过下面的参数即可以开启请求与响应的压缩功能

```yml
feign:
  compression:
    request:
      enabled: true   #开启请求压缩
    response:
      enabled: true   #开启响应压缩
```

同时，我们也可以对请求的数据类型，以及触发压缩的大小进行设置：

```yml
feign:
  hystrix:
    enabled: true  #开启Feign的熔断功能
  compression:
    request:
      enabled: true   #开启请求压缩
      mime-types: text/html,application/xml,applicatoin/json #设置压缩的数据类型
      min-request-size: 2048 #设置触发压缩的大小下限
    response:
      enabled: true   #开启响应压缩
```

## **日志级别**

在前面通过logging.level. 包名=debug来设置日志的级别，然而这个对Feign客户端来说不会产生效果，因为@FeignClient注解修改的客户端在被代理时，都会创建一个新的FeignLogger实例。我们需要额外的指定这个日志的级别才可以

**在user-web中的application.yml中添加配置**

```yml
logging:
  level:
    io.mvvm: debug
```

**在编写配置类**

```java
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration          //如果一个类上添加了注解@Configuration,那么该类的作用等同于applicationContext.xml
public class FeignConfig {
    @Bean
    Logger.Level feignLoggerLevel(){
        /*
         * None:不记路任何日志信息（默认值）
         * BASIC:仅仅记录请求的方法、url以及响应状态码和执行时间
         * HEADERS:在Basic的基础上，额外记录了请求和响应的头信息
         * FULL:记录所有的请求和响应的明细，包括头信息、请求体和元数据
         */
        return Logger.Level.FULL;
    }
}
```

**在UserClient接口类上指定配置类**

```java
/**
 * Feign的客户端要和Rest API接口映射
 */
@FeignClient(value = "user-service",fallback = UserClientFallback.class,
        configuration = FeignConfig.class)
public interface UserClient {

    @GetMapping("/user/{id}")
    User queryById(@PathVariable("id") Long id);
}
```
