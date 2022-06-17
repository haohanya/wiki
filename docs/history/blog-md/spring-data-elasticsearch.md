## ElasticSearch编程操作

### 创建工程，导入坐标

```xml
<dependency>
    <groupId>org.elasticsearch</groupId>
    <artifactId>elasticsearch</artifactId>
    <version>5.6.8</version>
</dependency>
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>transport</artifactId>
    <version>5.6.8</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-to-slf4j</artifactId>
    <version>2.9.1</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.24</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>1.7.21</version>
</dependency>
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.12</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
```

### 创建索引index

```java
/**
 * 创建索引
 * @throws Exception
 */
@Test
public void testCreateIndex() throws Exception{
    // 创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings)
            .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));
    //创建名称为blog2的索引
    client.admin().indices().prepareCreate("blog2").get();
    //释放资源
    client.close();
}
```

### 创建映射mapping

```java
/**
 * 创建映射Mappings
 * @throws Exception
 */
@Test
public void testCreateMappings() throws Exception{
    // 创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings)
            .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

    // 添加映射
    /**
     * 格式：
     * "mappings" : {
         "article" : {
             "dynamic" : "false",
             "properties" : {
                 "id" : { "type" : "string" },
                 "content" : { "type" : "string" },
                 "author" : { "type" : "string" }
             }
         }
     }
     */
    /*XContentBuilder builder = XContentFactory.jsonBuilder();
    builder.startObject()
                .startObject("article")
                    .startObject("properties")
                        .startObject("id")
                            .field("type","integer")
                            .field("store","yes")
                    .endObject()
                        .startObject("title")
                            .field("type","string")
                            .field("store","yes")
                            .field("analyzer","ik_smart")
                    .endObject()
                        .startObject("content")
                            .field("type","string")
                            .field("store","yes")
                            .field("analyzer","ik_smart")
                    .endObject()
                .endObject()
            .endObject()
            .endObject();*/

    Map<String,String> fieldType = new HashMap<>();
    fieldType.put("type","integer");
    fieldType.put("store","yes");

    Map<String,String> field2Type = new HashMap<>();
    field2Type.put("type","string");
    field2Type.put("store","yes");
    field2Type.put("analyzer","ik_smart");

    Map<String,Object> fields = new HashMap<>();
    fields.put("id",fieldType);
    fields.put("title",field2Type);
    fields.put("content",field2Type);

    Map<String,Object> properties = new HashMap<>();
    properties.put("properties",fields);

    Map<String,Object> builder = new HashMap<>();
    builder.put("article",properties);

    // 创建映射
    PutMappingRequest mappingRequest = Requests.putMappingRequest("blog2").type("article").source(builder);
    client.admin().indices().putMapping(mappingRequest).get();

    //释放资源
    client.close();
}
```

### 建立文档document

#### 建立文档（通过XContentBuilder）

```java
/**
 * 创建文档 通过XContentBuilder
 */
@Test
public void testCreateDocument() throws Exception {
    //创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name","elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings);
    client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"),9300));

    //创建文档信息
    XContentBuilder builder = XContentFactory.jsonBuilder()
            .startObject()
                .field("id", 1)
                .field("title", "ElasticSearch是一个基于Lucene的搜索服务器")
                .field("content", "它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。Elasticsearch是用Java开发的，并作为Apache许可条款下的开放源码发布，是当前流行的企业级搜索引擎。设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。")
            .endObject();

    //建立文档对象
    /**
     * 参数1：索引对象
     * 参数2：类型
     * 参数3：建立id
     */
    client.prepareIndex("blog2","article","1").setSource(builder);
    //释放资源
    client.close();
}
```

#### 建立文档（通过实体类转json）

