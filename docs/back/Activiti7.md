# Activiti7 工作流引擎

# 什么是工作流

## 工作流介绍

工作流(Workflow)，就是通过计算机对业务流程自动化执行管理。它主要解决的是“使在多个参与者 之间按照某种预定义的规则自动进行传递文档、信息或任务的过程，从而实现某个预期的业务目标， 或者促使此目标的实现”。

## 工作流系统

一个软件系统中具有工作流的功能，我们把它称为工作流系统，一个系统中工作流的功能是什 么？就是对系统的业务流程进行自动化管理，所以工作流是建立在业务流程的基础上，所以一个软 件的系统核心根本上还是系统的业务流程，工作流只是协助进行业务流程管理。即使没有工作流业 务系统也可以开发运行，只不过有了工作流可以更好的管理业务流程，提高系统的可扩展性。

## 适用行业

消费品行业，制造业，电信服务业，银证险等金融服务业，物流服务业，物业服务业，物业管理， 大中型进出口贸易公司，政府事业机构，研究院所及教育服务业等，特别是大的跨国企业和集团公司。

## 具体应用

1. 关键业务流程：订单、报价处理、合同审核、客户电话处理、供应链管理等
2. 行政管理类:出差申请、加班申请、请假申请、用车申请、各种办公用品申请、购买申请、日报周报等凡是原来手工流转处理的行政表单。
3. 人事管理类：员工培训安排、绩效考评、职位变动处理、员工档案信息管理等。
4. 财务相关类：付款请求、应收款处理、日常报销处理、出差报销、预算和计划申请等。
5. 客户服务类：客户信息管理、客户投诉、请求处理、售后服务管理等。
6. 特殊服务类：ISO系列对应流程、质量管理对应流程、产品数据信息管理、贸易公司报关处理、 物流公司货物跟踪处理等各种通过表单逐步手工流转完成的任务均可应用工作流软件自动规范 地实施。

## 工作流实现方式

在没有专门的工作流引擎之前，我们之前为了实现流程控制，通常的做法就是采用状态字段的值来 跟踪流程的变化情况。这样不用角色的用户，通过状态字段的取值来决定记录是否显示。

针对有权限可以查看的记录，当前用户根据自己的角色来决定审批是否合格的操作。如果合格将状 态字段设置一个值，来代表合格；当然如果不合格也需要设置一个值来代表不合格的情况。

这是一种最为原始的方式。通过状态字段虽然做到了流程控制，但是当我们的流程发生变更的时候， 这种方式所编写的代码也要进行调整。

那么有没有专业的方式来实现工作流的管理呢？并且可以做到业务流程变化之后，我们的程序可以不用改变，如果可以实现这样的效果，那么我们的业务系统的适应能力就得到了极大提升。

## 工作流实现原理分析

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1594831314123.png)

# 什么是Activiti7

## Activiti 介绍

Alfresco 软件在 2010 年 5 月17 日宣布 Activiti业务流程管理（BPM）开源项目的正式启动，其首席架构师由业务流程管理BPM的专家 Tom Baeyens 担任，Tom Baeyens 就是原来 jbpm的架构师， 而 jbpm 是一个非常有名的工作流引擎，当然 activiti也是一个工作流引擎。 Activiti 是一个工作流引擎， activiti 可以将业务系统中复杂的业务流程抽取出来，使用专门的建模语言（BPMN2.0）进行定义，业务系统按照预先定义的流程进行执行，实现了业务系统的业务 流程由 activiti进行管理，减少业务系统由于流程变更进行系统升级改造的工作量，从而提高系统的 健壮性，同时也减少了系统开发维护成本。

官方网站：https://www.activiti.org/

目前最新版本：Activiti7.0.0.Beta

## BPM

BPM（Business Process Management），即业务流程管理，是一种以规范化的构造端到端的卓越 业务流程为中心，以持续的提高组织业务绩效为目的系统化方法，常见商业管理教育如EMBA、MBA 等均将 BPM 包含在内。 企业流程管理主要是对企业内部改革，改变企业职能管理机构重叠、中间层次多、流程不闭环 等，做到机构不重叠、业务不重复，达到缩短流程周期、节约运作资本、提高企业效益的作用。

## BPM 软件

BPM软件就是根据企业中业务环境的变化，推进人与人之间、人与系统之间以及系统与系统之 间的整合及调整的经营方法与解决方案的 IT 工具。 通常以 Internet方式实现信息传递、数据同步、 业务监控和企业业务流程的持续升级优化，从而实现跨应用、跨部门、跨合作伙伴与客户的企业运 作。通过 BPM 软件对企业内部及外部的业务流程的整个生命周期进行建模、自动化、管理监控和优 化，使企业成本降低，利润得以大幅提升。 BPM 软件在企业中应用领域广泛，凡是有业务流程的地方都可以 BPM 软件进行管理，比如企业人事办公管理、采购流程管理、公文审批流程管理、财务管理等。

## BPMN

BPMN（Business Process Model And Notation）- 业务流程模型和符号 是由 BPMI（Business Process Management Initiative）开发的一套标准的业务流程建模符号，使用 BPMN 提供的符号可以 创建业务流程。 2004 年 5 月发布了 BPMN1.0 规范.BPMI 于 2005 年 9 月并入 OMG（The Object Management Group对象管理组织)组织。OMG 于 2011 年 1月发布BPMN2.0 的最终版本。

