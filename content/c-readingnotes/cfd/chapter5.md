---
title: 第5章 网格生成与坐标变换 
linktitle: 5 网格生成与坐标变换
toc: true
type: docs
date: "2019-08-06T00:00:00+01:00"
draft: false
math: true
menu:
  cfd:
    parent: 卷2 基本的数值方法
    weight: 2

# Prev/next pager order (if `docs_section_pager` enabled in `params.toml`)
weight: 2
---

# 5.1 引言
- 网格: 分布在整个流场内的离散点
- 标准的有限差分法需要均匀网格
- 贴体坐标系$\xi$和$\eta$(在物体表面生成坐标线)
- ![物理平面与计算平面](https://i.imgur.com/V7loUPI.png)
- 流动控制方程在计算平面里用有限差分方法求解, 计算得到的信息将利用网格点之间的一一对应直接带回到物理平面. 因此需将物理平面的控制方程变换到计算平面表示的物理方程.

# 5.2 方程的一般变换
考虑二维非定常流场, 自变量为$x, y, t$, 将物理平面自变量$(x,y,t)$变换成计算平面中的一组新自变量$(\xi, \eta, \tau)$,用下述三个方程表示这个变换:

$$\xi = \xi (x, y, t)$$
$$\eta = \eta (x, y, t)$$
$$\tau = \tau (t)$$
注: 目前这个变换是以一般形式写出的, 对于实际应用, 该变换必须由具体的解析关系式给出, 有时也可以由特定的数值对应关系式给出.通常$\tau = t$.

- 考虑以x, y和t为自变量的一个或一组偏微分方程, 如连续性方程,动量方程和能量方程. 这些方程中**未知数是以导数形式出现的**, 如$\frac{\partial \rho}{\partial x}$, $\frac{\partial u}{\partial y}$, $\frac{\partial e}{\partial t}$等.
- 因此, 要将方程由$(x, y, t)$空间变换到$(\xi, \eta, \tau)$空间,需要对导数进行变换, 即把关于x, y, t的导数变换成关于$\xi, \eta, \tau$的导数. 比如用$\frac{\partial u}{\partial \xi}$和$\frac{\partial u}{\partial \eta}$等的某种组合来代替$\frac{\partial u}{\partial y}$.
- 根据**求导链式法则**[wiki链式法则](https://zh.wikipedia.org/wiki/%E9%93%BE%E5%BC%8F%E6%B3%95%E5%88%99)

$$\left(\frac{\partial}{\partial x}\right)_{y, t}=\left(\frac{\partial}{\partial \xi}\right)_{\eta, \tau}\left(\frac{\partial \xi}{\partial x}\right)_{y, t}+\left(\frac{\partial}{\partial \eta}\right)_{\xi, \tau}\left(\frac{\partial \eta}{\partial x}\right)_{y, t}+\left(\frac{\partial}{\partial \tau}\right)_{\xi, \eta}\left(\frac{\partial \tau}{\partial x}\right)_{y, t}$$

$$\left(\frac{\partial}{\partial x}\right)_{y, t}=\left(\frac{\partial}{\partial \xi}\right)_{\eta, \tau}\left(\frac{\partial \xi}{\partial x}\right)_{y, t}+\left(\frac{\partial}{\partial \eta}\right)_{\xi, \tau}\left(\frac{\partial \eta}{\partial x}\right)_{y, t}+\left(\frac{\partial}{\partial \tau}\right)_{\xi, \eta}\left(\frac{\partial \tau}{\partial x}\right)_{y, t}$$
$$\left(\frac{\partial}{\partial t}\right)_{x, y}=\left(\frac{\partial}{\partial \xi}\right)_{\eta, \tau}\left(\frac{\partial \xi}{\partial t}\right)_{x, y}+\left(\frac{\partial}{\partial \eta}\right)_{\xi, \tau}\left(\frac{\partial \eta}{\partial t}\right)_{x, y}+\left(\frac{\partial}{\partial \tau}\right)_{\xi, \eta}\left(\frac{\partial \tau}{\partial t}\right)_{x, y}$$
注: 表达式中下标是为了强调求偏导数的过程中哪些变量保持不变.
考虑$\tau = \tau(t)$, 得到(5-2~4):

$$\frac{\partial}{\partial x}=\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial \xi}{\partial x}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial \eta}{\partial x}\right)$$
$$\frac{\partial}{\partial y}=\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial \xi}{\partial y}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial \eta}{\partial y}\right)$$
$$\frac{\partial}{\partial t}=\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial \xi}{\partial t}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial \eta}{\partial t}\right)+\left(\frac{\partial}{\partial \tau}\right)\left(\frac{\mathrm{d} \tau}{\mathrm{d} t}\right)$$
- 可将流动控制方程中关于x, y, t的导数对应代替. 关于$\xi, \eta, \tau$的导数中的系数称为**度量**, 如$\frac{\partial \xi}{\partial x}$, $\frac{\partial \xi}{\partial y}$, $\frac{\partial \eta}{\partial x}$和$\frac{\partial \eta}{\partial y}$都是度量, 如果(5-1)是封闭形式的解析表达式, 那么度量也可以求出封闭形式的表达式.然而, (5-1)给出的变换常常只是纯数值的对应关系, 此时只能用有限差分来计算度量, 通常是用中心差分计算.
- 考虑粘性流动控制方程, 方程的粘性项包含二阶导数, 如$\frac{\mu \frac{\partial v}{\partial x}}{\partial x}$, 因此对二阶导数也要进行变换.
- 令 :

