---
title: 第2章 流体力学的控制方程
linktitle: 2 计算流体力学的控制方程
toc: true
type: docs
date: "2019-08-06T00:00:00+01:00"
draft: false
math: true
markup: mmark
menu:
  cfd:
    parent: 卷1 基本思想和方程
    weight: 2

# Prev/next pager order (if `docs_section_pager` enabled in `params.toml`)
weight: 2
---

本书中最重要的一章，“如果从物理上理解每一个方程(甚至方程中的每一项)的意义，我们又怎么能够指望对数值求解这些方程所得到的CFD结果作出正确的解读呢？”

# 2.1 引言  

# 2.2 流动模型:heart:
1. 有限控制体
   - 我们不是同时观察整个流场，而是借助控制体，将我们的注意力集中在控制体本身这一有限区域内的流体。
2. 无穷小流体微团
   - 流体微团无限小的含义与微积分中的无限小的含义相同，但是它又必须足够大，大到包含了大量的流体分子，使它能够被看成是连续介质。
3. 注释
   - 区分守恒与非守恒
   - 第三种流动模型，微观处理方法，分子运动论
# 2.3 物质导数(运动流体微团的时间变化率)
   - 适用于流体微团的模型
   - 描述流体微团在笛卡尔坐标系下的运动
   - 物质导数$\text{D} / \text{D}t$物理上表示跟踪一个运动流体微团的时间变化率
   - 当地导数$\partial / \partial t$物理上表示固定点处的时间变化率
   - <font color = "#dd0000"> 这是红色文字 </font>
   -  迁移导数$V\cdot \nabla$: 由于流体微团从流场中一点运动到另一点，流场的空间不均匀性而引起的时间变化率

# 2.4 速度散度及其物理意义
   - <font color = "#dd0000">速度散度$\nabla \cdot V$: 每单位体积运动着的流体微团，体积相对变化的时间变化率 </font>
   - 模型：<font color = "#0000dd">随流体运动的控制体，质量固定不随时间变化，密度、体积和控制面随时间改变 </font>
- 思考：

<div align="center">
   <img src="https://i.imgur.com/xXk9T5r.png" height="400" >
</div>

- 左上：有限控制体模型，控制体内流体质量变化，控制体体积和形状不变，空间位置固定；
- 右上：有限控制体模型，控制体内流体质量不变，控制体体积和形状改变，空间位置随流体运动；
- 左下：无穷小流体微团模型，微团内流体质量变化，微团体积和形状不变，空间位置固定；
- 右下：无穷小流体微团模型，微团内流体质量不变，？？（形状和面积是否可视为不变呢？？），空间位置随流体运动。

# 2.5 连续性方程
- 物理学原理：质量守恒
- 流动模型：图2-2中四个模型


# 2019/8/7
<div align = "center">
<img src="https://i.imgur.com/fTZAA7X.png" height = "400">
</div>

## 1 空间位置固定的有限控制体模型

通过控制面S流出控制体的净质量流量 = 控制体内质量减少的时间变化率

$$\frac{\partial}{\partial t} \iiint_{\mathscr{V}} \rho \mathrm{d} \mathscr{V}+\iint_S \rho V \cdot \mathrm{d} S=0$$

- 控制体有限的体积就是方程具有积分形式的原因
- 控制体空间位置固定决定了守恒形式

## 2 随流体运动的有限控制体模型
- 控制体有限的体积 => 积分形式
- 控制体随流体运动 => 非守恒形式
- 有限控制体由无数个无穷小的流体微团组成，并具有固定不变的总质量，那么<font color="#dd0000">这些不变质量总的物质导数等于零</font>

$$\frac{\mathrm{D}}{\mathrm{D} t} \iiint_{\mathscr{V}} \rho \mathrm{d} \mathscr{V}=0$$

## 3 空间位置固定的无穷小微团模型
<div align = "center">
<img src="https://i.imgur.com/TF2Q2d4.png" height="300">
</div>

- **好像大部分教科书，都是根据这个模型推导的方程**
- 注意图2-7中，x方向的净流出量为，图上有错误
$$\left[\rho u+\frac{\partial(\rho u)}{\partial x} \mathrm{d} x\right] \mathrm{d} y \mathrm{d} z-(\rho u) \mathrm{d} y \mathrm{d} z=\frac{\partial(\rho u)}{\partial x} \mathrm{d} x \mathrm{d} y \mathrm{d} z$$
- y方向的净流出量为：
$$\left[\rho v+\frac{\partial(\rho v)}{\partial y} \mathrm{d} y\right] \mathrm{d} x \mathrm{d} z-(\rho v) \mathrm{d} x \mathrm{d} z=\frac{\partial(\rho v)}{\partial y} \mathrm{d} x \mathrm{d} y \mathrm{d} z$$
- z方向的净流出量为：
$$\left[\rho w+\frac{\partial(\rho w)}{\partial z} \mathrm{d} z\right] \mathrm{d} x \mathrm{d} y-(\rho w) \mathrm{d} x \mathrm{d} y=\frac{\partial(\rho w)}{\partial z} \mathrm{d} x \mathrm{d} y \mathrm{d} z$$
- 守恒方程为：
$$\frac{\partial \rho}{\partial t}+\left[\frac{\partial(\rho u)}{\partial x}+\frac{\partial(\rho v)}{\partial y}+\frac{\partial(\rho w)}{\partial z}\right]=0$$
或(偏微分形式)

