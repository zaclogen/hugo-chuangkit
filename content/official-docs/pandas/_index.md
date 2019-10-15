---
linktitle: Pandas中文文档
draft: false
toc: true
type: docs
menu:
  pandas:
    name: 首页 
    weight: 1
date: 2019-10-08T04:29:58.107Z
---
# Pandas是什么？

- Pandas是一个强大的分析结构化数据的工具集；
- 它的使用基础是Numpy（提供高性能的矩阵运算）；
- 用于数据挖掘和数据分析，同时也提供数据清洗功能。

# 利器之一：DataFrame
DataFrame是Pandas中的一个表格型的数据结构，包含有一组有序的列，每列可以是不同的值类型(数值、字符串、布尔型等)，DataFrame即有行索引也有列索引，可以被看做是由Series组成的字典。

# 利器之一：Series
它是一种类似于一维数组的对象，是由一组数据(各种NumPy数据类型)以及一组与之相关的数据标签(即索引)组成。仅由一组数据也可产生简单的Series对象。

# 就像1、2、3 一样简单

``` bash
# 1、安装包
$ pip install pandas

# 2、进入python的交互式界面
$ python -i

# 3、使用Pandas
>>> import pandas as pd
>>> df = pd.DataFrame() 
>>> print(df)

# 4、输出结果
Empty DataFrame
Columns: []
Index: []
```

- 提醒改变世界从 **Python** 开始。

本网站推荐使用[Python3.x](https://www.python.org/downloads/)及以上版本。

