# 问题

mysql8 远程连接出现2048错误

解决方案

```shell
$ mysql -u root -p
$ alter user 'root'@'%' identified with mysql_native_password by 'password';
$ flush privileges;
```



mysql8创建用户

## 创建用户

```shell
$ CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

- username：你将创建的用户名
- host：指定该用户在哪个主机上可以登陆，如果是本地用户可用localhost，如果想让该用户可以**从任意远程主机登陆**，可以使用通配符`%`
- password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器

## 授权

```shell
$ GRANT privileges ON databasename.tablename TO 'username'@'host'
```

- privileges：用户的操作权限，如`SELECT`，`INSERT`，`UPDATE`等，如果要授予所的权限则使用`ALL`
- databasename：数据库名
- tablename：表名，如果要授予该用户对所有数据库和表的相应操作权限则可用`*`表示，如`*.*`

## 设置与更改用户密码

```shell
$ SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');
# 如果是当前登陆用户用:
$ SET PASSWORD = PASSWORD("newpassword");
```

## 撤销用户权限

```shell
$ REVOKE privilege ON databasename.tablename FROM 'username'@'host';
```

privilege, databasename, tablename：同授权部分



## 删除用户

```
DROP USER 'username'@'host';
```
