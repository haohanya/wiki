## 1. 优化配置

## 1.1. 配置tomcat管理员账户

在`conf/ tomcat-users.xml`下添加用户

```xml
 <role rolename="manager"/>
 <role rolename="manager-gui"/>
 <role rolename="admin"/>
 <role rolename="admin-gui"/>
 <user username="tomcat" password="tomcat" roles="admin-gui,admin,manager-gui,manager"/>
```

启动tomcat后登陆查看信息

http://127.0.0.1:8080

![image-20200830222453724](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200830222453724.png)

## 1.2. Tomcat的三种运行模式

**bio**

默认的模式,性能非常低下,没有经过任何优化处理和支持.

**nio**

nio(new I/O)，是Java SE 1.4及后续版本提供的一种新的I/O操作方式(即java.nio包及其子包)。Java nio是一个基于缓冲区、并能提供非阻塞I/O操作的Java API，因此nio也被看成是non-blocking I/O的缩写。它拥有比传统I/O操作(bio)更好的并发运行性能

**apr**

安装起来最困难,但是从操作系统级别来解决异步的IO问题,大幅度的提高性能.

## 1.3. 启动nio模式

修改`conf/server.xml`里的`Connector`节点

修改`protocol`为`org.apache.coyote.http11.Http11NioProtocol`

重启tomcat后登陆查看是否修改成功

![image-20200830223312769](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200830223312769.png)

## 1.4. 执行器（线程池）

在tomcat中每一个用户请求都是一个线程，所以可以使用线程池提高性能。

#### 1.4.1. 开启并使用

修改`conf/server.xml`中Executor节点，大概在59行，将注释打开

![image-20200830223916661](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200830223916661.png)

#### 1.4.2. 参数说明

