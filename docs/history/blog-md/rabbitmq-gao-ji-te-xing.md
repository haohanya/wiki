
# RabbitMQ高级特性

- RabbitMQ高级特性
    - 消息可靠性投递
    - Consumer ACK
    - 消费段限流
    - TTL
    - 死信队列
    - 延迟队列
    - 日志与监控
    - 消息可靠性分析与追踪
    - 管理
- RabbitMQ实际应用问题
    - 消息可靠性
    - 消息幂等性

## 消息可靠性投递

### 简介

> 在使用RabbitMQ的时候，作为消息的发送方希望杜绝任何消息的丢失或者是消息的投递失败场景。RabbitMQ为我们提供了两种方式开控制消息的可靠性投递模式

- confrim 确认模式
- return 退回模式

RabbitMQ真实消息投递的路径

> producer --> borker(RabbitMQ server) --> exchange --> queue --> consumer

- 消息重producer到exchange则会返回一个confirmCallback （confrim 确认模式）
- 消息从exchange到queue投递失败则会返回一个returnCallback（return 退回模式）

我们将利用这两个callback控制消息的可靠性投递

### 实战案例

#### 创建producer（生产者）

添加依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.1.7.RELEASE</version>
    </dependency>
    <!--添加rabbitmq和spring整合-->
    <dependency>
        <groupId>org.springframework.amqp</groupId>
        <artifactId>spring-rabbit</artifactId>
        <version>2.1.8.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.1.7.RELEASE</version>
    </dependency>
</dependencies>
```

添加配置文件

rabbitmq.properties

```properties
rabbitmq.host=192.168.25.134
rabbitmq.port=5672
rabbitmq.username=guest
rabbitmq.password=guest
rabbitmq.virtual-host=/
```

spring-rabbitmq-producer.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/rabbit http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">
    <!-- 加载配置文件-->
    <context:property-placeholder location="classpath:rabbitmq.properties"/>
    <!-- 定义rabbitmq connectionFactroy -->
    <rabbit:connection-factory id="connectionFactory" host="${rabbitmq.host}"
                               port="${rabbitmq.port}"
                               username="${rabbitmq.username}"
                               password="${rabbitmq.username}"
                               virtual-host="${rabbitmq.virtual-host}"
                               publisher-confirms="true" publisher-returns="true"/>
    <!-- 定义管理交换机、队列 -->
    <rabbit:admin connection-factory="connectionFactory"/>

    <!-- 定义rabbitTemplate对象操作消息 -->
    <rabbit:template id="rabbitTemplate" connection-factory="connectionFactory"/>

    <!-- 消息可靠性投递 -->
    <rabbit:queue id="test_queue_confirm" name="test_queue_confirm"/>
    <!-- 创建交换器，并且绑定queue-->
    <rabbit:direct-exchange name="test_exchange_confirm">
        <rabbit:bindings>
            <rabbit:binding queue="test_queue_confirm" key="confirm"/>
        </rabbit:bindings>
    </rabbit:direct-exchange>
</beans>
```

#### 测试确认模式

```java
package com.cn.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring-rabbitmq-producer.xml")
public class ProducerTest {

    @Resource
    private RabbitTemplate rabbitTemplate;
    /**
     * 测试确认模式
     *  思路：
     *      1、开启确认模式
     *      2、定义confirmCallback 回调函数
     **/
    @Test
    public void testConfirm(){
        //1、开启确认模式
        rabbitTemplate.setMandatory(true);
        //2、定义回调函数(confirmCallback：消息从producer到exchange的可靠性)
        rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {
            /**
             *
             * @param correlationData   相关配置信息
             * @param b     exchange交换机是否成功收到消息，如果为true则成功，false失败
             * @param s     表示失败的原因
             */
            @Override
            public void confirm(CorrelationData correlationData, boolean b, String s) {
                System.out.println("confirm方法被执行了...");
                if(b){
                    //消息成功接收
                    System.out.println("消息发送成功："+s);
                }else{
                    //消息接收失败
                    System.out.println("消息发送失败:"+s);
                    //做一些业务处理，如:让消息再次发送，在实际开发中消息发送失败后需要再次发送
                }
            }
        });
        //发送消息
        rabbitTemplate.convertAndSend("test_exchange_confirm","confirm","message confirm....");
    }

}
```

测试结果

如果是正确的，那么会走消息发送成功的逻辑，如果失败了，会执行消息发送失败的逻辑

#### 测试回退模式