BPMN 是目前被各 BPM 厂商广泛接受的 BPM 标准。Activiti 就是使用 BPMN 2.0 进行流程建 模、流程执行管理，它包括很多的建模符号

Event 用一个圆圈表示，它是流程中运行过程中发生的事情。

活动用圆角矩形表示，一个流程由一个活动或多个活动组成

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1594831334586.png)

一个 bpmn 图形的例子： 首先当事人发起一个请假单； 其次他所在部门的经理对请假单进行审核； 然后人事经理进行复核并进行备案； 最后请假流程结束。

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1594831345172.png)

Bpmn 图形其实是通过 xml表示业务流程，上边的.bpmn 文件使用文本编辑器打开：

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" 
typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">   <process id="myProcess" name="My process" isExecutable="true"> 
    <startEvent id="startevent1" name="Start"></startEvent> 
    <userTask id="usertask1" name=" 创建请假单 "></userTask>     <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="usertask1"></sequenceFlow> 
    <userTask id="usertask2" name=" 部门经理审核 "></userTask>     <sequenceFlow id="flow2" sourceRef="usertask1" targetRef="usertask2"></sequenceFlow> 
    <userTask id="usertask3" name=" 人事复核 "></userTask>     <sequenceFlow id="flow3" sourceRef="usertask2" targetRef="usertask3"></sequenceFlow>     <endEvent id="endevent1" name="End"></endEvent>     <sequenceFlow id="flow4" sourceRef="usertask3" targetRef="endevent1"></sequenceFlow>   </process> 
  <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">     <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess"> 
      <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">         <omgdc:Bounds height="35.0" width="35.0" x="130.0" y="160.0"></omgdc:Bounds>       </bpmndi:BPMNShape>       <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">         <omgdc:Bounds height="55.0" width="105.0" x="210.0" y="150.0"></omgdc:Bounds> 
      </bpmndi:BPMNShape>       <bpmndi:BPMNShape bpmnElement="usertask2" id="BPMNShape_usertask2"> 
        <omgdc:Bounds height="55.0" width="105.0" x="360.0" y="150.0"></omgdc:Bounds>       </bpmndi:BPMNShape> 
      <bpmndi:BPMNShape bpmnElement="usertask3" id="BPMNShape_usertask3">         <omgdc:Bounds height="55.0" width="105.0" x="510.0" y="150.0"></omgdc:Bounds> 
      </bpmndi:BPMNShape>       <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1"> 
        <omgdc:Bounds height="35.0" width="35.0" x="660.0" y="160.0"></omgdc:Bounds> 
      </bpmndi:BPMNShape>       <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">         <omgdi:waypoint x="165.0" y="177.0"></omgdi:waypoint> 
        <omgdi:waypoint x="210.0" y="177.0"></omgdi:waypoint>       </bpmndi:BPMNEdge> 
      <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">         <omgdi:waypoint x="315.0" y="177.0"></omgdi:waypoint>         <omgdi:waypoint x="360.0" y="177.0"></omgdi:waypoint>       </bpmndi:BPMNEdge> 
      <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">         <omgdi:waypoint x="465.0" y="177.0"></omgdi:waypoint>         <omgdi:waypoint x="510.0" y="177.0"></omgdi:waypoint>       </bpmndi:BPMNEdge>       <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4"> 
        <omgdi:waypoint x="615.0" y="177.0"></omgdi:waypoint>         <omgdi:waypoint x="660.0" y="177.0"></omgdi:waypoint>       </bpmndi:BPMNEdge>     </bpmndi:BPMNPlane>   </bpmndi:BPMNDiagram> </definitions> 
