+++
# A Demo section created with the Blank widget.
# Any elements can be added in the body: https://sourcethemes.com/academic/docs/writing-markdown-latex/
# Add more sections by duplicating this file and customizing to your requirements.

widget = "blank"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 15  # Order that this section will appear.

title = "ss搭建"
subtitle = ""

[design]
  # Choose how many columns the section has. Valid values: 1 or 2.
  columns = "2"

[design.background]
  # Apply a background color, gradient, or image.
  #   Uncomment (by removing `#`) an option to apply it.
  #   Choose a light or dark text color by setting `text_color_light`.
  #   Any HTML color name or Hex value is valid.

  # Background color.
  # color = "navy"
  
  # Background gradient.
  gradient_start = "DarkGreen"
  gradient_end = "ForestGreen"
  
  # Background image.
  # image = "image.jpg"  # Name of image in `static/img/`.
  # image_darken = 0.6  # Darken the image? Range 0-1 where 0 is transparent and 1 is opaque.

  # Text color (true=light or false=dark).
  text_color_light = true

[design.spacing]
  # Customize the section spacing. Order is top, right, bottom, left.
  padding = ["20px", "0", "20px", "0"]

[advanced]
 # Custom CSS. 
 css_style = ""
 
 # CSS class.
 css_class = ""
+++
# 安装
- ToyoDAdoubi写了很多脚本: https://github.com/ToyoDAdoubi/doubi
- ssr一键安装管理脚本https://github.com/ToyoDAdoubi/doubi#ssrsh
```bash
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```
> ubuntu用这个脚本不好用
[这个好用](https://xiaozhou.net/enable-bbr-for-vps-2017-06-10.html)

# 配置
## ssr配置
```
IP: 208.167.245.52
加密: aes-256-cfb
协议: auth_sha1_v4_compatible
混淆: plain
port: 12345[zjuljf]
port: 23456[zjukc]
port: 34567[zjuwjy]
```

## 端口配置
### CentOS
```bash
# 查看开放的端口
/etc/init.d/iptables status
# 打开某个端口(要保存重启)
iptables -A INPUT -p tcp --dport 12345 -j ACCEPT
# 保存防火墙
/etc/rc.d/init.d/iptables save
# 重启防火墙:
service iptables restartd
```
更改端口配置文件/etc/sysconfig/iptables
```bash
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [29:3964]
-A INPUT -i lo -j ACCEPT
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
# 系统
-A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 3306 -j DROP
-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT

-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

-A INPUT -p udp -m state --state NEW -m udp --dport 7500 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 7500 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 7000 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 7000 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 6001 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 6001 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 8080 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 8080 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 18080 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 18080 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 9000 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 9000 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 80 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 6800 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 6800 -j ACCEPT

# ss
-A INPUT -p udp -m state --state NEW -m udp --dport 23456 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 23456 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 34567 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 34567 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 12345 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 12345 -j ACCEPT

-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT

```
### Ubuntu
```bash
# 防火墙的打开
sudo ufw enable
# 防火墙的重启
sudo ufw reload
# 打开想要的端口（以9000为例）
ufw allow 9000
```

# aria一键脚本
```bash
# 下载安装
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/aria2.sh && chmod +x aria2.sh && bash aria2.sh
# 配置完成
# aliyun
 地址   : 106.15.88.11
 端口   : 6800
 密码   : 56671490cc8444dbda33
 目录   : /usr/local/caddy/www/aria2/Download

# vultr
 地址   : 208.167.245.52
 端口   : 6800
 密码   : 95c818492807732680f6
 目录   : /usr/local/caddy/www/aria2/Download
```
> 不能用, 尴尬~

# bbr
`ssr.sh`提供了一键bbr脚本, 安装后运行`bash /root/bbr.sh status`查看bbr是否正常加载.