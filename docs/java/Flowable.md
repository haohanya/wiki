# flawable 快速入门

## pom.xml

```xml
    <dependencies>
        <!-- flowable -->
        <dependency>
            <groupId>org.flowable</groupId>
            <artifactId>flowable-engine</artifactId>
            <version>6.5.0</version>
        </dependency>
        <!-- 数据库 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.23</version>
        </dependency>

        <!-- 日志 -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.30</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.30</version>
        </dependency>
    </dependencies>
```

## main

```java
public static void main(String[] args) {
     ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
     .setDatabaseType("mysql")
     .setJdbcUrl("jdbc:mysql://127.0.0.1:3306/flowable-engine-demo?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2b8&nullCatalogMeansCurrent=true")
     .setJdbcUsername("root")
     .setJdbcPassword("root")
     .setJdbcDriver("com.mysql.cj.jdbc.Driver")
     .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);

     ProcessEngine processEngine = cfg.buildProcessEngine();
}
```

> 启动之后, 就会初始化创建表

> 控制数据库更新模式 是通过 `setDatabaseSchemaUpdate` 进行设置


## 创建流程

```java
//创建RepositoryService实例
RepositoryService repositoryService = processEngine.getRepositoryService();
// 加载流程
Deployment deployment = repositoryService.createDeployment().addClasspathResource("Holiday-request.bpmn20.xml").deploy();

System.out.println("流程ID：" + deployment.getId());
```

> 执行成功之后, 我们查询 `act_re_deployment` 表, 会看到插入的流程信息

> 以及 `act_ge_bytearray` 表的xml流程文件信息


## 启动流程实例

```java
// 创建RuntimeService实例
RuntimeService runtimeService = processEngine.getRuntimeService();
Map<String, Object> variables = new HashMap<>();
variables.put("employee", "Pan");
variables.put("nrOfHolidays", "Hello");
variables.put("description", "这是一些说明");
// 启动流程实例
ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("holidayRequest", variables);

System.out.println(processInstance.getName());
```

# 表名规则

## `ACT_RE_*` 存储静态信息

> `RE` 表示 `repository` (存储);

> `RepositoryService` 接口操作的表

> 带此前缀的表包含的是静态信息, 如: 流程定义、流程的资源(图片、规则等)


- `act_re_deployment` 部署单元信息
- `act_re_model` 模型信息
- `act_re_procdef` 已部署的流程定义

## `ACT_RU_*` 运行时的表

> `RU` 表示 runtime

> 这时运行时的表, 存储着流程变量, 用户任务, 变量, 职责(job) 等运行时数据

> flowable 只存储实例执行期间的运行时数据, 当流程结束后会将这些记录删除


- `act_ru_actinst` 运行时的 流程任务节点实例表
- `act_ru_execution` 运行时流程执行实例
- `act_ru_identitylink` 运行时用户关系表
- `act_ru_task` 运行时任务表
- `act_ru_variable` 运行时变量表
- `act_ru_entitylink`
- `act_ru_event_subscr` 运行时事件
- `act_ru_deadletter_job` 正在运行的任务表
- `act_ru_history_job` 历史作业表
- `act_ru_job` 运行时作业表
- `act_ru_suspended_job` 暂停作业表
- `act_ru_timer_job` 定时作业表

## `ACT_ID_*` 组织机构

> `ID` 表示 identity (组织机构)

> 这些表包含标识信息，如用户、用户组等


- `act_id_bytearray` 二进制数据表
- `act_id_group` 用户组信息表
- `act_id_info` 用户信息详情表
- `act_id_membership` 人与组关系表
- `act_id_priv` 权限表
- `act_id_priv_mapping` 用户或组权限关系表
- `act_id_property` 属性表
- `act_id_token` 系统登录日志表
- `act_id_user` 用户表

## `ACT_HI_*` 历史的相关数据

> `HI` 表示 history

> 这些表包含着历史的相关数据，如结束的流程实例，变量，任务等


- `act_hi_actinst` 历史的流程实例(历史节点)
- `act_hi_attachment` 历史的流程附件
- `act_hi_comment` 历史的说明性信息
- `act_hi_detail` 历史的流程运行中的细节信息
- `act_hi_entitylink`
- `act_hi_identitylink` 历史的流程运行过程中用户关系
- `act_hi_procinst` 历史的流程实例
- `act_hi_taskinst` 历史的任务实例
- `act_hi_tsk_log`
- `act_hi_varinst` 历史的流程运行中的变量信息

