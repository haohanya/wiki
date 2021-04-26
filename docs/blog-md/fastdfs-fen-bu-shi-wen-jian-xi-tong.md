## 什么是FastDFS

FastDFS 是用 c 语言编写的一款开源的分布式文件系统。FastDFS 为互联网量身定制，充分考虑了冗余备份、负载均衡、线性扩容等机制，并注重高可用、高性能等指标，使用 FastDFS很容易搭建一套高性能的文件服务器集群提供文件上传、下载等服务。

FastDFS 架构包括 Tracker server 和 Storage server。客户端请求 Tracker server 进行文件上传、下载，通过 Tracker server 调度最终由 Storage server 完成文件上传和下载。

Tracker server 作用是负载均衡和调度，通过 Tracker server 在文件上传时可以根据一些策略找到 Storage server 提供文件上传服务。可以将 tracker 称为追踪服务器或调度服务器。

Storage server 作用是文件存储，客户端上传的文件最终存储在 Storage 服务器上，Storageserver 没有实现自己的文件系统而是利用操作系统 的文件系统来管理文件。可以将storage称为存储服务器。

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1589686914052.jpg)

服务端两个角色：

Tracker：管理集群，tracker 也可以实现集群。每个 tracker 节点地位平等。收集 Storage 集群的状态。

Storage：实际保存文件 Storage 分为多个组，每个组之间保存的文件是不同的。每个组内部可以有多个成员，组成员内部保存的内容是一样的，组成员的地位是一致的，没有主从的概念。

## 文件上传流程

![img](https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1589687036366.jpg)

客户端上传文件后存储服务器将文件 ID 返回给客户端，此文件 ID 用于以后访问该文件的索引信息。文件索引信息包括：组名，虚拟磁盘路径，数据两级目录，文件名。

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1589687044591.jpg)

**组名**：文件上传后所在的 storage 组名称，在文件上传成功后有 storage 服务器返回，需要客户端自行保存。

**虚拟磁盘路径**：storage 配置的虚拟路径，与磁盘选项 store_path*对应。如果配置了

store_path0 则是 M00，如果配置了 store_path1 则是 M01，以此类推。

**数据两级目录**：storage 服务器在每个虚拟磁盘路径下创建的两级目录，用于存储数据

文件。

**文件名**：与文件上传时不同。是由存储服务器根据特定信息生成，文件名包含：源存储

服务器 IP 地址、文件创建时间戳、文件大小、随机数和文件拓展名等信息。

## 文件下载流程

![img]( https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/1589687076743.jpg)

## 0. 准备安装包上传到/usr/local/

FastDFS_v5.05.tar.gz （FastDFS安装包）

libfastcommonV1.0.7.tar.gz （FastDFS依赖程序）

nginx-1.8.0.tar.gz （nginx安装包，用于做文件请求http代理服务器）

fastdfs-nginx-module_v1.16.tar.gz （nginx和fastdfs的桥梁插件模块）

## 1. 安装c/c++编译环境

```powershell
yum install gcc-c++
```

## 2. 安装libevent

```powershell
yum -y install libevent
```

## 3. 安装libfastcommon

将`libfastcommonV1.0.7.tar.gz`拷贝至`/usr/local/`下

```powershell
cd /usr/local
tar -zxvf libfastcommonV1.0.7.tar.gz
cd libfastcommon-1.0.7
./make.sh
./make.sh install
cp /usr/lib64/libfastcommon.so /usr/lib
```

## 4.创建数据存储目录

```powershell
mkdir -p /home/FastDFS/tracker /home/FastDFS/storage /home/FastDFS/client
```

## 5. tracker编译安装

将FastDFS_v5.05.tar.gz拷贝至/usr/local/下

```powershell
tar -zxvf FastDFS_v5.05.tar.gz
cd FastDFS
./make.sh
./make.sh install
cd conf
cp * /etc/fdfs
```

## 6. 编辑/etc/fdfs/tracker.conf

```powershell
vi /etc/fdfs/tracker.conf

base_path=/home/FastDFS/tracker
```

## 7. 启动tracker