```java
/**
 * 测试回退模式：测试从exchange到queue的消息可靠性
 * 会退模式:当消息噶给exchange之后，exchange路由到queue有可能会失败的，如果失败会执行returnCallback
 * 步骤：
 *      1、开启回退模式
 *      2、设置returnCallBack
 *      3、设置exchange消息处理模式
 */
@Test
public void testReturn(){

    //1、开启回退模式
    rabbitTemplate.setMandatory(true);
    //2、设置ReturnCallBack
    rabbitTemplate.setReturnCallback(new RabbitTemplate.ReturnCallback() {
        /**
         *
         * @param message   消息对象
         * @param i         错误代码
         * @param s         错误信息
         * @param s1        交换器
         * @param s2        路由键
         */
        @Override
        public void returnedMessage(Message message, int i, String s, String s1, String s2) {
            System.out.println("return被执行了");
            System.out.println("消息对象："+message);
            System.out.println("错误代码："+i);
            System.out.println("错误信息："+s);
            System.out.println("出错的交换器："+s1);
            System.out.println("出错的路由键："+s2);
        }
    });
    //3、发送消息
    rabbitTemplate.convertAndSend("test_exchange_confirm","confirm111","message confirm....");

}
```

> 正常情况下是不会执行returnCallBack方法的，只有在出错的情况下才会执行，测试时可以手动将路由键给修改为错误的再测试

### 小结

- 设置ConnectionFactroy的publisher-confrim="true"开启确认模式
    - 使用rabbitTemplate.setConfirmCallback设置回调函数，当消息发送到exchange之后回调confirm方法。在方法中去判断ack，如果未true则表示发送成功，如果未false，表示发送失败需要去处理
- 设置ConnectionFatroy的publisher-returns="true"开启回退模式
    - 使用rabbitTemplate.setReturnCallback设置退回函数，当消息从exchange路由到queue失败后，如果设置了rabbitTemplate.setMandatory(true)参数，则会将消息回退给producer，并且执行returnedMessage方法
- 在RabbitMQ中提供了事务的机制来解决消息投递可靠性的问题，但是性能较差，实际开发中并不适用

## Consumer ACK

### 介绍

> ack：acknowledge 确认表示消费段收到消息后的确认方式

确认方式一共有三种

acknowledge="none" 自动

acknowledge="manual" 手动确认

acknowledge="auto" 根据异常情况确认（这种方式使用起来很麻烦，开发中基本不用）

> 其中自动确认是指：当消息一旦被Consumer接收到，则自动确认手动，并且将message从RabbitMQ的消息缓存中移除，但是实际业务处理中，很可能消息接收到了，但是业务处理出现了异常，那么该消息就丢失了。
>
> 如果设置了手动确认方式，则需要在业务处理成功后调用channel.basicAck() 手动签收，如果出现异常，则调用channel.basicNack()方法，让其自动重新发送消息

### 创建consumer工程

#### 添加依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.1.7.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.amqp</groupId>
        <artifactId>spring-rabbit</artifactId>
        <version>2.1.8.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.1.7.RELEASE</version>
    </dependency>
</dependencies>
```

#### 编写配置文件

spring-rabbitmq-consumer.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:rabbit="http://www.springframework.org/schema/rabbit"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/rabbit
       http://www.springframework.org/schema/rabbit/spring-rabbit.xsd">

    <!-- 加载配置文件-->
    <context:property-placeholder location="classpath:rabbitmq.properties"></context:property-placeholder>
    <!-- 定义rabbitmq connectionFactroy -->
    <rabbit:connection-factory id="connectionFactory" host="${rabbitmq.host}"
                               port="${rabbitmq.port}"
                               username="${rabbitmq.username}"
                               password="${rabbitmq.username}"
                               virtual-host="${rabbitmq.virtual-host}"
                               publisher-confirms="true" publisher-returns="true"></rabbit:connection-factory>

    <!-- 添加包扫描，方便后期监听器交给spirng管理 -->
    <context:component-scan base-package="com.cn.listener"></context:component-scan>

    <!-- 定义监听器容器 -->
    <rabbit:listener-container connection-factory="connectionFactory">
        <rabbit:listener ref="ackListener" queue-names="test_queue_confirm"></rabbit:listener>
    </rabbit:listener-container>
</beans>
```

#### rabbitmq.properties

```properties
rabbitmq.host=192.168.25.134
rabbitmq.port=5672
rabbitmq.username=guest
rabbitmq.password=guest
rabbitmq.virtual-host=/
```

