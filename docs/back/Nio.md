
# Java NIO

## 什么是 Java NIO

Java NIO（java non-blockIng IO）是指 JDK1.4 及以上版本里提供的权限 Api （New IO），为所有的原始类型（boolean类型除外）提供缓存支持的数据容器，使用它可以提供非阻塞式的该伸缩性能网络

NIO 相关的类都放在 `java.nio` 包及子包中

NIO 有三大核心部分：Channel（通道）、Buffer（缓冲区）、Selector（选择器）

NIO 是面向缓冲区，或面向块编程的。数据读取到一个它处理的缓冲区，需要时可以在缓冲区中前后移动，这就增加了处理过程中的灵活性，使用它可以提供非阻塞的高伸缩性网络

Java NIO 的非阻塞模式，使一个宪曾从某通道发送请求或者读取数据，但是它技能得到日期前可用的数据，如果目前没有数据可用时，就什么都不会获取，而不是保持线程阻塞，所以直至数据便的可以读取之前，该线程可以继续做其他的事情，非阻塞写也是如此，一个线程请求写入一些数据到某通道，但不需要等待它完全写入，这个县城同事可以去做别的事情

**简单说，NIO 是可以做到用一个线程来处理多个操作。**

## NIO 和 BIO 的比较

1. BIO 以流的方式处理数据，而 NIO 以缓冲区的方式处理数据，缓冲区的效率比流的效率高很多
2. BIO 是阻塞的，NIO 是非阻塞的
3. BIO 基于字节流和字符流进行操作，而 NIO 基于 Channel 和 Buffer 进行操作，`数据总是从通道去读到缓冲区中`，或者`从缓冲区写入到通道中`。Selector 用于建通多个通道的事件（比如：连接请求，数据到达等），因此使用单个线程就可以监听多个客户端通道

## 缓冲区

### 什么是缓冲区

缓冲区（Buffer）：本值上是一个`可以读写数据的内存块`，也可也理解成`容器对象(含数组)`，该对象提供了一组方法，可以更轻松的使用内存块，缓冲区对象内置了一些机制，能够跟踪和记录缓冲区的状态变化情况。Channel 提供从文件、网络读取数据的通道，但是读取和写入的数据都必须由 Buffer 实现

### Buffer 类和子类

在 NIO 中，Buffer 是一个顶层父类，它是一个抽象类

![image-20210117200202929](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20210117200202929.png)

> `CharBuffer`：存储字符数据到缓冲区
>
> `FloatBuffer`：存储小数到缓冲区
>
> `IntBuffer`：存储整数到缓冲区
>
> `ByteBUffer`：存储字节数据到缓冲区
>
> `DoubleBuffer`：存储小数到缓冲区
>
> `LongBuffer`：存储长整形到缓冲区
>
> `ShortBuffer`：存储字符串到缓冲区



Buffer 类定义了所有的缓冲区都具有的四个属性来提供关于其所包含的数据元素的信息

```java
// Invariants: mark <= position <= limit <= capacity
private int mark = -1;
private int position = 0;
private int limit;
private int capacity;
```

> `mark`：标记
>
> `position`：位置，下一个要被读取或者写入的元素的索引，每次读写缓存数据时都会改变这个值，为下次读写操作做准备
>
> `limit`：表示缓冲区的当前终点，不能对缓冲区超过极限的位置进行读写操作。且极限是可以修改的
>
> `capacity`：容量，即可以容纳的最大数据量。在缓冲区创建时被设定，且不能改变

**Buffer 类相关方法**

```java
public abstract class Buffer {
    // JKD1.4
    public final int capacity() // 返回此缓冲区的容量
    public final int position() // 返回此缓冲区的位置
    public final Buffer position(int newPosition) // 设置此缓冲区的位置
    public final int limit() // 返回此缓冲区的限制
    public final Buffer limit(int newLimit) // 设置此缓冲区的限制
    public final Buffer mark() // 在此缓冲区的位置设置标记
    public final Buffer reset() // 将此缓冲区的位置重置为以前标记的位置
    public final Buffer clear() // 清除此缓冲区，即将各个标记恢复到初始状态，但是数据并没有真正擦除
    public final Buffer flip() // 反转此缓冲区
    public final Buffer rewind() // 重绕此缓冲区
    public final int remaining() // 返回当前位置与限制之间的元素数
    public final boolean hasRemaining() // 告知此缓冲区是否为只读缓冲区
    public abstract boolean isReadOnly(); // 告知此缓冲区是否为只读缓冲区
    // JDK1.6
    public abstract boolean hasArray(); // 告知此缓冲区是否具有可访问的底层实现数组
    public abstract Object array(); // 返回此缓冲区的底层实现数组
    public abstract int arrayOffset(); // 返回此缓冲区的底层实现数组中第一个缓冲区元素的偏移量
    public abstract boolean isDirect(); // 告知此缓冲区是否为直接缓冲区
}
```