## `ACT_GE_*` 通用数据

> 普通数据，各种情况都使用的数据


- `act_ge_bytearray` 通用的流程定义和流程资源
- `act_ge_property` 系统相关属性

## 其他表

- `act_evt_log` 事件日志表
- `act_procdef_info` 流程定义信息

# 异常错误

```log
org.flowable.common.engine.api.FlowableException: Error initialising eventregistry data model
```

> 是因为mysql的jdbc驱动版本8.0.23, 需要将版本替换为<=8.0.22


# 表文档

## act_evt_log（事件日志）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LOG_NR_ | 主键 | NULL | NO | bigint | NULL | PRI |  |
| TYPE_ | 类型 | NULL | YES | varchar | 64 |  |  |
| PROC_DEF_ID_ | 流程定义ID | NULL | YES | varchar | 64 |  |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 |  |  |
| EXECUTION_ID_ | 执行ID | NULL | YES | varchar | 64 |  |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 |  |  |
| TIME_STAMP_ | 时间 | CURRENT_TIMESTAMP(3) | NO | timestamp | NULL |  |  |
| USER_ID_ | 用户ID | NULL | YES | varchar | 255 |  |  |
| DATA_ | 数据 | NULL | YES | longblob | 4294967295 |  |  |
| LOCK_OWNER_ | 锁定节点 | NULL | YES | varchar | 255 |  |  |
| LOCK_TIME_ | 锁定时间 | NULL | YES | timestamp | NULL |  |  |
| IS_PROCESSED_ | 是否正在执行 | 0 | YES | tinyint | NULL |  |  |


> 注：

> 1. 事件日志表
> 2. 事件日志， 默认不开启。
> 3. 从Activiti 5.16开始，引入了（试验性）的事件记录机制。记录机制基于Activiti引擎的事件机制的一般用途，并默认禁用。其思想是，来源于引擎的事件会被捕获，并创建一个包含了所有事件数据（甚至更多）的映射，提供给<br />
org.activiti.engine.impl.event.logger.EventFlusher，由它将这些数据刷入其他地方。默认情况下，使用简单的基于数据库的事件处理/刷入，会使用Jackson将上述映射序列化为JSON，并将其作为EventLogEntryEntity接口存入数据库。如果不使用事件记录，可以删除这个表。
> 4. 配置启用事件日志：processEngineConfiguration.setEnableDatabaseEventLogging(true);
> 5. 运行时启用事件日志：databaseEventLogger = new EventLogger(processEngineConfiguration.getClock()); runtimeService.addEventListener(databaseEventLogger);
> 6. 可以扩展EventLogger类。如果默认的数据库记录不符合要求，需要覆盖createEventFlusher()方法返回一个org.activiti.engine.impl.event.logger.EventFlusher接口的实例。可以通过Activiti的<br />
managementService.getEventLogEntries(startLogNr, size)?获取EventLogEntryEntity实例。<br />
容易看出这个表中的数据可以通过JSON放入大数据NoSQL存储，例如MongoDB，Elastic Search，等等。也容易看出这里使用的类<br />
（org.activiti.engine.impl.event.logger.EventLogger/EventFlusher与许多其他 EventHandler类）是可插入的，可以按你的使用场景调整<br />
（例如不将JSON存入数据库，而是将其直接发送给一个队列或大数据存储）。<br />
请注意这个事件记录机制是额外于Activiti的“传统”历史管理器的。尽管所有数据都在数据库表中，但并未对查询或快速恢复做优化。实<br />
际使用场景是末端审计并将其存入大数据存储。



## act_ge_bytearray（二进制文件）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  | 部署的文件名称，如：mail.bpmn、mail.png 、mail.bpmn20.xml |
| DEPLOYMENT_ID_ | 部署ID | NULL | YES | varchar | 64 | ACT_RE_DEPLOYMENT |  |
| BYTES_ | 字节（二进制数据） | NULL | YES | longblob | 4294967295 |  |  |
| GENERATED_ | 是否系统生成 | NULL | YES | tinyint | NULL |  | 0为用户上传， 1为系统自动生 成， 比如系统会 自动根据xml生 成png |


> 注：

> 1. 
用来保存部署文件的大文本数据

