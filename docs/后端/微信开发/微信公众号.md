# 测试号申请

[进入测试号申请](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)

# 接入服务器

**1. 定义接口** `GET /wechat/event`

接口形参： `String signature, String timestamp, String nonce, String echostr`

- `String signature` 签名
- `String timestamp` 时间戳
- `String nonce` 随机数
- `String echostr` 如果签名验证后是有效的，则将此参数的值响应给微信

其中还有一个参数 `token` 是在微信公众平台设置的，此参数待会参与签名验证，所以需要保存

**2. 签名验证**

签名验证使用了 `sha1` 算法，规则如下

- 将 `token`、`timestamp`、`nonce`、 `echostr` 使用字典排序后拼接起来 `Arrays.sort(args);`
- sha1 加密字符串，并和 `signature` 做字符串比较
- 如果一致则说明此消息来源于微信服务器，则将 `echostr` 返回出去

```java
public static boolean checkSignature(String token, String timestamp, String nonce, String signature) {
    return sign(token, timestamp, nonce).equals(signature);
}

public static String sign(String... args) {
    Arrays.sort(args);
    StringBuilder sb = new StringBuilder();
    for (String a : args) {
        sb.append(a);
    }
    return DigestUtils.sha1Hex(sb.toString().getBytes(StandardCharsets.UTF_8)); // 此处使用了commons-codec
}
```

**3. 接受公众号事件**

微信公众号事件例如：收消息、关注/取消关注等

具体事件查看：[微信公众号文档](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html)

接受事件需要定义一个和验证签名一样的接口，但是是 POST 请求：`POST /wechat/event`

每次微信调用此接口时，会在body中提供参数

```xml
<xml>
    <ToUserName><![CDATA[gh_360ff160c95a]]></ToUserName> <!-- 开发者微信号 -->
    <FromUserName><![CDATA[oktUu5vatGHldFvw3LgFLUx84eY4]]></FromUserName> <!-- 发送方帐号（一个OpenID） -->
    <CreateTime>1657248880</CreateTime> <!-- 消息创建时间 （整型） -->
    <MsgType><![CDATA[event]]></MsgType> <!-- 消息类型，文本为text, 事件 event -->
    <Event><![CDATA[subscribe]]></Event> <!-- msgType=event; 事件类型，subscribe(订阅)、unsubscribe(取消订阅) -->
    <EventKey><![CDATA[]]></EventKey> <!-- 事件 KEY 值，qrscene_为前缀，后面为二维码的参数值 -->
</xml>
```