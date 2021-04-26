---
title: 'WordPress数据转移至Typecho工具'
date: 2020-11-07 19:42:04
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
又是周末不上班的一天。😀

闲来无事。写了份从WordPress转移至Typecho的小工具。

用WordPress也挺久了，每次撰写文章都要加载老久了。导致我有点想念Typecho的轻量。啊哈哈🙃

方式很简单。利用WordPress的备份后得到的XML，再使用某种语言去解析xml，随后构建sql。应该会有更简单的。这里我就用这种方式啦！

目前介款工具可以转移：**文章、评论、标签、分类**等数据。😎

不多废话。直接上代码 ：[GitHub](https://github.com/haohanya/WordPressToTypecho)

## 使用教程

### 在线版

浏览器打开[ http://wp2tp.mvvm.io/](http://wp2tp.mvvm.io/) (目前不可用)

1、在WordPress后台选择 工具 -> 导出 -> 选中：所有内容 -> 下载导出的文件

2、将下载导出的XML文件，在这里上传后，就可以得到一个适用于Typecho程序的SQL文件

3、得到SQL文件后，您可以选择在任何一个可以执行sql的地方，去执行文件内的sql

### 源码版

必要环境：JDK1.8、Maven3.6.x

#### 1、导出数据

在WP后台，进入：/wp-admin/export.php

选择导出所有内容

#### 2、修改代码

将导出的xml保存到本地，然后将代码的第15行修改为自己的xml路径

#### 3、启动main方法

启动后，等待执行完毕。然后复制打印出来的sql，在任何一款可以执行sql的地方去执行。

教程完...

如果这个工具对您有帮助，那么请给我们一个**Star**😘