### ByteBuffer

```java
public abstract class ByteBuffer {
    // 缓冲区创建相关API
    public static ByteBuffer allocateDirect(int capacity); // 创建直接缓冲区
    public static ByteBuffer allocate(int capacity); // 设置缓冲区的初始容量
    public static ByteBuffer wrap(byte[] array, int offset, int length); // 构造初始化位置 offset 和上界 length 的缓冲区
    public static ByteBuffer wrap(byte[] array); // 吧一个数组放到缓冲区中使用
	// 缓存区存取相关API
    public abstract byte get(); // 从当前位置 position 上get，get之后，position会自动 + 1
    public abstract byte get(int index); // 从绝对位置get
    public abstract ByteBuffer put(byte b); // 从当前位置上添加，put之后，position会自动 - 1
    public abstract ByteBuffer put(int index, byte b); // 从绝对位置上put
}
```

## 通道（Channel）

### 什么是 Channel

Nio 的通道类似于流但是有一部分区别

1. 通道可以同事进行读写，而流只能读或者写
2. 通道可以实现异步读写数据
3. 通道可以从缓冲区读数据，也可也写数据到缓冲区

BIO 中的 `Stream` 是单向的，例如 `FileInputStream` 只能进行读取数据的操作，而 NIO 中的 `Channel` 是双向的，可以进行读和写操作

Channel 在 NIO 中是一个接口`public interface Channel extends Closeable{}`

常用的 Channel 类有： FileChannel、DatagramChannel、ServerSocketChannel、SocketChannel

> `FileChannel` 用于文件的数据读写
>
> `DatagramChannel` 用于 UDP 的数据读写
>
> `ServerSocketChannel`和`SocketChannel `用于 TCP 的数据读写
>
> `ServerSocketChannel` 类似于BIO中的 `ServerSocket`
>
> `SocketChannel` 类似于BIO中的 `Socket`

### FileChannel 类

FileChannel 主要用来对本地文件进行IO操作，常见的方法如下

```java
public abstract int read(ByteBuffer dst) throws IOException; // 从通道读取数据并放到缓冲区中
public abstract int write(ByteBuffer src) throws IOException; // 吧缓冲区的数据写道通道中
// 吧数据从当前通道赋值给目标通道
public abstract long transferTo(long position, long count, WritableByteChannel target) throws IOException;
// 从目标通道中赋值数据到当前通道
public abstract long transferFrom(ReadableByteChannel src, long position, long count) throws IOException;
```

### FileChannel Example

#### 本地文件写入

```java
package io.mvvm.nio.channel;

import java.io.FileOutputStream;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.StandardCharsets;

/**
 * @program: Netty
 * @description: FileChannel 写入
 * @author: 潘
 * @create: 2021-01-17 20:51
 **/
public class FileChannelWriteExample {
    public static void main(String[] args) throws Exception {
        String name = "zhangsan";
        // 创建一个输出流
        FileOutputStream stream = new FileOutputStream("E:\\fileName.txt");
        // 通过 stream 获取 FileChannel
        FileChannel channel = stream.getChannel();
        // 创建一个缓冲区
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        // 将 name 放入到 buffer中
        buffer.put(name.getBytes(StandardCharsets.UTF_8));
        // 对 buffer 进行 flip，即读写转换
        buffer.flip();
        // 将 buffer 写入到 channel 中
        channel.write(buffer);
        channel.close();
    }
}

```

#### 本地文件读取

```java
package io.mvvm.nio.channel;

import java.io.FileInputStream;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

/**
 * @program: Netty
 * @description: FileChannel 读取
 * @author: 潘
 * @create: 2021-01-17 20:58
 **/
public class FileChannelReadExample {
    public static void main(String[] args) throws Exception {
        // 创建文件输入流
        FileInputStream stream = new FileInputStream("\\fileName.txt");
        // 通过 stream 获取 FileChannel
        FileChannel channel = stream.getChannel();
        // 创建一个缓冲区
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        // 将通道的数据读取到 buffer
        channel.read(buffer);
        // 将 buffer 转为 string
        System.out.println(new String(buffer.array()));
        channel.close();
    }
}
```

