# I/O 模型

I/O 模型就是用什么样的通道进行数据的发送和接收，很大程度上决定了程序通信的性能。

Java一共支持三种网络编程模型：BIO、NIO、AIO

## BIO

Java BIO 就是传统的 Java io 编程，相关的接口和类都在 `java.io` 包中

BIO (Blocking I/O) ：同步并阻塞，服务器实现模式为一个连接一个线程，即客户端有连接请求时服务器端就需要启动一个线程进行处理，如果这个连接不做任何事情会造成不必要的线程开销，可以通过线程池机制改善

BIO方式适用于链接数比较小，且固定的架构，这种方式对服务器资源要求比较搞，并发局限于应用中，JDK1.4以前唯一的选择

![image-20210117183620122](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20210117183620122.png)

## NIO

同步非阻塞，服务器实现模式为一个线程处理多个连接，即客户端发送的连接请求都会注册到多路复用器上，多路复用器轮询到连接有I/O请求就进行处理

NIO 方式适用于连接数量多，且连接比较短的架构，比如聊天服务器，弹幕系统，服务器之间的通讯等，JDK1.4开始支持

![image-20210117184414022](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20210117184414022.png)

## AIO

异步非阻塞，AIO引入异步通道的概念，采用了 Proactor 模式，简化了程序编写，有效的请求才启动线程，它的特点是先由操作系统完成后才通知服务端启动线程去处理

一般适用于连接数较多，且连接时间较长的应用，充分调用 OS 参与并发操作，JDK7开始支持

# Java BIO

## Java BIO工作机制

1. 服务器启动一个 ServerSocket
2. 客户端启动 SOcket 对服务器进行通信，默认情况下服务器端需要对每个客户简历一个程序与之通讯
3. 客户端发起请求后，先咨询服务器是否有线程响应，如果没有则会等待，或则拒绝
4. 如果有响应，客户端线程会等待请求结束后，在继续执行

## Java BIO Example

### 服务端

```java
package io.mvvm.bio;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @program: Netty
 * @description: BIO 服务端
 * @author: 潘
 * @create: 2021-01-17 19:03
 **/
public class BioServer {

    public static void main(String[] args) throws Exception {
        // 创建一个线程池, 如果有客户端连接就创建一个线程进行通讯
        ExecutorService newCachedThreadPool = Executors.newCachedThreadPool();

        // 创建 ServerSocket
        ServerSocket serverSocket = new ServerSocket(6666);
        System.out.println("服务端启动...");

        while (true) {
            System.out.println("Thread ID：" + Thread.currentThread().getId() +
                    " Thread Name：" + Thread.currentThread().getName());
            // 监听，等待客户端连接
            System.out.println("等待客户端连接");
            final Socket socket = serverSocket.accept();
            System.out.println("连接到一个客户端");

            // 创建一个线程进行通讯
            newCachedThreadPool.execute(() -> {
                handler(socket);
            });
        }
    }

    private static void handler(Socket socket) {
        try {
            System.out.println("Thread ID：" + Thread.currentThread().getId() +
                    " Thread Name：" + Thread.currentThread().getName());
            byte[] bytes = new byte[1024];
            // 通过 Socket 获取输入流
            InputStream inputStream = socket.getInputStream();

            // 循环读取客户端发送的数据
            while (true) {
                System.out.println("Thread ID：" + Thread.currentThread().getId() +
                        " Thread Name：" + Thread.currentThread().getName());

                System.out.println("读取数据...");
                int read = inputStream.read(bytes);
                if (read != -1) {
                    System.out.println(new String(bytes, 0, read));
                } else {
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}

```

### 客户端

```java
package io.mvvm.bio;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

/**
 * @program: Netty
 * @description: Bio 客户端
 * @author: 潘
 * @create: 2021-01-17 19:19
 **/
public class BioClient {
    public static void main(String[] args) {
        // 通过构造函数创建Socket，并且连接指定地址和端口的服务端
        try {
            Socket socket = new Socket("127.0.0.1", 6666);

            PrintWriter pw = null;
            // 写数据到服务端
            while (true) {
                pw = new PrintWriter(socket.getOutputStream());
                System.out.print("请输入需要发送的内容：");
                pw.println(new Scanner(System.in).next());
                pw.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

## Java BIO 存在的问题

1. 每次请求都需要创建独立的线程和对应的客户端进行数据传输
2. 并发数较大时，需要创建大量线程来处理连接，系统资源占用较大
3. 连接建立后，如果当前线程展示没有数据可读，则线程就阻塞在 Read 操作上，造成线程资源浪费
