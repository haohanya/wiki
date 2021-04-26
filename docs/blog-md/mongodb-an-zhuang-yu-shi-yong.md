## 什么是MongoDB

MongoDB是一个基于分布式文件存储的数据库。由C++语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。
MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。它支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是它支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

## MongoDB特点

它的特点是高性能、易部署、易使用，存储数据非常方便。主要功能特性有：

面向集合存储的，易于存储对象类型的数据

模式自由。

支持动态[查询]

支持完全索引，包含内部对象。

支持查询。

支持复制和故障恢复。

使用高效的二进制数据存储，包括大型对象（如视频等）。

自动处理碎片，以支持云计算层次的扩展性。

支持 Golang，RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言。

文件存储格式为BSON（一种JSON的扩展）。

可通过网络访问。

## MongoDB体系结构

mongo的逻辑结果是一种层次结构

主要由如下几个东西组成：

文档(document)、集合(collection)、数据库(database)这三部分组成，逻辑结构是面向用户的。

用户就可以通过MongoDB开发应用程序使用的就是逻辑结构

(1)MongoDB的document，相当于是MySQL（关系型数据库）中的一行记录

(2)多个文档组成一个集合，在MySQL中多条记录组成的是表

(3)多个集合，逻辑上组织在一起，就是一个数据库

(4)一个MongoDB实例支持多个数据库

| MongoDB          | Mysql            |
| ---------------- | ---------------- |
| 数据库(database) | 数据库(database) |
| 集合(collection) | 表(table)        |
| 文档(document)   | 行(row)          |

## 安装Mongo

## 1、拉取镜像

```powershell
docker pull mongo:latest
```

## 2、创建容器

```powershell
docker run -di --name=mymongo -p 27017:27017 mongo --auth
```

> 27017 ：mongo默认的端口
>
> --auth：启用验证，默认关闭

## 3、创建用户

```powershell
# 进入容器
docker exec -it mymongo /bin/bash
# 进入Mongo
mongo
# 选择数据库
use admin
# 创建用户
db.createUser({user:"root",pwd:"root",roles:[{role:"root",db:"admin"}]})
```

## CRUD

> 如果涉及到认证问题，必须在操作之前登陆
>
> `db.auth("账号","密码")`

## 添加

语法：`db.collection.save(json)`

```powershell
db.student.save({name:"张三",sex:"男",address:"湖北"})
```

## 查询

### 查询全部

语法：`db.collection.find()`

```powershell
db.student.find()
# 结果
# { "_id" : ObjectId("5ece87413b6767c1aa235b37"), "name" : "张三", "sex" : "女", "address" : "湖北" }
```

> 这里大家会发现每条文档都有一个叫 "_id"字段，这个相当于mysql数据库中表的主键，当你在插入记录的时候，没有指定该字段，mongo会自动创建，类型是ObjectId类型
>
> 如果我们在插入文档记录的时候指定了该字段，其类型可以是ObjectId，也可以是mongo支持的任意数据类型
>
> 如：`db.student.save({_id:1,name:"张三",sex:15,address:"湖北"})`
>
> 如果_id 的值是一样的会覆盖原有的数据

### 条件查询

语法：`db.collection.find({key:"value"})`

```powershell
db.student.find({name:"李四"})
```

### 查询单个

语法：`db.collection.findOne({key:value})`

## 修改

#### 完全修改

语法：`db.collection.update(条件json,修改后的json)`

#### 部分修改

语法：`db.collection.update(条件json,{$set:{key:value,key:value}})`

## 删除

语法：`db.collection.remove(json条件)`

## 高级查询

### 模糊查询

语法：`db.collection.find({key:/value/})`

> 查询key中带有value的文档

### 查询NULL

语法：`db.collection.find({key:null})`

> 查询没有key的文档

### 比较查询

```powershell
# 大于
db.collection.find({key:{$gt:value}})
# 小于
db.collection.find({key:{$lt:value}})
# 大于或等于
db.collection.find({key:{$gte:value}})
# 小于等于
db.collection.find({key:{$lte:value}})
# 不等于
db.collection.find({key:{$ne:value}})
```

### 判断域/字段是否存在

```powershell
# 语法
db.collection.find({key:{$exists:true}})
# 例子：查询带有address的文档
db.student.find({address:{$exists:true}})
# 例子：查询没有address的文档
db.student.find({address:{$exists:false}})
```

### 包含

> 类似于mysql的in

语法：`db.collection.find({key:{$in:[v1,v2,v3,.....]}})`

### 统计数量

语法：`db.collection.count()`

添加条件语法：`db.collection.count(json条件)`

### 逻辑运算符

#### 并且