> 2. 
所有二进制内容都会保存在这个表里， 比如部署的process.bpmn20.xml, process.png, user.form, 附件， bean序列<br />
化为二进制的流程变量。

> 3. 
act_ge_property属性数据表存储整个流程引擎级别的数据,初始化表结构时，会默认插入三条记录。




## act_ge_property（全局配置文件）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NAME_ | 名称 |  | NO | varchar | 64 | PRI | schema.version schema.history next.dbid |
| VALUE_ | 值 | NULL | YES | varchar | 300 |  | 5._ create(5._) |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |


> 注：

> 1. 
全局参数， 默认三个参数next.dbid， IdGenerator区间， schema.history， 自动执行sql历史， schema.version， 当<br />
前sql版本。

> 2. 
属性数据表。存储整个流程引擎级别的数据。




## act_hi_actinst（历史节点表）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| PROC_DEF_ID_ | 流程定义ID | NULL | NO | varchar | 64 |  |  |
| PROC_INST_ID_ | 流程实例ID | NULL | NO | varchar | 64 | MUL |  |
| ACT_ID_ | 节点ID | NULL | NO | varchar | 255 |  |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 |  | 任务实例ID 其他节点类型实例ID在这里为空 |
| CALL_PROC_INST_ID_ | 调用外部的流程实例ID | NULL | YES | varchar | 64 |  |  |
| ACT_NAME_ | 节点名称 | NULL | YES | varchar | 255 |  |  |
| ACT_TYPE_ | 节点类型 | NULL | NO | varchar | 255 |  | 如startEvent、userTask |
| ASSIGNEE_ | 签收人 | NULL | YES | varchar | 255 |  | 经办人 |
| START_TIME_ | 开始时间 | NULL | NO | datetime | NULL | MUL |  |
| END_TIME_ | 结束时间 | NULL | YES | datetime | NULL | MUL |  |
| DURATION_ | 耗时 | NULL | YES | bigint | NULL |  | 毫秒值 |
| TENANT_ID_ | 多租户 |  | YES | varchar | 255 |  |  |


> 注：<br />
1.　历史活动信息。这里记录流程流转过的所有节点，与HI_TASKINST不同的是，taskinst只记录usertask内容。<br />
2.　TENANT_ID 是后续才加入的多租户


## act_hi_attachment（历史附件表）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键ID | NULL | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| USER_ID_ | 用户ID | NULL | YES | varchar | 255 |  |  |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  |  |
| DESCRIPTION_ | 描述 | NULL | YES | varchar | 4000 |  |  |
| TYPE_ | 类型 | NULL | YES | varchar | 255 |  |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 |  |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 |  |  |
| URL_ | 附件地址 | NULL | YES | varchar | 4000 |  | 附件的URL地址 |
| CONTENT_ID_ | 字节表ID | NULL | YES | varchar | 64 |  | ACT_GE_BYTEARRAY的ID |
| TIME_ | 时间 | NULL | YES | datetime | NULL |  |  |


> 注：

> 1. 
存放历史流程相关的附件。

> 2. 
时间是后续版本加入




## act_hi_comment（历史审批意见表）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| TYPE_ | 类型 | NULL | YES | varchar | 255 |  | 类型：event（事件） comment（意见） |
| TIME_ | 时间 | NULL | NO | datetime | NULL |  |  |
| USER_ID_ | 用户ID | NULL | YES | varchar | 255 |  |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 |  |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 |  |  |
| ACTION_ | 行为类型 | NULL | YES | varchar | 255 |  |  |
| MESSAGE_ | 基本内容 | NULL | YES | varchar | 4000 |  | 用于存放流程产生的信息，比如审批意见 |
| FULL_MSG_ | 全部内容 | NULL | YES | longblob | 4294967295 |  | 附件 |


> 注：

> 1. 存放历史流程的审批意见。
> 2. 行为类型。值为下列内容中的一种：AddUserLink、DeleteUserLink、AddGroupLink、DeleteGroupLink、AddComment、AddAttachment、DeleteAttachment



