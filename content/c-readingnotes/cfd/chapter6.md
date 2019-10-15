---
title: 第6章 计算流体力学的基本方法
linktitle: 6 计算流体力学的基本方法
toc: true
type: docs
date: "2019-09-10T00:00:00+01:00"
draft: false
math: true
menu:
  cfd:
    parent: 卷2 基本的数值方法
    weight: 3

# Prev/next pager order (if `docs_section_pager` enabled in `params.toml`)
weight: 3
---
# 6.1 引言
为了处理CFD在不同流动问题中的应用问题:

- 首先必须了解流体力学控制方程的基本形式和性质(第一部分)
- 其次必须理解可用于这些方程的各种数值离散方法的基础只是(第二部分)

注意:

- 任何一种具体的CFD方法都不可能适用于所有的流动问题.
- 不同的偏微分方程具有各种各样的数学性质, 某些算法适用于双曲型方程, 而另一些算法则适用于椭圆型方程.

# 6.2 Lax-Wendroff方法
拉克斯-温德罗夫方法是一种显式有限差方法, 特别适合于推进求解.

> 通过沿时间或空间逐步推进而得到数值解的思想在[第三章](#3 偏微分方程的数学性质对CFD的影响)介绍, 记得回顾:memo:, 这种推进解法与双曲型和抛物型偏微分方程求解相关联

- 双曲型方程控制的流动问题, 很好的例子是`无粘流非定常欧拉方程的时间推进解法`, 在3.4.1节讨论过

- 考虑二维无粘流模型, 假设没有体积力和体积加热, 即$f= 0, \dot{q}=0$, 由(2-82)(2-83)和(2-85)得到非守恒形式:

$$\frac{\partial \rho}{\partial t} = - \left(\rho \frac{\partial u}{\partial x} + u\frac{\partial \rho }{\partial x}+ \rho \frac{\partial v}{\partial y} + v\frac{\partial \rho }{\partial y}\right)\tag{6-1}$$
$$\frac{\partial u}{\partial t}=-\left(u\frac{\partial u}{\partial x} + v\frac{\partial u }{\partial y} + \frac{1}{\rho}\frac{\partial p}{\partial x}\right)\tag{6-2}$$
$$\frac{\partial v}{\partial t}=-\left(u\frac{\partial v}{\partial x} + v\frac{\partial v }{\partial y} + \frac{1}{\rho}\frac{\partial p}{\partial y}\right)\tag{6-3}$$
$$\frac{\partial e}{\partial t} = - \left(u\frac{\partial e}{\partial x} + v\frac{\partial e}{\partial y} + \frac{p}{\rho}\frac{\partial u}{\partial x} + \frac{p}{\rho}\frac{\partial v}{\partial y}\right)\tag{6-4}$$

- 方程(6-1~4)对时间变量是双曲型的, 接下来用时间推进法对其进行数值求解.
- 注意: `这些方程整理成便于时间推进的形式: 时间导数在左, 空间导数在右`, Lax-Wendroff方法的基础是`时间导数的泰勒展开式`
![图6-1矩形网格](https://i.imgur.com/tDgZxaW.png)
# 6.3 MacCormark方法
# 6.4 粘性流动, 守恒形式和空间推进
# 6.5 松弛法及其在低速无粘流中的应用
# 6.6 数值耗散,色散及人工粘性
# 6.7 交替方向隐式(ADI)方法

# 6.8 压力修正法及其在不可压粘性流动中的应用
# 6.9 应用于CFD计算机绘图技术
# 6.10 小结
![图6-35第六章路线图](https://i.imgur.com/fx641MQ.png)