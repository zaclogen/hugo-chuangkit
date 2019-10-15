---
title: 快速开始
linktitle: 快速开始
date: 2019-09-23
draft: false
toc: true
type: docs
weight: 1
menu: 
    su2:    
        parent: 使用
        weight: 2
---
# 介绍
欢迎来到SU2软件包快速开始教程.本教程意在以易于接受的形式来介绍分析和设计工具的关键特性. 只需要几分钟就可以完成本教程. 如果你还没有这么做, 请访问`下载`和`安装`页面来获得软件的最新稳定版本和安装细节.本教程只需要SU2软件包的`SU2_CFD`工具.
# 目标
完成本简单教程后, 用户将熟悉如何进行2D几何的外部无粘流动和连续伴随仿真, 并能够绘制流动解和表面敏感性. 本教程的对象是NACA0012机翼. 所以本教程将展示SU2的以下能力:

- 稳态, 二维, 欧拉和连续伴随方程
- 多重网格
- 空间离散的JST数值格式
- Euler隐式时间积分
- 欧拉壁面和远场边界条件
   
# 资源
运行本教程的必需文件包含在`SU2/QuickStart/`文件夹下. 其他教程的文件可以在`TestCaases/`仓库中找到. 计算时需要两个输文件: 配置文件和网格文件, 配置文件描述了特定问题的配置选项. 当然, `QuickStart/`下的文件也可以在`TestCases`仓库下的`TestCases/euler/naca2`中找到.
# 教程
# 背景
NACA0012机翼是`美国国家航空咨询委员会[National Advisory Committee for Aeronautics NACA]`开发的`四位数翼型[four-digit wing sections]`之一, 并被广泛应用CFD案例测试. 四位数分别表示: 第一位数表示最大弯度(占弦长的百分比), 第二个表示最大弯度的位置(占弦长的十分之几), 后面两位表示最大厚度(占弦长的百分比). 关于这个翼型的更多信息可见Abbott和von Doenhoff的书<<翼型理论>>.
# 问题设置
本问题求解NACA0012翼型在1.25度攻角下的欧拉方程, 采用以下空气自由来流条件:

- 压力: 101325Pa
- 温度: 273.15K
- 马赫数: 0.8

