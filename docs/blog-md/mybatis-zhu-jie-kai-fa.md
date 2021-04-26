# 注解开发入门

在spring4.x开始就推荐我们使用注解，完全去取代xml的配置文件

目前最主流的开发方式就是：只使用注解，不再使用xml配置

mybatis注解方式的开发是一种未来的趋势,这种方式比传统的xml的开发要简单并且高效

## 导入jar包

```xml
<dependencies>
    <!-- mysql驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.38</version>
    </dependency>
    <!-- mybatis的核心包 -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.4.6</version>
    </dependency>
    <!-- junit单元测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>
    <!-- slf4j-log4j12  (slf4j:酸辣粉) -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.7.25</version>
    </dependency>
</dependencies>
```

## 配置文件

log4j.properties

```properties
log4j.rootLogger=DEBUG,A1
log4j.logger.org.mybatis=DEBUG
log4j.appender.A1=org.apache.log4j.ConsoleAppender
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=%-d{yyyy-MM-dd HH:mm:ss,SSS} [%t] [%c]-[%p] %m%n
```

jdbc.properties

```properties
jdbc.dirver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mybatis?useUnicode=true&amp;characterEncoding=utf-8
jdbc.username=root
jdbc.password=root
```

mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <!-- 引入外部的属性文件 -->
  <properties resource="jdbc.properties"></properties>
  <settings>
  	<!-- 开启驼峰命名 -->
  	<setting name="mapUnderscoreToCamelCase" value="true"/>
  </settings>
  <!-- 配置数据源 -->
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${jdbc.dirver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
    <package name="cn.kgc.mapper"/>
  </mappers>
  
</configuration>
```

- @Select("SQL")
- @Insert("SQL")
- @Delete("SQL")
- @Update("SQL")

## 解决数据库表中的列名和pojo中属性名不一致

### 第一种

给sql 语句起别名

### 第二种

@Results 相当于是`resultMap`

```java
@Select("select * from book")
@Results(id="bookMap",
    value={
        @Result(id=true,column="id",property="id"),
        @Result(column="book_name",property="name"),
        @Result(column="price",property="price")
})
List<Book> getAllBooks();
```

## 注解开发中的动态sql

### 输入映射类型为简单类型

```java
/**
 * 有可能查询全部，有可能根据id查询
 * 动态sql中输入映射为简单类型，输入映射为简单类型  test中变量名必须叫_parameter
 */
@Select("<script>SELECT * FROM book <if test='_parameter != null'>WHERE id=#{id}</if></script>")
List<Book> getBooksOrById(Integer id);
```

### 输入映射类型为pojo

开发产生SQL语句的类和方法

```java
package cn.kgc.sql.provider;

import cn.kgc.pojo.Book;

public class BookMapperProvider {
	/**
	 * 专门用来给BookMapper接口来提供动态sql语句的
	 * @param book
	 * @return
	 */
	public String getBooks(Book book){
		String sql = "select * from book";
		if(book != null){
			if(book.getId() != null){
				//id有值
				sql = "select * from book where id=#{id}";
			}
			if(book.getName() != null && !book.getName().equals("")){
				sql = "select * from book where name like #{name}";
			}
			if(book.getId() != null && (book.getName() != null && !book.getName().equals(""))){
				sql = "select * from book where id=#{id} and name like #{name}";
			}
		}
		return sql;
	}
}
```

接口

```java
/**
 * 查询：有可能查询全部，有可能根据id查询，有可能根据name做模糊查询
 * @param book
 * @return
 */
@SelectProvider(type=BookMapperProvider.class,method="getBooks")
List<Book> getBooks(Book book);
```

## 注解开发实现复杂的映射关系

复杂的映射开发本质是两种一对一、一对多

注解就对应的是：@One(一对一) @Many(一对多)

要求我们使用懒加载

### 一对一关系

在核心配置文件中开启懒加载

```java
 <settings>
  	<!-- 开启驼峰命名 -->
  	<setting name="mapUnderscoreToCamelCase" value="true"/>
  	<!-- 开启懒加载 -->
  	<setting name="lazyLoadingEnabled" value="true"/>
  	<!-- mybatis3.4.1之前默认值是true，需要设置为false（将积极加载改为消息加载也就是按需加载） -->
  	<setting name="aggressiveLazyLoading" value="false"/>
  	<!-- 因为我这里为了打印对象里信息的方便，所以都重写了toString方法，mybatis中默认是如果使用(equals,clone,hashCode,toString任意一个方法)那么就不再延迟加载 -->
  	<setting name="lazyLoadTriggerMethods" value=""/>
  </settings>
public interface GradeMapper {
	/**
	 * 根据id查询对象
	 * @param id
	 * @return
	 */
	@Select("select * from grade where id=#{id}")
	Grade getGradeById(Integer id);
}
public interface StudentMapper {
	/**
	 * 查询学生顺便将学生所在的年级名称查询出来
	 */
	@Select("select * from student")
	@Results(id="studentMap",
			value={
			@Result(id=true,column="id",property="id"),
			@Result(column="name",property="name"),
			@Result(column="grade_id",property="grade",
					one=@One(select="cn.kgc.mapper.GradeMapper.getGradeById",fetchType=FetchType.LAZY))
			
	})
	List<Student> getAllStudents();
}
```

> FetchType.LAZY表示加载的方式是懒加载, FetchType.EAGER表示一定联合查询
>
> 如果不添加fetchType，默认就是懒加载

## 一对多的关系

```java
public interface StudentMapper {
	/**
	 * 根据年级编号查询学生列表
	 * @param id
	 * @return
	 */
	@Select("select * from student where grade_id=#{gid}")
	List<Student> findStudentsListByGradeId(Integer id);
}
package cn.kgc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.FetchType;

import cn.kgc.pojo.Grade;

public interface GradeMapper {

	@Select("select * from grade")
	@Results(id="gradeMap",
			value={
				@Result(id=true,column="id",property="id"),
				@Result(column="name",property="name"),
				@Result(column="id",property="studentList",
						many=@Many(select="cn.kgc.mapper.StudentMapper.findStudentsListByGradeId",fetchType=FetchType.LAZY))
	})
	List<Grade> getGrades();
}
```

## mybatis基于二级缓存的开发

一级缓存基于`sqlSession`的，默认就存在的，咱们可以不用管，它一定会存在

### 4-1 在核心配置文件中开启二级缓存

```xml
<!-- 开启二级缓存(新版本的mybatis默认就已经开启了，所以我们不用专门开) -->
<setting name="cacheEnabled" value="true"/>
```

### 4-2 在mapper接口中使用注解配置开启二级缓存

```xml
<!-- 开启二级缓存(新版本的mybatis默认就已经开启了，所以我们不用专门开) -->
<setting name="cacheEnabled" value="true"/>
```

### 4-2 `pojo`需要实现序列化 接口

```java
public class Book implements Serializable{
}
```

### 4-3 mapper开启二级缓存

```java
@CacheNamespace(blocking=true)		//在mapper接口中开启二级缓存，默认是所有的查询都使用二级缓存
public interface BookMapper {
    /**
	 * 查询:根据主键查询
	 * 同样准守：输入映射类型为简单类型 #{随便写}
	 * 如果列名不一样,可以直接引用上面已经写好的@Results定义的列和pojo属性映射的关系，方式：@ResultMap("@Results的id")
	 */
	@Select("SELECT * FROM book WHERE id=#{id}")
	@ResultMap("bookMap")
	//@Options(useCache=true)   //默认就是开启二级缓存，可以不用添加该注解
	Book getBookById(Integer id);
}
```

# 分页查询

## 添加分页插件的jar包依赖

```xml
<!-- pageHelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.1.6</version>
</dependency>
```

## 在核心配置文件中配置分页拦截器

```xml
<!-- 添加分页插件 -->
<plugins>
<plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>
```

## 实现分页操作

```java
/**
 * 分页查询:在实际开发中我们都会去使用分页插件来完成
 */
@Test
public void testPage(){
    //1.开始分页(参数一：当前要展示的页码(1,2..)，  参数二：每页显示的信息条数)
    PageHelper.startPage(1, 3);
    //2.执行查询(正常的执行)
    BookExample example = new BookExample();
    /*如果分页中有条件
    Criteria criteria = example.createCriteria();
    criteria.andNameLike("%龙%");
    */
    List<Book> list = bookMapper.selectByExample(example);
    //3.分页就通过pageHelper拦截器来实现分页
    PageInfo<Book> pageInfo = new PageInfo<Book>(list);
    //一页信息
    List<Book> bookList = pageInfo.getList();
    for (Book book : bookList) {
        System.out.println(book);
    }
    System.out.println("总的页数：" + pageInfo.getPages());
}
```