$$\frac{\partial \rho}{\partial t}+\nabla \cdot(\rho V)=0$$

- 微团的无穷小 => 偏微分形式
- 微团空间位置固定 => 守恒形式
- **总结**：<font color="#dd0000">由空间位置固定的流动模型直接导出的控制方程定义为守恒型方程</font>

## 4 随流体运动的无穷小微团模型
- 流体微团模型，这个流体微团有固定的质量，但它的形状和体积会在它向下游运动时变化

$$\frac{\mathrm{D}(\rho \delta \mathscr{V})}{\mathrm{D} t}=\delta \mathscr{V} \frac{\mathrm{D} \rho}{\mathrm{D} t}+\rho \frac{\mathrm{D}(\delta \mathscr{V})}{\mathrm{D} t}=0$$

(*全导数分部展开)

**或**

$$\frac{\mathrm{D} \rho}{\mathrm{D} t}+\rho\left[\frac{1}{\delta \mathscr{V}} \frac{\mathrm{D}(\delta \mathscr{V})}{\mathrm{D} t}\right]=0$$

其中方括号内为**体积相对变化的时间变化率**, 即**速度散度**

$$\frac{\mathrm{D} \rho}{\mathrm{D} t}+\rho \nabla \cdot V=0$$

- 微团的无穷小 => 偏微分形式
- 微团随流体运动 => 非守恒形式
- 总结：由随流体运动的流动模型直接导出的控制方程定义为**非守恒型方程**

5. 方程不同形式之间的转化
- 上述四个方程是同一个方程(连续性方程)的四种不同形式
- 守恒形式下，积分 => 微分 使用散度定理(高斯定理)
- 微分形式下，守恒 => 非守恒 使用物质导数(输运方程)

$$\nabla \cdot(\rho \boldsymbol{V}) \equiv(\rho \nabla \cdot \boldsymbol{V})+\left(\boldsymbol{V} \cdot \nabla_{\boldsymbol{\rho}}\right)$$

- 体积分的积分限由同样的运动微团确定，所以物质导数可以写到积分号之内

$$\frac{\mathrm{D}}{\mathrm{D} t}\iiint_\mathscr{V}\rho\mathrm{d}\mathscr{V}=\iiint_\mathscr{V}\frac{\mathrm{D}(\rho \mathrm{d}\mathscr{V})}{\mathrm{D} t}= 0$$
 
$\mathrm{d} \mathscr{V}$在物理上代表一个自身可变的无穷小控制体，$\rho$和$\mathrm{d} \mathscr{V}$乘积的物质导数为：

$$\iiint_{\mathscr{V}} \frac{{\mathrm{D}} \rho } {\mathrm{D} t} \mathrm{d}\mathscr{V} + \iiint_{\mathscr{V}} \rho \frac{\mathrm{D}(\mathrm{d}\mathscr{V})}{\mathrm{D} t}= 0$$

- 变换可得到速度的散度：

$$\iiint_{\mathscr{V}} \frac{{\mathrm{D}} \rho } {\mathrm{D} t} \mathrm{d}\mathscr{V} + \iiint_{\mathscr{V}} \rho \left [\frac{1}{\mathrm{d} \mathscr{V}}\frac{\mathrm{D}(\mathrm{d}\mathscr{V})}{\mathrm{D} t}\right ] \mathrm{d}\mathscr{V}= 0$$

6. 积分形式与微分形式的重要注释
- 实质区别：
  - 积分形式允许在（空间位置）固定的控制体内出现间断
  - 微分形式的控制方程假定流动参数是可微的，从而必须是连续的
  - 积分 => 微分 运用了散度定理，散度定理要求数学上的连续性
- 积分形式方程更基础更重要。在流动包含真实的间断（如激波）时，这一点尤其重要


# 2019/8/8

# 2.6 动量方程
- 物理学原理 牛顿第二定律$F = m a$
- 流动模型  2-2b运动流体微团模型(与连续性方程不同，推导动量方程较复杂), 因为该模型推导动量方程和能量方程尤其方便

<div align="center">
<img src="https://i.imgur.com/EIMmO3j.png" height="200">
</div>

- 作用与微团上力的总和 = 微团的质量乘以微团运动时的加速度
  - 体积力：直接作用在流体微团的整个体积微元上的力，而且作用是超距离的，如重力、电磁力、磁场力
  - 表面力：直接作用在流体微团的表面。只能由两种原因引起：
    - 1. 由包在流体微团周围的流体所施加的，作用于微团表面的**压力分布**；
    - 2. 由于外部流体推拉微团而产生的，以摩擦的方式作用于表面的**切应力和正应力分布**。

# 2019/8/9
上午快速阅读完成第二章流体力学控制方程，回头还要详细阅读做笔记
下午打算读一个小时的书
下午没看多少，在鼓捣pdf转html的事，还搞了下vim_ahk上面的快捷键

