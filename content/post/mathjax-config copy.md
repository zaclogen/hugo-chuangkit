---
title: Mathjax配置
date: 2019-09-17
math: true
---


# 1 使用Mathjax
## 1.1 Mathjax的CDN服务
- [Staticfile CDN](/https://www.staticfile.org/)
- [BootCDN](https://www.bootcdn.cn/)

## 1.2 自建Mathjax服务
最简单快速获取Mathjax最新版的方法:
```bash
git clone git://github.com/mathjax/MathJax.git MathJax
```
更新
```bash
cd MathJax
git remote show origin
git pull origin
```

# 2 MathJax配置
[官方文档](https://mathjax-chinese-doc.readthedocs.io/en/latest/tex.html)有详细的说明
## 2.1 公式编号与引用
### 2.1.1 自动编号

在配置中打开下面选项, 则公式会自动编号
```js
TeX: {
    equationNumbers: {
      autoNumber: ["AMS"],
      useLabelIds: true
    },
}
```
- 带`\begin{}`的会自动编号, 后面加`\nonumber`取消编号, 不带`\begin{}`的不会自动编号;
```
$$ \begin{equation} b^2 = 4ac \end{equation} $$
$$ ax^2 =-(3a+1)x + 2(a+1) = 0 $$
$$ \begin{equation} b^2 = 4ac \end{equation} \nonumber $$
```
显示为:
$$ \begin{equation} b^2 = 4ac \end{equation} $$
$$ ax^2 =-(3a+1)x + 2(a+1) = 0 $$
$$ \begin{equation} b^2 = 4ac \end{equation} \nonumber $$

- 自动编号的引用, 需要在公式后面加`\label{c}`进行引用.

### 2.1.2 手动编号

使用`\tag{a}`编号, 需要引用时在后面加上label`\tag{a}\label{a}`
例如:
```
首先对公式进行编号
$$ E = mc^2 \tag{a}$$
$$ a^2 + b^2 = c^2 \tag{b}\label{b}$$
对公式进行引用: 
$\eqref{b}$引用时带括号, $\ref{b}$引用时不带括号;
而引用a时因为没有打label,会显示为:
$\ref{a}$
```
显示为:

首先对公式进行编号
$$ E = mc^2 \tag{a}$$
$$ a^2 + b^2 = c^2 \tag{b}\label{b}$$

对公式进行引用: 

$\eqref{b}$引用时带括号, $\ref{b}$引用时不带括号; 

而引用a时因为没有打label,会显示为:
$\ref{a}$

## 2.2 换行与对齐
### 2.2.1 换行
- `\\`, 由于markdown的原因, 可能要多写几个`\\`
- `\cr`
```
$$ begin{align} ax^2 &= -(3a+1)x + 2(a+1) \\\\\\ \nonumber &= 0 \end{align} $$
$$ \begin{align} ax^2 &= -(3a+1)x + 2(a+1) \cr \nonumber &= 0 \end{align}$$
```
显示为:
$$ \begin{align} ax^2 &= -(3a+1)x + 2(a+1) \\\\\\ \nonumber &= 0 \end{align} $$
$$ \begin{align} ax^2 &= -(3a+1)x + 2(a+1) \cr \nonumber &= 0 \end{align} $$


- `\begin{multline}`
```
$$
\begin{multline}
a+b+c+d+e+f+g\\\\\\
M+N+O+P+Q\\\\\\
R+S+T\\\\\\
u+x\nonumber
\end{multline}
$$
```
显示为:
$$
\begin{multline}
a+b+c+d+e+f+g\\\\\\
M+N+O+P+Q\\\\\\
R+S+T\\\\\\
u+x\nonumber
\end{multline}
$$

- `\begin{split}`
```
$$\begin{equation}
\begin{split} 
a&=b+c-d+e-f\\\\ 
&=g+h\\\\\\
&=i
\end{split} 
\end{equation}
$$
```
显示为:
$$\begin{equation}
\begin{split} 
a&=b+c-d+e-f\\\\ 
&=g+h\\\\\\
&=i
\end{split} 
\end{equation}
$$
## 2.3 Array和矩阵
- `\begin{array}`用法
```
$$\begin{array}{ccc}
1 & 2 & 3 \cr
4 & 5 & 6 \cr
7 & 8 & 9
\end{array}$$
```
显示为:
$$\begin{array}{ccc}
1 & 2 & 3 \cr
4 & 5 & 6 \cr
7 & 8 & 9
\end{array}$$

- `\begin{matrix}`用法和array类似
```
 $$\begin{matrix} 
 a & b \cr
 c & d 
 \end{matrix}$$
 ```
 $$\begin{matrix} a & b \cr c & d \end{matrix}$$
# 步骤演示?
$$\begin{align}
  (x+1)^2
    &\cssId{Step1}{= (x+1)(x+1)}\cr
    &\cssId{Step2}{= x(x+1) + 1(x+1)}\cr
    &\cssId{Step3}{= (x^2+x) + (x+1)}\cr
    &\cssId{Step4}{= x^2 + (x + x) + 1}\cr
    &\cssId{Step5}{= x^2+2x+1}\cr
\end{align}$$
