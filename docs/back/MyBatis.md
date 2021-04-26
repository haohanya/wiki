# 快速开始

## 1、MyBatis核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <!-- 配置数据源 -->
  <environments default="development">
    <environment id="development">
     <!--事务处理方式-->
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="com.mysql.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/mybatis"/>
        <property name="username" value="root"/>
        <property name="password" value="root"/>
      </dataSource>
    </environment>
  </environments>
<!--映射器：每一个Mapper接口都应该在核心配置文件<mappers>标签中注册-->
  <mappers>
  	<!--使用XML配置文件注册-->
    <mapper resource="com/cn/mybatis/dao/IcpInfoMapper.xml"/>
    <!--使用类注册方式-->
    <mapper class="com.cn.mybatis.dao.IcpInfoMapper" />
  </mappers>
</configuration>
```

## 2、ORM映射文件mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- 这个配置文件主要是配置实体类和数据库中的表映射关系 -->
<!-- mapper：映射信息配置 namesapce:如果是在ibatis的开发中，名字可以随便取，但是在mybatis中将有特殊的意义 -->
<mapper namespace="test">
	<!-- 查询所有的书籍信息 select:专门用于查询的statement
	     id:是statement的唯一标识符
	     resultType:返回值得类型（跟返回的个数无关），将返回类型的全限定名写到这里
	 -->
	<select id="selectAllBooks" resultType="cn.kgc.pojo.Book">
		select * from book
	</select>
</mapper>
```

## 3、日志文件

```properties
log4j.properties
log4j.rootLogger=DEBUG,A1
log4j.logger.org.mybatis=DEBUG
log4j.appender.A1=org.apache.log4j.ConsoleAppender
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=%-d{yyyy-MM-dd HH:mm:ss,SSS} [%t] [%c]-[%p] %m%n
```

## 4、测试

```java
//查询全部
@Test
public void testFindAll() throws Exception{
    //通过流的方式读取配置文件
    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    //1.读取配置文件,得到SqlSessionFactory
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream );
    //2.创建SqlSession
    SqlSession sqlSession = sqlSessionFactory.openSession();
    //3.查询所有(参数：是namespace.statementId)
    List<Book> list = sqlSession.selectList("test.selectAllBooks");
    System.out.println(list);
}
```

# properties属性

创建一个外部的properties文件

```properties
jdbc.dirver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mybatis?useUnicode=true&amp;characterEncoding=utf-8
jdbc.username=root
jdbc.password=root
```

在核心配置文件中引用properties文件

```xml
<properties resource="jdbc.properties"/>
```

使用

> ${jdbc.dirver}
> ${jdbc.url}
> ${jdbc.username}

# settings

`mapUnderscoreToCamelCase`:开启驼峰命名，可以帮助我们完成数据库的经典命名规则，到java的经典命名规则（驼峰命名发）

如：数据库叫user_name 到java类（`pojo`）中是`userName`

```xml
<settings>
    <!-- 开启驼峰命名 -->
    <setting name="mapUnderscoreToCamelCase" value="true"/>
    <!--指定 MyBatis 所用日志的具体实现，未指定时将自动查找。
	日志类型：
	STDOUT_LOGGING 不需要导入jar包，因为是mybatis自带
	NO_LOGGING 代表不需要日志输出
	SLF4J | LOG4J | LOG4J2 | JDK_LOGGING | COMMONS_LOGGING | STDOUT_LOGGING | NO_LOGGING
 	-->
    <setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
```

分析日志输出

# typeAliases（类型别名）

## 自定义别名

```xml
<!--别名，用于简化-->
<typeAliases>
    <!--type：包+类名，alias：别名-->
    <typeAlias type="com.cn.mybatis.entity.IcpInfo" alias="Icp" />
    <!--使用包的方式
		每一个在包 domain.blog 中的 Java Bean，在没有注解的情况下
		会使用 Bean 的首字母小写的非限定类名来作为它的别名
		(这句话意思是：@Alias("author")
		在使用包方式时，javaBean没有添加注解指定别名时自动使用类名{首字母小写})
	-->
    <package name="com.cn.mybatis.entity"/>
</typeAliases>
```

# plugins（插件）

# XML映射

- `cache` – 对给定命名空间的缓存配置。
- `cache-ref` – 对其他命名空间缓存配置的引用。
- `resultMap` – 是最复杂也是最强大的元素，用来描述如何从数据库结果集中来加载对象。
- `parameterMap` – 已被废弃！老式风格的参数映射。更好的办法是使用内联参数，此元素可能在将来被移除。文档中不会介绍此元素。
- `sql` – 可被其他语句引用的可重用语句块。
- `insert` – 映射插入语句
- `update` – 映射更新语句
- `delete` – 映射删除语句
- `select` – 映射查询语句

