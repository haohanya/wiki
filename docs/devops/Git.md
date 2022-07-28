# 基操

## 用户名 & 邮箱

```shell
# 请替换你的用户名
git config [--global] user.name "Your Name"      
# 请替换你自己的邮箱
git config [--global] user.email your@email
```

## 支持中文路径

```shell
git config [--global] core.quotepath false
```

## 查看Git配置

```shell
git config [--global] --list
```

## 拉取仓库

```shell
git clone <仓库地址>
```

## 添加文件到索引区

```shell
git add README.md
```

## 创建提交

```shell
git commit -m -s "Initial commit"
```

## 创建分支

```shell
git checkout -b <branch> <start-point>
```

## 切换分支

```shell
git checkout master
```

## 查看本地仓库对应的远程仓库地址

```shell
git remote -v
```

## 将本地分支与远程分支建立关系

```shell
git branch -u origin/master
```

## 代码同步

> 和远程分支同步, 若和远程分支偏离, 执行合并以完成更新


```shell
git pull
```

> 和远程分支同步, 若和远程分支偏离, 将本地差异提交变基到远程分支, 以完成更新


```shell
git pull --rebase
```

## 查看当前代码库的文件修改状态列表

```shell
git status
```

## 将本地提交推送至远端

```shell
git push
```

## 将dev分支合并到master

```shell
git checkout master
git merge dev
```

简写

```gitexclude
git merge dev master
```

## 拉取远程某一个分支

```shell
git fetch origin(源) 分支名称
```

# 代码合并(merge) & 变基(rebase)

[//]: # (TODO)

# pull

## 将远程(origin)指定分支 拉取到 本地指定分支

```shell
git pull origin <远程分支名>:<本地分支名>
```

## 将远程指定分支 拉取到 当前分支

```shell
git pull origin <远程分支名>
```

## 将 `本地的` `当前分支` 与 `远程分支同名的` 拉取到 `本地当前分支`上

```shell
git pull
```

# push

## 将本地当前分支 推送到 远程指定分支上

```shell
git push origin <本地分支名>:<远程分支名>
```

## 将本地当前分支 推送到 与本地当前分支同名的远程分支上

```shell
git push origin <本地分支名>
```

## 将本地当前分支 推送到 与本地当前分支同名的远程分支上

```shell
git push
```

# .gitignore

- `# Hello` 注释
- `*.class` 忽略所有以 `.class` 结尾的文件
- `!a.class` 除了文件名称为 `a.class` 的文件不会被忽略
- `/target` 忽略 `/target` _根目录_ 下的文件
- `target/` 忽略 `target/` _目录_ 下所有的文件
- `target/*.html` 忽略 `target` _根目录_ 下所有以 `.html` 结尾的文件

## 常用配置

```.gitignore
HELP.md
target/
!.mvn/wrapper/maven-wrapper.jar
!**/src/main/**
!**/src/test/**

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/

### VS Code ###
.vscode/

### 其他 ###
```
