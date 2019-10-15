---
linktitle: Linux常用命令1
title: Linux常用命令1
toc: true
type: docs
date: 2019-09-12
draft: false
weight: 1
share: false
highlight: true
categories: ["Linux"]
menu:
    linux:
        parent: 简介
        weight: 1
---
# 基本命令
## 查看内存free
```bash
# 查看内存, 以MB为单位
free -h
# 清理内存
echo 1 > /proc/sys/vm/drop_caches
```
## 端口
```bash
# 查看端口占用
netstat -anp |grep 80
```
## 交换区
```bash
# 查看是否有交换区
sudo swapon --show
# 或
free -h
# 查看当前磁盘使用
df -h
```
现在我们知道了可用的硬盘空间，那我们就可以在文件系统中创建一个交换文件，我们将在我们的根（/）目录下创建一个名为swapfile的文件。创建交换文件最好的方法是使用fallocate命令，这个命令能立即创建一个预分配大小的文件。由于本示例中的服务器RAM的大小为512MB，因此我们将在本教程中创建一个1 GB大小的文件，并适当加以调整，以满足您自己的服务器的需求：

```bash
# 创建swap文件
sudo fallocate -l 1G /swapfile
# 验证是否保留正确的交换空间
ls -lh /swapfile
# 显示结果:
-rw-r--r-- 1 root root 1.0G Sep 19 11:37 /swapfile

# 锁定文件的root权限
sudo chmod 600 /swapfile
# 标记为交换空间
sudo mkswap /swapfile
# 启用交换文件
sudo swapon /swapfile
# 验证交换空间是否可用
sudo swapon --show
```

我们最近的更改启用了当前会话的swap文件，但是，如果我们重新启动，服务器不会自动保留swap设置，我们可以通过将swap文件添加到/etc/fstab文件中来改变这一点。

```bash
# 备份fstab文件
sudo cp /etc/fstab /etc/fstab.bak
# 将swap文件信息添加到fatab文件末尾
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
`swappiness`参数配置您的系统将数据从RAM交换到交换空间的频率, 值介于0和100之间，表示百分比。如果swappiness值接近0，内核将不会将数据交换到磁盘，除非绝对必要。要记住一点，与swap文件的交互是“昂贵的”，因为与swap交互花费的时间比与RAM的交互更长，并且会导致性能的显著下降。系统更少依赖swap分区通常会使你的系统更快。swappiness接近100的值将尝试将更多的数据放入交换中，以保持更多的RAM空间。根据您的应用程序的内存配置文件或您使用的服务器，这可能会在某些情况下更好。[参考](https://blog.csdn.net/u010429286/article/details/79219230)
```bash
# 查看当前swappiness值
cat /proc/sys/vm/swappiness
```

## 记录程序运行时长time
```bash
# 格式为time + 命令如
time ls
# 输出为
#real —— 指的是命令或程序所花费的总时间
real    0m0.003s
#user —— 指的是在用户模式下程序所花费的时间
user    0m0.000s
#sys —— 指的是在内核模式下程序所花费的时间
sys     0m0.002s
```
## 设置命令别名alias
```bash
# 将cp -i设置为cp
alias cp='cp -i'
# 列出目前所有的别名设置
alias -p
# 删除别名
unalias cp
```
永久设置别名, 在`.bashrc`中加入命令