```

## Activit 如何使用

### 1、部署 activiti

Activiti是一个工作流引擎（其实就是一堆 jar 包 API），业务系统使用activiti来对系统的业务流 程进行自动化管理，为了方便业务系统访问(操作)activiti 的接口或功能，通常将 activiti 环境与业务 系统的环境集成在一起。

### 2、流程定义

使用 activiti流程建模工具(activity-designer)定义业务流程(.bpmn文件) 。 .bpmn 文件就是业务流程定义文件，通过 xml定义业务流程。

如果使用其它公司开发的工作作引擎一般都提供了可视化的建模工具(Process Designer)用于生 成流程定义文件，建模工具操作直观，一般都支持图形化拖拽方式、多窗口的用户界面、丰富的过 程图形元素、过程元素拷贝、粘贴、删除等功能。

### 3、流程定义部署

向 activiti部署业务流程定义（.bpmn文件） 。 使用 activiti 提供的 api向 activiti 中部署.bpmn 文件（一般情况还需要一块儿部署业务流程的图 片.png）

### 4、启动一个流程实例（ProcessInstance）

启动一个流程实例表示开始一次业务流程的运行，比如员工请假流程部署完成，如果张三要请 假就可以启动一个流程实例，如果李四要请假也启动一个流程实例，两个流程的执行互相不影 响，就好比定义一个 java类，实例化两个对象一样，部署的流程就好比 java 类，启动一个流程 实例就好比 new 一个 java 对象。

### 5、用户查询待办任务(Task)

因为现在系统的业务流程已经交给 activiti管理，通过activiti就可以查询当前流程执行到哪了， 当前用户需要办理什么任务了，这些activiti帮我们管理了，而不像上边需要我们在sql语句中的where 条件中指定当前查询的状态值是多少。

### 6、用户办理任务

用户查询待办任务后，就可以办理某个任务，如果这个任务办理完成还需要其它用户办理，比如采 购单创建后由部门经理审核，这个过程也是由 activiti帮我们完成了，不需要我们在代码中硬编码指 定下一个任务办理人了。

### 7、流程结束

当任务办理完成没有下一个任务/结点了，这个流程实例就完成了。

# 环境准备

## 三个环境

第一个环境：没有加入工作流 IHRM系统 作用：主要是为 activiti工作流引擎的引入提供场景

第二个环境：activiti测试环境 作用：用于测试 activiti的 api，提供各种 service 接口。 需要创建一个数据库： 仅仅有 activiti的数据表

第三个环境：activiti应用环境，加入工作流的SaaS-IHRM系统 需要创建一个数据库： 包括 activiti的数据表和业务表（IHRM系统的表）

## 开发环境

Jdk1.8

Mysql5+

Tomcat7

Navicat

idea

## Activiti 环境

Activiti7.0.0.Beta1 默认支持 spring5

## IDEA流程设计器

在插件内搜索`actiBPM`并下载

## Activiti支持的数据库

Activiti的运行需要数据库支撑，需要安装activiti数据库，支持如下版本：

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1594831381268.png)

## 创建 mysql 数据库

```
CREATE DATABASE activiti  DEFAULT CHARACTER SET utf8; 
```

## 加入 maven 依赖的坐标

```xml
<properties>
    <slf4j.version>1.6.6</slf4j.version> 
    <log4j.version>1.2.12</log4j.version>
</properties> 
 
<dependencies>
    <dependency>
        <groupId>org.activiti</groupId>
        <artifactId>activiti-engine</artifactId>
        <version>7.0.0.Beta1</version>
    </dependency> 
    <dependency>
        <groupId>org.activiti</groupId>
        <artifactId>activiti-spring</artifactId>
        <version>7.0.0.Beta1</version>
    </dependency>
    <dependency>
        <groupId>org.activiti</groupId>
        <artifactId>activiti-bpmn-model</artifactId>
        <version>7.0.0.Beta1</version> 
    </dependency> 
    <dependency>
        <groupId>org.activiti</groupId>
        <artifactId>activiti-bpmn-converter</artifactId>
        <version>7.0.0.Beta1</version>
    </dependency> 
    <dependency> 
        <groupId>org.activiti</groupId>
        <artifactId>activiti-json-converter</artifactId>
        <version>7.0.0.Beta1</version> 
    </dependency>
     <dependency> 
        <groupId>org.activiti</groupId>
         <artifactId>activiti-bpmn-layout</artifactId> 
        <version>7.0.0.Beta1</version>
         <!--
			有个包下载不了需要手动下载jar包打包到本地
mvn install:install-file -DgroupId=com.github.jgraph -DartifactId=jgraphx -Dversion=v3.9.3 -Dpackaging=jar -Dfile=jgraphx-v3.9.3.jar
		-->
    </dependency> 
 
    <dependency>
        <groupId>org.activiti.cloud</groupId> 
        <artifactId>activiti-cloud-services-api</artifactId>
        <version>7.0.0.Beta1</version> 
    </dependency> 
 
    <dependency>
        <groupId>mysql</groupId> 
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.20</version>
    </dependency> 
 
    <dependency> 
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency> 
 
    <!-- log start -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId> 
        <version>${log4j.version}</version>
    </dependency> 
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>${slf4j.version}</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId> 
        <artifactId>slf4j-log4j12</artifactId>
        <version>${slf4j.version}</version> 
    </dependency>
    <!-- log end -->
    <dependency> 
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.4.5</version> 
    </dependency>
    <dependency> 
        <groupId>commons-dbcp</groupId>
        <artifactId>commons-dbcp</artifactId> 
       <version>1.4</version>
    </dependency> 
</dependencies> 
```

## log4j.properties

```properties
# Set root category priority to INFO and its only appender to CONSOLE.
#log4j.rootCategory=INFO, CONSOLE            debug   info   warn error fatal
log4j.rootCategory=debug, CONSOLE, LOGFILE

# Set the enterprise logger category to FATAL and its only appender to CONSOLE.
log4j.logger.org.apache.axis.enterprise=FATAL, CONSOLE

# CONSOLE is set to be a ConsoleAppender using a PatternLayout.
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
log4j.appender.CONSOLE.layout.ConversionPattern=%d{ISO8601} %-6r [%15.15t] %-5p %30.30c %x - %m\n

