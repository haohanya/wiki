**环境要求**

Node.js >= 12.0

yarn（本次记录采用yarn构建工程）

## 创建项目

```shell
$ yarn create @vitejs/app my-vue-app --template vue
```

**解释 **

> my-vue-app：工程目录名称
>
> --template vue：一个vue工程模板，更多模板查看官方文档 https://github.com/vitejs/vite/tree/main/packages/create-app

支持的模板预设包括：

- `vanilla`
- `vue`
- `vue-ts`
- `react`
- `react-ts`
- `preact`
- `preact-ts`

## 运行项目

**进入项目根目录**

```shell
$ cd ./my-vue-app
```

**安装依赖**

```shell
$ yarn -i
```

**运行项目**

```shell
$ yarn dev
```

执行后的响应结果如下

```shell
$ yarn dev
Optimizable dependencies detected:
vue
Pre-bundling them to speed up dev server page load...
(this will be run only when your dependencies have changed)

  Vite dev server running at:

  > Network:  http://192.168.137.1:3000/
  > Network:  http://192.168.95.1:3000/
  > Network:  http://192.168.25.1:3000/
  > Network:  http://192.168.199.137:3000/
  > Local:    http://localhost:3000/

  ready in 4869ms.
```

然后我们访问地址即可