## act_hi_detail（历史详情信息表）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| TYPE_ | 类型 | NULL | NO | varchar | 255 |  | 类型:   FormProperty,  //表单   VariableUpdate //参数 |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 | MUL |  |
| EXECUTION_ID_ | 执行实例 | NULL | YES | varchar | 64 |  |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 | MUL |  |
| ACT_INST_ID_ | 节点实例ID | NULL | YES | varchar | 64 | ACT_HI_ACTINST |  |
| NAME_ | 名称 | NULL | NO | varchar | 255 | MUL |  |
| VAR_TYPE_ | 参数类型 | NULL | YES | varchar | 255 |  |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| TIME_ | 时间戳 | NULL | NO | datetime | NULL | MUL | 创建时间 |
| BYTEARRAY_ID_ | 字节表ID | NULL | YES | varchar | 64 | ACT_GE_BYTEARRAY |  |
| DOUBLE_ | 浮点值 | NULL | YES | double | NULL |  | 存储变量类型为Double |
| LONG_ | 长整型 | NULL | YES | bigint | NULL |  | 存储变量类型为long |
| TEXT_ | 文本值 | NULL | YES | varchar | 4000 |  | 存储变量值类型为String |
| TEXT2_ | 字符串 | NULL | YES | varchar | 4000 |  | 此处存储的是JPA持久化对象时，才会有值。此值为对象ID jpa变量text存className,text2存id |


> 注：

> 1. 历史详情表：流程中产生的变量详细，包括控制流程流转的变量，业务表单中填写的流程需要用到的变量等。
> 2. 参数类型：  jpa-entity、boolean、bytes、serializable(可序列化)、自定义type(根据你自身配置)、CustomVariableType、date、double、integer、long、null、short、string



## act_hi_identitylink (历史流程人员表)
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| GROUP_ID_ | 用户组ID | NULL | YES | varchar | 255 |  |  |
| TYPE_ | 类型 | NULL | YES | varchar | 255 |  | 类型，主要分为以下几种： assignee、candidate、owner、starter 、participant |
| USER_ID_ | 用户ID | NULL | YES | varchar | 255 | MUL |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 | MUL |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 | MUL |  |


> 注：

> 1. 任务参与者数据表。主要存储当前节点参与者的信息。



## act_hi_procinst（流程实例历史*核心表）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| PROC_INST_ID_ | 流程实例ID | NULL | NO | varchar | 64 | UNI |  |
| BUSINESS_KEY_ | 业务标识 | NULL | YES | varchar | 255 | MUL | 业务主键，业务表单的ID |
| PROC_DEF_ID_ | 流程实例ID | NULL | NO | varchar | 64 |  |  |
| START_TIME_ | 开始时间 | NULL | NO | datetime | NULL |  |  |
| END_TIME_ | 结束时间 | NULL | YES | datetime | NULL | MUL |  |
| DURATION_ | 耗时 | NULL | YES | bigint | NULL |  |  |
| START_USER_ID_ | 流程发起人ID | NULL | YES | varchar | 255 |  |  |
| START_ACT_ID_ | 开始节点ID | NULL | YES | varchar | 255 |  |  |
| END_ACT_ID_ | 结束节点ID | NULL | YES | varchar | 255 |  |  |
| SUPER_PROCESS_INSTANCE_ID_ | 父流程实例ID | NULL | YES | varchar | 64 |  |  |
| DELETE_REASON_ | 删除原因 | NULL | YES | varchar | 4000 |  |  |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  |  |


> 注：

> 1. 核心表之一。
> 2. 存放历史的流程实例。
> 3. 设计历史流程实例表的初衷之一就是为了使得运行时库数据量尽可能小，效率最优。



## act_hi_taskinst（历史任务流程实例信息*核心表）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| PROC_DEF_ID_ | 流程实例ID | NULL | YES | varchar | 64 |  |  |
| TASK_DEF_KEY_ | 任务节点定义ID | NULL | YES | varchar | 255 |  | 任务定义标识（环节ID） |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 | MUL |  |
| EXECUTION_ID_ | 执行实例ID | NULL | YES | varchar | 64 |  |  |
| NAME_ | 任务名称 | NULL | YES | varchar | 255 |  |  |
| PARENT_TASK_ID_ | 父任务节点ID | NULL | YES | varchar | 64 |  |  |
| DESCRIPTION_ | 描述 | NULL | YES | varchar | 4000 |  |  |
| OWNER_ | 被代理人 | NULL | YES | varchar | 255 |  | 委托人（默认为空，只有在委托时才有值） |
| ASSIGNEE_ | 经办人 | NULL | YES | varchar | 255 |  |  |
| START_TIME_ | 开始时间 | NULL | NO | datetime | NULL |  |  |
| CLAIM_TIME_ | 签收时间 | NULL | YES | datetime | NULL |  |  |
| END_TIME_ | 结束时间 | NULL | YES | datetime | NULL |  |  |
| DURATION_ | 耗时 | NULL | YES | bigint | NULL |  |  |
| DELETE_REASON_ | 删除原因 | NULL | YES | varchar | 4000 |  | 删除原因(completed,deleted) |
| PRIORITY_ | 优先级 | NULL | YES | int | NULL |  |  |
| DUE_DATE_ | 截止时间 | NULL | YES | datetime | NULL |  | 过期时间，表明任务应在多长时间内完成 |
| FORM_KEY_ | FORM表单的KEY | NULL | YES | varchar | 255 |  | desinger节点定义的 form_key属性 |
| CATEGORY_ | 分类 | NULL | YES | varchar | 255 |  |  |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |


