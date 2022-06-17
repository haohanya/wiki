
# information_schema

> 此数据库是由所有数据库元数据组成的视图集合


此库中的表分为两种类型的元数据

- 静态表元数据：`TABLE_SCHEMA、TABLE_NAME、TABLE_TYPE、ENGINE`
- 动态表元数据：`AUTO_INCREMENT、AVG_ROW_LENGTH、DATA_FREE`

## tables 表

> 此表存放了数据表的定义

```sql
select * from tables;
```

## columns 表

> 存放所有的列定义

```sql
select * from columns;
```