$$A = \frac{\partial}{\partial x}=\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial \xi}{\partial x}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial \eta}{\partial x}\right)$$
$$D=\frac{\partial}{\partial y}=\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial \xi}{\partial y}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial \eta}{\partial y}\right)$$

- 则有:
- (5-6)

$$\begin{aligned} \frac{\partial^{2}}{\partial x^{2}} &=\frac{\partial A}{\partial x}=\frac{\partial}{\partial x}\left[\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial \xi}{\partial x}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial \eta}{\partial x}\right)\right] \\\\ &=\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial^{2} \xi}{\partial x^{2}}\right)+\left(\frac{\partial \xi}{\partial x}\right)\left(\frac{\partial^{2}}{\partial x \partial \xi}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial^{2} \eta}{\partial x^{2}}\right)+\left(\frac{\partial \eta}{\partial x}\right)\left(\frac{\partial^{2}}{\partial x \partial \eta}\right) \end{aligned}$$

- (5-10)  

$$
\begin{aligned} \frac{\partial^{2}}{\partial y^{2}} &=\frac{\partial D}{\partial y}=\frac{\partial}{\partial y}\left[\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial \xi}{\partial y}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial \eta}{\partial y}\right)\right] \\\\ &=\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial^{2} \xi}{\partial y^{2}}\right)+\left(\frac{\partial \xi}{\partial y}\right)\left(\frac{\partial^{2}}{\partial \xi \partial y}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial^{2} \eta}{\partial y^{2}}\right)+\left(\frac{\partial \eta}{\partial y}\right)\left(\frac{\partial^{2}}{\partial \eta \partial y}\right) \end{aligned}
$$
- (5-14)

$$
\begin{aligned} \frac{\partial^{2}}{\partial x \partial y} &=\frac{\partial}{\partial x}\left(\frac{\partial}{\partial y}\right)=\frac{\partial D}{\partial x}=\frac{\partial}{\partial x}\left[\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial \xi}{\partial y}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial \eta}{\partial y}\right)\right] \\\\ &=\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial^{2} \xi}{\partial x \partial y}\right)+\left(\frac{\partial \xi}{\partial y}\right)\left(\frac{\partial^{2}}{\partial \xi \partial x}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial^{2} \eta}{\partial x \partial y}\right)+\left(\frac{\partial \eta}{\partial y}\right)\left(\frac{\partial^{2}}{\partial \eta \partial x}\right) \end{aligned}
$$
- 含有"复合导数", 继续运用(5-2~3)"锁链规则", 记"复合导数"为:

- (5-7)

