---
title: 悬而未决
date: 2019-09-09
# draft: true
---
# 待解决的问题
1. 如何嵌入另一个主题?
2. +++配置和\-\-\-配置的区别

- \-\-\-是YAML格式的配置
```YAML
---
date: 2017-12-01
title: My first blog post
draft: true
date: 
---
```

- +++是TOML格式的配置
```TOML
+++
date = 2017-12-01
title = "My first blog post"
+++
```
- TOML更简单,友好; YAML是为机器设计的; 所以尽量用TOML.
前页的配置项:
- title = "main title"
- summary = "this is a summary"
- date = 2019-09-09
- authors = "chuangkit"
- tags = a;b;
- subtitle = "this is subtitle"
- featured = true/false(要显示为的特征小部件, 如??? )
- categories = "cfd"
- draft = true/false (设为草稿时, 只本地可见)
- [hugo front matter](https://gohugo.io/content-management/front-matter/#predefined)上有更多可定义的变量
3. 可以开启post博客的目录吗? 
4. 如何让页面不发布?
-draft = true

5. 如何让标题自动添加序列?
