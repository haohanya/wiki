## 什么是Ribbon

> Ribbon是Netflix发布的一个负载均衡器，它有助于控制Http和TCP客户端的行为。为Ribbon配置服务提供者列表后，Ribbon就可以基于某种负载均衡的算法，自动地帮助我们选择其中的一个服务给消费者。Ribbon默认负载均衡算法是轮询，除此之外还有随机等，当然实际开发中也可以自定义负载均衡的算法

## 服务之间的通讯问题

> 永远是从eureka中拉取到了服务提供者的列表，但是永远只用第一个服务，其他的服务就都闲置着了

```java
@RequestMapping("/{id}")
public User getByyid(@PathVariable("id") Long id){
    //地址从eureka中获取
    List<ServiceInstance> instancesList = discoveryClient.getInstances("user-service");
    //有可能有多个服务，我只需要拿一个
    ServiceInstance serviceInstance = instancesList.get(0);
    //组装
    String url = "http://"+ serviceInstance.getHost()+":"+serviceInstance.getPort()+"/user/" + id;
    //采用http的方式系统之间通讯
    return restTemplate.getForObject(url,User.class);
}
```

> 解决方案：通过一种算法，合理的选择其中的一个服务。可以通过编写负载均衡的算法，在多个实例列表中选择一个服务
>
> 不过Eurkea中已经集成了负载均衡组件：Ribbon（简单的修改代码即可使用）

## 实战

### 1、先启动2个user-service实例

### 2、在user-web工程中开启负载均衡

在eureka-client的包中已经集成了Ribbon，所以不需要导入新的依赖

直接修改启动类，添加开启的注解（在RestTemplate上面添加@LoadBalanced）

```java
@SpringBootApplication
@EnableDiscoveryClient  //开启发现服务
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

### 3、修改controller中获取服务的方法

```java
@RequestMapping("/{id}")
public User getByyid(@PathVariable("id") Long id){

    //使用负载均衡（Ribbon）
    String url = "http://user-service/user/" + id;
    return restTemplate.getForObject(url,User.class);
}
```

接下来测试就可以通了

关掉一个user-service后测试是否可以正常获取到服务

再启动关掉的那个user-service后关掉第二个user-service服务再测试。