#### 编写监听类

```java
package com.cn.listener;

import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.stereotype.Component;

@Component
public class AckListener implements MessageListener {
    public void onMessage(Message message) {
        System.out.println(message.getBody());
    }

    public void containerAckMode(AcknowledgeMode mode) {

    }
}
```

#### 编写测试类

```java
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring-rabbitmq-consumer.xml")
public class ConsumerTest {
    //为了实现监听的效果，写个死循环，一直读取配置文件
    @Test
    public void test(){
        while (true) {

        }
    }
}
```

> 从消息生产者工程中发送一个消息，然后在消费者工程里就可以接收到消息了

### 手动签收

上面默认就是自动签收

修改配置文件为手动签收

```xml
<!-- 定义监听器容器   acknowledge="manual":表示手动签收 -->
<rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual">
    <rabbit:listener ref="ackListener" queue-names="test_queue_confirm"></rabbit:listener>
</rabbit:listener-container>
```

在consumer中启动ack机制

```java
package com.cn.listener;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.amqp.rabbit.listener.api.ChannelAwareMessageListener;
import org.springframework.stereotype.Component;

/**
 * Consumer ACK机制:
 *  1.设置手动签收：acknowledge="manual"
 *  2.让监听器实现ChannelAwareMessageListener接口
 *  3.如果消息处理成功，则调用channel的basicAck()签收
 *  4.如果消息处理失败，则调用channel的basicNack()拒绝签收， rabbitMQ Server就会重新发消息给consumer
 */
@Component
public class AckListener implements ChannelAwareMessageListener {

    public void onMessage(Message message, Channel channel) throws Exception {
        //默认是自动签收
        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        try{
            //1.接收消息
            System.out.println(new String(message.getBody()));

            //2.处理业务
            int i = 3 / 0;//模拟业务出现问题
            //3.如果业务处理成功，那么就签收
            channel.basicAck(deliveryTag,true);
        }catch (Exception e){
            /**
             * 4.拒绝签收
             *   第三个参数：为true表示该消息重新会到queue中，borker会重新发送该消息给消费端
             */
            channel.basicNack(deliveryTag,true,true);
        }
    }

    public void onMessage(Message message) {

    }

    public void containerAckMode(AcknowledgeMode mode) {

    }
}
```

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592394012183.png)

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592394021546.png)

### 小结

在`rabbit:listener-container`标签中设置`acknowledge="manual"`，表示采用手动签收

如果消费者没有出现异常，则调用`channel.basicAck(deliveryTag,true);`签收消息，那么消息才会从rabbitmq中删除

如果在消费者出现了异常，则在catch中调用`channel.basicNack(deliveryTag,true,true);`拒绝消息，让MQ重新发送消息

消息的可靠性如何保证？

1.持久化

 exchange要持久化

 queue要持久化

 message要持久化

2.生产方确认Confirm

3.消费方要Ack

4.Broker高可用（rabbitMQ要搭建集群）

## 消费端限流

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592394033136.png)

### 编写listener

```java
package com.cn.listener;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.listener.api.ChannelAwareMessageListener;
import org.springframework.stereotype.Component;

/**
 * 限流机制:
 *  1.确保ack机制为手动确认
 *  2.listener-container中配置 prefetch="1"，表示消费端每次从mq去拉去一条消息来消费，知道手动确认消息消费完毕后，才会继续去拉去洗一条消息
 */
@Component
public class QosListener implements ChannelAwareMessageListener {
    public void onMessage(Message message, Channel channel) throws Exception {
        Thread.sleep(1000);
        //1.获取消息
        System.out.println(new String(message.getBody()));

        //2. 处理业务逻辑

        //3.签收
        channel.basicAck(message.getMessageProperties().getDeliveryTag(),true);
    }

    public void onMessage(Message message) {

    }

    public void containerAckMode(AcknowledgeMode mode) {

    }
}
```

### 编写配置文件

```xml
<!-- 定义监听器容器   acknowledge="manual":表示手动签收 -->
<rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual" prefetch="1">
    <!--<rabbit:listener ref="ackListener" queue-names="test_queue_confirm"></rabbit:listener>-->
    <rabbit:listener ref="qosListener" queue-names="test_queue_confirm"></rabbit:listener>
</rabbit:listener-container>
```

### 测试

> 先通过producer发送10条消息到rabbitmq，然后启动consumer，发现是可以正常消费的，然后将prefetch="3"，表示每次从rabbitmq拉取3条消息，再将签收注释掉，会发现一次性拉取了3条消息

