---
title: SU2命令
linktitle: SU2命令
date: 2019-09-16
draft: false
toc: true
type: docs
weight: 2
menu: 
    su2:
        name: 使用
        weight: 2
---
源文件下的重要文件夹:

- `SU2_IDE`: 各种开发IDE下的相关文件
- `SU2_PY`: Python框架下的文件
# C++命令
- 可执行程序位置: ~~`$SU2_HOME/<MODULE_NAME>/bin`~~ `$SU2_RUN`
- C++模块:
  - SU2_CFD (CFD code)
  - SU2_DOT (Gradient Projection Code)
  - SU2_DEF (Mesh Deformation Code)
  - SU2_MSH (Mesh Adaptation Code)
  - SU2_SOL (Solution Export Code)
  - SU2_GEO (Geometry Definition Code)

- 执行C++模块的命令形式:
```bash
# 通用格式
SU2_MODULE config.cfg
# 例如: 
SU2_CFD default.cfg
```
- 并行运算, 首先确保编译支持`MPI`, 则每一个模块都可以并行运行:
```bash
# 并行8核运行
mpirun -n 8 SU2_CFD default.cfg
```

# Python脚本命令

- 可执行程序位置: `$SU2_HOME/SU2_PY`

```bash
# 通用形式
python script_name.py [options]
```

## 并行计算脚本(paralle_computation.py) 

```bash
python paralle_computation.py [options]
# options:
# -h, 显示帮助
# -f FILE, 从FILE中读取配置文件
# -n PARTITIONS, PARTITIONS的数量
# -c COMPUTE, 求解直接或伴随问题
```

## 连续伴随梯度计算(continuous_adjoint.py)
The continuous adjoint calculation script, continuous_adjoint.py, automates the procedure for calculating sensitivities using the SU2 suite using adjoint methods. The script calls SU2_CFD to first run a direct analysis to obtain a converged solution, then calls SU2_CFD again to run an adjoint analysis on the converged flow solution to obtain surface sensitivities. The SU2_DOT module is then called to project design variable perturbations onto the surface sensitivities calculated in the adjoint solution to arrive at the gradient of the objective function with respect to the specified design variables.

```bash
python continuous_adjoint.py [options]
# Options:
# -h, –help show this help message and exit
# -f FILE, –file=FILE read config from FILE
# -n PARTITIONS, –partitions=PARTITIONS number of PARTITIONS
# -c COMPUTE, –compute=COMPUTE COMPUTE direct and adjoint problem
# -s STEP, –step=STEP DOT finite difference STEP
```
 
## 离散伴随梯度计算(discrete_adjoint.py)
Similar to the continuous adjoint script, the discrete adjoint script calls SU2_CFD to generate a flow solution and then calls SU2_CFD_AD to run an adjoint computation based on the objective function specified in the config file. Finally, SU2_DOT_AD is called to map the surface sensitivities onto the design variables specified desig variables.

```bash
python discrete_adjoint.py [options]
# Options:
# -h, –help show this help message and exit
# -f FILE, –file=FILE read config from FILE
# -n PARTITIONS, –partitions=PARTITIONS number of PARTITIONS
# -c COMPUTE, –compute=COMPUTE COMPUTE direct and adjoint problem
```

## 有限差分梯度计算(finite_differences.py)
The finite difference calculation script is used to calculate the gradient of an objective function with respect to specified design variables using a finite difference method. This script calls SU2_CFD repeatedly, perturbing the input design variables and mesh using SU2_DEF, stores the sensitivity values, and outputs the gradient upon exit.

```bash
python finite_differences.py [options]
# Options:
# -h, –help show this help message and exit
# -f FILE, –file=FILE read config from FILE
# -n PARTITIONS, –partitions=PARTITIONS number of PARTITIONS
# -s STEP, –step=STEP finite difference STEP
# -q QUIET, –quiet=QUIET, if True, output QUIET to log files
```

## 形状优化脚本(shape_optimization.py)
The shape optimization script coordinates and synchronizes the steps necessary to run a shape optimization problem using the design variables and objective function specified in the configuration file. The optimization is handled using SciPy’s SLSQP optimization algorithm by default. Objective functions (drag, lift, etc.) are determined by running a direct flow solution in SU2_CFD, and gradients are obtained using the adjoint solution by default (other options can be selected). For each major iteration in the design process, the mesh is deformed using SU2_DEF, and the sequence is repeated until a local optimum is reached.

```bash
python shape_optimization.py [options]
# Options:
# -h, –help show this help message and exit
# -f FILE, –file=FILE read config from FILE
# -r NAME, –name=NAME try to restart from project file NAME
# -n PARTITIONS, –partitions=PARTITIONS number of PARTITIONS
# -g GRADIENT, –gradient=GRADIENT Method for computing the GRADIENT (ADJOINT, DISCRETE_ADJOINT, FINDIFF, NONE)
# -q QUIET, –quiet=QUIET True/False Quiet all SU2 output (optimizer output only)
```