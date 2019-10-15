---
title: 文件读写
linktitle: 文件读写
type: docs
date: 2019-09-24
category: ["Python","文件读写"]
toc: true
draft: false
menu:
    python:
        name: 文件操作
        weight: 2

---
# 读取`.csv`文件
```python
import pandas as pd
data = pd.read_csv('path/input.csv')
print (data)


```