#### 文件读取并写入

```java
package io.mvvm.nio.channel;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

/**
 * @program: Netty
 * @description: FileChannel 文件拷贝
 * @author: 潘
 * @create: 2021-01-17 21:06
 **/
public class FileChannelCopyExample {
    public static void main(String[] args) throws Exception {
        FileInputStream inputStream = new FileInputStream("E:\\work\\Netty\\nio\\src\\main\\resources\\fileName.txt");
        FileChannel inputStreamChannel = inputStream.getChannel();

        FileOutputStream outputStream = new FileOutputStream("E:\\work\\Netty\\nio\\src\\main\\resources\\fileName2.txt");
        FileChannel outputStreamChannel = outputStream.getChannel();

        ByteBuffer buffer = ByteBuffer.allocate(1024);

        // 循环读取
        while (true) {
            // 清除 buffer
            buffer.clear();
            int read = inputStreamChannel.read(buffer);
            if (read == -1) {
                // 读取完毕
                break;
            }

            // 将 buffer 中数据写入到 outputStreamChannel 中
            // 读写转换
            buffer.flip();
            outputStreamChannel.write(buffer);
        }
        outputStreamChannel.close();
        inputStreamChannel.close();
    }
}

```

#### 文件拷贝 transferFrom

```java
package io.mvvm.nio.channel;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.channels.FileChannel;

/**
 * @program: Netty
 * @description: transferFrom 文件拷贝
 * @author: 潘
 * @create: 2021-01-17 21:15
 **/
public class FileChannelTransferFromExample {
    public static void main(String[] args) throws Exception {
        // 创建流
        FileInputStream inputStream = new FileInputStream("E:\\work\\Netty\\nio\\src\\main\\resources\\fileName.txt");
        FileOutputStream outputStream = new FileOutputStream("E:\\work\\Netty\\nio\\src\\main\\resources\\fileName1.txt");
        // 获取对应流的 channel
        FileChannel inputStreamChannel = inputStream.getChannel();
        FileChannel outputStreamChannel = outputStream.getChannel();
        // 使用 transferFrom 进行拷贝
        outputStreamChannel.transferFrom(inputStreamChannel, 0, inputStreamChannel.size());
        // 关闭资源
        inputStreamChannel.close();
        outputStreamChannel.close();
        outputStream.close();
        inputStream.close();
    }
}

```

## 注意事项和细节

### 类型注意

ByteBuffer 支持类型化的 put 和get，put时放入的是什么数据类型，get时就应该使用对应的数据类型取出，否则可能有 `BufferUnderflowException` 异常

```java
ByteBuffer buffer = ByteBuffer.allocate(1024);
buffer.putShort((short) 10);
buffer.flip();
buffer.getInt();
```

### 普通 Buffer 转只读 Buffer

```java
ByteBuffer buffer = ByteBuffer.allocate(1024);
buffer.put("zhangsan".getBytes(StandardCharsets.UTF_8));
// 读取
buffer.flip();
// 得到一个只读的 buffer
ByteBuffer readOnlyBuffer = buffer.asReadOnlyBuffer();
System.out.println(readOnlyBuffer.getClass());
// 读取
while (readOnlyBuffer.hasRemaining()) {
    System.out.println(readOnlyBuffer.get());
}
// 此段代码将会抛出异常
// Exception in thread "main" java.nio.ReadOnlyBufferException
readOnlyBuffer.put("lisi".getBytes(StandardCharsets.UTF_8));
```

### MappedByteBuffer

NIO 提供了 MappedByteBuffer，可以让文件直接在内存（堆外的内存）中进行修改，而如何同步到文件中由 NIO 来完成

### Scattering 和 Gathering

前面的读写操作都是通过一个 Buffer 完成的，NIO 还支持通过多个 Buffer （Buffer数组）完成读写操作

## Selector 选择器

### 什么是 Selector

Java 的 NIO 使用非阻塞的 IO 方式。 Selector（选择器）可以用一个线程处理多个客户端连接

Selector 能够检测多个注册的通道上是否有事件发生（多个事件的方式可以注册到同一个Selector），如果有事件发生，便获取事件然后针对每个事件进行相应处理。这样就可以只用一个单线程去管理多个通道，也就是管理多个连接和请求。

