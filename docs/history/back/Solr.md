# Solr搜索引擎安装配置

## 什么是Solr

> 大多数搜索引擎应用都必须具有某种搜索功能，问题是搜索功能往往是巨大的资源消耗并且它们由于沉重的数据库加载而拖垮你的应用的性能。
>
> 这就是为什么转移负载到一个外部的搜索服务器是一个不错的主意，Apache Solr是一个流行的开源搜索服务器，它通过使用类似REST的HTTP API，这就确保你能从几乎任何编程语言来使用solr。
>
> Solr是一个开源搜索平台，用于构建搜索应用程序。 它建立在Lucene(全文搜索引擎)之上。 Solr是企业级的，快速的和高度可扩展的。 使用Solr构建的应用程序非常复杂，可提供高性能。
>
> 为了在CNET网络的公司网站上添加搜索功能，Yonik Seely于2004年创建了Solr。并在2006年1月，它成为Apache软件基金会下的一个开源项目。并于2016年发布最新版本Solr 6.0，支持并行SQL查询的执行。
>
> Solr可以和Hadoop一起使用。由于Hadoop处理大量数据，Solr帮助我们从这么大的源中找到所需的信息。不仅限于搜索，Solr也可以用于存储目的。像其他NoSQL数据库一样，它是一种非关系数据存储和处理技术。
>
> 总之，Solr是一个可扩展的，可部署，搜索/存储引擎，优化搜索大量以文本为中心的数据。

## solr安装

### 1 上传文件

```powershell
apache-tomcat-7.0.82.tar.gz
solr-4.10.3.tgz.tgz
IK Analyzer 2012FF_hf1
```

### 2 创建目录

```powershell
mkdir /usr/soft/solr
```

### 3 解压tomcat并移动到solr目录

```powershell
tar -zxvf apache-tomcat-7.0.82.tar.gz
mv apache-tomcat-7.0.82 /usr/soft/solr/tomcat7
tar -zxvf solr-4.10.3.tgz.tgz
```

在solr-4.10.3/dist目录下有一个war包 需要把war包移动到tomcat里运行

```powershell
cp ~/solr-4.10.3/dist/solr-4.10.3.war /usr/soft/solr/tomcat7/webapps/solr.war
```

### 4 启动tomcat

```powershell
cd /usr/soft/solr/tomcat7
./bin/startup.sh
```

查看tomcat日志(可选)

```powershell
tail -f logs/catalina.out
```

### 5 引入依赖jar包

```powershell
cd ~/solr-4.10.3/example/lib/ext
cp * /usr/soft/solr/tomcat7/webapps/solr/WEB-INF/lib
```

### 6 复制配置文件

```powershell
cd ~/solr-4.10.3/example
cp -r solr /usr/soft/solr/solrhome
```

### 7 solr和solrhome建立联系

```powershell
cd /usr/soft/solr/tomcat7/webapps/solr/WEB-INF
vi web.xml
/usr/soft/solr/solrhome
<env-entry>
	<env-entry-name>solr/home</env-entry-name>
    <!-- 这里设置为自己的solrhome路径 -->
    <env-entry-value>/usr/soft/solr/solrhome</env-entry-value>
    <env-entry-type>java.lang.String</env-entry-type>
</env-entry>
:wq
```

### 8 重启 tomcat

```powershell
cd /usr/soft/solr/tomcat7/bin
./shutdown.sh
./startup.sh
```

### 9 访问solr

http://192.168.25.132:8080/solr/

## 配置IK分词器

### IK Analyzer简介

> IK Analyzer 是一个开源的，基亍 java 语言开发的轻量级的中文分词工具包。从 2006年 12 月推出 1.0 版开始， IKAnalyzer 已经推出了 4 个大版本。最初，它是以开源项目Luence 为应用主体的，结合词典分词和文法分析算法的中文分词组件。从 3.0 版本开始，IK 发展为面向 Java 的公用分词组件，独立亍 Lucene 项目，同时提供了对 Lucene 的默认优化实现。在 2012 版本中，IK 实现了简单的分词歧义排除算法，标志着 IK 分词器从单纯的词典分词向模拟语义分词衍化。

### 1 将ik分词器jar包移动到solr中

```powershell
cp ~/IK\ Analyzer\ 2012FF_hf1/IKAnalyzer2012FF_u1.jar /usr/soft/solr/tomcat7/webapps/solr/WEB-INF/lib
```



### 2 在solr项目的WEB-INF 目录创建一个classes目录

```powershell
mkdir /usr/soft/solr/tomcat7/webapps/solr/WEB-INF/classes
```



### 3 移动配置文件到classes目录

```powershell
cp IKAnalyzer.cfg.xml ext_stopword.dic mydict.dic /usr/soft/solr/tomcat7/webapps/solr/WEB-INF/classes
```

### 4 启用---编辑配置文件

