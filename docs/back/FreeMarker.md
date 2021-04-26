## 1、freemarker入门

### 1.依赖核心包
```xml
<!-- 依赖freemarker -->
<dependency>
	<groupId>org.freemarker</groupId>
	<artifactId>freemarker</artifactId>
	<version>2.3.23</version>
</dependency>
```
### 2.创建模板文件
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>这个是模板</title>
</head>
<body>
	<#--  这是我的注释，不会被输出 -->
	hello ${name}
</body>
</html>
```
### 3.生成文件
- 第一步：创建Configuration对象（直接new，在构造方法中添加`freemarker`的版本号）
    第二步：设置模板所在的路径
- 第三步：设置模板文件的编码字符集（一般使用`utf-8`）
- 第四步：加载一个模板，创建一个模板对象
- 第五步：创建数据模型（使用的是Map<String,Object> 还可以使用自定义的`pojo`实际开发中都用map）
- 第六步：创建writer对象，一般用`FileWriter`对象进行实例化，执行生成的文件
- 第七步：调用模板对象的process方法输出文件
- 第八步：关闭流

```java
public static void main(String[] args) throws Exception{
    //1.创建配置类
    Configuration configuration = new Configuration(Configuration.getVersion());
    //2.设置模板所在目录
    configuration.setDirectoryForTemplateLoading(new File("F:\\workspace002\\freemarker-demo01\\src\\main\\resources"));
    //3.设置编码集
    configuration.setDefaultEncoding("UTF-8");
    //4.加载模板
    Template template = configuration.getTemplate("hello.html");
    //5.创建数据模型
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("name", "张三");
    //6.创建writer对象，准备用来输出文件
    Writer out = new FileWriter(new File("E:\\freemarker\\hello.html"));
    //7,输出文件
    template.process(data, out);
    //8.关闭流
    out.close();
}
```

## FTL指令

###  1.assign

> 作用：用于在页面上定义一个变量

```html
	<#-- assign：用来在页面上定义一个变量 -->
	<#assign name="张三">
	获取变量：${name}
	<hr/>
	<#-- assign:还可以用来定义一个对象 -->
	<#assign info={"name":"李四","age":18,"hobs":"java"}>
	获取到对象的属性:姓名-${info.name},年龄-${info.age},爱好-${info.hobs}
```

### 2.include

> 作用：此指令用于模板文件之间的相互嵌套

```html
<#include "head.ftl">
```

### 3.if

> 作用：用于条件判断

```html
data.put("success", true);

<#if success = true>
	success的值是true
<#else>
	success的值是false
</#if>
```

### 4.list

> 作用：在页面中遍历集合

```html
<ul>
	<#list mylist as user>
		<li>${user.name}</li>
	</#list>
</ul>
```

### 5.内建函数

`语法：变量 + ? + 函数名`

#### 5-1 获取集合的大小(size)
`${mylist?size}`
#### 5-2 转换`json`字符串为`json`对象
```html
<#-- 定义一个json字符串  -->
<#assign text="{'name':'张三','sex':'男'}">
<#-- 将json字符串转换成json对象 -->
<#assign person=text?eval>
姓名：${person.name}，性别:${person.sex}
```
#### 5-3 日期
```html
年月日：${mydate?date}
<br/>
时分秒：${mydate?time}
<br/>
年月日时分秒：${mydate?datetime}
<br/>
自定义日期：${mydate?string('yyyy年MM月dd日  hh时mm分ss秒')}
```
#### 5-4 数字转换成字符串
`${mynum?c}`

### 6.空值处理
#### 6-1 处理方案一(缺值表达式)
```html
${mytest!"值为null"}
</br>
${mytest!}
```

#### 6-2 处理方案二
```html
<#if mytest??>
	mytest值是存在的:${mytest}
<#else>
	mytest的值为null
</#if>
```

### 7.运算符

#### 7-1 算术运算符
`+  -   *   /   %`
#### 7-2 逻辑运算符
`&& 、 || 、 !`

#### 7-3 比较运算符
- = 或者 ==
- !=
- \>  或者是 gt
- < 或者是 lt
- \>= 或者是 gte
- <= 或者是 lte