# LOGFILE is set to be a File appender using a PatternLayout.
log4j.appender.LOGFILE=org.apache.log4j.FileAppender
log4j.appender.LOGFILE.File=d:\axis.log
log4j.appender.LOGFILE.Append=true
log4j.appender.LOGFILE.layout=org.apache.log4j.PatternLayout
log4j.appender.LOGFILE.layout.ConversionPattern=%d{ISO8601} %-6r [%15.15t] %-5p %30.30c %x - %m\n
```

## activiti.cfg.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
	<!-- 数据库连接池 -->
    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://localhost:3306/activiti?serverTimezone=UTC&amp;useUnicode=true&amp;characterEncoding=utf8&amp;useSSL=true" />
        <property name="username" value="root" />
        <property name="password" value="root" />
        <property name="maxActive" value="3" />
        <property name="maxIdle" value="1" />
    </bean>
	<!-- processEngineConfiguration 用来创建ProcessEngine，在创建ProcessEngine 时会执行数据库的操作。  -->
    <bean id="processEngineConfiguration" class="org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration">
        <property name="dataSource" ref="dataSource"/>
        <property name="databaseSchemaUpdate" value="true"/>
    </bean>

    <!--<bean id="processEngineConfiguration" class="org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration">
        <property name="jdbcDriver" value="com.mysql.cj.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/activiti?serverTimezone=UTC&amp;useUnicode=true&amp;characterEncoding=utf8&amp;useSSL=true"/>
        <property name="jdbcUsername" value="root"/>
        <property name="jdbcPassword" value="root"/>
        <property name="databaseSchemaUpdate" value="true"/>
    </bean>-->
</beans>
```

关于 processEngineConfiguration 中的 databaseSchemaUpdate 参数，通过此参数设计 activiti 数据表的处理策略，参数如下：

false（默认）：检查数据库表的版本和依赖库的版本， 如果版本不匹配就抛出异常。

true: 构建流程引擎时，执行检查，如果需要就执行更新。 如果表不存在，就创建。

create-drop: 构建流程引擎时创建数据库表， 关闭流程引擎时删除这些表。

drop-create：先删除表再创建表。

create: 构建流程引擎时创建数据库表， 关闭流程引擎时不删除这些表。

> 注意：在 activiti.cfg.xml 配置文件中的 dataSource 和 processEngineConfiguration 也可以使用一次 性配置出来。

## 编写程序

创建 ProcessEngineConfiguration，通过 ProcessEngineConfiguration 创建 ProcessEngine，在创建 ProcessEngine 时会自动创建数据库。

```java
@Test
public void createProcessEngine(){
    ProcessEngineConfiguration configuration = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("activiti.cfg.xml");
    ProcessEngine processEngine = configuration.buildProcessEngine();
    System.out.println(processEngine);
}
```

> 1、运行以上程序段即可完成 activiti数据库创建，通过改变 activiti.cfg.xml中 databaseSchemaUpdate 参数的值执行不同的数据表处理策略。
>
> 2、上边的方法 createProcessEngineConfigurationFromResource在执行时在activiti.cfg.xml
> 中找固定的名称 processEngineConfiguration 也可以使用重载方法调用，这时可以不用限定 processEngineConfiguration名称

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1594831403282.png)

## 数据库表的命名规则

Activiti 的表都以ACT_开头。 第二部分是表示表的用途的两个字母标识。 用途也和服务的 API 对 应。_

`ACT_RE_*`: 'RE'表示 repository。 这个前缀的表包含了流程定义和流程静态资源 （图片， 规则，等等）。

`ACT_RU_*`: 'RU'表示 runtime。 这些运行时的表，包含流程实例，任务，变量，异步任务， 等运行中的数据。 Activiti只在流程实例执行过程中保存这些数据， 在流程结束时就会删 除这些记录。 这样运行时表可以一直很小速度很快。

`ACT_HI_*`: 'HI'表示 history。 这些表包含历史数据，比如历史流程实例， 变量，任务等 等。

`ACT_GE_*`: GE表示 general。通用数据， 用于不同场景下。

# Activiti 服务架构图

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1594831418165.png)

> 在新版本中，我们通过实验可以发现 IdentityService，FormService 两个Serivce 都已经删除了

## activiti.cfg.xml

activiti 的引擎配置文件，包括：ProcessEngineConfiguration 的定义、数据源定义、事务管理器等， 此文件其实就是一个 spring 配置文件，下面是一个基本的配置只配置了 ProcessEngineConfiguration 和数据源：

```xml
<!-- 数据库连接池 -->
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
    <property name="url" value="jdbc:mysql://localhost:3306/activiti?serverTimezone=UTC&amp;useUnicode=true&amp;characterEncoding=utf8&amp;useSSL=true" />
    <property name="username" value="root" />
    <property name="password" value="root" />
    <property name="maxActive" value="3" />
    <property name="maxIdle" value="1" />
</bean>
<bean id="processEngineConfiguration" class="org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration">
    <!-- 数据源 -->
    <property name="dataSource" ref="dataSource"/>
    <!-- 数据库策略 -->
    <property name="databaseSchemaUpdate" value="true"/>
</bean>
```

## ProcessEngineConfiguration

> 流程引擎的配置类，通过ProcessEngineConfiguration 可以创建工作流引擎ProceccEngine，常用的两 种方法如下：

### StandaloneProcessEngineConfiguration

通过`org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration`
Activiti 可以单独运行，使用它创建的 ProcessEngine，Activiti 会自己处理事务。

配置文件方式： 通常在 activiti.cfg.xml 配置文件中定义一个 id为 processEngineConfiguration 的 bean，这里 会使用 spring的依赖注入来构建引擎。 方法如下：

```xml
<bean id="processEngineConfiguration" 
 class="org.activiti.engine.impl.cfg.StandaloneProcessEngineConfig uration">
    <!-- 数据源 -->
    <property name="dataSource" ref="dataSource" />
    <!-- 数据库策略 -->
    <property name="databaseSchemaUpdate" value="true"/>
</bean> 
```