$$B=\frac{\partial^{2}}{\partial x \partial \xi}=\frac{\partial}{\partial x}\left(\frac{\partial}{\partial \xi}\right)= \left(\frac{\partial^{2}}{\partial \xi^{2}}\right)\left(\frac{\partial \xi}{\partial x}\right)+\left(\frac{\partial^{2}}{\partial \eta \partial \xi}\right)\left(\frac{\partial \eta}{\partial x}\right)$$
  - (5-8)

$$
C=\frac{\partial^{2}}{\partial x \partial \eta}=\frac{\partial}{\partial x}\left(\frac{\partial}{\partial \eta}\right)=\left(\frac{\partial^{2}}{\partial \xi \partial \eta}\right)\left(\frac{\partial \xi}{\partial x}\right)+\left(\frac{\partial^{2}}{\partial \eta^{2}}\right)\left(\frac{\partial \eta}{\partial x}\right)
$$
- (5-11)

$$
E=\frac{\partial}{\partial y}\left(\frac{\partial}{\partial \xi}\right)=\left(\frac{\partial^{2}}{\partial \xi^{2}}\right)\left(\frac{\partial \xi}{\partial y}\right)+\left(\frac{\partial^{2}}{\partial \eta \partial \xi}\right)\left(\frac{\partial \eta}{\partial y}\right)
$$
  - (5-12)

$$
F=\frac{\partial}{\partial y}\left(\frac{\partial}{\partial \eta}\right)=\left(\frac{\partial^{2}}{\partial \eta \partial \xi}\right)\left(\frac{\partial \xi}{\partial y}\right)+\left(\frac{\partial^{2}}{\partial \eta^{2}}\right)\left(\frac{\partial \eta}{\partial y}\right)
$$
- 将B,C,E,F代回, 得二阶导数变换:
- (5-9)

$$
\begin{aligned} \frac{\partial^{2}}{\partial x^{2}}=&\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial^{2} \xi}{\partial x^{2}}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial^{2} \eta}{\partial x^{2}}\right)+\left(\frac{\partial^{2}}{\partial \xi^{2}}\right)\left(\frac{\partial \xi}{\partial x}\right)^{2}+\left(\frac{\partial^{2}}{\partial \eta^{2}}\right)\left(\frac{\partial \eta}{\partial x}\right)^{2}+\\\\ & 2\left(\frac{\partial^{2}}{\partial \eta \partial \xi}\right)\left(\frac{\partial \eta}{\partial x}\right)\left(\frac{\partial \xi}{\partial x}\right) \end{aligned}
$$
- (5-13)

$$
\begin{aligned} \frac{\partial^{2}}{\partial y^{2}}=&\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial^{2} \xi}{\partial y^{2}}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial^{2} \eta}{\partial y^{2}}\right)+\left(\frac{\partial^{2}}{\partial \xi^{2}}\right)\left(\frac{\partial \xi}{\partial y}\right)^{2}+\\\\ &\left(\frac{\partial^{2}}{\partial \eta^{2}}\right)\left(\frac{\partial \eta}{\partial y}\right)^{2}+2\left(\frac{\partial^{2}}{\partial \eta \partial \xi}\right)\left(\frac{\partial \eta}{\partial y}\right)\left(\frac{\partial \xi}{\partial y}\right) \end{aligned}
$$
- (5-15)