### 小结

在listener-container中设置prefetch可以设置消费端一次性可以拉取多少条消息

消费段一定要使用ack模式（手动签收）

根据系统的承载量决定每次拉取多少消息

## TTL

### 简介

> TTL：Time To Live（存活时间/过期时间）
>
> 当消息到达存活时间后，还没有被消费，会被自动清除
>
> RabbitMQ可以对消息设置过期时间，也可也对整个队列（Queue）设置过期时间

### 应用场景

> 问题1:如果用户下了订单后，并没有及时的支付，那么库存是一致归下了订单的用户，还是需要归还？需要
>
> 问题2：如何归还库存？
>
>  一般的情况下，设置一个定时任务，每天凌晨1-3点之间执行，查看你的订单是否在24小时内支付了，如果没有支付，那么将库存返回
>
>  如果 是秒杀情况下，用户的需求就是如果下了订单后，半小时没有支付，就返回库存（可以使用Spring Task每隔一段时间查询一次订单表和支付记录表，查询结果的是半个小时没有支付，那么返回库存）
>
> 问题3：那么定时任务设置时间间隔多少合适？
>
>  如果是1分钟执行一次，（如：10点开始，10：10秒杀了一件商品），肯定是可以的，但毫无疑问存在时间的误差（误差1分钟可以接收），但查询数据库太频繁，肯定非常影响系统的性能

### producer中配置ttl

```xml
<!-- ttl -->
<rabbit:queue name="test_queue_ttl" id="test_queue_ttl">
    <!-- 设置queue的参数   注意一定要加value-type,因为类型默认是string，如果不设置就会出现类型错误 -->
    <rabbit:queue-arguments>
        <entry key="x-message-ttl" value="10000" value-type="java.lang.Integer"></entry>
    </rabbit:queue-arguments>
</rabbit:queue>

<!-- 声明一个topic交换机 -->
<rabbit:topic-exchange name="test_exchange_ttl">
    <rabbit:bindings>
        <rabbit:binding pattern="ttl.#" queue="test_queue_ttl"></rabbit:binding>
    </rabbit:bindings>
</rabbit:topic-exchange>
```

### 在producer的测试类中编码

```java
/**
 * TTL：过期时间
 * 步骤：
 *      1.队列统一过期
 */
@Test
public void testTtl(){
    for(int i = 0; i < 10; i++){
        rabbitTemplate.convertAndSend("test_exchange_ttl","ttl.hello","message ttl....");
    }
}
```

> 在执行后，可以看到10秒钟后，queue中的消息就消失了

### 可以单独设置过期时间

```java
/**
 * TTL：过期时间
 * 步骤：
 *      1.队列统一过期
 *
 *      2.单独设置过期
 */
@Test
public void testTtl(){
    //一：统一过期
//        for(int i = 0; i < 10; i++){
//            rabbitTemplate.convertAndSend("test_exchange_ttl","ttl.hello","message ttl....");
//        }
    MessagePostProcessor messagePostProcessor = new MessagePostProcessor() {
        public Message postProcessMessage(Message message) throws AmqpException {
            //1.设置message的消息
            message.getMessageProperties().setExpiration("5000");//消息的过期时间，单位字符串
            //2.返回该消息
            return message;
        }
    };
    //消息单独过期
    for(int i = 0; i < 10; i++){
        if(i == 5){
            //这条消息就单独过期(过期时间是5秒)
            rabbitTemplate.convertAndSend("test_exchange_ttl","ttl.hehe","message ttl....",messagePostProcessor);
        } else {
            //其他的过期时间默认的
            rabbitTemplate.convertAndSend("test_exchange_ttl","ttl.hello","message ttl....");
        }
    }
}
```

## 死信队列

### 什么是死信队列

> 死信队列 （英文缩写：DLX），在RabbitMQ中叫 Dead Letter Exchange（死信交换机），当消息成为Dead Message之后，可以被重新发送到另一个交换机中，这个交换机就叫DLX
> ![img]()

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592394048788.png)

### 消息在什么情况下会成功死信

消息成为死信有三种情况

- 队列消息长度达到限制
- 消费者拒绝消费消息，并且不把消息重新放入到原目标队列中（requeue=false）
- 原队列存在消息过期设置，消息到达时间没有被消费

### 队列如何绑定死信交换器

BVCXVBNM,MNBGVCX队列绑定死信交换机 ：

