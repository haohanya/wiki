1、导入依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
</dependency>
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>jsp-api</artifactId>
    <version>2.2</version>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>
```

2、配置web.xml

```xml
一般固定不变
<!--1.注册DispatcherServlet-->
<servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--关联一个springmvc的配置文件:【servlet-name】-servlet.xml-->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springmvc-servlet.xml</param-value>
    </init-param>
    <!--启动级别-1-->
    <load-on-startup>1</load-on-startup>
</servlet>
<!--/ 匹配所有的请求；（不包括.jsp）-->
<!--/* 匹配所有的请求；（包括.jsp）-->
<servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

3、配置springmvc-servlet.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <!-- 自动扫描包，让指定包下的注解生效,由IOC容器统一管理 -->
    <context:component-scan base-package="com.cn.controller"/>
    <!-- 让Spring MVC不处理静态资源 -->
    <mvc:default-servlet-handler />
    <mvc:annotation-driven />
    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"
          id="internalResourceViewResolver">
        <!-- 前缀 -->
        <property name="prefix" value="/WEB-INF/view/" />
        <!-- 后缀 -->
        <property name="suffix" value=".jsp" />
    </bean>
</beans>
```

4、使用注解配置

这时一个基本的注解配置

```java
@Controller//@Controller注解的类会自动添加到Spring上下文中
public class HelloController {
    @RequestMapping("/index")//映射访问路径
    public String hello(Model model){
        model.addAttribute("msg","Hello SpringMVC");//向视图中传值
        return "index";//转发到/WEB-INF/view/index.jsp
    }
}
```

指定请求方式

```java
//path=映射访问路径,method=指定的请求方式，如果不是get请求会寻找其他相匹配的请求，没有则报405错
//RequestMethod：get，post，delete，put，.....
@RequestMapping(path = "/index",method = RequestMethod.GET)
public String hello(Model model){
    model.addAttribute("msg","Hello SpringMVC");//向视图中传值
    return "index";//转发到/WEB-INF/view/index.jsp
}
```

带参请求

```java
@RequestMapping(path = "/index",method = RequestMethod.GET)
public String hello(String name,String id, Model model){
    String res = name+id;
    model.addAttribute("msg","Hello SpringMVC"+res);
    return "index";
}
//这样可以使用name=xxx id=xxx来获取请求值
```



## RestFul风格

```java
@RequestMapping(path = "/index/{id}/{name}",method = RequestMethod.GET)
public String hello(@PathVariable String name,@PathVariable String id, Model model){
    String res = name+id;
    model.addAttribute("msg","Hello SpringMVC"+res);
    return "index";
}
//使用 @PathVariable 注解，让方法参数的值对应绑定到一个URI模板变量上。
```

https://blog.kuangstudy.com/index.php/archives/466/

## 重定向和转发

https://blog.kuangstudy.com/index.php/archives/475/

转发：

​	隐式转发：直接return默认是隐式转发

​	显示转发：return "forward:/WEB-INF/view/index.jsp"

需要去掉视图解析器

重定向

​	return "redirect:/index.jsp";

## 接收参数数据回显

情况：在前端传来的参数名不同时可以在参数列表添加注解：@RequestParam("username")指定参数名

```java
public String hello(@RequestParam("username") String name, Model model){
    model.addAttribute("msg","Hello SpringMVC");
    return "redirect:index.jsp";
}
```

## 解决乱码问题

```xml
<filter>
    <filter-name>encoding</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>encoding</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
<!--    设置session默认过期时间15分支-->
    <session-config>
        <session-timeout>15</session-timeout>
    </session-config>
```

## 解决mvc无法直接将对象返回json的问题

```xml
pom.xml
<jackson-version>2.10.0</jackson-version>

<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>${jackson-version}</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>${jackson-version}</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>${jackson-version}</version>
</dependency>
mvc-config.xml
<!--这里我只摘取需要新加入的配置，指定转换器-->
<mvc:annotation-driven>
    <mvc:message-converters>
        <bean class="org.springframework.http.converter.StringHttpMessageConverter"/>
        <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
    </mvc:message-converters>
</mvc:annotation-driven>

```

## 文件上传下载

```xml
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.2.1</version>
</dependency>
```



```java
@RequestMapping("/add")
public String add(EdocEntry entry,MultipartFile myfile) throws Exception{
    //1.实现附件上传
    String path = "E:\\tomcat7\\webapps\\upload\\";
    String oldName = myfile.getOriginalFilename();
    String newName = UUID.randomUUID() + oldName.substring(oldName.lastIndexOf("."));
    File file = new File(path + newName);
    myfile.transferTo(file);
    //3.重定向到查询
    return "redirect:index";
}
```

```java
//文件下载
@RequestMapping("/down")
public ResponseEntity<byte[]> down(@RequestParam(value="id",required=true) Integer id) throws Exception{
    //根据id获取到对象
    String path = entryService.getEntryPathById(id);
    System.out.println(path);
    //下载内容
    byte[] body = null;
    File file = new File(path);
    InputStream inputStream = new FileInputStream(file);
    body = new byte[inputStream.available()];
    inputStream.read(body);
    //请求头
    HttpHeaders headers = new HttpHeaders();
    String name = path.substring(path.lastIndexOf("\\") + 1);
    headers.add("Content-Disposition", "attachement;filename=" + URLEncoder.encode(name, "utf-8"));
    //状态吗
    HttpStatus status = HttpStatus.OK;
    ResponseEntity<byte[]> entiy = new ResponseEntity<byte[]>(body, headers, status);
    return entiy ;
}
```

## 时间处理

```java
@DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createdtime;
```