> 注：<br />
1.　历史任务实例表。<br />
2.　存放已经办理的任务。<br />
3.　CATEGORY和TNANT_ID是后续版本才加进来的。


## act_hi_varinst（历史变量表）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 | MUL |  |
| EXECUTION_ID_ | 执行实例ID | NULL | YES | varchar | 64 |  |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 | MUL |  |
| NAME_ | 名称 | NULL | NO | varchar | 255 | MUL |  |
| VAR_TYPE_ | 变量类型 | NULL | YES | varchar | 100 |  |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| BYTEARRAY_ID_ | 字节流ID | NULL | YES | varchar | 64 | ACT_GE_BYTEARRAY |  |
| DOUBLE_ | 浮点值 | NULL | YES | double | NULL |  | 存储DoubleType类型的数据 |
| LONG_ | 长整型 | NULL | YES | bigint | NULL |  | 存储LongType类型的数据 |
| TEXT_ | 文本值 | NULL | YES | varchar | 4000 |  | 存储变量值类型为String，如此处存储持久化对象时，值jpa对象的class |
| TEXT2_ | 文本值 | NULL | YES | varchar | 4000 |  |  |
| CREATE_TIME_ | 创建时间 | NULL | YES | datetime | NULL |  |  |
| LAST_UPDATED_TIME_ | 最后更新时间 | NULL | YES | datetime | NULL |  |  |


> 注：

> 1. 主要存放历史变量数据。



## act_id_group（用户组）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  |  |
| TYPE_ | 类型 | NULL | YES | varchar | 255 |  |  |


> 注：

> 1. Activiti自带的用户组表，用于组任务。



## act_procdef_info（流程定义更新信息）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| PROC_DEF_ID_ | 流程定义ID | NULL | NO | varchar | 64 | UNI（ACT_RE_PROCDEF） |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| INFO_JSON_ID_ | 内容 | NULL | YES | varchar | 64 | MUL（ACT_GE_BYTEARRAY） |  |


> 注：

> 1. 流程版本升级的数据。



## act_re_deployment（ 部署信息表*核心表）
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  |  |
| CATEGORY_ | 分类 | NULL | YES | varchar | 255 |  |  |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |
| DEPLOY_TIME_ | 部署时间 | NULL | YES | timestamp | NULL |  |  |


> 注：

> 1.　部署流程定义时需要被持久化保存下来的信息。