## select 查询语句

```xml
<!--
	id：一般和Mepper接口的方法名称相同，在命名空间中唯一的标识符，可以被用来引用这条语句。
	parameterType：接收一个int类型的参数
		接收参数使用#{ }包裹着，这个参数对应着接口的参数
	resultType：返回一个hashmap 类型的数据

-->
<select id="selectPerson" parameterType="int" resultType="hashmap">
  SELECT * FROM PERSON WHERE ID = #{id}
</select>
```

## insert updatea delete

在使用这些语句的时候需要提交事务：session.commit();

```xml
<insert id="addIcpInfo" parameterType="icpInfo" >
    insert into icpinfo (icp, name, address, home, introduce, author, email, date, type) values (#{icp}, #{name}, #{address}, #{home}, #{introduce}, #{author}, #{email}, #{date}, #{type})
</insert>
```

获取插入数据后的主键id：useGeneratedKeys="true" keyProperty="cip"

```xml
<insert id="addIcpInfo" useGeneratedKeys="true" keyProperty="cip">
    insert into icpinfo (icp, name, address, home, introduce, author, email, date, type) values (#{icp}, #{name}, #{address}, #{home}, #{introduce}, #{author}, #{email}, #{date}, #{type})
</insert>
```

插入多条数据：传入一个 数组或集合，并返回自动生成的主键。

```xml
<insert id="addIcpInfoList" useGeneratedKeys="true" keyProperty="cip">
    insert into icpinfo (icp, name, address, home, introduce, author, email, date, type) values
    <foreach collection="list" item="item" separator=",">
        (#{item.icp}, #{item.name}, #{item.address}, #{item.home}, #{item.introduce}, #{item.author}, #{item.email}, #{item.date}, #{item.type})
    </foreach>
</insert>
```

# 动态SQL

## if

```xml
对于输入映射类型为pojo类型：
#{pojo中的属性名}   ${pojo中的属性名}
<if test="gradeId != null">
    and grade_id = #{gradeId}
</if>
```

## sql注入的问题

在使用${}会出现`sql`注入的问题（拼接字符串，没有使用预编译）

```xml
如果为简单数据类型需要把name换成_parameter
<bind name="n" value="'%'+name+'%'"/>
and name like #{n}
```

## when

应用场景：可能查询全部，有可能根据条件查询，并且如果第一个条件前面有and，where子句会自动把这个and删除再作为sql语句运行

```xml
<select id="findStudentByLike" resultType="student" parameterType="student">
    select * from student
    <where>
        <if test="name != null and name != ''">
            <bind name="n" value="'%'+name+'%'"/>
            and name like #{n}
        </if>
        <if test="gradeId != null">
            and grade_id = #{gradeId}
        </if>
    </where>
</select>
```

## choose

其实就是java中的switch 或者 if...else if ...else

## set

set标签作用：能自动的判断是否在sql语句的结尾处是否要添加逗号，如果不需要逗号它自动帮我们删除

(和where一样不会自动添加)

```xml
<update id="updateStudentByById" parameterType="student">
    update student
    <set>
        <if test="name != null">
            name = #{name},
        </if>
        <if test="gradeId != null">
            grade_id = #{gradeId}
        </if>
    </set>
    where id = #{id}
</update>
```

## foreach

```xml
<select id="findStudentsById" parameterType="int" resultType="student">
        select * from student where id in
        <foreach collection="list" open="(" separator="," close=")" item="item">
            #{item}
        </foreach>
    </select>
```

# SQL片段

```xml
<sql id="sql">
    select * from student
</sql>
调用
<include refid="sql"></include>
```

# 多表联合查询

## VO

解决思路：要求返回的是一个对象，如果`pojo`不能满足(要返回的列不存在`pojo`中)，那么创建一个VO对象，这个VO对象中包含了所有要返回的字段

### 创建一个VO

```java
package cn.kgc.vo;

import cn.kgc.pojo.Student;
//继承的原则：要返回的字段哪个pojo中多，那么就继承哪个pojo
public class StudentVO extends Student{
	private String gradeName;

	public String getGradeName() {
		return gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}	
}
```

### 编写mapper接口

```java
public interface StudentMapper {
	/**
	 * 查询学生信息，要求展示学生信息中年级名称(联合查询)
	 */
	List<StudentVO> getStudentVO();
}
```

### 编写mapper.xml

```xml
<select id="getStudentVO" resultType="cn.kgc.vo.StudentVO">
	SELECT s.*,g.name gradeName FROM student s,grade g WHERE s.grade_id=g.id
</select>
```