### SpringProcessEngineConfiguration

通过 `org.activiti.spring.SpringProcessEngineConfiguration` 与Spring 整合。

创建 spring与 activiti的整合配置文件： `activity-spring.cfg.xml`（名称不固定）

```xml
<beans xmlns="http://www.springframework.org/schema/beans"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"  xmlns:context="http://www.springframework.org/schema/context"  xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx"  xsi:schemaLocation="http://www.springframework.org/schema/beans    http://www.springframework.org/schema/beans/spring-beans-3.1.xsd    http://www.springframework.org/schema/mvc    http://www.springframework.org/schema/mvc/spring-mvc-3.1.xsd    http://www.springframework.org/schema/context    http://www.springframework.org/schema/context/spring-context-3.1.xsd    http://www.springframework.org/schema/aop    http://www.springframework.org/schema/aop/spring-aop-3.1.xsd    http://www.springframework.org/schema/tx    http://www.springframework.org/schema/tx/spring-tx-3.1.xsd "> 
 
 	<!-- 工作流引擎配置bean -->
    <bean id="processEngineConfiguration" class="org.activiti.spring.SpringProcessEngineConfiguration">   		  <!-- 数据源 -->
        <property name="dataSource" ref="dataSource" />
        <!-- 使用spring事务管理器 -->
        <property name="transactionManager" ref="transactionManager" />
        <!-- 数据库策略 -->
        <property name="databaseSchemaUpdate" value="drop-create" />
    	<!-- activiti的定时任务关闭 -->
        <property name="jobExecutorActivate" value="false" />
    </bean> 
 	<!-- 流程引擎 -->
    <bean id="processEngine" class="org.activiti.spring.ProcessEngineFactoryBean">
        <property name="processEngineConfiguration" ref="processEngineConfiguration" />
    </bean>
    <!-- 资源服务service -->
    <bean id="repositoryService" factory-bean="processEngine"   factory-method="getRepositoryService" />  	  <!-- 流程运行service -->
    <bean id="runtimeService" factory-bean="processEngine"   factory-method="getRuntimeService" />
    <!-- 任务管理service -->
    <bean id="taskService" factory-bean="processEngine"   factory-method="getTaskService" />
    <!-- 历史管理service -->  <bean id="historyService" factory-bean="processEngine"   factory-method="getHistoryService" />
    <!-- 用户管理service -->
    <bean id="identityService" factory-bean="processEngine"   factory-method="getIdentityService" />  	     <!-- 引擎管理service -->
    <bean id="managementService" factory-bean="processEngine"   factory-method="getManagementService" /> 
 	<!-- 数据源 -->
    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://localhost:3306/activiti" />
        <property name="username" value="root" />
        <property name="password" value="mysql" />
        <property name="maxActive" value="3" />
        <property name="maxIdle" value="1" />
    </bean>
    <!-- 事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource" />
    </bean> 
	<!-- 通知 -->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <!-- 传播行为 -->
            <tx:method name="save*" propagation="REQUIRED" />
            <tx:method name="insert*" propagation="REQUIRED" />
            <tx:method name="delete*" propagation="REQUIRED" />
            <tx:method name="update*" propagation="REQUIRED" />
            <tx:method name="find*" propagation="SUPPORTS" read-only="true" />
            <tx:method name="get*" propagation="SUPPORTS" read-only="true" />
        </tx:attributes>
    </tx:advice> 
     <!-- 切面，根据具体项目修改切点配置 -->
    <aop:config proxy-target-class="true">
        <aop:advisor advice-ref="txAdvice"    pointcut="execution(* cn.kgc.ihrm.service.impl.*.*(..))" />  
    </aop:config> 
</beans>
```

### 创建processEngineConfiguration

```java
ProcessEngineConfiguration configuration = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("activiti.cfg.xml");
```

上边的代码要求 activiti.cfg.xml中必须有一个 processEngineConfiguration 的 bean 也可以使用下边的方法，更改 bean 的名字：

```java
ProcessEngineConfiguration.createProcessEngineConfigurationFromResou rce(String resource, String beanName);
```

## ProcessEngine

> 工作流引擎，相当于一个门面接口，通过 ProcessEngineConfiguration 创建 processEngine，通过 ProcessEngine 创建各个 service 接口。

### 一般创建方式

```java
//通过ProcessEngineConfiguration创建ProcessEngine
ProcessEngine processEngine = processEngineConfiguration.buildProcessEngine(); 
```

### 简单创建方式

将 activiti.cfg.xml文件名及路径固定，且 activiti.cfg.xml文件中有 processEngineConfiguration 的配置，
可以使用如下代码创建 processEngine:

```java
//使用classpath下的activiti.cfg.xml中的配置创建processEngine
ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();   
System.out.println(processEngine); 
```

## Service

### Service 创建方式

通过 ProcessEngine 创建 Service，Service 是工作流引擎提供用于进行工作流部署、执行、管理的服 务接口。 方式如下：

```java
RuntimeService runtimeService = processEngine.getRuntimeService(); 
RepositoryService repositoryService = processEngine.getRepositoryService(); 
TaskService taskService = processEngine.getTaskService();
HistoryService historyService = processEngine.getHistoryService();
```

### Service 总览