只有在 连接/通道 真正有读写事件发生时，才会进行读写，这样就大大的减少了系统开销，并且不必为每个连接都创建一个线程，不用去维护多个线程

### Selector 类相关方法

```java
public abstract class Selector implements Closeable {
    // 得到一个选择器对象
    public static Selector open() throws IOException {}
    // 监控所有注册的通道，当其中有IO操作可以进行时，将对应的加入到内部稽核中并返回，参数用来设置超时时间
    public abstract int select(long timeout) throws IOException;
	// 从内部集合中获得到所有的 SelectionKey
    public abstract Set<SelectionKey> selectedKeys();
}
```

NIO 中的 ServerSocketChannel 功能类似于 ServerSocket，SocketChannel  功能类似于 Socket

Selector相关方法说明：

```java
selector.select(); // 阻塞
selector.select(1000); // 阻塞1000毫秒，在1000毫秒后返回
selector.wakeup(); // 唤醒 Selector
selector.selectNow(); //步阻塞，立马返回
```

## NIO 快速入门

编写一个服务端
```java
package io.mvvm.nio.demo;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

public class NioServer {
    public static void main(String[] args) throws IOException {
        // 创建 ServerSocketChannel -> ServerSocket
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();

        // 得到一个Selecor对象
        Selector selector = Selector.open();

        // 绑定一个端口 ，在服务器端监听
        serverSocketChannel.socket().bind(new InetSocketAddress(6666));
        // 设置为非阻塞
        serverSocketChannel.configureBlocking(false);

        // 吧 serverSocketChannel 注册到 selector 并且事件设置为 OP_ACCEPT
        serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

        // 等待客户端连接
        while (true) {
            // 等待一秒，如果没有事件发生则返回
            if (selector.select(1000) == 0) {
                System.out.println("服务器等待了1秒，无连接");
                continue;
            }

            // 如果返回的大于0，就获取到相关的selectionKey集合
            // 1、如果返回的大于0，表示已经获取到关注的事件
            // 2、selector.selectedKeys() 返回关注事件的集合
            // 通过 selectionKeys 反向获取通道
            Set<SelectionKey> selectionKeys = selector.selectedKeys();

            Iterator<SelectionKey> keyIterator = selectionKeys.iterator();
            while (keyIterator.hasNext()) {
                // 获取到SelectionKey
                SelectionKey key = keyIterator.next();

                // 根据Key对应的通道发生的事件做相应处理

                // 如果是 OP_ACCEPT，有新的客户端连接
                if (key.isAcceptable()) {
                    // 该客户端生成一个SocketChannel
                    SocketChannel socketChannel = serverSocketChannel.accept();
                    System.out.println("客户端连接成功，生成了一个 socketChannel：" + socketChannel.hashCode());
                    // 将 SocketChannel 设置为非阻塞
                    socketChannel.configureBlocking(false);
                    // 关闭socketChannel注册到selector，关注事件为OP_READ，同时给 socketChannel 关联一个 Buffer
                    socketChannel.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(1024));
                }

                // 发生OP_READ
                if (key.isReadable()) {
                    // 通过key 反向获取对应的channel
                    SocketChannel channel = (SocketChannel) key.channel();
                    // 获取到该channel关联的buffer
                    ByteBuffer buffer = (ByteBuffer) key.attachment();
                    channel.read(buffer);
                    System.out.println("form 客户端：" + new String(buffer.array()));
                }

                // 手动从集合中移除当前的selectionKey，防止重复操作
                keyIterator.remove();
            }


        }

    }
}
```

编写一个客户端

```java
package io.mvvm.nio.demo;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.nio.charset.StandardCharsets;

public class NioClient {

    public static void main(String[] args) throws IOException {
        // 得到一个网络通道
        SocketChannel socketChannel = SocketChannel.open();
        // 设置非阻塞
        socketChannel.configureBlocking(false);
        // 提供服务器端的ip和端口
        InetSocketAddress inetSocketAddress = new InetSocketAddress("127.0.0.1", 6666);
        // 连接服务器
        if (!socketChannel.connect(inetSocketAddress)) {
            while (!socketChannel.finishConnect()) {
                System.out.println("因为连接需要时间，客户端不会阻塞，可以做其他工作...");
            }
        }

        // 如果连接成功就发送数据
        String sendMessage = "Hello Server";
        ByteBuffer buffer = ByteBuffer.wrap(sendMessage.getBytes(StandardCharsets.UTF_8));
        // 发送数据，将buffer数据写入channel
        socketChannel.write(buffer);
        System.in.read();

    }

}

```

