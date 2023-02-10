> 策略模式：定义一组算法，将每个算法独立封装起来，让他们可以相互替换；
> 著名应用场景：再使用 if else 就把 xx 给 xx 了；消灭你代码中的 if else；


# 定义
```java
public interface Strategy {
    void exec();
}

public class Demo1Strategy implements Strategy {
    @Override
    public void exec() {

    }
}

public class DemoStrategy implements Strategy {
    @Override
    public void exec() {

    }
}
```
> 策略模式拥有一个策略接口，以及N个策略实现；

# 创建
> 一般来说策略类会有很多个，所以我们可以使用工厂类然后根据类型来获取不同的策略实现


```java
public class StrategyFactory {
    public static final Map<String, Strategy> container = new ConcurrentHashMap<>();

    static {
        container.put("Demo", new DemoStrategy());
        container.put("Demo1", new Demo1Strategy());
    }

    public static Strategy getStrategy(String key) {
        return container.get(key);
    }
}
```
> 这种方式需要保证策略类是无状态的，如果需要保存有状态数据，可以在map中存入class，然后使用反射创建实例（也可以 if else new）
> 
> 也可以在map的value泛型中使用`Map<String, Supplier<Strategy>>`，put：`container.put("demo", DemoStrategy::new);`这样每get一次都是一个新对象