> RepositoryService activiti 的资源管理类
>
> RuntimeService activiti 的流程运行管理类
>
> TaskService activiti 的任务管理类
>
> HistoryService activiti 的历史管理类
>
> ManagerService activiti 的引擎管理类

### RepositoryService

是 activiti的资源管理类，提供了管理和控制流程发布包和流程定义的操作。使用工作流建模工具设计的业务流程图需要使用此 service 将流程定义文件的内容部署到计算机。

除了部署流程定义以外还可以：

查询引擎中的发布包和流程定义。

暂停或激活发布包，对应全部和特定流程定义。 暂停意味着它们不能再执行任何操作了，激活是对应的反向操作。

获得多种资源，像是包含在发布包里的文件， 或引擎自动生成的流程图。

获得流程定义的 pojo 版本， 可以用来通过 java 解析流程，而不必通过 xml。

### RuntimeService

它是 activiti的流程运行管理类。可以从这个服务类中获取很多关于流程执行相关的信息

### TaskService

是 activiti的任务管理类。可以从这个类中获取任务的信息。

### HistoryService

是 activiti 的历史管理类，可以查询历史信息，执行流程时，引擎会保存很多数据（根据配置），比 如流程实例启动时间，任务的参与者， 完成任务的时间，每个流程实例的执行路径，等等。 这个 服务主要通过查询功能来获得这些数据。

### ManagementService

是 activiti的引擎管理类，提供了对 Activiti 流程引擎的管理和维护功能，这些功能不在工作流驱动的应用程序中使用，主要用于Activiti 系统的日常维护。

# Activiti7 入门体验

## 流程定义

### Activiti-Designer 使用

#### Palette（画板）

> 在 idea 中安装 activiti-designer 插件即可使用，画板中包括以下结点：
>
> Connection—连接
>
> Event---事件
>
> Task---任务
>
> Gateway---网关
>
> Container—容器
>
> Boundary event—边界事件
>
> Intermediate event- -中间事件
>
> 流程图设计完毕保存生成.bpmn 文件。

### 新建流程

> File --> new --> BpmnFile --> holiday.bpmn

## 绘制流程

> 在 properties 视图指定每个任务结点的负责人， 比如下边是填写请假单的负责人为 zhangsan

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1594831458917.png)

### 生成png图片

> 先将bpmn文件修改成xml文件
> 然后右键点这个xml文件，在选项中选择diagrams，然后选择show Designer
> 就可以看到流程图，然后Export to file保存png文件。

### 解决转换图片乱码问题

> 1、在idea安装目录下的bin目录找到idea64.exe.vmoptions和idea.exe.vmoptions
>
> 2、编辑器打开分别添加`-Dfile.encoding=UTF-8`
>
> 3、重启后若还是乱码，选择`Help --> Edit Custom VM Options...`
>
> 4、添加第二步内容
>
> 5、重启

## 部署流程定义

部署流程定义就是要将上边绘制的图形即流程定义（.bpmn）部署在工作流程引擎 activiti 中，方法 如下：

使用ProcessEngine 创建 RepositoryService，代码如下：

```java
/**
 * 创建RepositoryService
 */
@Test
public void createRepositoryService(){
    // 获取repositoryService
    RepositoryService repositoryService = processEngine.getRepositoryService();
    //部署对象
    Deployment deployment = repositoryService.createDeployment()
            //error ：org.activiti.bpmn.exceptions.XMLException: cvc-complex-type.2.4.a: 发现了以元素 'process' 开头的无效内容
            //.disableSchemaValidation() //禁用架构验证,如果出现上面注释的那个错误需要禁用这个
            .addClasspathResource("diagram/holiday.bpmn")// bpmn文 件
            .addClasspathResource("diagram/holiday.png")// 图片文 件
            .name("请假申请流程")
            .deploy();
    System.out.println("流程部署id:" + deployment.getId());
    System.out.println("流程部署名称:" + deployment.getName());
}
```

> 执行此操作后 activiti会将上边代码中指定的bpm 文件和图片文件保存在 activiti数据库。

## 启动一个流程实例

流程定义部署在 activiti后就可以通过工作流管理业务流程了，也就是说上边部署的请假申请流 程可以使用了。 针对该流程0，启动一个流程表示发起一个新的请假申请单，这就相当于 java类与 java 对象的关 系，类定义好后需要 new创建一个对象使用，当然可以 new 多个对象。对于请假申请流程，张三发 起一个请假申请单需要启动一个流程实例，请假申请单发起一个请假单也需要启动一个流程实例。 代码如下

```java
/**
 * 启动一个流程实例
 */
@Test
public void startProcessInstance() {
    // 获取RunTimeService
    RuntimeService runtimeService = processEngine.getRuntimeService();
    // 根据流程定义key启动流程
    ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("myProcess_1");

    System.out.println(" 流程定义id ： " + processInstance.getProcessDefinitionId());
    System.out.println("流程实例id：" + processInstance.getId());
    System.out.println(" 当前活动Id ： " + processInstance.getActivityId());
}
```

## 任务查询

流程启动后，各各任务的负责人就可以查询自己当前需要处理的任务，查询出来的任务都是该用户 的待办任务。

