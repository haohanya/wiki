# RocketMQ 快速入门

## 基本概念

### 1、消息模型（Message Model）

RocketMQ主要由 Producer、Broker、Consumer 三部分组成，其中Producer 负责生产消息，Consumer 负责消费消息，Broker 负责存储消息。Broker 在实际部署过程中对应一台服务器，每个 Broker 可以存储多个Topic的消息，每个Topic的消息也可以分片存储于不同的 Broker。Message Queue 用于存储消息的物理地址，每个Topic中的消息地址存储于多个 Message Queue 中。ConsumerGroup 由多个Consumer 实例构成。

### 2、消息生产者（Producer）

负责生产消息，一般由业务系统负责生产消息。一个消息生产者会把业务应用系统里产生的消息发送到broker服务器。RocketMQ提供多种发送方式，同步发送、异步发送、顺序发送、单向发送。同步和异步方式均需要Broker返回确认信息，单向发送不需要。

### 3、消息消费者（Consumer）

负责消费消息，一般是后台系统负责异步消费。一个消息消费者会从Broker服务器拉取消息、并将其提供给应用程序。从用户应用的角度而言提供了两种消费形式：拉取式消费、推动式消费。

### 4、主题（Topic）

表示一类消息的集合，每个主题包含若干条消息，每条消息只能属于一个主题，是RocketMQ进行消息订阅的基本单位。

### 5、代理服务器（Broker Server）

消息中转角色，负责存储消息、转发消息。代理服务器在RocketMQ系统中负责接收从生产者发送来的消息并存储、同时为消费者的拉取请求作准备。代理服务器也存储消息相关的元数据，包括消费者组、消费进度偏移和主题和队列消息等。

### 6、名字服务（Name Server）

名称服务充当路由消息的提供者。生产者或消费者能够通过名字服务查找各主题相应的Broker IP列表。多个Namesrv实例组成集群，但相互独立，没有信息交换。

### 7、拉取式消费（Pull Consumer）

Consumer消费的一种类型，应用通常主动调用Consumer的拉消息方法从Broker服务器拉消息、主动权由应用控制。一旦获取了批量消息，应用就会启动消费过程。

### 8、推动式消费（Push Consumer）

Consumer消费的一种类型，该模式下Broker收到数据后会主动推送给消费端，该消费模式一般实时性较高。

### 9、生产者组（Producer Group）

同一类Producer的集合，这类Producer发送同一类消息且发送逻辑一致。如果发送的是事务消息且原始生产者在发送之后崩溃，则Broker服务器会联系同一生产者组的其他生产者实例以提交或回溯消费。

### 10、消费者组（Consumer Group）

同一类Consumer的集合，这类Consumer通常消费同一类消息且消费逻辑一致。消费者组使得在消息消费方面，实现负载均衡和容错的目标变得非常容易。要注意的是，消费者组的消费者实例必须订阅完全相同的Topic。RocketMQ 支持两种消息模式：集群消费（Clustering）和广播消费（Broadcasting）。

### 11、集群消费（Clustering）

集群消费模式下,相同Consumer Group的每个Consumer实例平均分摊消息。

### 12、广播消费（Broadcasting）

广播消费模式下，相同Consumer Group的每个Consumer实例都接收全量的消息。

### 13、普通顺序消息（Normal Ordered Message）

普通顺序消费模式下，消费者通过同一个消费队列收到的消息是有顺序的，不同消息队列收到的消息则可能是无顺序的。

### 14、严格顺序消息（Strictly Ordered Message）

严格顺序消息模式下，消费者收到的所有消息均是有顺序的。

### 15、消息（Message）

消息系统所传输信息的物理载体，生产和消费数据的最小单位，每条消息必须属于一个主题。RocketMQ中每个消息拥有唯一的Message ID，且可以携带具有业务标识的Key。系统提供了通过Message ID和Key查询消息的功能。

### 16、标签（Tag）

为消息设置的标志，用于同一主题下区分不同类型的消息。来自同一业务单元的消息，可以根据不同业务目的在同一主题下设置不同标签。标签能够有效地保持代码的清晰度和连贯性，并优化RocketMQ提供的查询系统。消费者可以根据Tag实现对不同子主题的不同消费逻辑，实现更好的扩展性。

