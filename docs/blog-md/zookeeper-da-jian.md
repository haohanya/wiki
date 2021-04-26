查看tomcat运行日志：tail -f logs/catalina.out

## ZooKeeper安装

官网下载：http://zookeeper.apache.org/releases.html

第一次启动会出现错误

解决方案：把conf目录下的zoo_sample.cfg复制一份，并改名为zoo.cfg

在zookeeper根目录新建一个data目录

修改zoo.cfg里面的dataDir=/tmp/zookeeper

修改为：../data

## 服务提供者

```xml
<!--使用dubbo暴漏服务-->
<dubbo:protocol name="dubbo" port="20881"/>
<!--将工程注册到dubbo中-->
<dubbo:application name="jd-sellergoods-service"/>
<!--注册中心地址-->
<dubbo:registry address="zookeeper://192.168.25.128:2181"/>
<!--开启注解开发-->
<dubbo:annotation package="com.jd.service.impl" />
```

## 服务消费者

```xml
<!-- 引用dubbo 服务 -->
<dubbo:application name="jd-sellergoods-web" />
<dubbo:registry address="zookeeper://192.168.25.128:2181" timeout="30000"/>
<dubbo:annotation package="com.jd.controller" />
```

## Zookeeper集群简介

## 为什么搭建Zookeeper集群

> 大部分分布式应用需要一个主控、协调器或者控制器来管理物理分布的子进程。目前，大多数都要开发私有的协调程序，缺乏一个通用机制，协调程序的反复编写浪费，且难以形成通用、伸缩性好的协调器，zookeeper提供通用的分布式锁服务，用以协调分布式应用。所以说zookeeper是分布式应用的协作服务。
>
> zookeeper作为注册中心，服务器和客户端都要访问，如果有大量的并发，肯定会有等待。所以可以通过zookeeper集群解决。
>
> 下面是zookeeper集群部署结构图：

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1590380537479.jpg)

## 了解Leader选举

> Zookeeper的启动过程中leader选举是非常重要而且最复杂的一个环节。那么什么是leader选举呢？zookeeper为什么需要leader选举呢？zookeeper的leader选举的过程又是什么样子的？
>
> 首先我们来看看什么是leader选举。其实这个很好理解，leader选举就像总统选举一样，每人一票，获得多数票的人就当选为总统了。在zookeeper集群中也是一样，每个节点都会投票，如果某个节点获得超过半数以上的节点的投票，则该节点就是leader节点了。
>
> 以一个简单的例子来说明整个选举的过程.
>
> 假设有五台服务器组成的zookeeper集群,它们的id从1-5,同时它们都是最新启动的,也就是没有历史数据,在存放数据量这一点上,都是一样的.假设这些服务器依序启动,来看看会发生什么 。
>
> 1) 服务器1启动,此时只有它一台服务器启动了,它发出去的报没有任何响应,所以它的选举状态一直是LOOKING状态
>
> 2) 服务器2启动,它与最开始启动的服务器1进行通信,互相交换自己的选举结果,由于两者都没有历史数据,所以id值较大的服务器2胜出,但是由于没有达到超过半数以上的服务器都同意选举它(这个例子中的半数以上是3),所以服务器1,2还是继续保持LOOKING状态.
>
> 3) 服务器3启动,根据前面的理论分析,服务器3成为服务器1,2,3中的老大,而与上面不同的是,此时有三台服务器选举了它,所以它成为了这次选举的leader.
>
> 4) 服务器4启动,根据前面的分析,理论上服务器4应该是服务器1,2,3,4中最大的,但是由于前面已经有半数以上的服务器选举了服务器3,所以它只能接收当小弟的命了.
>
> 5) 服务器5启动,同4一样,当小弟

## ZooKeeper集群搭建

> 真实的集群是需要部署在不同的服务器上的，但是在我们测试时同时启动十几个虚拟机内存会吃不消，所以我们通常会搭建**伪集群**，也就是把所有的服务都搭建在一台虚拟机上，用端口进行区分。
>
> 我们这里要求搭建一个三个节点的Zookeeper集群（伪集群）。
>
> 测试环境
>
>  jdk：1.7
>
>  zookeeper：3.4.6
>
> centos ：6.x

## 1、创建一个目录

```powershell
 mkdir /usr/local/zookeeper-cluster
```

## 2、上传zookeeper文件并解压

```powershell
tar -zxvf zookeeper-3.4.6.tar.gz
# 新建文件夹
mkdir zookeeper-3.4.6/data
#修改coo.cfg名
cd zookeeper-3.4.6/conf/
mv zoo_sample.cfg zoo.cfg
```