```java
/**
 * 查询当前个人待执行的任务
 */
@Test
public void findPersonalTaskList() {
    // 任务负责人
    String assignee = "lisi";
    // 创建TaskService
    TaskService taskService = processEngine.getTaskService();
    List<Task> list = taskService.createTaskQuery()//
            .processDefinitionKey("myProcess_1")//
            .taskAssignee(assignee)//只查询该任务负责人的任务
            .list();
    for (Task task : list) {
        System.out.println(" 流 程 实 例 id ： " + task.getProcessInstanceId());
        System.out.println("任务id：" + task.getId());
        System.out.println("任务负责人：" + task.getAssignee());
        System.out.println("任务名称：" + task.getName());
    }
}
```

## 任务处理

任务负责人查询待办任务，选择任务进行处理，完成任务

```java
/**
 * 完成任务
 * Table：act_hi_taskinst
 */
@Test
public void completTask() {
    //任务id
    String taskId = "15002";
    // 创建TaskService
    TaskService taskService = processEngine.getTaskService();
    //完成任务
    taskService.complete(taskId);
    System.out.println("完成任务id="+taskId);
}
```

# 流程定义

## 流程定义

流程定义是线下按照 bpmn2.0 标准去描述 业务流程，通常使用 activiti-explorer（web 控制台） 或 activiti-eclipse-designer 插件对业务流程进行建模，这两种方式都遵循 bpmn2.0 标准。本教程使用 activiti-eclipse-designer 插件完成流程建模。使用designer 设计器绘制流程，会生成两个文件：.bpmn 和.png

## 流程定义部署

### 什么是流程定义部署

将线下定义的流程部署到 activiti数据库中，这就是流程定义部署，通过调用 activiti的 api将流 程定义的 bpmn 和 png 两个文件一个一个添加部署到 activiti 中，也可以将两个文件打成 zip 包进行 部署。

### 单个文件部署方式

分别将 bpmn 文件和 png图片文件部署。

```java
/**
 * 单个文件部署方式
 */
@Test
public void deployProcess() {
    // 获取repositoryService
    RepositoryService repositoryService = processEngine.getRepositoryService();
    // bpmn输入流
    InputStream inputStream_bpmn = this.getClass().getClassLoader()
            .getResourceAsStream("diagram/holiday.bpmn");
    // 图片输入流
    InputStream inputStream_png = this.getClass().getClassLoader()
            .getResourceAsStream("diagram/holiday.png");
    // 流程部署对象
    Deployment deployment = repositoryService.createDeployment()
            .disableSchemaValidation() //禁用架构验证
            .addInputStream("holiday.bpmn", inputStream_bpmn)
            .addInputStream("holiday.png", inputStream_png)
            .deploy();
    System.out.println("流程部署id：" + deployment.getId());
    System.out.println("流程部署名称：" + deployment.getName());
}
```

执行此操作后 activiti会将上边代码中指定的bpm 文件和图片文件保存在 activiti数据库。

### 压缩包部署方式

将 holiday.bpmn 和 holiday.png 压缩成 zip 包。

```java
/**
 * 压缩包部署方式
 */
@Test
public void deployProcessByZip() {
    // 定义zip输入流
    InputStream inputStream = this.getClass().getClassLoader()
            .getResourceAsStream("diagram/diagram.zip");
    ZipInputStream zipInputStream = new ZipInputStream(inputStream);
    // 获取repositoryService
    RepositoryService repositoryService = processEngine.getRepositoryService();
    // 流程部署
    Deployment deployment = repositoryService.createDeployment()
            .disableSchemaValidation() //禁用架构验证
            .addZipInputStream(zipInputStream)
            .deploy();
    System.out.println("流程部署id：" + deployment.getId());
    System.out.println("流程部署名称：" + deployment.getName());
}
```

执行此操作后 activiti会将上边代码中指定的bpm 文件和图片文件保存在 activiti数据库。

### 操作数据表

流程定义部署后操作 activiti数据表如下：

`SELECT * FROM act_re_deployment` 流程定义部署表，记录流程部署信息

`SELECT * FROM act_re_procdef` 流程定义表，记录流程定义信息

`SELECT * FROM act_ge_bytearray` 资源表

> 说明： act_re_deployment 和 act_re_procdef 一对多关系，一次部署在流程部署表生成一条记录，但一次部署 可以部署多个流程定义，每个流程定义在流程定义表生成一条记录。每一个流程定义在 act_ge_bytearray会存在两个资源记录，bpmn 和 png。

> 建议：一次部署一个流程，这样部署表和流程定义表是一对一有关系，方便读取流程部署及流程定 义信息。

## 流程定义查询

查询部署的流程定义。

```java
/**
 * 流程定义查询
 */
@Test
public void queryProceccDefinition() {
    // 流程定义key
    String processDefinitionKey = "myProcess_1";
    // 获取repositoryService
    RepositoryService repositoryService = processEngine.getRepositoryService();
    // 查询流程定义
    ProcessDefinitionQuery processDefinitionQuery = repositoryService
            .createProcessDefinitionQuery();
    //遍历查询结果
    List<ProcessDefinition> list = processDefinitionQuery
            .processDefinitionKey(processDefinitionKey)
            .orderByProcessDefinitionVersion().desc().list();
    for (ProcessDefinition processDefinition : list) {
        System.out.println("------------------------");
        System.out.println(" 流 程 部 署 id ： " + processDefinition.getDeploymentId());
        System.out.println("流程定义id：" + processDefinition.getId());
        System.out.println("流程定义名称：" + processDefinition.getName());
        System.out.println("流程定义key：" + processDefinition.getKey());
        System.out.println("流程定义版本：" + processDefinition.getVersion());
    }
}
```

