## 什么是jms

JMS（java Messaging Service）是Java平台上有关面向消息中间件的技术规范，它便于消息系统中的Java应用程序进行消息交换,并且通过提供标准的产生、发送、接收消息的接口简化企业应用的开发。

 JMS本身只定义了一系列的接口规范，是一种与厂商无关的 API，用来访问消息收发系统。它类似于 JDBC(java Database Connectivity)：这里，JDBC 是可以用来访问许多不同关系数据库的 API，而 JMS 则提供同样与厂商无关的访问方法，以访问消息收发服务。许多厂商目前都支持 JMS，包括 IBM 的 MQSeries、BEA的 Weblogic JMS service和 Progress 的 SonicMQ，这只是几个例子。 JMS 使您能够通过消息收发服务（有时称为消息中介程序或路由器）从一个 JMS 客户机向另一个 JML 客户机发送消息。消息是 JMS 中的一种类型对象，由两部分组成：报头和消息主体。报头由路由信息以及有关该消息的元数据组成。消息主体则携带着应用程序的数据或有效负载。

JMS 定义了五种不同的消息正文格式，以及调用的消息类型，允许你发送并接收以一

些不同形式的数据，提供现有消息格式的一些级别的兼容性。

TextMessage--一个字符串对象（应用最广泛的一种）

MapMessage--一套名称-值对

ObjectMessage--一个序列化的 Java 对象

BytesMessage--一个字节的数据流

StreamMessage -- Java 原始值的数据流

## JMS消息传递类型

对于消息的传递有两种类型：

一种是点对点的，即一个生产者和一个消费者一一对应；

另一种是发布/ 订阅模式，即一个生产者产生消息并进行发送后，可以由多个消费者进
行接收。

## 安装

1、上传activeMQ到服务器

2、解压 `tar -zxvf apache-activemq-5.12.0-bin.tar.gz`

3、移动文件 `mv apache-activemq-5.12.0 /usr/local/java/activemq-5.12.0`

4、进入bin `cd /usr/local/java/activemq-5.12.0/bin`

5、启动activeMQ `./activemq start`

6、访问：`ip:8161`

账号：admin

密码：admin

## JMS测试

## 点对点模式

1、引入依赖

```xml
 <dependencies>
    <dependency>
        <groupId>org.apache.activemq</groupId>
        <artifactId>activemq-client</artifactId>
        <version>5.13.4</version>
    </dependency>
</dependencies>
```

2、创建消息生产者QueueProducer

```java
public static void main(String[] args) throws JMSException {
    //1、创建工厂
    ConnectionFactory connectionFactory  = new ActiveMQConnectionFactory("tcp://192.168.25.135:61616");
    //2、获取连接
    Connection connection = connectionFactory.createConnection();
    //3、启动连接
    connection.start();
    /** 4、获取session  
    	参数1：是否启用事务 
    	参数2：消息确认模式
            AUTO_ACKNOWLEDGE = 1    自动确认
            CLIENT_ACKNOWLEDGE = 2    客户端手动确认   
            DUPS_OK_ACKNOWLEDGE = 3    自动批量确认
            SESSION_TRANSACTED = 0    事务提交并确认
	*/
    Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
    //5、创建队列对象
    Queue queue = session.createQueue("test-queue");
    //6、创建消息生产着
    MessageProducer messageProducer = session.createProducer(queue);
    //7、创建消息
    TextMessage textMessage = session.createTextMessage("测试文本内容");
    //8、发送消息
    messageProducer.send(textMessage);
    //9、关闭资源
    messageProducer.close();
    session.close();
    connection.close();
}
```

3、创建消息消费者QueueConsumer