```java
/**
 * 创建文档 通过
 * @throws Exception
 */
@Test
public void testCreateDocumentByEntity() throws Exception {
    //创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings);
    client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

    // 描述json 数据
    Article article = new Article();
    article.setId(2);
    article.setTitle("2搜索工作其实很快乐");
    article.setContent("2我们希望我们的搜索解决方案要快，我们希望有一个零配置和一个完全免费的搜索模式，我们希望能够简单地使用JSON通过HTTP的索引数据，我们希望我们的搜索服务器始终可用，我们希望能够一台开始并扩展到数百，我们要实时搜索，我们要简单的多租户，我们希望建立一个云的解决方案。Elasticsearch旨在解决所有这些问题和更多的问题。");

    // 建立文档
    //jackson
//        ObjectMapper objectMapper = new ObjectMapper();
//        client.prepareIndex("blog2", "article", article.getId().toString())
//                .setSource(objectMapper.writeValueAsString(article).getBytes(), XContentType.JSON).get();
    //fastjson
    client.prepareIndex("blog2", "article", article.getId().toString())
            .setSource(JSON.toJSONBytes(article), XContentType.JSON).get();

    //释放资源
    client.close();
}
```

### 查询文档操作

#### 关键词查询

```java
/**
 * 关键词查询
 * @throws Exception
 */
@Test
public void testTermQuery() throws Exception {
    //1、创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings);
    client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

    //2、设置搜索条件
    SearchResponse searchResponse = client.prepareSearch("blog2")
            .setTypes("article")
            .setQuery(QueryBuilders.termQuery("content", "搜索")).get();

    //3、遍历搜索结果数据
    SearchHits hits = searchResponse.getHits(); // 获取命中次数，查询结果有多少对象
    System.out.println("查询结果有：" + hits.getTotalHits() + "条");
    Iterator<SearchHit> iterator = hits.iterator();
    while (iterator.hasNext()) {
        SearchHit searchHit = iterator.next(); // 每个查询对象
        System.out.println(searchHit.getSourceAsString()); // 获取字符串格式打印
        System.out.println("title:" + searchHit.getSource().get("title"));
    }

    //4、释放资源
    client.close();
}
```

#### 字符串查询

```java
/**
 * 字符串查询
 * @throws Exception
 */
@Test
public void testStringQuery() throws Exception{
    //1、创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings);
    client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

    //2、设置搜索条件
    SearchResponse searchResponse = client.prepareSearch("blog2")
            .setTypes("article")
            .setQuery(QueryBuilders.queryStringQuery("搜索")).get();

    //3、遍历搜索结果数据
    SearchHits hits = searchResponse.getHits(); // 获取命中次数，查询结果有多少对象
    System.out.println("查询结果有：" + hits.getTotalHits() + "条");
    Iterator<SearchHit> iterator = hits.iterator();
    while (iterator.hasNext()) {
        SearchHit searchHit = iterator.next(); // 每个查询对象
        System.out.println(searchHit.getSourceAsString()); // 获取字符串格式打印
        System.out.println("title:" + searchHit.getSource().get("title"));
    }

    //4、释放资源
    client.close();
}
```

#### 使用文档ID查询文档

```java
/**
 * 使用文档ID查询文档
 * @throws Exception
 */
@Test
public void testIdQuery() throws Exception {
    //1、创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings);
    client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

    //client对象为TransportClient对象
    SearchResponse response = client.prepareSearch("blog2")
            .setTypes("article")
            //设置要查询的id
            .setQuery(QueryBuilders.idsQuery().addIds("1","2"))
            //执行查询
            .get();
    //取查询结果
    SearchHits searchHits = response.getHits();
    //取查询结果总记录数
    System.out.println(searchHits.getTotalHits());
    Iterator<SearchHit> hitIterator = searchHits.iterator();
    while(hitIterator.hasNext()) {
        SearchHit searchHit = hitIterator.next();
        //打印整行数据
        System.out.println(searchHit.getSourceAsString());
    }
}
```

### 查询文档分页操作

#### 批量插入数据

```java
/**
 * 批量插入100条数据
 * @throws Exception
 */
@Test
public void testCreateDocument100() throws Exception{
    //1、创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings);
    client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

    for (int i = 1; i <= 100; i++) {
        // 描述json 数据
        Article article = new Article();
        article.setId(i);
        article.setTitle(i + "搜索工作其实很快乐");
        article.setContent(i
                + "我们希望我们的搜索解决方案要快，我们希望有一个零配置和一个完全免费的搜索模式，我们希望能够简单地使用JSON通过HTTP的索引数据，我们希望我们的搜索服务器始终可用，我们希望能够一台开始并扩展到数百，我们要实时搜索，我们要简单的多租户，我们希望建立一个云的解决方案。Elasticsearch旨在解决所有这些问题和更多的问题。");
        // 建立文档
        client.prepareIndex("blog2", "article", article.getId().toString())
                .setSource(JSON.toJSONBytes(article),XContentType.JSON).get();
    }

    //释放资源
    client.close();
}
```

