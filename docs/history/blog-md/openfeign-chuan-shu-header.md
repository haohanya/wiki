## OpenFeign传输Header
在最近项目中我们使用token方式认证用户信息，其中授权方案如下

用户向gateway发起请求并附带密文token，gateway解析token后返回明文token到微服务，每个微服务通过Filter去获取到明文token并创建SecurityContext

但是这种方案使用到openFeign进行微服务之间的通讯就需要拿到明文token传输给其他微服务才能进行授权

也是查了很多的资料，最终解决方案如下

首先在Feign服务加入配置类

```java
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class FeginInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate requestTemplate) {
        Map<String,String> headers = getHeaders(getHttpServletRequest());
        for(String headerName : headers.keySet()){
            if("x-token".equals(headerName)){
                String value = getHeaders(getHttpServletRequest()).get(headerName);
                requestTemplate.header(headerName, value);
            }
        }
    }
    private HttpServletRequest getHttpServletRequest() {
        try {
            return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    private Map<String, String> getHeaders(HttpServletRequest request) {
        Map<String, String> map = new LinkedHashMap<>();
        Enumeration<String> enumeration = request.getHeaderNames();
        while (enumeration.hasMoreElements()) {
            String key = enumeration.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
        }
        return map;
    }

}
```

配置文件加入

```yml
hystrix:
  command:
    default:
      execution:
        isolation:
          strategy: SEMAPHORE
```

上面设置完成后，会出现空指针，解决方案：在启动类中加入

```java
@Bean
public RequestContextListener requestContextListener(){
    return new RequestContextListener();
}
```

另外，之前是传输的明文token，也就是说是用户信息的json串，在feign中特殊字符会出现问题，可以将明文token转换为base64传输