```java
public static void main(String[] args) throws JMSException, IOException {
    //1、创建连接工厂
    ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://192.168.25.135:61616");
    //2、获取连接
    Connection connection = connectionFactory.createConnection();
    //3、启动连接
    connection.start();
    //4、获取session
    Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
    //5、创建队列对象
    Queue queue = session.createQueue("test-queue");
    //6、创建消息消费
    MessageConsumer consumer = session.createConsumer(queue);
    //7、监听消息
    consumer.setMessageListener(new MessageListener() {
        @Override
        public void onMessage(Message message) {
            TextMessage textMessage = (TextMessage) message;
            try {
                System.out.println("接收消息为："+textMessage.getText());
            } catch (JMSException e) {
                e.printStackTrace();
            }
        }
    });
    //8、等待键盘输入
    System.in.read();
    //9、关闭资源
    consumer.close();
    session.close();
    connection.close();
}
```

## 发布/订阅模式

1、消息生产者TopicProducer

```java
public static void main(String[] args) throws JMSException, IOException {
    //1、创建连接工厂
    ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://192.168.25.135:61616");
    //2、获取连接
    Connection connection = connectionFactory.createConnection();
    //3、启动连接
    connection.start();
    //4、获取session
    Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
    //5、创建主题对象
    Topic topic = session.createTopic("test-topic");
    //6、创建消息消费者
    MessageConsumer consumer = session.createConsumer(topic);
    //7、监听消息
    consumer.setMessageListener(new MessageListener() {
        @Override
        public void onMessage(Message message) {
            TextMessage textMessage = (TextMessage) message;
            try {
                System.out.println("接收消息："+textMessage.getText());
            } catch (JMSException e) {
                e.printStackTrace();
            }
        }
    });
    //8、等待键盘输入
    System.in.read();
    //9、关闭资源
    consumer.close();
    session.close();
    connection.close();
}
```

2、消息消费者TopicProducer

```java
public static void main(String[] args) throws JMSException {
    //1、创建连接工厂
    ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://192.168.25.135:61616");
    //2、获取连接
    Connection connection = connectionFactory.createConnection();
    //3、启动连接
    connection.start();
    //4、获取session
    Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
    //5、创建主题对象
    Topic topic = session.createTopic("test-topic");
    //6、创建消息生产者
    MessageProducer producer = session.createProducer(topic);
    //7、创建消息
    TextMessage topicTest = session.createTextMessage("topicTest");
    //8、发送消息
    producer.send(topicTest);
    //9、关闭资源
    producer.close();
    session.close();
    connection.close();
}
```

## spring整合jms

## 点对点模式

1、引入依赖

```xml
<!--spring-jms-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jms</artifactId>
    <version>4.2.4.RELEASE</version>
</dependency>
<!-- activemq -->
<dependency>
    <groupId>org.apache.activemq</groupId>
    <artifactId>activemq-all</artifactId>
    <version>5.11.2</version>
</dependency>
<!-- 单元测试 -->
<!-- springJunit -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>4.2.4.RELEASE</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

2、创建生产者配置文件

applicationContext-jms-producer-queue.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <!--消息生产者:点对点-->

    <context:component-scan base-package="com.springjms"/>

    <!--jms服务厂商提供的连接工厂-->
    <bean id="targetConnectionFactory" class="org.apache.activemq.ActiveMQConnectionFactory">
        <property name="brokerURL" value="tcp://192.168.25.137:61616"/>
    </bean>
    <!--spring用于管理真正的ConnectionFactory-->
    <bean id="connectionFactory" class="org.springframework.jms.connection.SingleConnectionFactory">
        <property name="targetConnectionFactory" ref="targetConnectionFactory"/>
    </bean>
    <!--spring提供的工具类-->
    <bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate">
        <constructor-arg name="connectionFactory" ref="connectionFactory"/>
    </bean>

    <!--queue-->
    <bean id="queueTextDestination" class="org.apache.activemq.command.ActiveMQQueue">
        <constructor-arg name="name" value="queue_text"/>
    </bean>
</beans>
```

3、发送消息

```java
@Component
public class QueueProducer {

    @Resource
    private JmsTemplate jmsTemplate;

    @Resource
    private Destination queueTextDestination;

    /**
     * 发送文本消息
     * @param text  发送的文本内容
     */
    public void sendTextMessage(final String text){
        jmsTemplate.send(queueTextDestination, new MessageCreator() {
            @Override
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(text);
            }
        });
    }

}
```

4、测试发送消息

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext-jms-producer-queue.xml")
public class MyTest {