$$
\begin{aligned} \frac{\partial^{2}}{\partial x \partial y}=&\left(\frac{\partial}{\partial \xi}\right)\left(\frac{\partial^{2} \xi}{\partial x \partial y}\right)+\left(\frac{\partial}{\partial \eta}\right)\left(\frac{\partial^{2} \eta}{\partial x \partial y}\right)+\left(\frac{\partial^{2}}{\partial \xi^{2}}\right)\left(\frac{\partial \xi}{\partial x}\right)\left(\frac{\partial \xi}{\partial y}\right)+\\\\ &\left(\frac{\partial^{2}}{\partial \eta^{2}}\right)\left(\frac{\partial \eta}{\partial x}\right)\left(\frac{\partial \eta}{\partial y}\right)+\left(\frac{\partial^{2}}{\partial \xi \partial \eta}\right)\left[\left(\frac{\partial \eta}{\partial x}\right)\left(\frac{\partial \xi}{\partial y}\right)+\left(\frac{\partial \xi}{\partial x}\right)\left(\frac{\partial \eta}{\partial y}\right)\right] \end{aligned}
$$
当流动控制方程用强守恒形式（2-93）表示时，二阶导数的变换，即式（5-9）、式（5-13）和式（5-15）各式就用不到了。回到2.10节，看看方程（2-93）以及式中的列向量的定义式（2-94）到式（2-98）。注意到，由式（2-95）到式（2-97）表示的F、G和H中，粘性项直接以$\tau_{xx}, \tau_{xy}, k\frac{\partial T}{\partial x}$等形式出现。这些项只包括速度分量的一阶导数（如$\frac{\partial u}{\partial x}, \frac{\partial u}{\partial y}$）或温度的一阶导数。对F,G和H内部的这些项进行变换时，只需用到一阶导数的变换式（5-2）和式（5-3）。接下来，方程（2-93）本身出现的一阶导数也是通过式（5-2）、式（5-3）、式（5-5）各式进行变换的。因此，当流动控制方程用式（2-93）的形式表示时，两次运用一阶导数的变换，也就是两次使用式（5-2）、式（5-3）和式（5-5），就可以完成方程的变换。相比之下，用式（2-58a~c）表示的控制方程，粘性项里直接出现了二阶导数。对于这种形式的控制方程进行变换，即要用到式（5-2）、式（5-3）、式（5-5）等一阶导数的变换，也要用到式（5-9）、式（5-13）、式（5-15）等二阶导数的变换。
再次强调，式（5-1）到式（5-3）、式（5-5）、式（5-9）、式（5-13）和式（5-15）各式，是用来将流动控制方程从物理平面（$（x，y）$平面）变换到计算平面$(\xi, \eta)$平面）的。在大多数CFD应用中，这种变换的目的是将物理平面中的非均匀网格（图5-2a）变换成计算平面中的均匀网格（图5-2b）。变换后的偏微分控制方程就在计算平面上进行有限差分离散。而在计算平面，有着均匀的$\Delta \xi$和均匀的$\Delta \eta$，如图5-2b所示。流场变量的计算是在计算平面的所有网格点（如图5-2b中的点a、b和c）上进行的。这些流场变量也就是物理平面相应的网格点（图5-2a中的点a、b和c）上的流场变量。

# 5.3 度量和雅可比行列式
- 式(5-2~15)涉及网格几何性质的项, 如$\frac{\partial \xi}{\partial x}$, $\frac{\partial \xi}{\partial y}$,$\frac{\partial \eta}{\partial x}$, $\frac{\partial \eta}{\partial y}$, 称为度量.

