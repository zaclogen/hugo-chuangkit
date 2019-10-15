+++

widget = "blank"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 15  # Order that this section will appear.

title = "frp搭建"
subtitle = ""
toc = true
date = 2019-09-11

[design]
  columns = "2"

[design.background]
  gradient_start = "DarkGreen"
  gradient_end = "ForestGreen"
  text_color_light = true

[design.spacing]
  padding = ["20px", "0", "20px", "0"]

[advanced]
 css_style = ""
 css_class = ""
+++
# 安装
[frp](https://github.com/fatedier/frp/blob/master/README_zh.md#%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B) 是一个可用于内网穿透的高性能的反向代理应用，支持 tcp, udp 协议，为 http 和 https 应用协议提供了额外的能力，且尝试性支持了点对点穿透。

首先从[releases](https://github.com/fatedier/frp/releases)界面下载frp_x.x.x_linux_amd64.tar.gz文件
## ubuntu
```bash
wget https://github.com/fatedier/frp/releases/download/v0.29.0/frp_0.29.0_linux_amd64.tar.gz
# 解压
tar -xzvf frp_0.29.0_linux_amd64.tar.gz
```
## windows
下载frp_0.29.0_windows_amd64.zip并解压

# 设置
## 通过 ssh 访问内网机器
```ini
# frps.ini
[common]
bind_port = 7000
# frpc.ini
[common]
server_addr = 106.15.88.11
server_port = 7000

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
```
通过 ssh 访问内网机器，假设用户名为 root：
```bash
ssh -oPort=6000 root@106.15.88.11
```
## 单用户使用端口访问web服务
有时想要让其他人通过域名访问或者测试我们在本地搭建的 web 服务，但是由于本地机器没有公网 IP，无法将域名解析到本地的机器，通过 frp 就可以实现这一功能，以下示例为 http 服务，https 服务配置方法相同，`vhost_http_port`替换为`vhost_https_port`，`type`设置为`https`即可。
1. 修改 frps.ini 文件，设置 http 访问端口为 8081：
2. 修改 frpc.ini 文件，假设 frps 所在的服务器的 IP 为 106.15.88.11，`local_port` 为本地机器上 web 服务对应的端口, 绑定自定义域名 `kcwm.xyz`
3. 将`kcwm.xyz`的域名 A 记录解析到 IP `106.15.88.11`
4. 通过浏览器访问http://kcwm.xyz:8081 即可访问到处于内网机器上的 web 服务。
```ini
# 服务端frps.ini设置
[common]
bind_port = 7000
vhost_http_port = 8081

# 客户端frpc.ini设置
[common]
server_addr = 106.15.88.11
server_port = 7000 # 与服务端的bind_prt接口一样

[web]
type = http
local_port = 80
custom_domain = kcwm.xyz
```
## 多用户使用二级域名访问web服务
在多人同时使用一个 frps 时，通过自定义二级域名的方式来使用会更加方便。

通过在 frps 的配置文件中配置 `subdomain_host`，就可以启用该特性。之后在 frpc 的 http、https 类型的代理中可以不配置 `custom_domains`，而是配置一个 `subdomain` 参数。

只需要将 `*.{subdomain_host}` 解析到 frps 所在服务器。之后用户可以通过 `subdomain` 自行指定自己的 web 服务所需要使用的二级域名，通过 `{subdomain}.{subdomain_host}` 来访问自己的 web 服务。
将泛域名 `*.frps.com` 解析到 frps 所在服务器的 IP 地址。
frps 和 frpc 都启动成功后，通过 http://frp.kcwm.xyz:8081 就可以访问到内网的 web 服务。

```ini
# 服务端frps.ini设置
[common]
subdomain_host = kcwm.xyz

# 客户端frpc.ini设置
[web] 
type = http
local_port = 80
subdomain = rfrp # subdomian名称可自定义

```
# 启动服务
## ubuntu
启动前需打开相关端口的防火墙
```bash
# 打开7000和8081端口
sudo ufw allow 7000
sudo ufw allow 8081

# 启动服务端
./frps -c frps.ini
```

## windows 
将cmd切换到`frpc.exe`所在目录
```bash
# 启动客户端
./frpc.exe -c frpc.ini
```
# 现有配置
```ini
# vultr服务器
[common]
bind_port = 7000
vhost_http_port = 8081
subdomain_host = chuangkit.ga

# newifi路由
[common]
server_addr = 208.167.245.52
server_port = 7000
[sshnewifi]
type = tcp
local_ip = 192.168.123.1
local_port = 22
remote_port = 6000
[webnewifi]
type = http
local_port = 80
custom_domain = newifi
[web203]
type = http
local_ip = 192.168.123.134
local_port = 80
custom_domain = 203

# xwrt路由
[common]
server_addr = 208.167.245.52
server_port = 7000
[sshxwrt]
type = tcp
local_ip = 192.168.15.1
local_port = 22
remote_port = 6001
[webxwrt]
type = http
local_port = 80
custom_domain = xwrt
```