### SelectionKey

> SelectionKey 表示 Selector 和 网络通道的注册关系，一共有四种
>

`int OP_ACCEPT`：有新的网络连接可以 accept，值为16
`int OP_CONNECT`：代表连接已经建立，值为8
`int OP_READ`：代表读操作，值为1
`int OP_WRITE`：代表写操作，值为4


* 相关方法 *

```java
// 得到与之关联的 Selector 对象
public abstract Selector selector();
// 得到与之关联的通道
public abstract SelectableChannel channel();
// 得到与之关联的共享数据
public final Object attachment();
// 设置或改变监听事件
public abstract SelectionKey interestOps(int ops);
// 是否可以 accept
public final boolean isAcceptable();
// 是否可以读
public final boolean isReadable();
// 是否可以写
public final boolean isWritable();
```

### ServerSocketChannel

> 在服务器端监听心的客户端 Socket 连接
>

* 相关方法 *

```java
// 得到一个 ServerSocketChannel 通道
public static ServerSocketChannel open();
// 设置服务器端的端口号
public final ServerSocketChannel bind(SocketAddress local);
// 设置阻塞或非阻塞模式，false表示采用非阻塞模式
public final SelectableChannel configureBlocking(boolean block);
// 接收一个连接，返回代表这个连接的通道对象
public SocketChannel accept();
// 注册一个选择器并设置监听事件
public final SelectionKey register(Selector sel, int ops);
```

### SocketChannel

> SocketChannel 网络 IO 通道，具体负责进行读写操作，NIO 把缓冲区的数据写入通道，或者把通道里的数据读到缓冲区
>

* 相关方法 *

```java
// 得到一个 SocketChannel 通道
public static SocketChannel open();
// 设置阻塞或非阻塞模式，false表示采用非阻塞模式
public final SelectableChannel configureBlocking(boolean block);
// 连接服务器
public abstract boolean connect(SocketAddress remote);
// 如果上面的方法连接失败，接下来就要通过该方法完成连接操作
public abstract boolean finishConnect();
// 往通道里写数据
public abstract int write(ByteBuffer src);
// 从通道里读数据
public abstract int read(ByteBuffer dst);
// 注册一个选择器并设置监听事件，最后一个参数可以设置共享数据
public abstract SelectionKey register(Selector sel, int ops, Object att)
// 关闭通道
public final void close();
```

## 编写一个群聊小应用

> 实现思路：
>
> 1、首先需要一个服务端，服务端主要实现接收客户端的信息，然后将消息转发给其他客户端
> 
> 2、编写一个客户端，客户端主要用于接收服务器转发的消息以及发送消息到服务端
>

### 服务端

