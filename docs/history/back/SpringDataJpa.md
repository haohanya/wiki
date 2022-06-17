## 什么是Jpa

JPA是Java Persistence API的简称，中文名Java持久层API，是JDK 5.0注解或XML描述对象－关系表的映射关系，并将运行期的实体对象持久化到数据库中

Sun引入新的JPA ORM规范出于两个原因：其一，简化现有Java EE和Java SE应用开发工作；其二，Sun希望整合ORM技术，实现天下归一。

## mybatis和hibernate的区别

mybatis和hibernate一样是个orm数据库框架

1). hibernate是全自动，而mybatis是半自动。

mybatis开发是需要去写sql语句，而使用hibernate不需要写任何的sql语句就能实现各种操作

2).hibernate数据库移植性远大于mybatis。

如果使用mybatis，一旦数据库发生变化，需要重写编码（比如mysql数据库的sql语句和oracle以及sqlServer数据库他们用的sql语句会有一些差别）。但是使用hibernate一旦数据库发生变化，我们不需要重写编码，只需要改少许的配置就能实现

3).hibernate拥有完整的日志系统，mybatis则欠缺一些。

4).mybatis相比hibernate需要关心很多细节

hibernate配置要比mybatis复杂的多，学习成本也比mybatis高。但也正因为 mybatis使用简单，才导致它要比hibernate关心很多技术细节。mybatis由于不用考虑很多细节，开发模式上与传统jdbc区别很小，因 此很容易上手并开发项目，但忽略细节会导致项目前期bug较多，因而开发出相对稳定的软件很慢，而开发出软件却很快。hibernate则正好与之相反。 但是如果使用hibernate很熟练的话，实际上开发效率丝毫不差于甚至超越mybatis。

5).sql直接优化上，mybatis要比hibernate方便很多

这也是hibernate没落的原因之一。因为sql语句自动生成的，效率上不好控制

为什么现在mybatis要比hiernate流行？

很重要的原因：hibernate的学习难度是目前大家接触的框架中最大的，学习成本远远高于mybatis，所以mybatis更流行

## 入门

1、引入依赖.....

2、配置数据源

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/springboot?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8&useSSL=true
spring.datasource.username=root
spring.datasource.password=root
```

3、编写实体类

> 在mybatis的开发中，实体类所在包名都用的是pojo，但是在spring-data-jpa中，因为spring中实体类的包名一般都是叫做domain，所以我们开发的时候实体类的包名也叫domain

```java
import javax.persistence.*;
/**
	@Entity ：该注解表示这个类是一个实体类，（准备用来建立数据库表的映射关系）
	@Table ：用来建立实体类和数据库表的真实映射关系，属性name为表名，表名和类名一致可以省略
	@id ：表示主键
	@GeneratedValue(strategy = GenerationType.IDENTITY) ：该字段是自增的
	@Column ：建立数据库列名的映射
*/
@Entity
@Table(name = "grade")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private Integer id;

    @Column(name = "name",nullable = false,length = 50)
    private String name;
	
    ....
}
```

4、编写接口

> 在spring-data-jpa中，接口所在的包名，官方用的是repository，所以我们也这么用，它等同于我们之前的dao或者是mapper

```java
/**
 * 编写spring-data-jpa接口要点：
 *      1.继承JpaRepository<参数一要操作的类,参数二改类的主键类型>
 *      2.在接口上添加注解@Repository，如果该接口在启动类的同一个包或者是在启动类的子包中，那么该类将交给spring管理
 *   spring-data-jpa接口编写的规则（因为增删改是就用封装好的就可以，该接口主要是用于查询）
 *   精确查询的规则：find + 表名 + By + domain中的属性名
 *   模糊查询的规则：find + 表名 + By + domain中的属性名 + Like	
 */
@Repository
public interface GradeAreaRepository extends JpaRepository<Grade,Integer> {
	/**
     * 根据年级名称查询年级
     * @param name
     * @return
     */
    Grade findGradeByName(String name);

    /**
     * 根据年级名称做模糊查询
     * @param name
     * @return
     */
    List<Grade> findGradeByNameLike(String name);

    /**
     * 根据主键查询
     */
    Grade findGradeById(Integer id);
    
    /**
     * 根据id和年级名称做联合查询
     */
    Grade findGradeByIdAndNameLike(Integer id,String name);
    