```powershell
# 语法
db.collection.find($and:[{k1:v1},{k2:{表达式:v2}}])
# 例子：查询年龄大于10并且小于20
db.student.find($and:[{age:{$gt:10}},{age:{$lt:20}}])
```

#### 或者

```powershell
# 语法
db.collection.find($or:[{k1:v1},{v2:{表达式:v2}}])
# 例子：查询年龄大于18或者性别为女
db.student.find($or:[{age:{$gt:18}},{sex:"女"}])
```

#### 非

```powershell
db.collection.find({key:{$ne:value}})
```

## JAVA操作Mongo

### 1、添加依赖

```xml
<!-- mongodb客户端 -->
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongo-java-driver</artifactId>
    <version>3.9.1</version>
</dependency>
```

### 2、连接测试

```java
@Test
public void testConnection(){
    //创建认证对象，参数1：用户名、参数2：数据库、参数3：密码
    MongoCredential credential = MongoCredential.createCredential("root","admin","root".toCharArray());
    //创建mongo客户端对象，参数1：服务器地址，参数2：mongodb的端口号
    ServerAddress serverAddress = new ServerAddress("192.168.25.146",27017);
    MongoClient client = new MongoClient(serverAddress, Arrays.asList(credential));
    //获取到集合（数据库）
    MongoDatabase database = client.getDatabase("admin");
    //获取collection
    MongoCollection<Document> student = database.getCollection("student");
    //获取到document集合（一行记录）
    FindIterable<Document> documents = student.find();
    for (Document document : documents) {
        System.out.println(document.getString("name"));
        System.out.println(document.getDouble("age"));
        System.out.println(document.getString("sex"));
    }
}
```

### 3、条件查询-匹配

```java
@Test
public void testFindBasi(){
    //创建认证对象，参数1：用户名、参数2：数据库、参数3：密码
    MongoCredential credential = MongoCredential.createCredential("root","admin","root".toCharArray());
    //创建mongo客户端对象，参数1：服务器地址，参数2：mongodb的端口号
    ServerAddress serverAddress = new ServerAddress("192.168.25.146",27017);
    MongoClient client = new MongoClient(serverAddress, Arrays.asList(credential));
    //获取到集合（数据库）
    MongoDatabase database = client.getDatabase("admin");
    //获取collection
    MongoCollection<Document> student = database.getCollection("student");

    /*------------------------------------创建查询条件----------------------------------------------*/

    Map<String,Object> map = new HashMap<>();
    map.put("name","张三");
    BasicDBObject basicDBObject = new BasicDBObject(map);

    /*------------------------------------创建查询条件----------------------------------------------*/

    //获取到document集合（一行记录）
    FindIterable<Document> documents = student.find(basicDBObject);
    for (Document document : documents) {
        System.out.println(document.getString("name"));
        System.out.println(document.getDouble("age"));
        System.out.println(document.getString("sex"));
    }
}
```

### 4、条件查询-模糊

#### 完全匹配

```java
/*------------------------------------创建查询条件----------------------------------------------*/
Pattern pattern = Pattern.compile("^张三$");

Map<String,Object> map = new HashMap<>();
map.put("name",pattern);
BasicDBObject basicDBObject = new BasicDBObject(map);
/*------------------------------------创建查询条件----------------------------------------------*/
```

#### 右匹配

```java
Pattern pattern = Pattern.compile("^张.*$");
```

#### 左匹配

```java
Pattern pattern = Pattern.compile("^.*张$");
```

#### 模糊匹配

```java
Pattern pattern = Pattern.compile("^.*张.*$");
```

### 5、数字比较

```java
//查询年龄大于10
/*------------------------------------创建查询条件----------------------------------------------*/
BasicDBObject basicDBObject = new BasicDBObject("age",new BasicDBObject("$gt",10));
/*------------------------------------创建查询条件----------------------------------------------*/
```

### 6、条件连接-并且

```java
//查询性别为男并且年龄大于10岁
/*------------------------------------创建查询条件----------------------------------------------*/
BasicDBObject basicDBObject1 = new BasicDBObject("sex","男");
BasicDBObject basicDBObject2 = new BasicDBObject("age",new BasicDBObject("$gt",10));
BasicDBObject basicDBObject = new BasicDBObject("$and",Arrays.asList(basicDBObject1,basicDBObject2));
/*------------------------------------创建查询条件----------------------------------------------*/
```

### 7、条件连接-或者

```java
//查询性别为男或者年龄大于20
/*------------------------------------创建查询条件----------------------------------------------*/
BasicDBObject basicDBObject1 = new BasicDBObject("sex","男");
BasicDBObject basicDBObject2 = new BasicDBObject("age",new BasicDBObject("$gt",20));
BasicDBObject basicDBObject = new BasicDBObject("$or",Arrays.asList(basicDBObject1,basicDBObject2));
/*------------------------------------创建查询条件----------------------------------------------*/
```