## 一对一

### 按照查询嵌套处理

```xml
<resultMap id="IcpInfoType" type="icpInfo">
<!-- property：实体类的对象属性名，
	column：数据库中关联的列，
	javaType：实体类对象，
	select：一个sql语句查询的是实体对象的sql
-->
    <association property="type" column="type" javaType="type" select="getTypeList" />
</resultMap>
<select id="getList" resultMap="IcpInfoType">
    select * from icpinfo
</select>
<!--这个typeID 获取的是 column="type" 这个列的值-->
<select id="getTypeList" resultType="type" >
    select * from type where tid = #{id}
</select>
```

### 按照结果嵌套处理

```xml
<select id="getList2" resultMap="getList2" >
    select icp, name, address, home, introduce, author, email, `date`, type, tid, tname from icpinfo i ,type t
    where i.type = t.tid
</select>
<!--type = 要查询的对象-->
<resultMap id="getList2" type="icpInfo" >
    <!--property=实体类的属性名 column=列名or别名-->
    <result property="icp" column="icp" />
    <result property="name" column="name" />
    <result property="address" column="address" />
    <result property="home" column="home" />
    <result property="introduce" column="introduce" />
    <result property="author" column="author" />
    <result property="email" column="email" />
    <result property="date" column="date" />
    <!--复杂类型
		property=在icpInfo里的属性是type
		javaType=type的对象
	-->
    <association property="type" javaType="type" >
        <result property="tid" column="tid" />
        <result property="tname" column="tname" />
    </association>
</resultMap>
```

## 一对多

一对多只需要把association换成

```xml
<!--ofType=""
	集合中的泛型信息
-->
<collection property="" ofType=""></collection>
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.kgc.mapper.GradeMapper">
	<!-- 查询年级，把属于这个年级的所有学生查询出来 -->
	<resultMap type="cn.kgc.pojo.Grade" id="gradeStudentMap">
		<id column="id" property="id" javaType="int"/>
		<result column="name" property="name" javaType="string"/>
		<!-- collection:一对多的映射关系
			property:表示一对多映射关系在pojo中的属性名
			ofType:表示该集合的泛型的全限定名
		 -->
		<collection property="studentList" ofType="cn.kgc.pojo.Student">
			<id column="sid" property="id" javaType="int"/>
			<result column="sname" property="name" javaType="string"/>
			<!-- gradeid因为在grade中已经有了，所以不需要再配置 -->
		</collection>
	</resultMap>
	
	<select id="getGradeById" parameterType="int" resultMap="gradeStudentMap">
		SELECT 
		  g.*,
		  s.id sid,
		  s.name sname
		FROM
		  grade g,
		  student s 
		WHERE g.id = s.grade_id 
		  AND g.id = #{id}
	</select>
</mapper>
```

### 多对多

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.kgc.mapper.StudentMapper">
	<resultMap type="cn.kgc.pojo.Student" id="studentMap">
		<id column="id" property="id" javaType="int"/>
		<result column="name" property="name" javaType="string"/>
		<result column="grade_id" property="gradeId" javaType="int"/>
		<!-- 一对多的映射关系 -->
		<collection property="studentCourseList" ofType="cn.kgc.pojo.StudentCourse">
			<id column="scid" property="id" javaType="int"/>
			<!-- studentCourse和course是一对一的映射俄关系 -->
			<association property="course" javaType="cn.kgc.pojo.Course">
				<id column="cid" property="id" javaType="int"/>
				<result column="cname" property="name" javaType="string"/>
			</association>
		</collection>
	</resultMap>

	<select id="getStudentById" parameterType="int" resultMap="studentMap">
	SELECT 
	  s.*,
	  sc.id scid,
	  c.id cid,
	  c.name cname 
	FROM
	  student s,
	  student_course sc,
	  course c 
	WHERE s.id = sc.sid 
	  AND c.id = sc.cid 
	  AND s.id = #{id}
	</select>
