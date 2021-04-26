## 获取Class对象的方式

```java
//将字节码文件加载进内存，返回Class对象
Class.forName("全类名");
```

多用于配置文件，将类名定义在配置文件中。读取文件，加载类
类名.class：通过类名的属性class获取
多用于参数的传递
对象.getClass()：getClass()方法在Object类中定义着。

```java
//多用于对象的获取字节码的方式
Class clazz = News.class;
//实例化一个对象：等同于 new 一个对象
Object obj = clazz.newInstance();
//获取类名
System.out.println(clazz.getSimpleName());
//获取完整的包名+类名
System.out.println(clazz.getName());
```

## Class对象功能

## 获取成员变量

 Field[] getFields() ：获取所有public修饰的成员变量

 Field getField(String name) 获取指定名称的 public修饰的成员变量

 Field[] getDeclaredFields(); //获取所有的成员变量，不考虑修饰符

 Field getDeclaredField(String name); // 获取指定名称的成员变量，不考虑修饰符

```java
Class clazz = News.class;
System.out.println(clazz.getSimpleName());//获取类名
System.out.println(clazz.getName());//获取包名+类名
Object obj = clazz.newInstance();//实例化News的这个对象
Table table = obj.getClass().getAnnotation(Table.class);//获取obj对象的Table注解，没有返回null
System.out.println(table.value());
Field[] fields = clazz.getDeclaredFields();
for (Field field : fields) {
	field.setAccessible(true);//暴力反射,如果不写这个将会报错
    //获取属性的注解
    //Field field1 = obj.getClass().getDeclaredField(field.getName());//获取obj对象的指定属性
    PK pk = field.getAnnotation(PK.class);//获取属性的注解

	if(pk!=null){
    	System.out.println(field.getName()+">>>"+pk);//获取属性名称
    }
        field.set(obj,null);//给当前clazz对象的field属性赋值为i
        System.out.println(field.get(obj));//输出clazz对象的field的属性值
}
```

## 获取构造方法

 Constructor<?>[] getConstructors()

 Constructor getConstructor(类<?>... parameterTypes)

 Constructor getDeclaredConstructor(类<?>... parameterTypes)

 Constructor<?>[] getDeclaredConstructors()

## 获取成员方法

 Method[] getMethods()

 Method getMethod(String name, 类<?>... parameterTypes)

 Method[] getDeclaredMethods()

 Method getDeclaredMethod(String name, 类<?>... parameterTypes)

## Field：成员变量

设置值

```java
void set(Object obj, Object value)
```

获取值，传的是对象

```java
get(Object obj) 
```

忽略访问权限修饰符的安全检查

```java
setAccessible(true)
```

## Constructor:构造方法

创建对象，如果使用空参数构造方法创建对象，操作可以简化：Class对象的newInstance方法

```java
T newInstance(Object... initargs)
```

## Method：方法对象

执行方法

```java
Object invoke(Object obj, Object... args)
```

获取方法名称

```java
String getName
```

## 反射获取注解

获取obj对象的Table注解，没有返回null，obj是要获取的对象

```java
Table table = obj.getClass().getAnnotation(Table.class);
```

获取属性的注解，获取obj对象的`field.getName()`的属性注解

```java
Field field1 = obj.getClass().getDeclaredField(field.getName());//获取obj对象的指定属性
PK pk = field1.getAnnotation(PK.class);//获取属性的注解
```

## 获取当前调用的方法上的注解

```java
StackTraceElement[] stack = new Throwable().getStackTrace();
Method method = this.getClass().getMethod(stack[1].getMethodName());//这里0是当前方法的注解，1是调用者方法的注解
for(Annotation an : method.getAnnotations()){
    System.out.println(an);
}
```