## 技术架构

RocketMQ架构上主要分为四部分

- Producer：消息发布的角色，支持分布式集群方式部署。Producer通过MQ的负载均衡模块选择相应的Broker集群队列进行消息投递，投递的过程支持快速失败并且低延迟。
- Consumer：消息消费的角色，支持分布式集群方式部署。支持以push推，pull拉两种模式对消息进行消费。同时也支持集群方式和广播方式的消费，它提供实时消息订阅机制，可以满足大多数用户的需求。
- NameServer：NameServer是一个非常简单的Topic路由注册中心，其角色类似Dubbo中的zookeeper，支持Broker的动态注册与发现。主要包括两个功能：Broker管理，NameServer接受Broker集群的注册信息并且保存下来作为路由信息的基本数据。然后提供心跳检测机制，检查Broker是否还存活；路由信息管理，每个NameServer将保存关于Broker集群的整个路由信息和用于客户端查询的队列信息。然后Producer和Conumser通过NameServer就可以知道整个Broker集群的路由信息，从而进行消息的投递和消费。NameServer通常也是集群的方式部署，各实例间相互不进行信息通讯。Broker是向每一台NameServer注册自己的路由信息，所以每一个NameServer实例上面都保存一份完整的路由信息。当某个NameServer因某种原因下线了，Broker仍然可以向其它NameServer同步其路由信息，Producer,Consumer仍然可以动态感知Broker的路由的信息。
- BrokerServer：Broker主要负责消息的存储、投递和查询以及服务高可用保证，为了实现这些功能，Broker包含了以下几个重要子模块。
    1. Remoting Module：整个Broker的实体，负责处理来自clients端的请求。
    2. Client Manager：负责管理客户端(Producer/Consumer)和维护Consumer的Topic订阅信息
    3. Store Service：提供方便简单的API接口处理消息存储到物理硬盘和查询功能。
    4. HA Service：高可用服务，提供Master Broker 和 Slave Broker之间的数据同步功能。
    5. Index Service：根据特定的Message key对投递到Broker的消息进行索引服务，以提供消息的快速查询。

## 安装RocketMQ

**下载Broker**

https://github.com/apache/rocketmq/releases/tag/rocketmq-all-4.7.1

下载完毕之后解压到一个文件夹中

**编译**

进入项目根目录后cmd执行以下命令

```shell
mvn -Prelease-all -DskipTests clean install -U
cd distribution\target\rocketmq-4.7.1\rocketmq-4.7.1
```

**设置环境变量**

```properties
ROCKETMQ_HOME="D:\rocketmq-rocketmq-all-4.7.1\distribution\target\rocketmq-4.7.1\rocketmq-4.7.1"
NAMESRV_ADDR="localhost:9876"
```

**启动Name Server**

```shell
.\bin\mqnamesrv.cmd
```

> 启动成功后会出现：`The Name Server boot success. serializeType=JSON`

**启动Broker Server**

```shell
.\bin\mqbroker.cmd -n localhost:9876 autoCreateTopicEnable=true
```

> 启动成功后会出现：`The broker[xxxx, 192.168.199.137:10911] boot success. serializeType=JSON and name server is localhost:9876`

### 安装 RocketMQ Console (可选)

```shell
git clone https://github.com/apache/rocketmq-externals.git
cd ./rocketmq-console
mvn clean package -Dmaven.test.skip=true
cd target
java -jar rocketmq-console-ng-2.0.0.jar --server.port=12581 --rocketmq.config.namesrvAddr=127.0.0.1:9876
```

> rocketmq.config.namesrvAddr：Name Server的地址
>
> 在启动console之前，Name Server 和 Broker Server 得先启动

**访问面板**

http://localhost:12581/

## 项目搭建

**创建工程**

`rocketmq`

**引入依赖**

```xml
<!-- RocketMQ -->
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>4.7.1</version>
</dependency>

<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <scope>test</scope>
</dependency>
```

