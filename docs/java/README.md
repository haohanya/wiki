## Macos 动态切换JDK版本

## 1、配置环境变量

```shell
# 编辑配置文件
> vim ~/.bash_profile

# 编辑内容
export JAVA_USE_HOME="/Users/xxxuser/usejdk/Contents/Home"
export JAVA_HOME=$JAVA_USE_HOME

export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
# 编辑内容 end

# 刷新配置
> source ~/.bash_profile
```

- `JAVA_USE_HOME` 此路径是存放软链接的路径，可以自定义


## 2、存放脚本`useJdk.sh`

```shell
#!/bin/bash  
echo "use zulu-$1.jdk"  
ln -snf "/Library/Java/JavaVirtualMachines/zulu-$1.jdk/" ~/usejdk
java -version
```

> `/Library/Java/JavaVirtualMachines/zulu-$1.jdk/` 是我jdk安装路径
> 
> 路径下包含了`zulu-8.jdk`、`zulu-11.jdk`、`zulu-17.jdk` 三个版本
> 
> 所以我可以直接通过一个参数传进来版本

- `ln -snf` 是将jdk软链接到 usejdk 路径

## 3、赋予脚本执行权限

```shell
chmod +x ./useJdk.sh
```

## 4、切换jdk

```shell
./useJdk.sh 8
java -version

./useJdk.sh 11
java -version

./useJdk.sh 17
java -version
```