#### 分页查询

```java
/**
 * 分页查询
 * @throws Exception
 */
@Test
public void test10() throws Exception{
    //1、创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings);
    client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

    // 搜索数据
    SearchRequestBuilder searchRequestBuilder = client.prepareSearch("blog2").setTypes("article")
            .setQuery(QueryBuilders.matchAllQuery());//默认每页10条记录

    // 查询第1页数据，每页5条
    //setFrom()：从第几条开始检索，默认是0。
    //setSize():每页最多显示的记录数。
    searchRequestBuilder.setFrom(0).setSize(5);
    SearchResponse searchResponse = searchRequestBuilder.get();

    SearchHits hits = searchResponse.getHits(); // 获取命中次数，查询结果有多少对象
    System.out.println("查询结果有：" + hits.getTotalHits() + "条");
    Iterator<SearchHit> iterator = hits.iterator();
    while (iterator.hasNext()) {
        SearchHit searchHit = iterator.next(); // 每个查询对象
        System.out.println(searchHit.getSourceAsString()); // 获取字符串格式打印
        System.out.println("id:" + searchHit.getSource().get("id"));
        System.out.println("title:" + searchHit.getSource().get("title"));
        System.out.println("content:" + searchHit.getSource().get("content"));
        System.out.println("-----------------------------------------");
    }

    //释放资源
    client.close();
}
```

### 查询结果高亮操作

```java
/**
 * 搜索高亮
 * @throws Exception
 */
@Test
public void test11() throws Exception{
    //1、创建Client连接对象
    Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
    TransportClient client = new PreBuiltTransportClient(settings);
    client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

    // 搜索数据
    SearchRequestBuilder searchRequestBuilder = client
            .prepareSearch("blog2").setTypes("article")
            .setQuery(QueryBuilders.termQuery("title", "搜索"));

    //设置高亮数据
    HighlightBuilder hiBuilder = new HighlightBuilder();
    hiBuilder.preTags("<font style='color:red'>");
    hiBuilder.postTags("</font>");
    hiBuilder.field("title");
    searchRequestBuilder.highlighter(hiBuilder);

    //获得查询结果数据
    SearchResponse searchResponse = searchRequestBuilder.get();

    //获取查询结果集
    SearchHits searchHits = searchResponse.getHits();
    System.out.println("共搜到:"+searchHits.getTotalHits()+"条结果!");
    //遍历结果
    for(SearchHit hit:searchHits){
        System.out.println("String方式打印文档搜索内容:");
        System.out.println(hit.getSourceAsString());
        System.out.println("Map方式打印高亮内容");
        System.out.println(hit.getHighlightFields());

        System.out.println("遍历高亮集合，打印高亮片段:");
        Text[] text = hit.getHighlightFields().get("title").getFragments();
        for (Text str : text) {
            System.out.println(str);
        }
    }

    //释放资源
    client.close();
}
```

## Spring Data ElasticSearch 使用

### Spring Data ElasticSearch简介

#### 什么是Spring Data

Spring Data是一个用于简化数据库访问，并支持云服务的开源框架。其主要目标是使得对数据的访问变得方便快捷，并支持map-reduce框架和云计算数据服务。 Spring Data可以极大的简化JPA的写法，可以在几乎不用写实现的情况下，实现对数据的访问和操作。除了CRUD外，还包括如分页、排序等一些常用的功能。

Spring Data的官网：http://projects.spring.io/spring-data/

#### 什么是Spring Data ElasticSearch

Spring Data ElasticSearch 基于 spring data API 简化 elasticSearch操作，将原始操作elasticSearch的客户端API 进行封装 。Spring Data为Elasticsearch项目提供集成搜索引擎。Spring Data Elasticsearch POJO的关键功能区域为中心的模型与Elastichsearch交互文档和轻松地编写一个存储库数据访问层。