## 3、复制zookeeper

```powershell
cp -r  zookeeper-3.4.6 /usr/local/zookeeper-cluster/zookeeper-1
cp -r  zookeeper-3.4.6 /usr/local/zookeeper-cluster/zookeeper-2
cp -r  zookeeper-3.4.6 /usr/local/zookeeper-cluster/zookeeper-3
```

## 4、配置每一个Zookeeper

配置每一个Zookeeper 的dataDir（zoo.cfg） clientPort 分别为2181 2182 2183

```powershell
vi /usr/local/zookeeper-cluster/zookeeper-1/conf/zoo.cfg
```

> clientPort=2181
>
> dataDir=/usr/local/zookeeper-cluster/zookeeper-1/data

```powershell
vi /usr/local/zookeeper-cluster/zookeeper-2/conf/zoo.cfg
```

> clientPort=2182
>
> dataDir=/usr/local/zookeeper-cluster/zookeeper-2/data

```powershell
vi /usr/local/zookeeper-cluster/zookeeper-3/conf/zoo.cfg
```

> clientPort=2183
>
> dataDir=/usr/local/zookeeper-cluster/zookeeper-3/data

## 5、配置集群

> 在每个zookeeper的 data 目录下创建一个 myid 文件，内容分别是1、2、3 。这个文件就是记录每个服务器的ID（内容为自定义，后面会用到，只要不重复即可）

```powershell
cd /usr/local/zookeeper-cluster/
echo 1 >zookeeper-1/data/myid
echo 2 >zookeeper-2/data/myid
echo 3 >zookeeper-3/data/myid
```

在每一个zookeeper 的 zoo.cfg配置客户端访问端口（clientPort）和集群服务器IP列表。

> 解释：server.服务器ID=服务器IP地址:服务器之间通信端口:服务器之间投票选举端口
>
> 服务器ID为上面自定义的内容

```powershell
server.1=192.168.25.143:2881:3881
server.2=192.168.25.143:2882:3882
server.3=192.168.25.143:2883:3883
vi zookeeper-1/conf/zoo.cfg
vi zookeeper-2/conf/zoo.cfg
vi zookeeper-3/conf/zoo.cfg
```

## 6、启动集群

> 启动集群就是分别启动每个实例。

```powershell
./zookeeper-1/bin/zkServer.sh start
./zookeeper-2/bin/zkServer.sh start
./zookeeper-3/bin/zkServer.sh start
# 查看启动状态
./zookeeper-1/bin/zkServer.sh status
./zookeeper-2/bin/zkServer.sh status
./zookeeper-3/bin/zkServer.sh status
# 如果出现错误，则需要查看日志
vi zookeeper.out
```

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1590380587607.png)

> Mode为follower表示是**跟随者**（从）
>
> Mod 为leader表示是**领导者**（主）

## 7、模拟集群异常

> 首先我们先测试如果是从服务器挂掉，会怎么样
>
> 把3号服务器停掉，观察1号和2号，发现状态并没有变化
>
> 由此得出结论，3个节点的集群，从服务器挂掉，集群正常

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1590380605531.png)

> 我们再把1号服务器（从服务器）也停掉，查看2号（主服务器）的状态，发现已经停止运行了。
>
> 由此得出结论，3个节点的集群，2个从服务器都挂掉，主服务器也无法运行。因为可运行的机器没有超过集群总数量的半数。

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1590380619018.png)

> 我们再次把1号服务器启动起来，发现2号服务器又开始正常工作了。而且依然是领导者。

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1590380630247.png)

> 我们把3号服务器也启动起来，把2号服务器停掉，停掉后观察1号和3号的状态。
>
> 发现新的leader产生了~
>
> 由此我们得出结论，当集群中的主服务器挂了，集群中的其他服务器会自动进行选举状态，然后产生新得leader

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1590380642196.png)

> 我们再次测试，当我们把2号服务器重新启动起来启动后，会发生什么？2号服务器会再次成为新的领导吗？我们看结果
>
> 我们会发现，2号服务器启动后依然是跟随者（从服务器），3号服务器依然是领导者（主服务器），没有撼动3号服务器的领导地位。
>
> 由此我们得出结论，当领导者产生后，再次有新服务器加入集群，不会影响到现任领导者。

## Dubbox连接zookeeper集群

修改服务提供者和服务调用者的spring 配置文件,多个节点使用“,”分割

```xml
<!-- 指定注册中心地址 -->
<dubbo:registry protocol="zookeeper" address="192.168.25.129:2181,192.168.25.129:2182,192.168.25.129
```