</mapper>
```

# 延迟加载

什么是懒加载

> 懒加载：就是在需要数据的时候才加载，不需要数据的时候不加载，这样有利于系统性能的提升，这就是懒加载（也叫做延迟加载）
>
> 好处：在关联查询的时候，根据需求进行关联查询，大大提高了数据库的查询性能。（单表的查询效率永远要比多表联合查询的效率高）
>
> 坏处：因为需要用到数据的时候才去做查询，这样大批量的数据查询的时候等待时间会变得更长，造成用户的体验下降
> (select * from student)会把所有的学生的年级编号也在里面
> 突然要查询年级信息，它底层操作是：根据年级id一个一个去执行查询

## 使用`association`实现懒加载

### 核心配置开启懒加载

```xml
 <settings>
  	<!-- 开启懒加载 -->
  	<setting name="lazyLoadingEnabled" value="true"/>
  	<!-- mybatis3.4.1之前默认值是true，需要设置为false（将积极加载改为消息加载也就是按需加载） -->
  	<setting name="aggressiveLazyLoading" value="false"/>
  	<!-- 因为我这里为了打印对象里信息的方便，所以都重写了toString方法，mybatis中默认是如果使用(equals,clone,hashCode,toString任意一个方法)那么就不再延迟加载 -->
  	<setting name="lazyLoadTriggerMethods" value=""/>
  </settings>
```

GradeMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.kgc.mapper.GradeMapper">
	<!-- 根据id查询年级对象 -->
	<select id="getGradeById" parameterType="int" resultType="cn.kgc.pojo.Grade">
		select * from grade where id=#{id}
	</select>
</mapper>
```

StudentMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.kgc.mapper.StudentMapper">
	
	<resultMap type="cn.kgc.pojo.Student" id="studentMap">
		<id column="id" property="id" javaType="int"/>
		<result column="name" property="name" javaType="string"/>
		<!-- 一个学生对应一个年级：一对一的关系映射
			对于association方式的懒加载：
				select:此处要求是根据年级的id查询年级对象的mapper接口中方法的全限定名
				column:在数据库中表与表之间关系的外键
		 -->
		<association property="grade" javaType="cn.kgc.pojo.Grade"
			select="cn.kgc.mapper.GradeMapper.getGradeById" column="grade_id"></association>
	</resultMap>
	
	<select id="getAllStudents" resultMap="studentMap">
		select * from student
	</select>
</mapper>
```

## 使用`collection`实现懒加载

### 核心配置开启懒加载

```xml
<settings>
<!-- 开启懒加载 -->
<setting name="lazyLoadingEnabled" value="true"/>
<!-- mybatis3.4.1之前默认值是true，需要设置为false（将积极加载改为消息加载也就是按需加载） -->
<setting name="aggressiveLazyLoading" value="false"/>
<!-- 因为我这里为了打印对象里信息的方便，所以都重写了toString方法，mybatis中默认是如果使用(equals,clone,hashCode,toString任意一个方法)那么就不再延迟加载 -->
<setting name="lazyLoadTriggerMethods" value=""/>
</settings>
```

StudentMapper.xml

```xml
<select id="getStudentsByGradeId" parameterType="int" resultType="cn.kgc.pojo.Student">
    select * from student where grade_id=#{gradeId}
</select>
```

GradeMapper.xml

```xml
<!-- 查询年级信息，有可能查询年级中所有的学生信息 -->
<resultMap type="cn.kgc.pojo.Grade" id="gradeMap">
    <id column="id" property="id" javaType="int"/>
    <result column="name" property="name" javaType="string"/>
    <!-- 一对多的映射关系
        select:根据年级编号查询学生列表的方法
        column:就是grade的id（它就是grade表的主键）
     -->
    <collection property="studentList" ofType="cn.kgc.pojo.Student"
        select="cn.kgc.mapper.StudentMapper.getStudentsByGradeId" column="id"></collection>
</resultMap>
<select id="getAllGrades" resultMap="gradeMap">
    select * from grade
</select>
```

# mybatis缓存

## 一级缓存

它是`SqlSession`级别的，同一个`SqlSession`才涉及到一级缓存

一级缓存是默认存在，它不需要去做任何的设置

## 二级缓存

它是mapper级别的，需要开启才能使用

> 缓存在实际开发中是很有用的，它能大大的提升查询的效率，提高程序的性能

### 在核心配置文件中开启二级缓存

```xml
<!-- 开启二级缓存(默认值就是true，准备我们使用二级缓存，可以不用设置) -->
<setting name="cacheEnabled" value="true"/>
```

### 在mappe.xml中开启二级缓存

```xml
<mapper namespace="cn.kgc.mapper.StudentMapper">
	<!-- 在StudentMapper.xml中开启二级缓存 ,因为mybatis中二级缓存的实现类只有一个，默认就是这个，type可以省略不写-->
	<cache type="org.apache.ibatis.cache.impl.PerpetualCache"></cache>
</mapper>
```

### pojo需要实现序列化接口

因为缓存的时候要将pojo流化然后存储在内存中，查询再取出

```java
public class Student implements Serializable{
}
```

> 补充：在mapper应用二级缓存后，默认是所有的查询方法都开启二级缓存，如果要某个查询不使用二级缓存可以添加`useCache="false"`

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
