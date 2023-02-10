# WebPack

## 安装

```shell
npm install <--global> --save-dev webpack<@version>
```

- `<--global>` 全局安装 `webpack`; 不建议此操作, 一般以项目为单位做最小化的安装;
- `<@version>` 指定版本的安装方式, 如果不加此参数则使用最新版

如果使用4.x版本的webpack，则需要额外安装 `webpack-cli`

```shell
npm install --save-dev webpack-cli
```

我们也可以简化成一条命令

```shell
npm install webpack webpack-cli --save-dev
```

**初始化工程**

```shell
npm init -y
```

此操作会在工程目录中创建一个 `package.json` 文件

接着在工程中创建一些文件

```diff
webpack
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

# 入口(entry)
# 输出(output)
# loader
# 插件(plugins)