官方网站：http://projects.spring.io/spring-data-elasticsearch/

### Spring Data ElasticSearch入门

#### 1、导入依赖

```xml
<dependency>
    <groupId>org.elasticsearch</groupId>
    <artifactId>elasticsearch</artifactId>
    <version>5.6.8</version>
</dependency>
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>transport</artifactId>
    <version>5.6.8</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-to-slf4j</artifactId>
    <version>2.9.1</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.24</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>1.7.21</version>
</dependency>
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.12</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>

<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.8.1</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.8.1</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.8.1</version>
</dependency>

<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-elasticsearch</artifactId>
    <version>3.0.5.RELEASE</version>
    <exclusions>
        <exclusion>
            <groupId>org.elasticsearch.plugin</groupId>
            <artifactId>transport-netty4-client</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.0.4.RELEASE</version>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.72</version>
</dependency>
```

#### 2、写实体Article

```java
@lombok.Data
public class Article {
    private Integer id;
    private String title;
    private String content;
}
```

#### 3、Dao

```java
import com.cn.entity.Article;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends ElasticsearchRepository<Article, Integer> {

}
```

#### 4、Service

```java
import com.cn.entity.Article;

public interface ArticleService {

    void save(Article article);
    
}
import com.cn.dao.ArticleRepository;
import com.cn.entity.Article;
import com.cn.service.ArticleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Resource
    private ArticleRepository articleRepository;

    @Override
    public void save(Article article) {
        articleRepository.save(article);
    }

}
```

#### 5、配置applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:elasticsearch="http://www.springframework.org/schema/data/elasticsearch"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context
		http://www.springframework.org/schema/context/spring-context.xsd
		http://www.springframework.org/schema/data/elasticsearch
		http://www.springframework.org/schema/data/elasticsearch/spring-elasticsearch-1.0.xsd">

    <!-- 扫描Dao包，自动创建实例 -->
    <elasticsearch:repositories base-package="com.cn.dao"/>

    <!-- 扫描Service包，创建Service的实体 -->
    <context:component-scan base-package="com.cn.service"/>

    <!-- 配置elasticSearch的连接 -->
    <!-- 配置elasticSearch的连接 -->
    <elasticsearch:transport-client id="client" cluster-nodes="localhost:9300" cluster-name="elasticsearch"/>

    <!-- ElasticSearch模版对象 -->
    <bean id="elasticsearchTemplate" class="org.springframework.data.elasticsearch.core.ElasticsearchTemplate">
        <constructor-arg name="client" ref="client"/>
    </bean>

</beans>
```

#### 6、配置实体

基于spring data elasticsearch注解配置索引、映射和实体的关系

```java
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@lombok.Data
//@Document 文档对象 （索引信息、文档类型 ）
@Document(indexName="blog3",type="article")
public class Article {
    //@Id 文档主键 唯一标识
    @Id
    //@Field 每个文档的字段配置（类型、是否分词、是否存储、分词器 ）
    @Field(store=true, index = false,type = FieldType.Integer)
    private Integer id;
    @Field(index=true,analyzer="ik_smart",store=true,searchAnalyzer="ik_smart",type = FieldType.text)
    private String title;
    @Field(index=true,analyzer="ik_smart",store=true,searchAnalyzer="ik_smart",type = FieldType.text)
    private String content;
}
其中，注解解释如下：
@Document(indexName="blob3",type="article")：
    indexName：索引的名称（必填项）
    type：索引的类型
@Id：主键的唯一标识
@Field(index=true,analyzer="ik_smart",store=true,searchAnalyzer="ik_smart",type = FieldType.text)
    index：是否设置分词
    analyzer：存储时使用的分词器
    searchAnalyze：搜索时使用的分词器
    store：是否存储
    type: 数据类型
```

#### 7、创建测试类SpringDataESTest

```java
package com.cn.test;

import com.cn.entity.Article;
import com.cn.service.ArticleService;
import org.elasticsearch.client.transport.TransportClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext.xml")
public class SpringDataESTest {

    @Resource
    private ArticleService articleService;
    @Resource
    private TransportClient client;
    @Resource
    private ElasticsearchTemplate elasticsearchTemplate;