## act_re_model (流程设计模型部署表)
| **字段** | **字段名称** | **字段默认值** | **是否允许为空** | **数据类型** | **字段长度** | **键** | **备注** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  |  |
| KEY_ | 标识 | NULL | YES | varchar | 255 |  |  |
| CATEGORY_ | 分类 | NULL | YES | varchar | 255 |  |  |
| CREATE_TIME_ | 创建时间 | NULL | YES | timestamp | NULL |  |  |
| LAST_UPDATE_TIME_ | 最后更新时间 | NULL | YES | timestamp | NULL |  |  |
| VERSION_ | 版本 | NULL | YES | int | NULL |  |  |
| META_INFO_ | 元数据 | NULL | YES | varchar | 4000 |  | 以json格式保存流程定义的信息 |
| DEPLOYMENT_ID_ | 部署ID | NULL | YES | varchar | 64 | MUL(ACT_RE_DEPLOYMENT） |  |
| EDITOR_SOURCE_VALUE_ID_ | 二进制文件ID | NULL | YES | varchar | 64 | MUL（ACT_GE_BYTEARRAY） | 设计器原始信息 |
| EDITOR_SOURCE_EXTRA_VALUE_ID_ | 二进制文件ID | NULL | YES | varchar | 64 | MUL（ACT_GE_BYTEARRAY） | 设计器扩展信息 |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |


> 注：

> 1. 该表是流程设计器设计流程模型保存的数据。



## act_re_procdef（流程定义数据表*核心表）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| CATEGORY_ | 分类 | NULL | YES | varchar | 255 |  | 流程定义的Namespace就是类别 |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  |  |
| KEY_ | 标识 | NULL | NO | varchar | 255 | MUL |  |
| VERSION_ | 版本 | NULL | NO | int | NULL |  |  |
| DEPLOYMENT_ID_ | 部署ID | NULL | YES | varchar | 64 |  |  |
| RESOURCE_NAME_ | 资源名称 | NULL | YES | varchar | 4000 |  | 流程bpmn文件名称 |
| DGRM_RESOURCE_NAME_ | 图片资源名称 | NULL | YES | varchar | 4000 |  |  |
| DESCRIPTION_ | 描述 | NULL | YES | varchar | 4000 |  |  |
| HAS_START_FORM_KEY_ | 拥有开始表单标识 | NULL | YES | tinyint | NULL |  | start节点是否存在formKey 0否  1是 |
| HAS_GRAPHICAL_NOTATION_ | 拥有图形信息 | NULL | YES | tinyint | NULL |  |  |
| SUSPENSION_STATE_ | 挂起状态 | NULL | YES | int | NULL |  | 暂停状态 1激活 2暂停 |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |


> 注：

> 业务流程定义数据表。此表和ACT_RE_DEPLOYMENT是多对一的关系，即，一个部署的bar包里可能包含多个流程定义文件，每个流程定义文件都会有一条记录在ACT_REPROCDEF表内，每个流程定义的数据，都会对于ACT_GE_BYTEARRAY表内的一个资源文件和PNG图片文件。和ACT_GE_BYTEARRAY的关联是通过程序用ACT_GE_BYTEARRAY.NAME与ACT_RE_PROCDEF.NAME_完成的，在数据库表结构中没有体现。


## act_ru_event_subscr（事件订阅）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | varsion |
| EVENT_TYPE_ | 事件类型 | NULL | NO | varchar | 255 |  |  |
| EVENT_NAME_ | 事件名称 | NULL | YES | varchar | 255 |  |  |
| EXECUTION_ID_ | 执行实例ID | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 |  |  |
| ACTIVITY_ID_ | 节点ID | NULL | YES | varchar | 64 |  |  |
| CONFIGURATION_ | 配置 | NULL | YES | varchar | 255 | MUL |  |
| CREATED_ | 创建时间 | CURRENT_TIMESTAMP(3) | NO | timestamp | NULL |  |  |
| PROC_DEF_ID_ | 流程定义ID | NULL | YES | varchar | 64 |  |  |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |


> 注：

> 1. 该表是后续版本加进来的。



## act_ru_execution（运行时流程执行实例表*核心表）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| BUSINESS_KEY_ | 业务标识 | NULL | YES | varchar | 255 | MUL |  |
| PARENT_ID_ | 父级ID | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| PROC_DEF_ID_ | 流程定义ID | NULL | YES | varchar | 64 | MUL（ACT_RE_PROCDEF） |  |
| SUPER_EXEC_ | 父流程实例中对应的 执行 | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| ACT_ID_ | 节点ID | NULL | YES | varchar | 255 |  |  |
| IS_ACTIVE_ | 是否激活 | NULL | YES | tinyint | NULL |  |  |
| IS_CONCURRENT_ | 是否分支（并行） | NULL | YES | tinyint | NULL |  | 是否为并行(true/false） |
| IS_SCOPE_ | 是否处于多实例或环 节嵌套状态 | NULL | YES | tinyint | NULL |  |  |
| IS_EVENT_SCOPE_ | 是否激活状态 | NULL | YES | tinyint | NULL |  |  |
| SUSPENSION_STATE_ | 挂起状态 | NULL | YES | int | NULL |  | 暂停状态 1激活 2暂停 |
| CACHED_ENT_STATE_ | 缓存状态 | NULL | YES | int | NULL |  | 缓存的状态， 1 事件 监听 2 人工任务 3 异 步作业 |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  |  |
| LOCK_TIME_ | 锁定时间 | NULL | YES | timestamp | NULL |  |  |


> 注：

> 1. TENANT_ID、NAME、LOCK_TIME是后续版本加入的。



## act_ru_identitylink（ 运行时流程人员表）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| GROUP_ID_ | 用户组ID | NULL | YES | varchar | 255 | MUL |  |
| TYPE_ | 类型 | NULL | YES | varchar | 255 |  |  |
| USER_ID_ | 用户ID | NULL | YES | varchar | 255 | MUL |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 | MUL（ACT_RU_TASK） |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| PROC_DEF_ID_ | 流程定义ID | NULL | YES | varchar | 64 | MUL(ACT_RE_PROCDEF) |  |


> 注：

> 1. 任务参与者数据表。主要存储当前节点参与者的信息。



## act_ru_job (运行时定时任务数据表)
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  |  |
| TYPE_ | 类型 | NULL | NO | varchar | 255 |  |  |
| LOCK_EXP_TIME_ | 锁定过期时间 | NULL | YES | timestamp | NULL |  |  |
| LOCK_OWNER_ | 挂起者 | NULL | YES | varchar | 255 |  |  |
| EXCLUSIVE_ | 是否唯一 | NULL | YES | tinyint | NULL |  |  |
| EXECUTION_ID_ | 执行实例ID | NULL | YES | varchar | 64 |  |  |
| PROCESS_INSTANCE_ID_ | 流程实例ID | NULL | YES | varchar | 64 |  |  |
| PROC_DEF_ID_ | 流程定义ID | NULL | YES | varchar | 64 |  |  |
| RETRIES_ | 重试次数 | NULL | YES | int | NULL |  |  |
| EXCEPTION_STACK_ID_ | 异常堆栈 | NULL | YES | varchar | 64 | MUL（ACT_GE_BYTEARRAY） |  |
| EXCEPTION_MSG_ | 异常信息 | NULL | YES | varchar | 4000 |  |  |
| DUEDATE_ | 截止时间 | NULL | YES | timestamp | NULL |  |  |
| REPEAT_ | 重复 | NULL | YES | varchar | 255 |  |  |
| HANDLER_TYPE_ | 处理器类型 | NULL | YES | varchar | 255 |  |  |
| HANDLER_CFG_ | 处理器配置 | NULL | YES | varchar | 4000 |  |  |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |


> 注：

> 1. 作业执行器数据。
> 2. 需要启用JOB组件：JobExecutor 是管理一组线程的组件，这些线程用于触发定时器（包括后续的异步消息）。在单元测试场景下，使用多线程会很笨重。<br />
因此API提供 ManagementService.createJobQuery 用于查询，以及 ManagementService.executeJob 用于执行作业。这样作业的执<br />
行就可以在单元测试内部控制。为了避免作业执行器的干扰，可以将它关闭。<br />
默认情况下， JobExecutor 在流程引擎启动时激活。当你不希望 JobExecutor 随流程引擎启动时，设置：<br />
`<property name="jobExecutorActivate" value="false" />`
> 3. 启用异步执行器 Async executor activation<br />
AsyncExecutor 是管理线程池的组件，这个线程池用于触发定时器与异步任务。<br />
默认情况下，由于历史原因，当使用 JobExecutor 时， AsyncExecutor 不生效。然而我们建议使用新的 AsyncExecutor 代替<br />
JobExecutor ，通过定义两个参数实现<br />
`<property name="asyncExecutorEnabled" value="true" />`<br />
`<property name="asyncExecutorActivate" value="true" />`<br />
asyncExecutorEnabled参数用于启用异步执行器，代替老的作业执行器。 第二个参数asyncExecutorActivate命令Activiti引擎在启动时<br />
启动异步执行器线程池。



## act_ru_task（ 运行时任务节点表*核心表）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| EXECUTION_ID_ | 执行实例ID | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| PROC_DEF_ID_ | 流程定义ID | NULL | YES | varchar | 64 | MUL（ACT_RE_PROCDEF） |  |
| NAME_ | 名称 | NULL | YES | varchar | 255 |  |  |
| PARENT_TASK_ID_ | 父任务ID | NULL | YES | varchar | 64 |  |  |
| DESCRIPTION_ | 描述 | NULL | YES | varchar | 4000 |  |  |
| TASK_DEF_KEY_ | 人物定义标识 | NULL | YES | varchar | 255 |  |  |
| OWNER_ | 被代理人 | NULL | YES | varchar | 255 |  | （一般情况下为空，只有在委托时才有值） |
| ASSIGNEE_ | 经办人 | NULL | YES | varchar | 255 |  | 签收人或者委托人 |
| DELEGATION_ | 委托状态 | NULL | YES | varchar | 64 |  | 委托状态 PENDING 委托中， RESOLVED已处理 |
| PRIORITY_ | 优先级 | NULL | YES | int | NULL |  |  |
| CREATE_TIME_ | 创建时间 | NULL | YES | timestamp | NULL | MUL |  |
| DUE_DATE_ | 截止时间 | NULL | YES | datetime | NULL |  |  |
| CATEGORY_ | 分类 | NULL | YES | varchar | 255 |  |  |
| SUSPENSION_STATE_ | 挂起状态 | NULL | YES | int | NULL |  | 暂停状态 1激活 2暂停 |
| TENANT_ID_ | 租户ID |  | YES | varchar | 255 |  |  |
| FORM_KEY_ | 表单标识 | NULL | YES | varchar | 255 |  |  |


> 注：

> 1. 运行时任务数据表



## act_ru_variable（ 运行时流程变量数据表*核心表）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 | NULL | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| TYPE_ | 类型 | NULL | NO | varchar | 255 |  | 见备注 |
| NAME_ | 名称 | NULL | NO | varchar | 255 |  |  |
| EXECUTION_ID_ | 执行实例ID | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| PROC_INST_ID_ | 流程实例ID | NULL | YES | varchar | 64 | MUL（ACT_RU_EXECUTION） |  |
| TASK_ID_ | 任务ID | NULL | YES | varchar | 64 | MUL（ACT_RU_TASK） |  |
| BYTEARRAY_ID_ | 资源ID | NULL | YES | varchar | 64 | MUL（ACT_GE_BYTEARRAY） |  |
| DOUBLE_ | 浮点值 | NULL | YES | double | NULL |  | 存储变量类型为Double |
| LONG_ | 长整型 | NULL | YES | bigint | NULL |  | 存储变量类型为long |
| TEXT_ | 文本值 | NULL | YES | varchar | 4000 |  | 存储变量值类型为String  如此处存储持久化对象时，值jpa对象的class |
| TEXT2_ | 文本值 | NULL | YES | varchar | 4000 |  | 此处存储的是JPA持久化对象时，才会有值。此值为对象ID |


> 注：

> 1. 运行时流程变量数据表。
> 2. 类型：jpa-entity、boolean、bytes、serializable(可序列化)、自定义type(根据你自身配置)、

> CustomVariableType、date、double、integer、long、null、short、string


## act_id_info（用户扩展信息表）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| USER_ID_ | 用户ID | NULL | YES | varchar | 64 |  |  |
| TYPE_ | 类型 | NULL | YES | varchar | 64 |  |  |
| KEY_ | 属性名 | NULL | YES | varchar | 255 |  |  |
| VALUE_ | 属性值 | NULL | YES | varchar | 255 |  |  |
| PASSWORD_ | 密码 | NULL | YES | longblob | 4294967295 |  |  |
| PARENT_ID_ | 父级ID | NULL | YES | varchar | 255 |  |  |


## act_id_membership（ 用户与分组对应信息表）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| USER_ID_ | 用户ID |  | NO | varchar | 64 | PRI（ACT_ID_USER） |  |
| GROUP_ID_ | 用户组ID |  | NO | varchar | 64 | PRI（ACT_ID_GROUP） |  |


## act_id_user（用户信息表）
| 字段 | 字段名称 | 字段默认值 | 是否允许为空 | 数据类型 | 字段长度 | 键 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID_ | 主键 |  | NO | varchar | 64 | PRI |  |
| REV_ | 版本号 | NULL | YES | int | NULL |  | version |
| FIRST_ | 姓 | NULL | YES | varchar | 255 |  | FIRST_NAME |
| LAST_ | 名 | NULL | YES | varchar | 255 |  | LAST_NAME |
| EMAIL_ | 邮箱 | NULL | YES | varchar | 255 |  |  |
| PWD_ | 密码 | NULL | YES | varchar | 255 |  |  |
| PICTURE_ID_ | 头像ID | NULL | YES | varchar | 64 | ACT_GE_BYTEARRAY |  |