| 项目      | 直接变换                                                                                                                                                                                                                                                                                                                                                            | 逆变换                                                                                                                                                                                                                                                                                                                                                                  |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -----   | ----------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                            | ------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                           |
| 自变量     | $\xi, \eta, \tau$                                                                                                                                                                                                                                                                                                                                               | $x, y, t$                                                                                                                                                                                                                                                                                                                                                            |
| 变换      | (5-1)直接变换: $\begin{aligned} \xi &= \xi (x, y, t) \\\\ \eta & = \eta (x, y, t) \\\\ \tau &= \tau (t) \end{aligned}$                                                                                                                                                                                                                                              | (5-18)逆变换: $\begin{aligned} x &=x(\xi, \eta, \tau) \\\\ y &=y(\xi, \eta, \tau) \\\\ t &=t(\tau) \end{aligned}$                                                                                                                                                                                                                                                       |
| 度量      | 直接度量: $\frac{\partial \xi}{\partial x}$, $\frac{\partial \xi}{\partial y}$,$\frac{\partial \eta}{\partial x}$, $\frac{\partial \eta}{\partial y}$                                                                                                                                                                                                               | 逆度量:$\frac{\partial x}{\partial \xi},\frac{\partial x}{\partial \eta}, \frac{\partial y}{\partial \xi},\frac{\partial y}{\partial \eta}$                                                                                                                                                                                                                             |
| 二维      |                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                      |
| 变换      | 直接变换: $\begin{aligned}\xi &= \xi (x,y) \\\\ \eta &= \eta (x, y) \end{aligned}$                                                                                                                                                                                                                                                                                  | 逆变换:$\begin{aligned} x &= x (\xi,\eta) \\\\ y &= y (\xi, \eta) \end{aligned}$                                                                                                                                                                                                                                                                                        |
| 全微分     | $\begin{aligned} \mathrm{d} \xi &=\frac{\partial \xi}{\partial x} \mathrm{d} x+\frac{\partial \xi}{\partial y} \mathrm{d} y \\\\ \mathrm{d} \eta &=\frac{\partial \eta}{\partial x} \mathrm{d} x+\frac{\partial \eta}{\partial y} \mathrm{d} y \end{aligned}$                                                                                                   | $\begin{aligned} \mathrm{d} x &=\frac{\partial x}{\partial \xi} \mathrm{d} \xi+\frac{\partial x}{\partial \eta} \mathrm{d} \eta \\\\ \mathrm{d} y &=\frac{\partial y}{\partial \xi} \mathrm{d} \xi+\frac{\partial y}{\partial \eta} \mathrm{d} \eta \end{aligned}$                                                                                                   |
| 全微分矩阵形式 | (5-27): $\left[\begin{array}{c}{\mathrm{d} \xi} \\\\ {\mathrm{d} \eta}\end{array}\right]=\left(\begin{array}{cc}{\frac{\partial \xi}{\partial x}} & {\frac{\partial \xi}{\partial y}} \\\\ {\frac{\partial \eta}{\partial x}} & {\frac{\partial \eta}{\partial y}}\end{array}\right)\left[\begin{array}{l}{\mathrm{d} x} \\\\ {\mathrm{d} y}\end{array}\right]$ | (5-30): $\left[\begin{array}{c}{\mathrm{d} x} \\\\ {\mathrm{d} y}\end{array}\right]=\left(\begin{array}{cc}{\frac{\partial x}{\partial \xi}} & {\frac{\partial x}{\partial \eta}} \\\\ {\frac{\partial \gamma}{\partial \xi}} & {\frac{\partial y}{\partial \eta}}\end{array}\right)\left[\begin{array}{l}{\mathrm{d} \xi} \\\\ {\mathrm{d} \eta}\end{array}\right]$ |

# hello 

| 1 |                                                                                                                                                                                                                                                                                                                                                                     |  |
|:-:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|--|
| 2 | $$\left[\begin{array}{l}{\mathrm{d} \xi} \\ {\mathrm{d} \eta}\end{array}\right]=\left(\begin{array}{cc}{\frac{\partial x}{\partial \xi}} & {\frac{\partial x}{\partial \eta}} \\ {\frac{\partial \gamma}{\partial \xi}} & {\frac{\partial y}{\partial \eta}}\end{array}\right)^{-1}\left[\begin{array}{c}{\mathrm{d} x} \\ {\mathrm{d} y}\end{array}\right]$$ |  |
| 3 |                                                                                                                                                                                                                                                                                                                                                                     |  |
| 4 |                                                                                                                                                                                                                                                                                                                                                                     |  |
|   |                                                                                                                                                                                                                                                                                                                                                                     |  |


- (5-30)变换后可得(5-31):
$$\left[\begin{array}{l}{\mathrm{d} \xi} \\\\ {\mathrm{d} \eta}\end{array}\right]=\left(\begin{array}{cc}{\frac{\partial x}{\partial \xi}} & {\frac{\partial x}{\partial \eta}} \\\\ {\frac{\partial \gamma}{\partial \xi}} & {\frac{\partial y}{\partial \eta}}\end{array}\right)^{-1}\left[\begin{array}{c}{\mathrm{d} x} \\\\ {\mathrm{d} y}\end{array}\right]$$