    /**创建索引和映射*/
    @Test
    public void createIndex(){
        elasticsearchTemplate.createIndex(Article.class);
        elasticsearchTemplate.putMapping(Article.class);
    }

    /**测试保存文档*/
    @Test
    public void saveArticle(){
        Article article = new Article();
        article.setId(100);
        article.setTitle("测试SpringData ElasticSearch");
        article.setContent("Spring Data ElasticSearch 基于 spring data API 简化 elasticSearch操作，将原始操作elasticSearch的客户端API 进行封装 \n" +
                "    Spring Data为Elasticsearch Elasticsearch项目提供集成搜索引擎");
        articleService.save(article);
    }

}
```

### Spring Data ElasticSearch的常用操作

#### 增删改查方法测试

```java
package com.cn.test;

import com.cn.entity.Article;
import com.cn.service.ArticleService;
import org.elasticsearch.client.transport.TransportClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext.xml")
public class SpringDataESTest {

    @Resource
    private ArticleService articleService;
    @Resource
    private TransportClient client;
    @Resource
    private ElasticsearchTemplate elasticsearchTemplate;

    /**创建索引和映射*/
    @Test
    public void createIndex(){
        elasticsearchTemplate.createIndex(Article.class);
        elasticsearchTemplate.putMapping(Article.class);
    }

    /**测试保存文档*/
    @Test
    public void saveArticle(){
        Article article = new Article();
        article.setId(100);
        article.setTitle("测试SpringData ElasticSearch");
        article.setContent("Spring Data ElasticSearch 基于 spring data API 简化 elasticSearch操作，将原始操作elasticSearch的客户端API 进行封装 \n" +
                "    Spring Data为Elasticsearch Elasticsearch项目提供集成搜索引擎");
        articleService.save(article);
    }

    /**
     * 测试更新
     */
    @Test
    public void update(){
        Article article = new Article();
        article.setId(1001);
        article.setTitle("elasticSearch 3.0版本发布...更新");
        article.setContent("ElasticSearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口");
        articleService.save(article);
    }

    /**
     * 测试删除
     */
    @Test
    public void delete(){
        Article article = new Article();
        article.setId(1001);
        articleService.delete(article);
    }

    /**
     * 批量插入
     */
    @Test
    public void save100(){
        for(int i=1;i<=100;i++){
            Article article = new Article();
            article.setId(i);
            article.setTitle(i+"elasticSearch 3.0版本发布..，更新");
            article.setContent(i+"ElasticSearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口");
            articleService.save(article);
        }
    }

    /**
     * 分页查询
     */
    @Test
    public void findAllPage(){
        Pageable pageable = PageRequest.of(1,10);
        Page<Article> page = articleService.findAll(pageable);
        for(Article article:page.getContent()){
            System.out.println(article);
        }
    }

}
```

#### 常用查询命名规则

| 关键字        | 命名规则              | 解释                       | 示例                  |
| ------------- | --------------------- | -------------------------- | --------------------- |
| and           | findByField1AndField2 | 根据Field1和Field2获得数据 | findByTitleAndContent |
| or            | findByField1OrField2  | 根据Field1或Field2获得数据 | findByTitleOrContent  |
| is            | findByField           | 根据Field获得数据          | findByTitle           |
| not           | findByFieldNot        | 根据Field获得补集数据      | findByTitleNot        |
| between       | findByFieldBetween    | 获得指定范围的数据         | findByPriceBetween    |
| lessThanEqual | findByFieldLessThan   | 获得小于等于指定值的数据   | findByPriceLessThan   |

#### 使用Elasticsearch的原生查询对象进行查询。

```java
@Test
public void findByNativeQuery() {
    //创建一个SearchQuery对象
    SearchQuery searchQuery = new NativeSearchQueryBuilder()
            //设置查询条件，此处可以使用QueryBuilders创建多种查询
            .withQuery(QueryBuilders.queryStringQuery("备份节点上没有数据").defaultField("title"))
            //还可以设置分页信息
            .withPageable(PageRequest.of(1, 5))
            //创建SearchQuery对象
            .build();

    //使用模板对象执行查询
    elasticsearchTemplate.queryForList(searchQuery, Article.class)
            .forEach(a-> System.out.println(a));
}
```
