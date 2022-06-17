
# 分组排序 获取最新一条数据

## Limit方法

```sql
SELECT * 
FROM (
  SELECT * FROM `table` ORDER BY update_time DESC LIMIT 10000
) tab 
GROUP BY tab.parent_id
```

## Max函数

```sql
SELECT * 
FROM `table` tab
	INNER JOIN (
    SELECT MAX(id) as id 
    FROM `table` 
    GROUP BY open_id
  ) itab 
	ON tab.id = itab.id
ORDER BY tab.update_time
```

# ONLY_FULL_GROUP_BY 问题

```sql
# 1、执行SQL得到一个值
select @@sql_mode;
# 2、备份此值
# 3、去掉ONLY_FULL_GROUP_BY后的值
SET GLOBAL sql_mode='去掉ONLY_FULL_GROUP_BY后的值';
```

# 乐观锁

> 以版本号为锁, 更新数据时将旧版本号作为条件, 并修改版本号
> 
> 此 version 字段可以定义为时间等其他类型数据

```sql
update `table` set `name` = 'newValue', `version` = 2 where id = 1 and version = 1
```

# SQL 片段

## 时间条件

```sql
-- 今天
select * from 表名 where to_days(时间字段名) = to_days(now());
-- 昨天
SELECT * FROM 表名 where DATE_SUB(CURDATE(), INTERVAL 1 DAY) <= date(时间字段名)
-- 近7天
SELECT * FROM 表名 where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(时间字段名)
-- 近30天
SELECT * FROM 表名 where DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(时间字段名)
-- 本月
SELECT * FROM 表名 WHERE DATE_FORMAT(时间字段名, '%Y%m') = DATE_FORMAT(CURDATE() , '%Y%m')
-- 上一月
SELECT * FROM 表名 WHERE PERIOD_DIFF(date_format(now() , '%Y%m'), date_format(时间字段名, '%Y%m')) = 1
-- 查询本季度数据
select * from 表名 where QUARTER(时间字段名) = QUARTER(now());
-- 查询上季度数据
select * from 表名 where QUARTER(时间字段名) = QUARTER(DATE_SUB(now(), interval 1 QUARTER));
-- 查询本年数据
select * from 表名 where YEAR(时间字段名) = YEAR(NOW());
-- 查询上年数据
select * from 表名 where year(时间字段名) = year(date_sub(now(), interval 1 year));
-- 查询当前这周的数据
SELECT * FROM 表名 WHERE YEARWEEK(date_format(时间字段名, '%Y-%m-%d')) = YEARWEEK(now());
-- 查询上周的数据
SELECT * FROM 表名 WHERE YEARWEEK(date_format(时间字段名, '%Y-%m-%d')) = YEARWEEK(now()) - 1;
-- 查询上个月的数据
select * from 表名 where date_format(时间字段名, '%Y-%m') = date_format(DATE_SUB(curdate(), INTERVAL 1 MONTH), '%Y-%m');
select * from 表名 where DATE_FORMAT(时间字段名, '%Y%m') = DATE_FORMAT(CURDATE(), '%Y%m') ; 
select * from 表名 where WEEKOFYEAR(FROM_UNIXTIME(时间字段名, '%y-%m-%d')) = WEEKOFYEAR(now()) 
select * from 表名 where MONTH(FROM_UNIXTIME(时间字段名, '%y-%m-%d')) = MONTH(now()) 
select * from 表名 where YEAR(FROM_UNIXTIME(时间字段名, '%y-%m-%d')) = YEAR(now()) and MONTH(FROM_UNIXTIME(时间字段名, '%y-%m-%d')) = MONTH(now()) 
select * from 表名 where 时间字段名 between 上月最后一天 and 下月第一天
-- 查询当前月份的数据
select * from 表名 where date_format(时间字段名, '%Y-%m') = date_format(now(),'%Y-%m')
```