## 流程定义删除

删除已经部署成功的流程定义。

```java
/**
 * 删除已经部署成功的流程定义
 */
@Test
public void deleteDeployment() {
    // 流程部署id
    String deploymentId = "22501";
    // 通过流程引擎获取repositoryService
    RepositoryService repositoryService = processEngine.getRepositoryService();
    //删除流程定义，如果该流程定义已有流程实例启动则删除时出错
    repositoryService.deleteDeployment(deploymentId);
    //设置true 级联删除流程定义，即使该流程有流程实例启动也可以删除，设 置为false非级别删除方式，如果流程
    //repositoryService.deleteDeployment(deploymentId, true);
}
```

说明：

1. 使用 repositoryService 删除流程定义
2. 如果该流程定义下没有正在运行的流程，则可以用普通删除。
3. 如果该流程定义下存在已经运行的流程，使用普通删除报错，可用级联删除方法将流程及相关 记录全部删除。项目开发中使用级联删除的情况比较多，删除操作一般只开放给超级管理员使 用

## 流程定义资源查询

### 方式 1

通过流程定义对象获取流程定义资源，获取bpmn 和 png。

```java
/**
 * 流程定义资源查询 方式一
 * @throws IOException
 */
@Test
public void getProcessResources() throws IOException {
    // 流程定义id
    //Table：ACT_RE_PROCDEF
    String processDefinitionId = "myProcess_1:1:2504";
    // 获取repositoryService
    RepositoryService repositoryService = processEngine.getRepositoryService();
    // 流程定义对象
    ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
            .processDefinitionId(processDefinitionId).singleResult();
    //获取bpmn
    String resource_bpmn = processDefinition.getResourceName();
    //获取png
    String resource_png = processDefinition.getDiagramResourceName();
    // 资源信息
    System.out.println("bpmn：" + resource_bpmn);
    System.out.println("png：" + resource_png);
    File file_png = new File("d:/purchasingflow01.png");
    File file_bpmn = new File("d:/purchasingflow01.bpmn");
    // 输出bpmn
    InputStream resourceAsStream = null;
    resourceAsStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(),
            resource_bpmn);
    FileOutputStream fileOutputStream = new FileOutputStream(file_bpmn);
    byte[] b = new byte[1024];
    int len = -1;
    while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
        fileOutputStream.write(b, 0, len);
    }
    // 输出图片
    resourceAsStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(),
            resource_png);
    fileOutputStream = new FileOutputStream(file_png);
    // byte[] b = new byte[1024];
    // int len = -1;
    while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
        fileOutputStream.write(b, 0, len);
    }

}
```

### 方式 2

通过查询流程部署信息获取流程定义资源

```java
/**
 * 获取流程定义图片资源 方式二
 * @throws IOException
 */
@Test
public void getProcessResources2() throws IOException {
    //流程部署id
    String deploymentId = "2501";
    // 通过流程引擎获取repositoryService
    RepositoryService repositoryService = processEngine
            .getRepositoryService();   //读取资源名称
    List<String> resources = repositoryService.getDeploymentResourceNames(deploymentId);
    String resource_image = null;   //获取图片
    for(String resource_name :resources){
        if(resource_name.indexOf(".png")>=0){
            resource_image = resource_name;
        }
    }
    //图片输入流
    InputStream inputStream = repositoryService.getResourceAsStream(deploymentId, resource_image);
    File exportFile = new File("d:/holiday.png");
    FileOutputStream fileOutputStream = new FileOutputStream(exportFile);
    byte[] buffer = new byte[1024];
    int len = -1;
    //输出图片
    while((len = inputStream.read(buffer))!=-1){
        fileOutputStream.write(buffer, 0, len);
    }
    inputStream.close();
    fileOutputStream.close();
}
```

说明：

1. deploymentId 为流程部署 ID
2. resource_name 为 act_ge_bytearray表中 NAME_列的值
3. 使用repositoryService的getDeploymentResourceNames方法可以获取指定部署下得所有文件的名 称
4. 使用 repositoryService 的 getResourceAsStream 方法传入部署 ID和资源图片名称可以获取部署下 指定名称文件的输入流
5. 最后的将输入流中的图片资源进行输出。

## 流程历史信息的查看

即使流程定义已经删除了，流程执行的历史信息通过前面的分析，依然保存在 activiti 的 act_hi_*相 关的表中。所以我们还是可以查询流程执行的历史信息，可以通过 HistoryService 来查看相关的历史 记录。

```java
/**
 * 流程历史信息的查看
 */
@Test
public void testHistoric01(){
    HistoryService historyService = processEngine.getHistoryService();
    HistoricActivityInstanceQuery query = historyService.createHistoricActivityInstanceQuery();
    query.processInstanceId("12501");
    List<HistoricActivityInstance> list = query.list();
    for(HistoricActivityInstance ai :list){
        System.out.println(ai.getActivityId());
        System.out.println(ai.getActivityName());
        System.out.println(ai.getProcessDefinitionId());
        System.out.println(ai.getProcessInstanceId());
        System.out.println("==============================");
    }
}
```