使用npp编辑服务器上的文件

1 安装npp (略)

2 安装NppFTP(略)

3 连接服务器 (虐)

4 编辑xml文件 : /usr/soft/solr/solrhome/collection1/conf/schema.xml

```xml
<!-- 配置IK分词器 -->
<fieldType name="text_ik" class="solr.TextField">
    <analyzer class="org.wltea.analyzer.lucene.IKAnalyzer"></analyzer>
</fieldType>
```

5 重启tomcat

```powershell
cd /usr/soft/solr/tomcat7/bin
./shutdown.sh
./startup.sh
```



6 访问url

http://192.168.25.132:8080/solr/

## 域

域 : 相当于数据库表的字段

```xml
<!--
	name : 指定域的名称
	type : 指定域的类型
	indexed : 是否索引
	stored : 是否存储
	required : 是否必须
	multiValued : 是否多值
-->
<field name="id" type="string" indexed="true" stored="true" required="true" multiValued="false" /> 
```

# Spring Data Solr

## 1、引入依赖

```xml
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-solr</artifactId>
    <version>1.5.5.RELEASE</version>
</dependency> 
```

## 2、applicationContext-solr.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:solr="http://www.springframework.org/schema/data/solr"
	xsi:schemaLocation="http://www.springframework.org/schema/data/solr 
  		http://www.springframework.org/schema/data/solr/spring-solr-1.0.xsd
		http://www.springframework.org/schema/beans 
		http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context 
		http://www.springframework.org/schema/context/spring-context.xsd">
	<!-- solr服务器地址 -->
	<solr:solr-server id="solrServer" url="http://127.0.0.1:8080/solr" />
	<!-- solr模板，使用solr模板可对索引库进行CRUD的操作 -->
	<bean id="solrTemplate" class="org.springframework.data.solr.core.SolrTemplate">
		<constructor-arg ref="solrServer" />
	</bean>
</beans>
```

## 3、@Field 注解

作用：如果在pojo上添加了这个注解，那么这个属性会被引用到solr，value为指定solr中field定义的name，如果一样可以省略

@Dynamic注解，在属性上定义就表示是一个动态域

## 4、添加

```java
@Autowired
private SolrTemplate solrTemplate;

solrTemplate.saveBean(item);
//添加多条数据可以使用saveBeans
solrTemplate.commit();//提交事务
```

## 5、按主键查询

```java
//参数1 ：要查询的主键ID
//参数2 ：返回的数据类型
solrTemplate.getById(1,TbItem.class)
```

## 6、按主键删除

```java
solrTemplate.deleteById("1");
```

## 7、分页查询

```java
//条件
Query query = newSimpleQuery("*:*");
//查询条件
Criteria criteria = new Criteria();
//and ：查询的域
//contains ：查询的关键字
criteria.and("item_title").contains("手机");
//将查询条件添加到queyr中
query.addCriteria(criteria);
query.setOffset(0);//开始索引，默认为0，翻页规则 (pageNow - 1) * pageSize
query.setRows(20);//每页记录条数
//ScoredPage ：solr的分页查询
//参数1：查询条件
//参数2：返回类型
ScoredPage<TbItem> page = solrTemplate.queryForPage(query,TbItem.class)
System.out.pringln("总记录数:"+page.getTotalElements());
List<TbItem> list = page.getContent();
```

## 8、高亮查询

```java
@Resource
private SolrTemplate solrTemplate;

@Override
public Map<String, Object> search(Map<String, Object> searchMap) {

    Map<String,Object> map = new HashMap<String, Object>();

    //设置搜索高亮
    HighlightQuery query = new SimpleHighlightQuery();

    //设置高亮的域
    HighlightOptions highlightOptions = new HighlightOptions().addField("item_title");

    //设置高亮前缀
    highlightOptions.setSimplePrefix("<em style='color:red'>");
    //设置高亮后缀
    highlightOptions.setSimplePostfix("</em>");

    //设置高亮选项
    query.setHighlightOptions(highlightOptions);

    //按照关键字查询
    Criteria criteria = new Criteria("item_keywords").is(searchMap.get("keywords"));

    //添加条件
    query.addCriteria(criteria);

    //到solr中查询
    HighlightPage<TbItem> page = solrTemplate.queryForHighlightPage(query,TbItem.class);

    //循环高亮入口集合
    for (HighlightEntry<TbItem> entry : page.getHighlighted()) {
        //获取原实体类
        TbItem tbItem = entry.getEntity();

        //判断是否有高亮内容
        if(entry.getHighlights().size() > 0 && entry.getHighlights().get(0).getSnipplets().size() > 0 ){
            //设置高亮的结果
            tbItem.setTitle(entry.getHighlights().get(0).getSnipplets().get(0));
        }
    }
    map.put("rows",page.getContent());

    return map;
}
```