consumer中的配置死信

```xml
<!--
    死信队列:
        1.声明一个正常的队列（test_queue_dlx） 和官换机(test_exchange_dlx)
        2.声明死信队列(queue_dlx) 和死信交换机(exchange_dlx)
-->
<!-- 1.声明一个正常的队列（test_queue_dlx） 和官换机(test_exchange_dlx)  -->
<rabbit:queue name="test_queue_dlx" id="test_queue_dlx">
    <!-- 将正常的队列绑定死信交换机 -->
    <rabbit:queue-arguments>
        <!-- x-dead-letter-exchange:死信交换机名 -->
        <entry key="x-dead-letter-exchange" value="exchange_dlx"/>
        <!-- 发送给死信交换机的routing key -->
        <entry key="x-dead-letter-routing-key" value="dlx.hehe"/>

        <!-- 设置队列的过期时间ttl -->
        <entry key="x-message-ttl" value="10000" value-type="java.lang.Integer" />
        <!-- 设置队列的长度限制 -->
        <entry key="x-max-length" value="10" value-type="java.lang.Integer"/>
    </rabbit:queue-arguments>
</rabbit:queue>
<rabbit:topic-exchange name="test_exchange_dlx">
    <rabbit:bindings>
        <rabbit:binding pattern="test.dlx.#" queue="test_queue_dlx"></rabbit:binding>
    </rabbit:bindings>
</rabbit:topic-exchange>

<!-- 声明死信队列(queue_dlx) 和死信交换机(exchange_dlx) -->
<rabbit:queue name="queue_dlx" id="queue_dlx"></rabbit:queue>
<rabbit:topic-exchange name="exchange_dlx">
    <rabbit:bindings>
        <rabbit:binding pattern="dlx.#" queue="queue_dlx"></rabbit:binding>
    </rabbit:bindings>
</rabbit:topic-exchange>
```

在consumer中测试

```java
@Test
public void testDlx(){
    //1. 测试过期时间，到了过期就会到死信中（不启动消费者）
    //rabbitTemplate.convertAndSend("test_exchange_dlx","test.dlx.haha","我是一条消息，我会死吗？");
    //2.测试长度超过上限后，多余的进入到死信中
//        for(int i = 0; i < 20; i++){
//            rabbitTemplate.convertAndSend("test_exchange_dlx","test.dlx.haha","我是一条消息，我会死吗？");
//        }

    //3. 测试消息拒收
    rabbitTemplate.convertAndSend("test_exchange_dlx","test.dlx.haha","我是一条消息，我会死吗？");
}
```

在consumer中拒收消息

```java
package com.cn.listener;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.listener.api.ChannelAwareMessageListener;
import org.springframework.stereotype.Component;

@Component
public class DlxListener implements ChannelAwareMessageListener {
    public void onMessage(Message message, Channel channel) throws Exception {
        //默认是自动签收
        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        try{
            //1.接收消息
            System.out.println(new String(message.getBody()));

            //2.处理业务
            int i = 3 / 0;//模拟业务出现问题
            //3.如果业务处理成功，那么就签收
            channel.basicAck(deliveryTag,true);
        }catch (Exception e){
            /**
             * 4.拒绝签收
             *   第三个参数：为true表示该消息重新会到queue中，borker会重新发送该消息给消费端
             *              为false表示不重回队列，将会进入到死信队列
             */
            channel.basicNack(deliveryTag,true,false);
        }
    }

    public void onMessage(Message message) {

    }

    public void containerAckMode(AcknowledgeMode mode) {

    }
}
```

consumer的配置文件

```xml
<!-- 定义监听器容器   acknowledge="manual":表示手动签收 -->
<rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual" prefetch="3">
    <!--<rabbit:listener ref="ackListener" queue-names="test_queue_confirm"></rabbit:listener>-->
    <!--<rabbit:listener ref="qosListener" queue-names="test_queue_confirm"></rabbit:listener>-->
    <rabbit:listener ref="dlxListener" queue-names="test_queue_dlx"></rabbit:listener>
</rabbit:listener-container>
```

### 小结

- 死信交换机和死信队列和普通的没有区别
- 当消息成为死信后，如果该绑定了死信交换机，则消息会被死信交换机重新路由到死信队列
- 消息成为死信的三种情况：（消息的长度达到上线、消费者拒绝消息、元队列的消息过期到了时间未被消费）

## 队列延迟

### 什么是队列延迟

> 队列延迟：消息进入队列后不会立即被消费，只有达到指定的时间后才会被消费