```powershell
/usr/bin/fdfs_trackerd /etc/fdfs/tracker.conf [restart](重启)
```

## 8. 配置storage节点

```powershell
vi /etc/fdfs/storage.conf
    base_path=/home/FastDFS/storage
    store_path0=/home/FastDFS/storage
    tracker_server = 192.168.100.151:22122
```

## 9. 启动storage节点

```powershell
/usr/bin/fdfs_storage{fdfs_storaged} /etc/fdfs/storage.conf
```

>  fdfs_storage不存在就使用fdfs_storaged

## 10. 安装nginx

```powershell
yum install -y gcc-c++
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel
```

## 11.解压fastdfs-nginx-module_v1.16.tar.gz

```powershell
cd /usr/local/
tar -zxf fastdfs-nginx-module_v1.16.tar.gz
```

## 12.修改fastdfs-nginx-module/src/config配置文件

```powershell
vi fastdfs-nginx-module/src/config
```

> 把CORE_INCS="$CORE_INCS /usr/local/include/fastdfs /usr/include/fastcommon/"
>
> 修改为：CORE_INCS="$CORE_INCS /usr/include/fastdfs /usr/include/fastcommon/"
>
> 把CORE_LIBS="$CORE_LIBS -L/usr/local/lib -lfastcommon -lfdfsclient"
>
> 修改为：CORE_LIBS="$CORE_LIBS -L/usr/lib -lfastcommon -lfdfsclient"
>
> 实际就是把路径中的local这一层删除掉

## 13.编辑mod_fastdfs.conf

复制fastdfs-nginx-module/src/mod_fastdfs.conf 到/etc/fdfs目录下并编辑

```powershell
cp fastdfs-nginx-module/src/mod_fastdfs.conf /etc/fdfs/
vi /etc/fdfs/mod_fastdfs.conf
```

> tracker_server=192.168.100.151:22122
> url_have_group_name = true
> storage_server_port=23000
> group_name=group1
> store_path0=/home/FastDFS/storage

## 14.安装nginx

```powershell
cd /usr/local/
tar -zxf  nginx-1.8.1.tar.gz
cd nginx-1.8.1
./configure --add-module=/usr/local/fastdfs-nginx-module/src/
make
make install
```

## 15. 配置nginx

```powershell
cd /usr/local/nginx/conf
vi nginx.conf
```

> server{
>     listen     80;
>     server_name     localhost;
>     location /group1/M00/{
>         ngx_fastdfs_module;
>     }
> }

重启nginx

```powershell
/usr/local/nginx/sbin/nginx
```

## 测试

### 1、引入依赖

```xml
<!-- 文件上传组件 -->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.1</version>
</dependency>
<!--fastdfs-->
<dependency>
    <groupId>org.csource.fastdfs</groupId>
    <artifactId>fastdfs</artifactId>
    <version>1.2</version>
</dependency>
```

### 2、编写配置文件

```xml
 <!-- 配置多媒体解析器 -->
 <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
 	<property name="defaultEncoding" value="UTF-8"/>
 	<!-- 设定文件上传的最大值5MB，5*1024*1024 -->
 	<property name="maxUploadSize" value="5242880"/>
 </bean>
```

### 3、UploadController

```java
 /**
  * 文件服务器地址
  */
 @Value("${FILE_SERVER_URL}")
 private String FILE_SERVER_URL;

 @RequestMapping("/upload")
 public JdResult upload(MultipartFile file) {
     //1、取文件的扩展名
     String originalFilename = file.getOriginalFilename();
     String extName = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
     try {
         //2、创建一个 FastDFS 的客户端
         FastDFSClient dfsClient = new FastDFSClient("classpath:conf/fdfs_client.conf");
         //3、执行上传处理
         String path = dfsClient.uploadFile(file.getBytes(), extName);
         //4、拼接返回的 url 和 ip 地址，拼装成完整的 url
         String url = FILE_SERVER_URL + path;
         return JdResult.ok(url);
     } catch (Exception e) {
         e.printStackTrace();
         return JdResult.error("文件上传失败");
     }
 }
```
