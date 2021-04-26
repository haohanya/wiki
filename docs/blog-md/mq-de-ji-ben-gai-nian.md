# MQ的基本概念

## MQ的概述

MQ全称 ：Message Queue（消息队列），是在消息的传输过程中保持消息的容器，多用于分布式系统之间进行通信

## MQ的优点和缺点

### 优点

- 应用解耦
- 异步提速
- 削峰填谷

### 缺点

- 系统可用性降低
- 系统复杂度提高
- 一致性问题

## 应用解耦

> 系统的耦合性越高，容错性就越低可维护性就越低

> 使用MQ使得应用解耦，提高了容错性和可维护性

## 异步提速

> 一个订单操作耗时：20+300+300+300=920ms
>
> 用户点击完成下单按钮后需要等待920ms才能得到下单成功的响应，太慢了！

> 而使用了MQ用户点击下单按钮后只需要等待25ms就能得到下单的响应，提升用户体验和系统吞吐量
>
> （吞吐量:单位时间内处理请求的数目）

## 削峰填谷

#### 削峰

> 为了提高营业额，在A系统中做了一个活动，叫：一元秒杀外星人，在活动开始后，用户反复刷新页面，并且新用户增多，请求瞬间增多每秒5000个请求
>
> 而应用A系统能每秒能处理的请求数只能是1000个，现在请求数达到5000那么A系统将会直接宕机

> 用户的请求先发送给MQ，5000个请求同时发给MQ（在MQ看来是小意思）A系统每秒从MQ中拉取1000个请求，处理完了之后再从MQ继续拉取，直到消息全部拉取完毕

#### 填谷

> 使用了MQ之后，限制效非消息的速度为1000，这样依赖，高峰期产生的数据势必会被挤压在MQ中，高峰就被消掉了，但是因为消息积压，在高峰期过后的一段时间内，消费消息的速度还是会维持在1000，直到消息消费完积压的消息，这就叫做“填谷”
>
> 使用了MQ后可以提高系统稳定性

### 小结

#### 优点小结

- 应用解耦：提高系统容错性和可维护性
- 异步提速：提升用户体验和系统吞吐量
- 削峰填谷：提高了系统的稳定性

## MQ的缺点

- 系统可用性降低
    - 系统引入的外部依赖越多，系统稳定性越差，一旦MQ宕机，就会对业务造成影响，如何保证MQ的高可用？
- 系统复杂度提高
    - MQ的加入大大增加了系统的复杂度，以前系统之间同步的远程调用，现在是通过MQ进行异步调用，如何保证消息没有被重复消费？怎么处理消息丢失的情况，那么保证消息传递的顺序性？
- 一致性问题
    - A系统处理完业务，通过MQ给B、C、D系统三个系统发送消息数据，如果B系统、C系统处理成功，但是D系统处理失败，如何保证消息数据处理的一致性呢？

## 常见的MQ产品

目前业界有很多的MQ产品，如：RabbitMQ、RocaketMQ、ActiveMQ、Kafaka、ZeroMQ、MetaMQ等等，也有公司直接使用Redis充当消息队列的案例，而这些消息队列产品各有偏重，在实际选型中，需要结合自身需求以及MQ产品的特性，综合考虑

|                | RabbitMQ                                               | ActiveMQ                     | RocketMQ                 | Kafaka                                           |
| -------------- | ------------------------------------------------------ | ---------------------------- | ------------------------ | ------------------------------------------------ |
| 公司/社区      | Rabbit                                                 | Apache                       | Alibaba                  | Apache                                           |
| 开发语言       | Erlang（二郎神）                                       | Java                         | Java                     | Java&Scala                                       |
| 协议支持       | AMQP、SMTP...                                          | REST、AMQP、STOMP...         | 自定义                   | 自定义协议、社区封装了http协议支持               |
| 客户端支持语言 | 官方支持Erlang、java、Ruby等                           | Java、C、C++、Python、PHP... | Java、C++(不成熟)        | 官方支持JAVA、社区产出了多种API，如PHP和Python等 |
| 单机吞吐量     | 万级（其次）                                           | 万级（最差）                 | 十万级（最好）           | 十万级（次之）                                   |
| 消息延迟       | 微秒级                                                 | 毫秒级                       | 毫秒级                   | 毫秒级以内                                       |
| 功能特性       | 并发能力强、性能极其好、延迟低、社区活跃、管理界面丰富 | 老牌产品、成熟度高、文档较多 | MQ功能比较完备、扩展性佳 | 支支持主要的MQ功能，毕竟是为大数据领域准备的     |

## AMQP简介

> `AMQP`：Advanced Message Queuing Protocol (高级消息队列协议)，它是一个网路协议，是应用层协议的一个开发标准，为面向消息的中间件设计。基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同的开发语言等条件限制
>
> AMQP是2006年SUN公司发布的一个规范

## RabbitMQ简介

> Rabbit技术公司（美国）基于AMQP标准开发的RabbitMQ于2007年发布V1.0版，RabbitMQ采用Erlang语言开发。
>
> Erlang语言专门为高并发和分布式统设计的一种语言，在电信领域使用广泛

