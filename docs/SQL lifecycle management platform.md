SLMP

## 环境

主要作用于分组：开发环境、测试环境、生产环境

```yaml
apiVersion: v1alpha1
kind: Environment  
metadata:  
  name: dev  
spec:  
  label: 开发环境  
---  
apiVersion: v1alpha1
kind: Environment  
metadata:  
  name: prod  
spec:  
  label: 生产环境  
---  
apiVersion: v1alpha1
kind: Environment  
metadata:  
  name: test  
spec:  
  label: 测试环境
```

## 服务器

```yaml  
apiVersion: v1alpha1
kind: Server  
metadata:  
  name: localhost  
  label: 本地服务器  
spec:  
  forms:  
    - group: basic  
      label: 基本设置  
      formSchema:  
        - $formkit: text  
          label: "IP"  
          name: ip  
          validation: required  
        - $formkit: text  
          label: "环境"  
          name: environment  
          validation: required  
    - group: database  
      label: 数据库设置  
      formSchema:  
        - $formkit: text  
          label: "数据库端口"  
          name: port  
          validation: required  
        - $formkit: text  
          label: "数据库账号"  
          name: username  
          validation: required  
        - $formkit: text  
          label: "数据库密码"  
          name: password  
          validation: required  
        - $formkit: select  
          label: "数据库类型"  
          name: type  
          validation: required  
          options:  
            - label: 'MySQL'  
              value: 'MySQL'  
            - label: 'Postgres'  
              value: 'Postgres'
```

配置 数据库的一些信息，如：ip、端口、账号、密码等

服务器是区分环境的，如：生产环境、开发环境、测试环境

## 数据库（快照）

```yaml
apiVersion: v1alpha1
kind: DatabaseSnapshot  
metadata:  
  name: halo_db  
spec:  
  forms:  
    - group: basic  
      label: 基本设置  
      formSchema:  
        - $formkit: text  
          label: "数据库名称"  
          name: name  
          validation: required  
        - $formkit: text  
          label: "说明"  
          name: comment  
          validation: required  
        - $formkit: select  
          label: "数据库类型"  
          name: type  
          validation: required  
          options:  
            - label: 'MySQL'  
              value: 'MySQL'  
            - label: 'Postgres'  
              value: 'Postgres'  
    - group: document  
      label: 文档  
      formSchema:  
        - $formkit: markdown  
          label: "文档"  
          name: content
```

- kind：DatabaseSnapshot为快照版本，永远是最新的；Database为发布版本

数据库归类表结构和在连接服务器时映射数据库名称

数据库的每一次修改都会记录一条修改记录

## 表（快照）

```yaml
apiVersion: v1alpha1
kind: TableSnapshot
metadata:  
  name: t_user  
spec:  
  forms:  
    - group: basic  
      label: 基本设置  
      formSchema:  
        - $formkit: select  
          label: "数据库"  
          name: database  
          validation: required  
        - $formkit: text  
          label: "名称"  
          name: name  
          validation: required  
        - $formkit: select  
          label: "数据类型"  
          name: dataType  
          validation: required  
        - $formkit: text  
          label: "默认值"  
          name: defaultValue  
        - $formkit: checkbox  
          label: "非空"  
          name: notNull  
          value: false  
        - $formkit: checkbox  
          label: "自增"  
          name: autoInc  
          value: false  
        - $formkit: checkbox  
          label: "唯一"  
          name: unique  
          value: false  
        - $formkit: checkbox  
          label: "主键"  
          name: primaryKey  
          value: false  
        - $formkit: text  
          label: "说明"  
          name: comment  
          validation: required  
    - group: keys  
      label: Keys  
      formSchema:  
        - $formkit: text  
          label: "名称"  
          name: name  
        - $formkit: checkbox  
          label: "主键"  
          name: primaryKey  
          value: false  
        - $formkit: select  
          label: "列名"  
          name: columns  
    - group: index  
      label: Index  
      formSchema:  
        - $formkit: text  
          label: "名称"  
          name: name  
        - $formkit: text  
          label: "列名"  
          name: column  
        - $formkit: select  
          label: "排序"  
          name: sorting  
          options:  
            - label: 'ascending'  
              value: 'ASC'  
            - label: 'none'  
              value: ''  
            - label: 'descending'  
              value: 'DESC'  
    - group: document  
      label: 文档  
      formSchema:  
        - $formkit: markdown  
          label: "文档"  
          name: content  
    - group: sqlScript  
      label: SQL脚本  
      formSchema:  
        - $formkit: sql  
          label: "SQL脚本"  
          name: sql
```

- kind：TableSnapshot为快照版本，永远是最新的；Table为发布版本
- Keys 可以多个，为数组结构
- index 可以多个

可以在线设计表结构，表字段的外键可以配置逻辑引用

表结构列表，再这里不做任何的环境区分，永远保持最新的数据

表的每一次修改都会记录一条修改记录

- 导入：DDL SQL 导入解析成 yaml 格式数据（差异数据手动合并）
- 同步：同步指定服务器里的表结构（差异数据手动合并）
- 发布：最近一次发布的对比，然后构建出差异sql（以最新的为准）

## 视图

WIP

## 关系图

WIP

## 审批单

在数据库或者表修改完毕后会进行发布到指定环境，

在发布后，会通过自定义流程进行 sql 的审批，

如果审批通过后，则会自动发布一个版本

如果审批拒绝，则会将 sql 驳回

## 发布版本

发布表之前，必须先发布一次数据库

如果发布多次重复表，则进行增加版本号并记录到上一次发布的数据库中

每当审批通过后在此处都会有一条记录

已发布的版本可以选择执行 sql 

```yaml
apiVersion: v1alpha1
kind: Release  
metadata:  
  name: uuid  
spec:  
  environment: $ref:Environment  
  server: $ref  
  database: $ref:Database  
  tables: 
    - $ref:Table:laster
      - $ref:Table:version1
```


## 执行记录

每次执行

## 项目

项目和数据库做关联

## GitHooks

设想：根据 git commit 内容 进行匹配，发布后执行接口执行已发布的版本

例如：release: 1.0.Release (prod#1.0.Release)

匹配到 `release: `然后根据 当前项目 和 括号内#前面的环境和后面的版本号进行匹配到发布版本并执行
## ---

## 业务组织

## 部门

## 角色

## 用户

## 资源