# 网格描述
网格采用`.su2`格式的非结构网格, 由10216个三角形网格, 5233个节点和两个名为`airfoil`和`farfield`的边界条件(或"markers")组成. 机翼表面采用`flowtangency Euler wall`边界条件, 远场采用`standard characteristic-based`边界条件.
# 配置文件选项
配置文件定义了计算的问题, 包含数值方法, 流动条件, 多重网格等所有选项, 并且指定输入网格和输出文件的文件名. 为简化本教程, 这里只讨论了两个配置选项. 
在文本编辑器中打开`inv_NACA0012.cfg`文件, 最先遇到的选项是`MATH_PROBLEM`:
```ini
% Mathematical problem (DIRECT, CONTINUOUS_ADJOINT, DISCRETE_ADJOINT)
MATH_PROBLEM= DIRECT
```
# 附 详细配置文件
```ini
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                                                                              %
% SU2 configuration file                                                       %
% Case description: Transonic inviscid flow around a NACA0012 airfoil          %
% Author: Thomas D. Economon                                                   %
% Institution: Stanford University                                             %
% Date: 2014.06.11                                                             %
% File Version 6.2.0 "Falcon"                                                  %
%                                                                              %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% ------------- DIRECT, ADJOINT, AND LINEARIZED PROBLEM DEFINITION ------------%
% 物理问题
% Physical governing equations (EULER, NAVIER_STOKES,
%                               WAVE_EQUATION, HEAT_EQUATION, FEM_ELASTICITY,
%                               POISSON_EQUATION)
PHYSICAL_PROBLEM= EULER
% 数学问题
% Mathematical problem (DIRECT, CONTINUOUS_ADJOINT)
MATH_PROBLEM= DIRECT
% 计算重启
% Restart solution (NO, YES)
RESTART_SOL= NO

% ----------- COMPRESSIBLE AND INCOMPRESSIBLE FREE-STREAM DEFINITION ----------%
% 
% Mach number (non-dimensional, based on the free-stream values)
MACH_NUMBER= 0.8
%
% Angle of attack (degrees)
AOA= 1.25
%
% Free-stream pressure (101325.0 N/m^2 by default, only Euler flows)  
FREESTREAM_PRESSURE= 101325.0
%
% Free-stream temperature (273.15 K by default)
FREESTREAM_TEMPERATURE= 273.15

% -------------- COMPRESSIBLE AND INCOMPRESSIBLE FLUID CONSTANTS --------------%
% 比热比
% Ratio of specific heats (1.4 (air), only for compressible flows)
GAMMA_VALUE= 1.4
% 气体常数
% Specific gas constant (287.87 J/kg*K (air), only for compressible flows)
GAS_CONSTANT= 287.87

% ---------------------- REFERENCE VALUE DEFINITION ---------------------------%
%
% Reference origin for moment computation
REF_ORIGIN_MOMENT_X = 0.25
REF_ORIGIN_MOMENT_Y = 0.00
REF_ORIGIN_MOMENT_Z = 0.00
%
% Reference length for pitching, rolling, and yawing non-dimensional moment
REF_LENGTH= 1.0
%
% Reference area for force coefficients (0 implies automatic calculation)
REF_AREA= 1.0
%
% Flow non-dimensionalization (DIMENSIONAL, FREESTREAM_PRESS_EQ_ONE,
%                              FREESTREAM_VEL_EQ_MACH, FREESTREAM_VEL_EQ_ONE)
REF_DIMENSIONALIZATION= DIMENSIONAL

% ----------------------- BOUNDARY CONDITION DEFINITION -----------------------%
% 欧拉边界条件
% Marker of the Euler boundary (NONE = no marker)
MARKER_EULER= ( airfoil )
% 远场边界条件
% Marker of the far field (NONE = no marker)
MARKER_FAR= ( farfield )

% 表面识别
% ------------------------ SURFACES IDENTIFICATION ----------------------------%
% 面流动解文件中绘制的面
% Marker(s) of the surface in the surface flow solution file
MARKER_PLOTTING = ( airfoil )
% 计算无量纲系数的表面
% Marker(s) of the surface where the non-dimensional coefficients are evaluated.
MARKER_MONITORING = ( airfoil )
% 设计问题中需要计算目标函数的表面
% Marker(s) of the surface where obj. func. (design problem) will be evaluated
MARKER_DESIGNING = ( airfoil )

% 定义数值方法
% ------------- COMMON PARAMETERS TO DEFINE THE NUMERICAL METHOD --------------%
% 空间梯度的数值方法
% Numerical method for spatial gradients (GREEN_GAUSS, WEIGHTED_LEAST_SQUARES)
NUM_METHOD_GRAD= WEIGHTED_LEAST_SQUARES
% 优化问题的目标函数(阻力, 升力, SIDEFORCE?, 弯矩x, 弯矩y, 弯矩z, 效率, 等效面积, 近场压力, 力x, 力y,力z, 推力, 转矩, 自由面, 总热流率, 最大热流率, 反设计压力, 反设计热流率)
% Objective function in optimization problem (DRAG, LIFT, SIDEFORCE, MOMENT_X,
%                                             MOMENT_Y, MOMENT_Z, EFFICIENCY,
%                                             EQUIVALENT_AREA, NEARFIELD_PRESSURE,
%                                             FORCE_X, FORCE_Y, FORCE_Z, THRUST,
%                                             TORQUE, FREE_SURFACE, TOTAL_HEATFLUX,
%                                             MAXIMUM_HEATFLUX, INVERSE_DESIGN_PRESSURE,
%                                             INVERSE_DESIGN_HEATFLUX)
OBJECTIVE_FUNCTION= DRAG
% 最细网格的CFL条件
% Courant-Friedrichs-Lewy condition of the finest grid
CFL_NUMBER= 4.0
% 总迭代次数
% Number of total iterations
EXT_ITER= 250

% 线性求解器
% ------------------------ LINEAR SOLVER DEFINITION ---------------------------%
% 隐式格式线性求解器
% Linear solver for implicit formulations (BCGSTAB, FGMRES)
LINEAR_SOLVER= FGMRES
% Kyrlov线性求解器预处理器
% Preconditioner of the Krylov linear solver (JACOBI, LINELET, LU_SGS)
LINEAR_SOLVER_PREC= LU_SGS
% 隐式格式线性求解器最小误差
% Minimum error of the linear solver for implicit formulations
LINEAR_SOLVER_ERROR= 1E-6
% 隐式格式线性求解器最大迭代次数
% Max number of iterations of the linear solver for the implicit formulation
LINEAR_SOLVER_ITER= 5

% 多重网格
% -------------------------- MULTIGRID PARAMETERS -----------------------------%
% 多重网格级别
% Multi-Grid Levels (0 = no multi-grid)
MGLEVEL= 3
% 多重网格循环
% Multi-grid cycle (V_CYCLE, W_CYCLE, FULLMG_CYCLE)
MGCYCLE= W_CYCLE
% 多重网格预光滑级别
% Multi-Grid PreSmoothing Level
MG_PRE_SMOOTH= ( 1, 2, 3, 3 )
% 多重网格后光顺级别
% Multi-Grid PostSmoothing Level
MG_POST_SMOOTH= ( 0, 0, 0, 0 )
% 
% Jacobi implicit smoothing of the correction
MG_CORRECTION_SMOOTH= ( 0, 0, 0, 0 )
%
% Damping factor for the residual restriction
MG_DAMP_RESTRICTION= 1.0
%
% Damping factor for the correction prolongation
MG_DAMP_PROLONGATION= 1.0

% 流动数值方法
% -------------------- FLOW NUMERICAL METHOD DEFINITION -----------------------%
% 对流数值方法
% Convective numerical method (JST, LAX-FRIEDRICH, CUSP, ROE, AUSM, HLLC,
%                              TURKEL_PREC, MSW)
CONV_NUM_METHOD_FLOW= JST
% 
% Monotonic Upwind Scheme for Conservation Laws (TVD) in the flow equations.
%           Required for 2nd order upwind schemes (NO, YES)
MUSCL_FLOW= YES
% 
% Slope limiter (NONE, VENKATAKRISHNAN, VENKATAKRISHNAN_WANG,
%                BARTH_JESPERSEN, VAN_ALBADA_EDGE)
SLOPE_LIMITER_FLOW= VENKATAKRISHNAN
% 2阶和4阶人工扩散系数
% 2nd and 4th order artificial dissipation coefficients
JST_SENSOR_COEFF= ( 0.5, 0.02 )
% 时间离散
% Time discretization (RUNGE-KUTTA_EXPLICIT, EULER_IMPLICIT, EULER_EXPLICIT)
TIME_DISCRE_FLOW= EULER_IMPLICIT

% 伴随流动数值方法
% ---------------- ADJOINT-FLOW NUMERICAL METHOD DEFINITION -------------------%
% 对流数值格式
% Convective numerical method (JST, LAX-FRIEDRICH, ROE)
CONV_NUM_METHOD_ADJFLOW= JST
% 
% Monotonic Upwind Scheme for Conservation Laws (TVD) in the adjoint flow equations.
%           Required for 2nd order upwind schemes (NO, YES)
MUSCL_ADJFLOW= YES
%
% Slope limiter (NONE, VENKATAKRISHNAN, BARTH_JESPERSEN, VAN_ALBADA_EDGE,
%                SHARP_EDGES, WALL_DISTANCE)
SLOPE_LIMITER_ADJFLOW= NONE
%
% Reduction factor of the CFL coefficient in the adjoint problem
CFL_REDUCTION_ADJFLOW= 0.5
% 时间离散
% Time discretization (RUNGE-KUTTA_EXPLICIT, EULER_IMPLICIT)
TIME_DISCRE_ADJFLOW= EULER_IMPLICIT

% 设计变量
% ----------------------- DESIGN VARIABLE PARAMETERS --------------------------%
% 变形类型(无变形, 移动, 旋转, 缩放, FFD设置, FFD_NACELLE, FFD控制点, FFD_CAMBER, FFD_THICKNESS, FFD_TWIST, FFD控制点2D, FFD_CAMBER_2D, FFD_THICKNESS_2D, FFD_TWIST_2D, HICKS_HENNE, SURFACE_BUMP )
% Kind of deformation (NO_DEFORMATION, TRANSLATION, ROTATION, SCALE,
%                      FFD_SETTING, FFD_NACELLE
%                      FFD_CONTROL_POINT, FFD_CAMBER, FFD_THICKNESS, FFD_TWIST
%                      FFD_CONTROL_POINT_2D, FFD_CAMBER_2D, FFD_THICKNESS_2D, FFD_TWIST_2D,
%                      HICKS_HENNE, SURFACE_BUMP)
DV_KIND= HICKS_HENNE
% 应用形状变形的面
% Marker of the surface in which we are going apply the shape deformation
DV_MARKER= ( airfoil )
% 形状变形的参数
% Parameters of the shape deformation
% - NO_DEFORMATION ( 1.0 )
% - TRANSLATION ( x_Disp, y_Disp, z_Disp ), as a unit vector
% - ROTATION ( x_Orig, y_Orig, z_Orig, x_End, y_End, z_End )
% - SCALE ( 1.0 )
% - ANGLE_OF_ATTACK ( 1.0 )
% - FFD_SETTING ( 1.0 )
% - FFD_CONTROL_POINT ( FFD_BoxTag, i_Ind, j_Ind, k_Ind, x_Disp, y_Disp, z_Disp )
% - FFD_NACELLE ( FFD_BoxTag, rho_Ind, theta_Ind, phi_Ind, rho_Disp, phi_Disp )
% - FFD_GULL ( FFD_BoxTag, j_Ind )
% - FFD_ANGLE_OF_ATTACK ( FFD_BoxTag, 1.0 )
% - FFD_CAMBER ( FFD_BoxTag, i_Ind, j_Ind )
% - FFD_THICKNESS ( FFD_BoxTag, i_Ind, j_Ind )
% - FFD_TWIST ( FFD_BoxTag, j_Ind, x_Orig, y_Orig, z_Orig, x_End, y_End, z_End )
% - FFD_CONTROL_POINT_2D ( FFD_BoxTag, i_Ind, j_Ind, x_Disp, y_Disp )
% - FFD_CAMBER_2D ( FFD_BoxTag, i_Ind )
% - FFD_THICKNESS_2D ( FFD_BoxTag, i_Ind )
% - FFD_TWIST_2D ( FFD_BoxTag, x_Orig, y_Orig )
% - HICKS_HENNE ( Lower Surface (0)/Upper Surface (1)/Only one Surface (2), x_Loc )
% - SURFACE_BUMP ( x_Start, x_End, x_Loc )
% 前面DV_KIND设置为HICKS_HENNE, 所以此处1表示上表面(Upper Surface), 0.5表示x方向坐标
DV_PARAM= ( 1, 0.5 )
% 形状变形的值(应该是每次形状参数改变的值, 我猜)
% Value of the shape deformation
DV_VALUE= 0.01

% 网格变形
% ------------------------ GRID DEFORMATION PARAMETERS ------------------------%
% FEA网格变形的光顺迭代次数
% Number of smoothing iterations for FEA mesh deformation
DEFORM_LINEAR_ITER= 500
% 非线性变形迭代次数(面变形增长)
% Number of nonlinear deformation iterations (surface deformation increments)
DEFORM_NONLINEAR_ITER= 1
% 网格变形线性求解器收敛的最小残差
% Minimum residual criteria for the linear solver convergence of grid deformation
DEFORM_LINEAR_SOLVER_ERROR= 1E-14
% 是否在屏幕上打印网格变形期间的残差
% Print the residuals during mesh deformation to the console (YES, NO)
DEFORM_CONSOLE_OUTPUT= YES
% FEA网格变形施加的单元刚度类型
% Type of element stiffness imposed for FEA mesh deformation (INVERSE_VOLUME, 
%                                          WALL_DISTANCE, CONSTANT_STIFFNESS)
DEFORM_STIFFNESS_TYPE= INVERSE_VOLUME
% 显示表面变形
% Visualize the surface deformation (NO, YES)
VISUALIZE_SURFACE_DEF= NO
% 显示体积变形
% Visualize the volume deformation (NO, YES)
VISUALIZE_VOLUME_DEF= NO
 
% 收敛参数
% --------------------------- CONVERGENCE PARAMETERS --------------------------%
% Convergence criteria (CAUCHY, RESIDUAL)
% 收敛准则
CONV_CRITERIA= CAUCHY
% 残差减小程度
% Residual reduction (order of magnitude with respect to the initial value)
RESIDUAL_REDUCTION= 6
% 残差最小值
% Min value of the residual (log10 of the residual)
RESIDUAL_MINVAL= -8
% 
% Start Cauchy criteria at iteration number
STARTCONV_ITER= 10
% 
% Number of elements to apply the criteria
CAUCHY_ELEMS= 100
% 
% Epsilon to control the series convergence
CAUCHY_EPS= 1E-6
% 应用收敛条件的函数
% Function to apply the criteria (LIFT, DRAG, SENS_GEOMETRY, SENS_MACH,
%                                 DELTA_LIFT, DELTA_DRAG)
CAUCHY_FUNC_FLOW= DRAG

% 输入输出
% ------------------------- INPUT/OUTPUT INFORMATION --------------------------%
% Mesh input file
MESH_FILENAME= mesh_NACA0012_inv.su2
%
% Mesh input file format (SU2, CGNS, NETCDF_ASCII)
MESH_FORMAT= SU2
%
% Mesh output file
MESH_OUT_FILENAME= mesh_out.su2
%
% Restart flow input file
SOLUTION_FLOW_FILENAME= solution_flow.dat
% 
% Restart adjoint input file
SOLUTION_ADJ_FILENAME= solution_adj.dat
%
% Output file format (TECPLOT, PARAVIEW, TECPLOT_BINARY)
OUTPUT_FORMAT= TECPLOT
%
% Output file convergence history (w/o extension) 
CONV_FILENAME= history
%
% Output file restart flow
RESTART_FLOW_FILENAME= restart_flow.dat
%
% Output file restart adjoint
RESTART_ADJ_FILENAME= restart_adj.dat
%
% Output file flow (w/o extension) variables
VOLUME_FLOW_FILENAME= flow
%
% Output file adjoint (w/o extension) variables
VOLUME_ADJ_FILENAME= adjoint
% 目标函数梯度输出(使用连续伴随方法时)
% Output Objective function gradient (using continuous adjoint)
GRAD_OBJFUNC_FILENAME= of_grad.dat
% 面流动系数输出文件
% Output file surface flow coefficient (w/o extension)
SURFACE_FLOW_FILENAME= surface_flow
% 面伴随系数输出文件
% Output file surface adjoint coefficient (w/o extension)
SURFACE_ADJ_FILENAME= surface_adjoint
% 解文件输出频率
% Writing solution file frequency
WRT_SOL_FREQ= 250
% 收敛历史输出频率
% Writing convergence history frequency
WRT_CON_FREQ= 1

% 最优形状设计定义
% --------------------- OPTIMAL SHAPE DESIGN DEFINITION -----------------------%
% 基于流动的目标函数或约束函数
% Available flow based objective functions or constraint functions
%    DRAG, LIFT, SIDEFORCE, EFFICIENCY,
%    FORCE_X, FORCE_Y, FORCE_Z,
%    MOMENT_X, MOMENT_Y, MOMENT_Z,
%    THRUST, TORQUE, FIGURE_OF_MERIT,
%    EQUIVALENT_AREA, NEARFIELD_PRESSURE, 
%    TOTAL_HEATFLUX, MAXIMUM_HEATFLUX,
%    INVERSE_DESIGN_PRESSURE, INVERSE_DESIGN_HEATFLUX,
% 基于几何的目标函数或约束函数
% Available geometrical based objective functions or constraint functions
%    AIRFOIL_AREA, AIRFOIL_THICKNESS, AIRFOIL_CHORD, AIRFOIL_TOC, AIRFOIL_AOA,
%    WING_VOLUME, WING_MIN_THICKNESS, WING_MAX_THICKNESS, WING_MAX_CHORD, WING_MIN_TOC, WING_MAX_TWIST, WING_MAX_CURVATURE, WING_MAX_DIHEDRAL
%    STATION#_WIDTH, STATION#_AREA, STATION#_THICKNESS, STATION#_CHORD, STATION#_TOC,
%    STATION#_TWIST (where # is the index of the station defined in GEO_LOCATION_STATIONS)
% 设计变量
% Available design variables
%    HICKS_HENNE 	(  1, Scale | Mark. List | Lower(0)/Upper(1) side, x_Loc )
%    NACA_4DIGITS	(  4, Scale | Mark. List | 1st digit, 2nd digit, 3rd and 4th digit )
%    TRANSLATION	(  5, Scale | Mark. List | x_Disp, y_Disp, z_Disp )
%    ROTATION		(  6, Scale | Mark. List | x_Axis, y_Axis, z_Axis, x_Turn, y_Turn, z_Turn )
%    FFD_CONTROL_POINT_2D (  15, Scale | Mark. List | FFD_Box_ID, i_Ind, j_Ind, x_Mov, y_Mov )
%    FFD_CAMBER_2D 	( 16, Scale | Mark. List | FFD_Box_ID, i_Ind )
%    FFD_THICKNESS_2D 	( 17, Scale | Mark. List | FFD_Box_ID, i_Ind )
% 带缩放系数的优化目标函数
% Optimization objective function with scaling factor
% ex= Objective * Scale
OPT_OBJECTIVE= DRAG * 0.001
% 带缩放系数的优化约束函数, 分号隔开
% Optimization constraint functions with scaling factors, separated by semicolons
% ex= (Objective = Value ) * Scale, use '>','<','='
OPT_CONSTRAINT= ( LIFT > 0.328188 ) * 0.001; ( MOMENT_Z > 0.034068 ) * 0.001; ( AIRFOIL_THICKNESS > 0.11 ) * 0.001
% 优化设计变量, 分号隔开
% Optimization design variables, separated by semicolons
DEFINITION_DV= 
( 1, 1.0 | airfoil | 0, 0.05 ); 
( 1, 1.0 | airfoil | 0, 0.10 ); 
( 1, 1.0 | airfoil | 0, 0.15 );
( 1, 1.0 | airfoil | 0, 0.20 );
( 1, 1.0 | airfoil | 0, 0.25 );
( 1, 1.0 | airfoil | 0, 0.30 ); 
( 1, 1.0 | airfoil | 0, 0.35 ); 
( 1, 1.0 | airfoil | 0, 0.40 ); 
( 1, 1.0 | airfoil | 0, 0.45 ); 
( 1, 1.0 | airfoil | 0, 0.50 ); 
( 1, 1.0 | airfoil | 0, 0.55 ); 
( 1, 1.0 | airfoil | 0, 0.60 ); 
( 1, 1.0 | airfoil | 0, 0.65 ); 
( 1, 1.0 | airfoil | 0, 0.70 );
( 1, 1.0 | airfoil | 0, 0.75 ); 
( 1, 1.0 | airfoil | 0, 0.80 );
( 1, 1.0 | airfoil | 0, 0.85 ); 
( 1, 1.0 | airfoil | 0, 0.90 ); 
( 1, 1.0 | airfoil | 0, 0.95 ); 
( 1, 1.0 | airfoil | 1, 0.05 ); 
( 1, 1.0 | airfoil | 1, 0.10 ); 
( 1, 1.0 | airfoil | 1, 0.15 ); 
( 1, 1.0 | airfoil | 1, 0.20 ); 
( 1, 1.0 | airfoil | 1, 0.25 ); 
( 1, 1.0 | airfoil | 1, 0.30 ); 
( 1, 1.0 | airfoil | 1, 0.35 ); 
( 1, 1.0 | airfoil | 1, 0.40 ); 
( 1, 1.0 | airfoil | 1, 0.45 );
( 1, 1.0 | airfoil | 1, 0.50 ); 
( 1, 1.0 | airfoil | 1, 0.55 ); 
( 1, 1.0 | airfoil | 1, 0.60 ); 
( 1, 1.0 | airfoil | 1, 0.65 ); 
( 1, 1.0 | airfoil | 1, 0.70 ); 
( 1, 1.0 | airfoil | 1, 0.75 );     
( 1, 1.0 | airfoil | 1, 0.80 ); 
( 1, 1.0 | airfoil | 1, 0.85 ); 
( 1, 1.0 | airfoil | 1, 0.90 ); 
( 1, 1.0 | airfoil | 1, 0.95 )
```

