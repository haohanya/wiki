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