```java
package io.mvvm.nio.group;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.*;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

/**
 * @program: Netty
 * @description: 群聊服务端
 * @author: 潘
 * @create: 2021-03-13 14:31
 **/
public class ChatServer {
    // 定义属性
    private Selector selector;
    private ServerSocketChannel listenChannel;
    private static final int PORT = 6667;

    public ChatServer() {
        try {
            // 得到选择器
            selector = Selector.open();
            // ServerSocketChannel
            listenChannel = ServerSocketChannel.open();
            // 绑定端口
            listenChannel.socket().bind(new InetSocketAddress(PORT));
            // 设置非阻塞模式
            listenChannel.configureBlocking(false);
            // 将listenChannel注册到 selector
            listenChannel.register(selector, SelectionKey.OP_ACCEPT);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 监听
    public void listen() {
        try {
            // 循环处理
            while (true) {
                int count = selector.select();

                // 有事件处理
                if (count > 0) {
                    // 遍历得到 selectionKey 集合
                    Iterator<SelectionKey> keyIterator = selector.selectedKeys().iterator();
                    while (keyIterator.hasNext()) {
                        // 取出 selectionKey
                        SelectionKey key = keyIterator.next();
                        // 监听到 accept
                        if (key.isAcceptable()) {
                            SocketChannel sc = listenChannel.accept();
                            sc.configureBlocking(false);
                            // 将sc注册到seletor
                            sc.register(selector, SelectionKey.OP_READ);

                            System.out.println(sc.getRemoteAddress() + "上线");
                        }

                        // 通道发送 read 事件，即通道是可读的状态
                        if (key.isReadable()) {
                            readData(key);
                        }
                        // 删除当前key，防止重复处理
                        keyIterator.remove();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

        }
    }


    // 读取客户端消息
    private void readData(SelectionKey key) {
        // 取到关联的channel
        SocketChannel channel = null;

        try {
            // 得到channel
            channel = (SocketChannel) key.channel();
            // 创建buffer
            ByteBuffer buffer = ByteBuffer.allocate(1024);

            int count = channel.read(buffer);
            if (count > 0) {
                // 把缓冲区的数据转为字符串
                String msg = new String(buffer.array());
                System.out.println("form 客户端：" + msg);

                // 象其他的客户端转发消息（去掉自己）
                sendInfoToOtherClients(msg, channel);
            }

        } catch (IOException e) {
            try {
                System.out.println(channel.getRemoteAddress() + "下线了...");
                // 取消注册
                key.cancel();
                // 关闭通道
                channel.close();
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        }
    }

    // 转发消息给其他客户端（通道）
    private void sendInfoToOtherClients(String msg, SocketChannel self) throws IOException{
        System.out.println("服务器转发消息中...");
        // 遍历所有注册到Selector上的 SocketChannel并排除 self
        for (SelectionKey key : selector.keys()) {
            // 通过key取出对应的socketChannel
            Channel targetChannel = key.channel();

            // 排除自己
            if (targetChannel instanceof SocketChannel && targetChannel != self) {
                // 转型
                SocketChannel dest = (SocketChannel) targetChannel;
                // 将msg存储到buffer
                ByteBuffer buffer = ByteBuffer.wrap(msg.getBytes(StandardCharsets.UTF_8));
                // 将buffer的数据写入通道
                dest.write(buffer);
            }
        }
    }

    public static void main(String[] args) {
        ChatServer server = new ChatServer();
        server.listen();
    }
}

```

### 客户端

```java
package io.mvvm.nio.group;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Scanner;

/**
 * @program: Netty
 * @description: 客户端
 * @author: 潘
 * @create: 2021-03-13 14:51
 **/
public class ChatClient {
    // 服务端的IP
    private final String HOST = "127.0.0.1";
    // 服务端的端口
    private final int PORT = 6667;

    private Selector selector;
    private SocketChannel socketChannel;
    private String username;

    public ChatClient() throws IOException {
        selector = Selector.open();

        // 连接服务端
        socketChannel = SocketChannel.open(new InetSocketAddress(HOST, PORT));
        // 设置非阻塞
        socketChannel.configureBlocking(false);
        // 将 channel 注册到 selector
        socketChannel.register(selector, SelectionKey.OP_READ);
        // 得到username
        username = socketChannel.getLocalAddress().toString().substring(1);
        System.out.println(username + " is ok...");
    }

    // 向服务端发送消息
    public void sendInfo(String info) {
        info = username + " 说： " + info;

        try {
            socketChannel.write(ByteBuffer.wrap(info.getBytes(StandardCharsets.UTF_8)));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    // 读取从服务端回复的消息
    public void readInfo() {
        try {
            int readChannels = selector.select();
            // 有可用的通道
            if (readChannels > 0) {

                Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
                while (iterator.hasNext()) {
                    SelectionKey key = iterator.next();

                    if (key.isReadable()) {
                        // 得到相关的通道
                        SocketChannel sc = (SocketChannel) key.channel();
                        // 得到一个 buffer
                        ByteBuffer buffer = ByteBuffer.allocate(1024);
                        // 读取
                        sc.read(buffer);
                        // 把读到的缓冲区的数据转为字符串
                        String msg = new String(buffer.array());
                        System.out.println("得到消息："+msg.trim());
                    }
                }
                // 删除当前的selectionKey
                iterator.remove();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws IOException {
        ChatClient client = new ChatClient();
        // 启动一个线程，每个3秒，读取从服务器发送数据
        new Thread(){
            public void run() {
                while (true) {
                    client.readInfo();

                    try {
                        Thread.currentThread().sleep(3000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();

        // 发送数据到服务端
        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNextLine()) {
            System.out.println("请输入发送的消息：");
            String s = scanner.nextLine();
            client.sendInfo(s);
        }
    }
}

```

## 零拷贝