# 运行SU2
## 求解Euler方程

1. 进入`QuickStart`文件夹, 里面有`inv_NACA0012.cfg`配置文件和`mesh_NACA0012_inv.su2`网格文件
2. 运行命令`SU2_CFD inv_NACA0012.cfg`
3. SU2运行, 并在屏幕打印残差信息
4. 运行结束后, 生成一系列文件

- `flow.dat or flow.vtk` 全体积流动解
- `surface_flow.dat or surface_flow.vtk` 沿翼型表面的流动解
- `surface_flow.csv`沿翼型表面的值, 如压力, 压力系数等
- `history.dat or history.csv`收敛历史
- `restart_flow.dat`内部格式的重启文件 

## 求解连续伴随方程获得目标函数敏感性

1. 更给配置文件, 将`MATH_PROBLEM`选项, 由`DIRECT`改为`CONTINUOUS_ADJOINT`
2. 将`restar_flow.dat`更名为`solution_flow.dat`, 以便伴随求解器读取直接流动解
3. 运行命令`SU2_CFD inv_NACA0012.cfg`
4. 进行伴随求解, 屏幕打印残差信息
5. 运行结束, 生成一系列文件:

- `adjoiont.dat or adjoint.vtk` 全体积伴随解
- `surface_adjoint.dat or surface_adjoint.vtk` 沿翼型表面的伴随解
- `surface_adjoint.csv` 沿翼型表面的值, 如表面敏感性
- `restart_adj_cd.dat` 内部格式的伴随求解重启文件, 注意:目标函数出现在文件名中(Cd)
- `history.dat or history.csv` 收敛历史文件

## SU2 v4.1版本以上, 可以求解离散伴随方程

1. 更改配置文件, 将`MATH_PROBLEM`选项, 由`DIRECT`改为`DISCRETE_ADJOINT`
2. 将`restar_flow.dat`更名为`solution_flow.dat`, 以便伴随求解器读取直接流动解
3. 运行命令`SU2_CFD_AD inv_NACA0012.cfg`




# 试验

# 结果