| Attribute                                                    | Description                                                  | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| threadPriority （优先级）                                    | (int) The thread priority for threads in the executor, the default is `5` (the value of the`Thread.NORM_PRIORITY` constant) | executor中线程的线程优先级，默认值为`5`                      |
| daemon（守护进程）                                           | (boolean) Whether the threads should be daemon threads or not, the default is `true` | 不管线程是否应该是守护进程线程，默认值为`true`               |
| namePrefix（名称前缀）                                       | (String) The name prefix for each thread created by the executor. The thread name for an individual thread will be namePrefix+threadNumber | 执行器创建的每个线程的名称前缀。单个线程的线程名将是namePrefix+threadNumber |
| **maxThreads（最大线程数）**                                 | (int) The max number of active threads in this pool, default is 200 | 线程最大活跃的数量默认是200                                  |
| minSpareThreads（最小活跃线程数）                            | (int) The minimum number of threads always kept alive, default is `25` | 线程最小活跃的数量默认是25                                   |
| maxIdleTime（空闲线程等待间）                                | (int) The number of milliseconds before an idle thread shutsdown, unless the number of active threads are less or equal to minSpareThreads. Default value is `60000`(1 minute) | 空闲线程关闭前的毫秒数，除非活动线程数小于或等于minSpareThreads。默认值为60000（1分钟） |
| **maxQueueSize（最大的等待队列数，超过则请求拒绝）**         | (int) The maximum number of runnable tasks that can queue up awaiting execution before we reject them. Default value is `Integer.MAX_VALUE` | 在拒绝之前可以排队等待执行的可运行任务的最大数量。默认值为Integer.MAX_VALUE |
| **prestartminSpareThreads （是否在启动时就生成minSpareThreads个线程）** | (boolean) Whether minSpareThreads should be started when starting the Executor or not, the default is `false` | 启动Executor时是否应该启动minSpareThreads，默认值为false     |
| threadRenewalDelay （重建线程的时间间隔）                    | (long) If a [ThreadLocalLeakPreventionListener](http://127.0.0.1:8080/docs/config/listeners.html) is configured, it will notify this executor about stopped contexts. After a context is stopped, threads in the pool are renewed. To avoid renewing all threads at the same time, this option sets a delay between renewal of any 2 threads. The value is in ms, default value is `1000` ms. If value is negative, threads are not renewed. | 重建线程池内的线程时，为了避免线程同时重建，每隔threadRenewalDelay（单位： ms ）重建一个线程。默认值为1000 ，设置为负则不重建 |

#### 1.4.3. 最佳实践

修改conf/server.xml大概59

```xml
<Executor name="tomcatThreadPool" namePrefix="catalina-exec-"
         maxThreads="800" minSpareThreads="100" maxQueueSize="100" prestartminSpareThreads="true" />
```

## 1.5. 连接器（Connector）

Connector是Tomcat接收请求的入口，每个Connector有自己专属的监听端口

Connector有两种：HTTP Connector和AJP Connector

#### 1.5.1. 常用通用属性

| Attribute     | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| enableLookups | 若是你想request.getRemoteHost() 的调用 履行，以便返回的长途客户端的实际主机名的DNS查询，则设置为true。设置为false时跳过DNS查找，并返回字符串情势的IP地址（从而提高性能）。默认景象下，禁用DNS查找。 |
| maxPostSize   | 将被容器以FORM URL参数形式处理的最大长度（以字节为单位）的POST。通过设置此属性的值小于或等于0可以禁用该限制。如果没有指定，该属性被设置为2097152（2兆字节）。 |
| port          | TCP端口号，连接器利用该端口号将创建一个服务器套接字，并等待传入的连接。你的操作系统将只允许一个服务器应用程序在一个特定的IP地址侦听特定的端口号。如果使用特殊值0（零），则Tomcat将为连接器随机选择一个空闲的端口。这是通常只用在嵌入式和测试应用程序。 |
| protocol      | 设置协议来处理传入流量。默认值是 HTTP/1.1，将使用自动切换机制来选择阻塞的基于Java的连接器或APR /native 为基础的连接器。如果PATH（Windows）或LD_LIBRARY_PATH（在大多数Unix系统）的环境变量包含在Tomcat的本地库里，APR /native 连接器将被使用。如果在本地库中无法找到，阻断基于Java的连接器将被使用。需要注意的是使用HTTPS比Java连接器与APR /native 连接器有不同的设置。一个明确的协议，而不是依靠上述自动切换机构，可用以下值：org.apache.coyote.http11.Http11Protocol -阻塞式的Java连接器 org.apache.coyote.http11.Http11NioProtocol -不阻塞Java连接器 org.apache.coyote.http11.Http11AprProtocol -APR / native 连接器 也可以使用的用户自定义的实现。看一看在我们的连接器比较图。Java连接器，HTTP和HTTPS，配置是相同的。 APR连接器和APR特定的SSL设置的更多信息，请访问APR文档 |
| URIEncoding   | 这将指定使用的字符编码，来解码URI字符。如果没有指定，ISO-8859-1将被使用。 |

#### 1.5.2. 仓用标准实现

| Attribute               | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| acceptCount             | 当所有可能的请求处理线程都在使用时，传入连接请求的最大队列长度。当队列满时收到的任何请求将被拒绝。默认值是100。 |
| acceptorThreadCount     | 用于接受连接的线程的数量。在一个多CPU的机器上，增加该值，虽然你可能不会真正需要超过2个。此外，有很多非保持活动连接，您可能需要增加这个值。默认值是 1。 |
| compression             | 为了节省服务器带宽，连接器可以使用HTTP/1.1 GZIP压缩。可接受的参数的值是“off ”（禁用压缩），“on ”（允许压缩，这会导致文本数据被压缩），“force ”（强制在所有的情况下压缩），或者一个整数值（这是相当于为“on”，但指定了输出之前被压缩的数据最小量）。如果不知道内容长度但被设置为“on”或更积极的压缩，输出的数据也将被压缩。如果没有指定，该属性被设置为“关”。 注意：这是使用压缩（节省您的带宽）和使用sendfile功能（节省你的CPU周期）之间的权衡。如果连接器支持sendfile功能，例如NIO连接，则使用sendfile将优先于压缩。症状是48 KB的静态文件将未压缩就发送。你可以如下文所述通过设置连接器的useSendfile属性来关闭sendfile，或在默认的conf/web.xml或者你的web应用的web.xml中配置DefaultServlet来改变sendfile的使用量阈值。 |
| connectionUploadTimeout | 上传数据过程中，指定的以毫秒为单位超时时间。只有在设置disableUploadTimeout为false有效。 |
| disableUploadTimeout    | 此标志允许servlet容器在数据上传时使用不同的连接超时，通常较长。如果没有指定，该属性被设置为true，禁用上传超时。 |
| executor                | 指向Executor元素的引用。如果这个属性被设置，并且被命名的executor存在，连接器将使用这个executor，而其他所有线程相关属性将被忽略。请注意共享的executor如果没有指定到一个连接器，则该连接器将使用一个私有的，内部的executor来提供线程池。 |
| maxConnections          | 在任何给定的时间服务器接受并处理的最大连接数。当这个数字已经达到了，服务器将不会接受任何连接，直到连接的数量降到低于此值。基于acceptCount的设置，操作系统可能仍然接受连接。默认值根据不同的连接器类型而不同。对于BIO，默认的是maxThreads的值，除非使用了Executor，在这种情况下默认值是executor的maxThreads值 。对于NIO的默认值是10000。APR /native的默认值是8192。 需要注意的是Windows系统的APR/native，所配置的值将减少到小于或等于maxConnections的1024的倍数的最大值。这样做是出于性能方面的考虑。 如果设置的值-1，maxConnections功能被禁用，而且连接数将不做计算。 |
| maxThreads              | 最多同时处理的连接数，Tomcat使用线程来处理接收的每个请求。这个值表示Tomcat可创建的最大的线程数。如果没有指定，该属性被设置为200。如果使用了execute将忽略此连接器的该属性，连接器将使用execute，而不是一个内部线程池来处理请求。 |
| minSpareThreads         | 始终保持运行最小线程数。如果没有指定，则默认为10。           |
| SSLEnabled              | 在连接器上使用此属性来启用SSL加密传输。如果要打开SSL握手/加密/解密，请设置true。默认值是false。当设置这个值为true时，为了传递正确的request.getScheme（）和 request.isSecure（）到servlets，你需要设置scheme和secure属性。更多信息请查看SSL支持。 |

#### 1.5.3. NIO的具体配置

| **Attribute**                  | **Description**                                              |
| ------------------------------ | ------------------------------------------------------------ |
| pollerThreadCount              | （int）用来处理轮询事件的线程的数量。在版本7.0.27及以前版本，默认值是每个处理器1个。版本7.0.28的默认值是每个处理器1个，但不超过2个。 当接受一个套接字，操作系统拥有全局的锁。所以超过2个线程的好处而迅速减小。有一个以上的线程是因为系统需要非常迅速地接受连接。但通常只要增加acceptCount值就可以解决这个问题。增加该值也可能是有用的，当大量发送文件操作发生的时候。 |
| pollerThreadPriority           | (int)轮询线程的优先级。默认值是5（java.lang.Thread.NORM_PRIORITY常量值）。优先级的更多详细信息，可以查考java.lang.Thread类的JavaDoc 。 |
| selectorTimeout                | （int）选择轮询器select（）的超时时间（以毫秒为单位）。这个值非常重要，因为连接清理工作也是在同一个线程里的，所以不要将此值设置为一个非常高的。默认值是1000毫秒。 |
| useComet                       | (bool)是否允许Comet servlet。默认值是 true。                 |
| useSendfile                    | (bool)使用此属性来启用或禁用sendfile的能力。默认值是true。   |
| socket.directBuffer            | (bool)选择使用直接ByteBuffers或Java映射的ByteBuffers。默认是false。 当您使用直接ByteBuffers，请确保你分配适当的内存量给直接内存空间。在Sun的JDK中，配置如-XX：MaxDirectMemorySize = 256M。 |
| socket.appReadBufSize          | (int)在Tomcat中每个连接的开辟连接一个读ByteBuffer。此属性控制这个缓冲区的大小。默认情况下，这个读缓冲区大小为8192字节。对于较低的并发，你可以增加这个值以缓冲更多的数据。对于长连接数很多的情况，你需要降低这个数值或者增加堆大小。 |
| socket.appWriteBufSize         | (int)在Tomcat中每个连接的开辟连接一个写ByteBuffer。此属性控制这个缓冲区的大小。默认情况下，这个写缓冲区大小为8192字节。对于较低的并发，你可以增加这个值以缓冲更多的响应数据。对于长连接数很多的情况，你需要降低这个数值或者增加堆大小。 这里的默认值是相当低的，如果面对的不是几万并发连接，你应该增大该值。 |
| socket.bufferPool              | (int)NIO连接器使用NioChannel这个类来持有链接到一个套接字的元素。为了减少垃圾收集，NIO连接器缓存这些通道的对象。此值指定这个缓存的大小。默认值是500，表示缓存将持有500个 NioChannel的对象。-1表示不限制缓存大小，0表示不缓存。 |
| socket.bufferPoolSize          | (int)NioChannel池，也可以是基于尺寸大小，而不是基于对象数的。该大小的计算如下： NioChannel的缓冲区大小=读取缓冲区大小+写入缓冲区大小 SecureNioChannel的缓冲区大小=应用程序读取缓冲区大小+应用程序写入缓冲区的大小+网络读取缓冲区大小+网络写入缓冲区的大小 值（以字节为单位），默认值1024 * 1024 * 100 （100MB）。 |
| socket.processorCache          | (int)以减少垃圾收集，Tomcat缓存SocketProcessor对象。该值指定保持在缓存中最多有多少个对象。默认值是500。-1表示不限制缓存大小，0表示不缓存。 |
| socket.keyCache                | (int)以减少垃圾收集，Tomcat缓存KeyAttachment对象。该值指定保持在缓存中最多有多少个对象。默认值是500。-1表示不限制缓存大小，0表示不缓存。 |
| socket.eventCache              | (int)以减少垃圾收集，Tomcat缓存PollerEvent对象。该值指定保持在缓存中最多有多少个对象。默认值是500。-1表示不限制缓存大小，0表示不缓存。 |
| selectorPool.maxSelectors      | (int)减少选择器的争用，在池中使用的选择器最大个数。命令行org.apache.tomcat.util.net.NioSelectorShared值设置为false时，使用此选项。默认值是200。 |
| selectorPool.maxSpareSelectors | (int)以减少选择器的争用，在池中使用的最大备用选择器个数。当选择器返回到池中时，系统可以决定保留它或者让他垃圾回收。当org.apache.tomcat.util.net.NioSelectorShared 值设置为false时，使用此选项。默认值是-1（无限制）。 |
| command-line-options           | 下面的命令行选项可用于NIO连接器：-Dorg.apache.tomcat.util.net.NioSelectorShared=true\|false 默认情况下是true。如果你想每个线程使用一个选择器，将此值设置为false。当你将它设置为false，你可以通过使用selectorPool.maxSelectors属性控制选择器池的大小。 |
| oomParachute                   | (int)NIO连接器实现了一个名叫parachute的OutOfMemoryError错误的策略。它拥有一个块的数据作为一个字节数组。在一个OOM的情况下，这个数据块被释放，并报告错误。这会给VM足够的空间来清理。oomParachute代表parachute（字节数组）的大小（以字节为单位）。默认值是 1024 * 1024（1MB）。请注意，这仅适用于关于Java堆空间的OOM错误，也不是绝对保证，你将能够恢复所有。如果你有一个Java堆之外OOM的，那么这个parachute也无济于事。 |

#### 1.5.4. 最佳实践

```xml
<Connector executor="tomcatThreadPool" port="8080" protocol="org.apache.coyote.http11.Http11NioProtocol"
                connectionTimeout="20000"
                redirectPort="8443" 
                enableLookups="false"
                maxPostSize="10485760"
                URIEncoding="UTF-8"
                acceptCount="100"
                acceptorThreadCount="2"
                disableUploadTimeout="true"
                maxConnections="10000"
                SSLEnabled="false" />
```

## 2. 禁用AJP连接器

AJP（Apache JServer Protocol）

AJPv13协议是面向包的。WEB服务器和Servlet容器通过TCP连接来交互；为了节省SOCKET创建的昂贵代价，WEB服务器会尝试维护一个永久TCP连接到servlet容器，并且在多个请求和响应周期过程会重用连接。

我们一般是使用Nginx+tomcat的架构，所以用不着AJP协议，所以把AJP连接器禁用。

![image-20200830232130409](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200830232130409.png)

将这行代码注释起来即可，重启后如果下图内容消失了即成功

![image-20200830232247634](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200830232247634.png)

## 3. JVM参数优化

## 3.1. JVM内存模型

#### 3.1.1. 栈

> Java栈是与每一个线程关联的，JVM在创建每一个线程的时候，会分配一定的栈空间给线程。它主要用来存储线程执行过程中的局部变量，方法的返回值，以及方法调用上下文。栈空间随着线程的终止而释放。

#### 3.1.2. 堆

> Java中堆是由所有的线程共享的一块内存区域，堆用来保存各种JAVA对象，比如数组，线程对象等。

#### 3.1.3. 堆的分区

JVM堆一般又可以分为以下三部分：

> **Young 年轻区（代）**
>
> Young区被划分为三部分，Eden区和两个大小严格相同的Survivor区，其中，Survivor区间中，某一时刻只有其中一个是被使用的，另外一个留做垃圾收集时复制对象用，在Eden区间变满的时候， GC就会将存活的对象移到空闲的Survivor区间中，根据JVM的策略，在经过几次垃圾收集后，仍然存活于Survivor的对象将被移动到Tenured区间。

> **Tenured 年老区（代）**
>
> Tenured区主要保存生命周期长的对象，一般是一些老的对象，当一些对象在Young复制转移一定的次数以后，对象就会被转移到Tenured区，一般如果系统中用了application级别的缓存，缓存中的对象往往会被转移到这一区间。

> **Perm 永久区（代）**
>
> Perm代主要保存class,method,filed对象，这部份的空间一般不会溢出，除非一次性加载了很多的类，不过在涉及到热部署的应用服务器的时候，有时候会遇到java.lang.OutOfMemoryError : PermGen space 的错误，造成这个错误的很大原因就有可能是每次都重新部署，但是重新部署后，类的class没有被卸载掉，这样就造成了大量的class对象保存在了perm中，这种情况下，一般重新启动应用服务器可以解决问题。

> Virtual区：
>
> 最大内存和初始内存的差值，就是Virtual区。

#### 3.1.4. 设置区大小

JVM提供了相应的参数来对内存大小进行配置。正如上面描述，JVM中堆被分为了3个大的区间，同时JVM也提供了一些选项对Young,Tenured的大小进行控制。

**Total Heap**

`-Xms` ：指定了JVM初始启动以后初始化内存

`-Xmx`：指定JVM堆得最大内存，在JVM启动以后，会分配-Xmx参数指定大小的内存给JVM，但是不一定全部使用，JVM会根据-Xms参数来调节真正用于JVM的内存

`-Xmx` `-Xms`之差就是三个Virtual空间的大小

**Young Generation**

```
-XX:NewRatio=8`意味着tenured 和 young的比值8：1，这样`eden + 2 * survivor = 1 / 9
```

堆内存

`-XX:SurvivorRatio=32`意味着eden和一个survivor的比值是32：1，这样一个Survivor就占Young区的1/34.

`-Xmn` 参数设置了年轻代的大小

**Perm Generation**

-XX:PermSize=16M -XX:MaxPermSize=64M

Thread Stack

-XX:Xss=128K

## 3.2. 常用参数

修改文件：bin/catalina.sh

```powershell
JAVA_OPTS="-Dfile.encoding=UTF-8 -server -Xms1024m -Xmx1024m -XX:NewSize=512m -XX:MaxNewSize=512m -XX:PermSize=256m -XX:MaxPermSize=256m -XX:NewRatio=2 -XX:MaxTenuringThreshold=50 -XX:+DisableExplicitGC"
```

参数说明：

| file.encoding              | 默认文件编码                                                 |
| -------------------------- | ------------------------------------------------------------ |
| -Xmx1024m                  | 设置JVM最大可用内存为1024MB                                  |
| -Xms1024m                  | 设置JVM最小内存为1024m。此值可以设置与-Xmx相同，以避免每次垃圾回收完成后JVM重新分配内存。 |
| -XX:NewSize                | 设置年轻代大小                                               |
| XX:MaxNewSize              | 设置最大的年轻代大小                                         |
| -XX:PermSize               | 设置永久代大小                                               |
| -XX:MaxPermSize            | 设置最大永久代大小                                           |
| -XX:NewRatio=4             | 设置年轻代（包括Eden和两个Survivor区）与终身代的比值（除去永久代）。设置为4，则年轻代与终身代所占比值为1：4，年轻代占整个堆栈的1/5 |
| -XX:MaxTenuringThreshold=0 | 设置垃圾最大年龄，默认为：15。如果设置为0的话，则年轻代对象不经过Survivor区，直接进入年老代。对于年老代比较多的应用，可以提高效率。如果将此值设置为一个较大值，则年轻代对象会在Survivor区进行多次复制，这样可以增加对象再年轻代的存活时间，增加在年轻代即被回收的概论。 |
| -XX:+DisableExplicitGC     | 这个将会忽略手动调用GC的代码使得 System.gc()的调用就会变成一个空调用，完全不会触发任何GC |

## 3.3. 在tomcat中设置JVM参数

#### 3.3.1. windows

修改`bin/catalina.bat`文件设置参数

```powershell
set JAVA_OPTS=-Dfile.encoding=UTF-8 -server -Xms1024m -Xmx2048m -XX:NewSize=512m -XX:MaxNewSize=1024m -XX:PermSize=256m -XX:MaxPermSize=256m -XX:MaxTenuringThreshold=10 -XX:NewRatio=2 -XX:+DisableExplicitGC
```

![image-20200830233658785](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200830233658785.png)

#### 3.3.2. linux

修改`bin/catalina.sh`文件参数（第一行）

```powershell
JAVA_OPTS="-Dfile.encoding=UTF-8 -server -Xms1024m -Xmx2048m -XX:NewSize=512m -XX:MaxNewSize=1024m -XX:PermSize=256m -XX:MaxPermSize=256m -XX:MaxTenuringThreshold=10 -XX:NewRatio=2 -XX:+DisableExplicitGC"
```

![image-20200830234108820](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200830234108820.png)