需求：

- 下单后，三十分钟未支付，取消订单，回滚库存
- 新用户注册7天后，发短信问候

实现方式：

- 定时器
- 延迟队列（RabbitMQ没有）

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592394068241.png)

很可惜，在RabbitMQ中并未提供延迟队列功能

但是我们可以使用: TTL +死信队列组合来实现延迟队列的效果

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1592394080803.png)

### 生成者编码

在producer中添加配置

```xml
<!--
    延迟队列:
        1.定义正常的交换器(order_exchange) 和队列 (order_queue)
        2.定义死信交换机(order_exchange_dlx) 和队列(order_queue_dlx)
        3.绑定，设置正常的队列过期时间是30分钟  (为了方便测试，设置为10秒)
 -->
<rabbit:queue id="order_queue" name="order_queue">
    <!-- 绑定 -->
    <rabbit:queue-arguments>
        <entry key="x-dead-letter-exchange" value="order_exchange_dlx"/>
        <entry key="x-dead-letter-routing-key" value="dlx.order.cancel"/>
        <entry key="x-message-ttl" value="10000" value-type="java.lang.Integer" />
    </rabbit:queue-arguments>
</rabbit:queue>
<rabbit:topic-exchange name="order_exchange">
    <rabbit:bindings>
        <rabbit:binding pattern="order.#" queue="order_queue"></rabbit:binding>
    </rabbit:bindings>
</rabbit:topic-exchange>

<!-- 定义死信交换机-->
<rabbit:queue id="order_queue_dlx" name="order_queue_dlx"></rabbit:queue>
<rabbit:topic-exchange name="order_exchange_dlx">
    <rabbit:bindings>
        <rabbit:binding pattern="dlx.order.#" queue="order_queue_dlx"></rabbit:binding>
    </rabbit:bindings>
</rabbit:topic-exchange>
@Test
public void testDelay(){
    rabbitTemplate.convertAndSend("order_exchange","order.msg","订单信息：id=1,time=2020-6-14-17:31");
}
```

### 消费者编码

```java
package com.cn.listener;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.listener.api.ChannelAwareMessageListener;
import org.springframework.stereotype.Component;

/**
 *
 */
@Component
public class OrderListener implements ChannelAwareMessageListener {
    public void onMessage(Message message, Channel channel) throws Exception {
        //默认是自动签收
        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        try{
            //1.接收消息
            System.out.println(new String(message.getBody()));

            //2.处理业务
            System.out.println("处理业务逻辑....");
            System.out.println("根据id查询订单状态");
            System.out.println("判断其支付是否成功");
            System.out.println("如果未支付，那么业务做库存数量回滚");

            //3.如果业务处理成功，那么就签收
            channel.basicAck(deliveryTag,true);
        }catch (Exception e){
            System.out.println("出现了异常");
            /**
             * 4.拒绝签收
             *   第三个参数：为true表示该消息重新会到queue中，borker会重新发送该消息给消费端
             *              为false表示不重回队列，将会进入到死信队列
             */
            channel.basicNack(deliveryTag,true,false);
        }



    }

    public void onMessage(Message message) {

    }

    public void containerAckMode(AcknowledgeMode mode) {

    }
}
<!-- 定义监听器容器   acknowledge="manual":表示手动签收 -->
<rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual" prefetch="3">
    <!--<rabbit:listener ref="ackListener" queue-names="test_queue_confirm"></rabbit:listener>-->
    <!--<rabbit:listener ref="qosListener" queue-names="test_queue_confirm"></rabbit:listener>-->
    <!--<rabbit:listener ref="dlxListener" queue-names="test_queue_dlx"></rabbit:listener>-->
    <rabbit:listener ref="orderListener" queue-names="order_queue_dlx"></rabbit:listener>
</rabbit:listener-container>
```

## **消息可靠性保障**

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200618085314246.png)

## **消息幂等性保障**

幂等性：就指一次和多次请求某一资源，对于资源本身应该具有同样的结果，也就是说，其任意多次执行对资源本身所产生的影响均与第一次执行的影响相同

MQ中幂等性，消费多条相同的消息，得到与消费该消息一次相同的结果。

需求：张三花了2万买了一台外星人，急着通过mq去扣款，两次购买都应该扣2万，因为网络原因，消息到了MQ但是第一次失败了，第二次才成功，值成功一次，那么只应该扣2万

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200618091139690.png)

## 高可用

搭建RabbitMQ集群