- Broker:就是RabbitMQ Server，用来接收和分发消息的应用
- Virtual Host:出于多租户和安全因素设计的，把AMQP的基本组件划分到一个虚拟的分组中，雷速与网络中的namesapce概念。当多个不同的用户使用一个RabbitMQ server提供服务的时候，可以划分出多个Virtual Host，每个用户都在自己的vhost创建exchange和queue等
- Connection：生产者/消费者 和broker之间的TCP连接
- Channel：（信道）如果每一次访问RabbitMQ都建立一个Connection，在消息量大的时候建立Tcp Connection的开销将是巨大的、效率也较低。Channel是在Connection内部建立的逻辑连接，如果应用程序支持多线程，通常每个thread创建单独的channel进行通信，AMQP method包含了channel id帮助客户端和message borker识别channel，所以channel之间是完全隔离的。Channel作为轻量级的Connection极大减少了操作系统建立TCP connection的开销
- Exchange：消息达到RabbitMQ的第一站，根据分发规则，匹配查询表中的`routing key`(路由键)，分发消息到queue中去，常有的类型有：direct (点对点和activeMQ中的queue是一样的)、topic、fanout（这个和activeMQ中的topic模式是一样的）
- Queue：消息最终被送到这里等待消费者取走
- Binding：Exchange和Queue之间的虚拟连接，binding中可以包含路由键`routing key`、Binding信息被保存到exchange中的查询表中，用于消息的分发依据

## 使用Docker安装RabbitMQ

#### 拉取镜像

```powershell
docker pull rabbitmq:3.8.4-management
```

#### 通过容器启动RabbitMQ

```powershell
docker run -i -d --name=myrabbitmq -p 5672:5672 -p 15672:15672 imageid
```

#### 访问RabbitMQ

> IP:15672
>
> 用户名和密码默认都是guest

## 通过SpringBoot整合RabbitMQ

#### 创建工程

#### 配置文件

```yaml
#端口号
server:
  port: 8080
#配置rabbitMQ
spring:
  rabbitmq:
    host: 192.168.25.134
    username: guest
    password: guest
    #port: 5672
```

#### 创建Exchange

```java
@Autowired
private AmqpAdmin amqpAdmin;
/**
 * 通过代码创建exchange
 */
@Test
public void createExchange(){
    amqpAdmin.declareExchange(new DirectExchange("amqp.exchange"));
}
```

> 创建不同的消息new不同的对象即可

#### 常见Queue

```java
@Autowired
private AmqpAdmin amqpAdmin;

@Test
public void createQueue(){
    amqpAdmin.declareQueue(new Queue("amqp.queue"));
}
```

#### 绑定exchange和queue

```java
@Autowired
private AmqpAdmin amqpAdmin;

@Test
public void bindingQueueAndExchange(){
    //参数一：queue
    //参数二：是queue的类型
    //参数三：交换器
    //参数四：routing key  （路由键）
    //参数五：绑定的时候给一个初始化的消息
    amqpAdmin.declareBinding(new Binding("amqp.queue",Binding.DestinationType.QUEUE,"amqp.exchange","amqp.test",null));
}
```

#### 测试direct

```java
@Resource
private RabbitTemplate rabbitTemplate;

/**
 * 测试direct发送消息
 */
@Test
void testPublishDirect() {
    Map<String,Object> map = new HashMap<>();
    map.put("id",1);
    map.put("list", Arrays.asList("张三","李四"));
    /**
     * 参数1、exchange（交换器）通过交换器的类型，可以决定消息发送的方式，如：direct就是点对点，一个生产者对应一个消费者
     * 参数2、routingKey（路由键）  表示消息到queues中哪个地方存储
     * 参数3、路由试题
     */
    rabbitTemplate.convertAndSend("amqp.exchange","amqp.test",map);
}

/**
 * 测试direct接收消息
 */
@Test
public void testReceiveDirect(){
    //参数：queue的name
    Object convert = rabbitTemplate.receiveAndConvert("amqp.queue");
    System.out.println(convert);
    System.out.println(convert.getClass());
}
```

#### 测试fanout

```java
/**
 * 测试fanout发送消息(和activeMQ中的topic一样的)
 */
@Test
public void testPublishFanout(){
    Map<String,Object> map = new HashMap<>();
    map.put("id",1);
    map.put("list", Arrays.asList("张三","李四"));
    rabbitTemplate.convertAndSend("amqp.exchange.fanout","amqp.exchange.fanout.test",map);
}
```

#### 创建监听器

```java
@Service
public class MyListener {
    @RabbitListener(queues = "amqp.queue")
    public void receive(Map<String,Object> map){
        System.out.println("从监听器中取出消息：" + map);
    }
}
```

#### 测试topic

> 在RabbitMQ中 direct==activeMQ中的queue
>
>  fanout==activeMQ中的topic
>
>  topic 匹配模式

> .# (表示一个单词或多个单词)
>
> *. (表示匹配一个或多个单词)