    /**
     * 单独的分页操作
     * 如果希望做分页操作，返回的数据类型必须是spring-data-jpa跟我们封装好的Page，参数放Pageable接口
     */
    Page<Grade> findAll(Pageable page);
}
```

5、测试

```java
<!-- spring-data-jpa测试需要添加的依赖,如果直接在tomcat中运行不需要该包 -->
<dependency>
    <groupId>net.minidev</groupId>
    <artifactId>asm</artifactId>
    <version>1.0.2</version>
    <scope>test</scope>
</dependency>
//测试增加
@Test
public void testSave(){
    Grade grade = new Grade();
    grade.setName("五年级");
    Grade g = gradeRepository.save(grade);
    //增加后很容易拿到主键
    System.out.println(g);
}

//测试修改(如果不给主键是增加，给主键就是修改)
@Test
public void testUpdate(){
    Grade grade = new Grade();
    grade.setId(4);
    grade.setName("原子弹设置与制造");
    Grade g = gradeRepository.save(grade);
    System.out.println(g);
}
//测试删除--根据主键删除
@Test
public void testDeleteById(){
    //执行删除
    gradeRepository.deleteById(5);
}
//测试删除--根据对象删除
@Test
public void testDeleteByObject(){
    //执行删除
    Grade grade = new Grade();
    grade.setId(4);
    gradeRepository.delete(grade);
}
//测试删除--删除全部
@Test
public void testDeleteAll(){
    gradeRepository.deleteAll();
}

@Test
public void testSave100(){
    for (int i = 1; i <= 100; i++) {
        Grade grade = new Grade();
        grade.setName(i+ "年级");
        gradeRepository.save(grade);
    }

}

//测试查询--查询全部
@Test
public void testGetAll(){
    List<Grade> list = gradeRepository.findAll();
    for (Grade grade : list) {
        System.out.println(grade);
    }
}
//测试查询--根据id查询
@Test
public void testGetById(){
    //根据主键查询
    Grade grade = gradeRepository.findById(1).get();
    System.out.println(grade);
}

//测试查询--根据id查询(在tomcat容器中不会有问题，但是在测试的时候会出现懒加载导致session关闭的问题)
@Test
public void testGetById2(){
    //根据主键查询
    //使用getOne方法需要在配置文件中添加   spring.jpa.properties.hibernate.enable_lazy_load_no_trans=true
    Grade grade = gradeRepository.getOne(1);
    System.out.println(grade);
}


//测试查询--非主键的精确查询--根据年级名称做精确查询
@Test
public void testGetGradeByName(){
    Grade grade = gradeRepository.findGradeByName("1年级");
    System.out.println(grade);
}

//测试查询--模糊查询--根据年级名称做模糊查询
@Test
public void testGetGradeByNameLike(){
    String name = "火";
    List<Grade> list = gradeRepository.findGradeByNameLike("%" + name + "%");
    for (Grade grade : list) {
        System.out.println(grade);
    }
}

@Test
public void testGetById3(){
    Grade grade = gradeRepository.findGradeById(2);
    System.out.println(grade);
}

//测试查询--多条件联合查询
@Test
public void testGetGradeByIdAndNameLike(){
    Grade grade = gradeRepository.findGradeByIdAndNameLike(1, "%1年级%");
    System.out.println(grade);
}

//测试查询--分页查询
@Test
public void testFindAllPages(){
    //构造Pageable使用PageRequest.of(参数一当前要展示的页码，参数二每页显示的信息条数)
    //注意：在mybatis的pagehelper中，当前源码是从1开始的，但是在spring-data-jpa中分页页码是从0开始
    
    //PageRequest中的其他参数
    //Pageable pageable = PageRequest.of(0,10, Sort.by(Sort.Direction.DESC,"id"));
	//Pageable pageable = PageRequest.of(0,10,Sort.Direction.DESC,"id");
    Pageable pageable = PageRequest.of(1,10);
    Page<Grade> all = gradeRepository.findAll(pageable);
    System.out.println("总条数"+all.getTotalElements());
    System.out.println("总页数" + all.getTotalPages());
    System.out.println("是否有下一页"+all.hasNext());
    System.out.println("是否有上一页"+all.hasPrevious());
    System.out.println("是否有内容"+all.hasContent());
    System.out.println("是否首页"+all.isFirst());
    System.out.println("是否最后一页"+all.isLast());
    System.out.println("元素数量"+all.getNumberOfElements());
    //获取到一页数据
    List<Grade> list = all.getContent();
    for (Grade grade : list) {
        System.out.println(grade);
    }
        
}
```