## 基本样例

### 1、Producer端发送同步消息

发送同步消息即表示生产者在发送消息时会处于阻塞状态，直到消费者消费完这条消息为止并返回一个接收的结果。这种可靠性同步地发送方式使用的比较广泛，比如：重要的消息通知，短信通知。

```java
/**
 * 发送同步消息
 */
@Test
public void sendSyncProducer() throws Exception {
    // 实例化消息生产者Producer
    DefaultMQProducer producer = new DefaultMQProducer("group1");
    // 设置NameServer的地址
    producer.setNamesrvAddr("127.0.0.1:9876");
    // 启动Producer实例
    producer.start();
    for (int i = 0; i < 10; i++) {
        // 创建消息，并指定Topic，Tag和消息体
        Message msg = new Message("topic1", "tag1",
                ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET)
        );
        // 发送消息到一个Broker
        SendResult sendResult = producer.send(msg);
        // 通过sendResult返回消息是否成功送达
        System.out.println(sendResult);
    }
    // 如果不再发送消息，关闭Producer实例。
    producer.shutdown();
}
```

### 2、发送异步消息

异步消息通常用在对响应时间敏感的业务场景，即发送端不能容忍长时间地等待Broker的响应。

```java
@Test
public void sendAsync() throws Exception{
    // 实例化消息生产者Producer
    DefaultMQProducer producer = new DefaultMQProducer("group1");
    // 设置NameServer的地址
    producer.setNamesrvAddr("localhost:9876");
    // 启动Producer实例
    producer.start();
    producer.setRetryTimesWhenSendAsyncFailed(0);

    int messageCount = 10;
    // 根据消息数量实例化倒计时计算器
    final CountDownLatch2 countDownLatch = new CountDownLatch2(messageCount);
    for (int i = 0; i < messageCount; i++) {
        final int index = i;
        // 创建消息，并指定Topic，Tag和消息体
        Message msg = new Message("topic1",
                "TagA",
                "OrderID188",
                "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
        // SendCallback接收异步返回结果的回调
        producer.send(msg, new SendCallback() {
            @Override
            public void onSuccess(SendResult sendResult) {
                System.out.printf("%-10d OK %s %n", index, sendResult.getMsgId());
            }

            @Override
            public void onException(Throwable e) {
                System.out.printf("%-10d Exception %s %n", index, e);
                e.printStackTrace();
            }
        });
    }
    // 等待5s
    countDownLatch.await(5, TimeUnit.SECONDS);
    // 如果不再发送消息，关闭Producer实例。
    producer.shutdown();
}
```

### 3、单向发送消息

这种方式主要用在不特别关心发送结果的场景，例如日志发送。

```java
@Test
public void sendOneway() throws Exception {
    // 实例化消息生产者Producer
    DefaultMQProducer producer = new DefaultMQProducer("group1");
    // 设置NameServer的地址
    producer.setNamesrvAddr("localhost:9876");
    // 启动Producer实例
    producer.start();
    for (int i = 0; i < 100; i++) {
        // 创建消息，并指定Topic，Tag和消息体
        Message msg = new Message("topic1" /* Topic */,
                "TagB" /* Tag */,
                ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */
        );
        // 发送单向消息，没有任何返回结果
        producer.sendOneway(msg);

    }
    // 如果不再发送消息，关闭Producer实例。
    producer.shutdown();
}
```

### 4、消费消息

```java
@Test
public void consumer() throws Exception {
    // 实例化消费者
    DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("group1");

    // 设置NameServer的地址
    consumer.setNamesrvAddr("127.0.0.1:9876");

    // 订阅一个或者多个Topic，以及Tag来过滤需要消费的消息
    consumer.subscribe("topic1", "*");
    // 注册回调实现类来处理从broker拉取回来的消息
    consumer.registerMessageListener(new MessageListenerConcurrently() {
        @Override
        public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
            System.out.println(msgs);
            // 标记该消息已经被成功消费
            return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
        }

    });
    // 启动消费者实例
    consumer.start();
    System.out.println("consumer start...");
    System.in.read();
}
```