$$\left[\begin{array}{l}{\mathrm{d} \xi} \\ {\mathrm{d} \eta}\end{array}\right]=\left(\begin{array}{cc}{\frac{\partial x}{\partial \xi}} & {\frac{\partial x}{\partial \eta}} \\ {\frac{\partial \gamma}{\partial \xi}} & {\frac{\partial y}{\partial \eta}}\end{array}\right)^{-1}\left[\begin{array}{c}{\mathrm{d} x} \\ {\mathrm{d} y}\end{array}\right]$$

- 比较(5-27)与(5-31), 得(5-32):
$$\left(\begin{array}{cc}{\frac{\partial \xi}{\partial x}} & {\frac{\partial \xi}{\partial y}} \\\\ {\frac{\partial \eta}{\partial x}} & {\frac{\partial \eta}{\partial y}}\end{array}\right)=\left(\begin{array}{cc}{\frac{\partial x}{\partial \xi}} & {\frac{\partial x}{\partial \eta}} \\\\ {\frac{\partial \gamma}{\partial \xi}} & {\frac{\partial y}{\partial \eta}}\end{array}\right)^{-1} \tag{5-32}$$

- 有些显而易见的事还是值得说一下。如果看到用变换后的坐标系表示的流动控制方程，其中出现雅可比行列式J，就知道这些方程是在与逆变换和逆度量打交道。如果在变换后的方程中没有看到J，通常就要与前面5.2节定义的直接变换和直接度量打交道。惟一的例外是5.4节将要讨论的内容。
- 再一次提醒读者，给定由式（5-1a~c）表示的直接变换，则$\frac{\partial \xi}{\partial x}$、$\frac{\partial \eta}{\partial y}$这样的直接度量最容易从这种变换中求得，并且用式（5-2）、式（5-3）和式（5-5）表示导数的变换也最直接。相反，若给定由式（5-18a~c）表示的逆变换，则$\frac{\partial x}{\partial \xi},\frac{\partial y}{\partial \eta}$这样的逆度量是最容易求的，而用式（5-24a）和式（5-24b）表示导数的变换才是最直接的。
- 还要提醒读者，在本章中考虑的是两个空间变量x和y。对于从$(x，y，z)$到$(\xi, \eta, \tau)$的三维空间变换，也有类似的，但更为冗长的表达式。为了清楚地解释基本原理，而不是过多地考虑细节，我们有意识地将讨论局限在二维。

- 雅可比行列式J(公式及推导见书上)
$$
J \equiv \frac{\partial(x, y)}{\partial(\xi, \eta)} \equiv\left|\begin{array}{cc}{\frac{\partial x}{\partial \xi}} & {\frac{\partial y}{\partial \xi}} \\\\ {\frac{\partial x}{\partial \eta}} & {\frac{\partial y}{\partial \eta}}\end{array}\right| \tag{5-22b}
$$
- 用逆度量表示的直接度量
$$
\begin{aligned} \frac{\partial \xi}{\partial x} &=\frac{1}{J} \frac{\partial y}{\partial \eta} \\\\ \frac{\partial \eta}{\partial x} &=-\frac{1}{J} \frac{\partial y}{\partial \xi} \\\\ \frac{\partial \xi}{\partial y} &=-\frac{1}{J} \frac{\partial x}{\partial \eta} \\\\ \frac{\partial \eta}{\partial y} &=\frac{1}{J} \frac{\partial x}{\partial \xi} \end{aligned} \tag{5-36}
$$

> 更详细的过程见书上

# 5.4 再论适合CFD使用的控制方程
- 问题: 在计算平面$(\xi, \eta)$中, 方程(5-37)还能写成强守恒的形式吗?
$$\frac{\partial U}{\partial u} + \frac{\partial F}{\partial x} + \frac{\partial G}{\partial y} = 0 \tag{5-37}$$

> 详情看书上

# 5.5 注释
- 上面讨论了网格变换和流动控制方程从物理平面$(x, y)$到计算平面$(\xi, \eta)$的转换, 这样会的变换符合有限差分法的需要.
- 但是有限体积法不需要这样的变换, 它能够**直接处理物理平面中的非均匀网格**

# 5.6 拉伸(压缩)网格
# 5.7 贴体坐标系: 椭圆形网格生成
# 5.8 自适应网格