### 8、添加

```java
//创建认证对象，参数1：用户名、参数2：数据库、参数3：密码
MongoCredential credential = MongoCredential.createCredential("root","admin","root".toCharArray());
//创建mongo客户端对象，参数1：服务器地址，参数2：mongodb的端口号
ServerAddress serverAddress = new ServerAddress("192.168.25.146",27017);
MongoClient client = new MongoClient(serverAddress, Arrays.asList(credential));
//获取到集合（数据库）
MongoDatabase database = client.getDatabase("admin");
//获取collection
MongoCollection<Document> student = database.getCollection("student");

Map<String,Object> map = new HashMap<>();
map.put("name","王五");
map.put("sex","男");
map.put("age",15);
map.put("address","湖南");

Document document = new Document(map);
student.insertOne(document);
```

### 9、修改

```java
//把_id为1的文档中age修改为55
public void update(){
    //创建认证对象，参数1：用户名、参数2：数据库、参数3：密码
    MongoCredential credential = MongoCredential.createCredential("root","admin","root".toCharArray());
    //创建mongo客户端对象，参数1：服务器地址，参数2：mongodb的端口号
    ServerAddress serverAddress = new ServerAddress("192.168.25.146",27017);
    MongoClient client = new MongoClient(serverAddress, Arrays.asList(credential));
    //获取到集合（数据库）
    MongoDatabase database = client.getDatabase("admin");
    //获取collection
    MongoCollection<Document> student = database.getCollection("student");
	//修改的条件
    BasicDBObject filter = new BasicDBObject("_id",1);
    //修改后的域和值
    BasicDBObject update = new BasicDBObject("$set",new BasicDBObject("age",55));

    student.updateOne(filter,update);
}
```

### 10、删除文档

```java
public void delete(){
    //创建认证对象，参数1：用户名、参数2：数据库、参数3：密码
    MongoCredential credential = MongoCredential.createCredential("root","admin","root".toCharArray());
    //创建mongo客户端对象，参数1：服务器地址，参数2：mongodb的端口号
    ServerAddress serverAddress = new ServerAddress("192.168.25.146",27017);
    MongoClient client = new MongoClient(serverAddress, Arrays.asList(credential));
    //获取到集合（数据库）
    MongoDatabase database = client.getDatabase("admin");
    //获取collection
    MongoCollection<Document> student = database.getCollection("student");

    //删除条件
    BasicDBObject basicDBObject = new BasicDBObject("_id",1);
    student.deleteOne(basicDBObject);//删除一个
    student.deleteMany(basicDBObject);//删除所有满足条件的
}
```

## MongoDB工具类

> MongoClient被设计成线程安全的类（单线程），也就是我们在使用该类的时候不用考虑并发的情况，这样我们就可以考虑将mongoClient做成一个静态变量，为所有的线程共用，不必每次都销毁，这样就可以极大的提高执行的效率，实际上mongodb提供了内置的连接池来实现

```java
package com.mongo.util;

import com.mongodb.*;
import com.mongodb.client.MongoDatabase;

import java.util.Arrays;

/**
 * @program: mongodb
 * @author: 潘
 * @create: 2020-05-28 12:57
 **/
public class MongoManager {

    private static MongoClient client = null;

    private static void init(){
        MongoCredential credential = MongoCredential.createCredential("root", "admin", "root".toCharArray());
        ServerAddress serverAddress = new ServerAddress("192.168.25.146", 27017);
        //选项构造者
        MongoClientOptions.Builder builder = new MongoClientOptions.Builder();
        //读取数据的超时时间
        builder.socketTimeout(5000);
        //每个地址最大请求数
        builder.connectionsPerHost(30);
        //写入的策略,仅仅抛出网络异常
        builder.writeConcern(WriteConcern.NORMAL);
        MongoClientOptions options = builder.build();
        client = new MongoClient(serverAddress, Arrays.asList(credential), options);
    }
    public static MongoDatabase getDatabase(String db){

        if(client == null){
            init();
        }

        return client.getDatabase(db);
    }

}
```

dao

```java
public class StudentDao {
	public void save(String name,String sex,double age,String address){
		// 2.获取数据库(数据库)
		MongoDatabase database = MongoManager.getDatabase("admin");
		// 3.获取到collection(表)
		MongoCollection<Document> collection = database.getCollection("student");
		//4.准备要添加的数据
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", name);
		map.put("sex", sex);
		map.put("age", age);
		map.put("address", address);
		Document document = new Document(map);
		//5.添加数据
		collection.insertOne(document);
	}
}
```