    @Resource
    private QueueProducer queueProducer;

    @Test
    public void test(){
        queueProducer.sendTextMessage("Hello! queue");
    }

}
```

5、创建消费者配置文件

applicationContext-jms-consumer-queue.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--服务消费者:点对点-->

    <!--jsm服务厂商提供的连接工厂-->
    <bean id="targetConnectionFactory" class="org.apache.activemq.ActiveMQConnectionFactory">
        <property name="brokerURL" value="tcp://192.168.25.137:61616"/>
    </bean>
    <!--spring用于管理真正的ConnectionFactory-->
    <bean id="connectionFactory" class="org.springframework.jms.connection.SingleConnectionFactory">
        <property name="targetConnectionFactory" ref="targetConnectionFactory"/>
    </bean>
    <!--spring提供的工具类-->
    <bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate">
        <constructor-arg name="connectionFactory" ref="connectionFactory"/>
    </bean>

    <!--queue-->
    <bean id="queueTextDestination" class="org.apache.activemq.command.ActiveMQQueue">
        <constructor-arg name="name" value="queue_text"/>
    </bean>
    <!--监听类,用来监听mq中是否有消息-->
    <bean id="myMessageListener" class="com.springjms.MyMessageListener"/>
    <!--消息的监听器-->
    <bean class="org.springframework.jms.listener.DefaultMessageListenerContainer">
        <property name="connectionFactory" ref="connectionFactory"/>
        <property name="destination" ref="queueTextDestination"/>
        <property name="messageListener" ref="myMessageListener"/>
    </bean>
</beans>
```

6、编写监听类

```java
public class MyMessageListener implements MessageListener {
    @Override
    public void onMessage(Message message) {
        TextMessage textMessage = (TextMessage) message;
        try {
            System.out.println("接收到消息："+textMessage.getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
```

7、测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext-jms-consumer-queue.xml")
public class MyTest1 {
    @Test
    public void testQueue(){
        try {
            System.in.read();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 发布/订阅模式

1、创建生产者，在applicationContext-jms-producer-queue.xml新增内容

```xml
<!--这个是订阅模式  文本信息-->  
<bean id="topicTextDestination" class="org.apache.activemq.command.ActiveMQTopic">  
    <constructor-arg value="topic_text"/>  
</bean>
```

2、发送消息

```java
@Component
public class TopicProducer {

    @Resource
    private JmsTemplate jmsTemplate;
    @Resource
    private Destination topicTextDestination;

    /**
     * 发送消息
     * @param text
     */
    public void sendMessage(final String text){
        jmsTemplate.send(topicTextDestination, new MessageCreator() {
            @Override
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(text);
            }
        });
    }

}
```

3、测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext-jms-producer-topic.xml")
public class MyTest2 {

    @Resource
    private TopicProducer topicProducer;

    @Test
    public void test(){
        topicProducer.sendMessage("Hello! topic");
    }

}
```

4、创建消费者，在applicationContext-jms-consumer-queue.xml新增内容

```xml
<!--topic-->
<bean id="topicTextDestination" class="org.apache.activemq.command.ActiveMQTopic">
    <constructor-arg name="name" value="topic_text"/>
</bean>
<!--监听类,用来监听mq中是否有消息-->
<bean id="topicMessageListener" class="com.springjms.TopicMessageListener"/>
<!--消息的监听器-->
<bean class="org.springframework.jms.listener.DefaultMessageListenerContainer">
    <property name="connectionFactory" ref="connectionFactory"/>
    <property name="destination" ref="topicTextDestination"/>
    <property name="messageListener" ref="topicMessageListener"/>
</bean>
```

5、编写监听类

```java
public class TopicMessageListener implements MessageListener {
    @Override
    public void onMessage(Message message) {
        TextMessage textMessage = (TextMessage) message;
        try {
            System.out.println("接收到消息："+textMessage.getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
```

6、编写测试类

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext-jms-consumer-topic.xml")
public class MyTest3 {
    @Test
    public void testQueue(){
        try {
            System.in.read();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
