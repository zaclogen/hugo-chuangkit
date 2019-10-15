---
title: 部署Hugo到服务端
math: true
# highlight: true
share: false
profile: false
slides: example-slides.md
date: 2019-09-19
# markup: mmark
---
# 本地
## 安装
### ubuntu
到这里选择合适的deb包 https://github.com/gohugoio/hugo/releases
```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.58.1/hugo_extended_0.58.1_Linux-64bit.deb
```
安装
```bash
 sudo dpkg -i hugo_extended_0.58.1_Linux-64bit.deb
```
查看版本
```bash
hugo version
```
# 服务端
## 权衡
### 不打算使用:
- [x] Github: git方便; 速度慢; 数据安全性;
- [x] Netlify: git方便; 同步速度快; 速度慢; 数据安全性;
- [x] OSS对象存储: 域名要备案; 访问速度快; 配置较复杂;

### 考虑使用
- [x] Vultr服务器: 访问速度还可以; ssh不稳定; 域名不用备案;
    - [x] 更换系统;
    - [x] 重新部署ss;
    - [x] 配置Nginx;
    - [x] 配置同步工具;
- [ ] ~~阿里云服务器: 访问速度快; ssh稳定; 系统好用; 域名要备案;  ~~

~~要备案, 阿里云弃用~~

## 直接用hugo作web服务器:heart:
- Screen工具[命令详解](https://www.cnblogs.com/mchina/archive/2013/01/30/2880680.html)

```bash
# 安装
sudo apt-get install screen
# 创建一个窗口(session)
screen -S hugo
# 列出当前所有session
screen -ls
# 回到指定的session
screen -r hugo

# 在当前窗口创建一个窗口的快捷键
ctrl + a c
# 切换下一个窗口
ctrl + a n
# 显示screen帮助
ctrl + a ?

# linux查看所有端口占用
netstat -ntlp
# 查看指定端口占用
netstat -ntlp | grep 80
```

- 启动Hugo服务器
```bash
# 部署到ipv4上
hugo server --baseURL=http://v4.chuangkit.ga/ --port=80  --appendPort=false --bind=208.167.245.52
# 部署到ipv6上
hugo server --baseURL=http://chuangkit.ga/ --port=80  --appendPort=false --bind=2001:19f0:5:1899:5400:2ff:fe2c:8417
```
- bind: 指定服务器绑定到哪个网络接口（默认是 127.0.0.1 ，适用于大多数开发的时候）。 有些服务器，比如 Amazon WS ，使用网络地址转换（NAT）导致你有时很难找到实际使用的 IP 地址。 使用 --bind=0.0.0.0 将可以绑定到所有接口。
{{% alert note %}}
使用这个!!!
{{% /alert %}}
## ~~Nginx作web服务器~~
使用Nginx时, 直接发布public目录就好 
### 安装Nginx
ubuntu安装
```bash
sudo apt-get install nginx
```
Nginx文件位置
```
主程序: /usr/sbin/nginx
配置文件: /etc/nginx
静态文件: /usr/share/nginx
日志文件: /var/log/nginx
默认页面: /var/www/html
```
### Nginx配置
- nginx配置文件目录
```bash
$ cd /etc/nginx
$ ls -l
total 60
drwx------ 2 ubuntu ubuntu 4096 Jun 16 09:27 cert    ## ssl证书目录
drwxr-xr-x 2 root   root   4096 Jul 12  2017 conf.d  
-rw-r--r-- 1 root   root   1077 Feb 11  2017 fastcgi.conf
-rw-r--r-- 1 root   root   1007 Feb 11  2017 fastcgi_params
-rw-r--r-- 1 root   root   2837 Feb 11  2017 koi-utf
-rw-r--r-- 1 root   root   2223 Feb 11  2017 koi-win
-rw-r--r-- 1 root   root   3957 Feb 11  2017 mime.types
-rw-r--r-- 1 root   root   1501 Aug 31 07:42 nginx.conf    ## 配置文件
-rw-r--r-- 1 root   root    180 Feb 11  2017 proxy_params
-rw-r--r-- 1 root   root    636 Feb 11  2017 scgi_params
drwxr-xr-x 2 root   root   4096 Aug 31 09:42 sites-available  ## 虚拟主机配置代理目录
drwxr-xr-x 2 root   root   4096 Jun 15 06:39 sites-enabled    ## 启动配置代理目录
drwxr-xr-x 2 root   root   4096 Jun  4 06:03 snippets
-rw-r--r-- 1 root   root    664 Feb 11  2017 uwsgi_params
-rw-r--r-- 1 root   root   3071 Feb 11  2017 win-utf
```

### nginx常用命令
```bash
## 查看 Nginx 程序文件目录:/usr/sbin/nginx
$ ps  -ef | grep nginx

## 查看 nginx.conf 配置文件目录:/etc/nginx/nginx.conf
$ nginx -t                 
$ vim /etc/nginx/nginx.conf

## 配置文件目录：/etc/nginx

## 虚拟主机配置文件目录：/etc/nginx/sites-available/
## 虚拟主机文件夹目录：/var/www/，详情可在 /etc/nginx/sites-available/ 中配置
## 默认网页文件目录：/usr/share/nginx/html

## 测试配置文件，只检查配置文件是否存在语法错误
$ nginx -t -c <path-to-nginx.conf>
$ sudo nginx -t -c /etc/nginx/nginx.conf

## 启动 Nginx 服务
$ nginx 安装目录 -c <path-to-nginx.conf>
$ sudo /etc/init.d/nginx start

## 停止 Nginx 服务
$ sudo /usr/sbin/nginx -s stop 

## 重启 Nginx 
$ sudo /usr/sbin/nginx -s reload  # 0.8 版本之后的方法
$ kill -HUP pid     # 向 master 进程发送信号从容地重启 Nginx，即服务不中断

$ sudo service nginx start
$ sudo service nginx stop
$ sudo service nginx restart
```
- sites-available 目录中存放着具体的 Server 配置文件。
- 默认配置文件：/etc/nginx/sites-available/default 文件详细配置了默认的虚拟主机目录root /var/www/html，监听的端口是80。
  
### 修改Nginx默认目录位置
```

```
## 同步工具-微力同步
安装
```bash
curl http://www.verysync.com/shell/verysync-linux-installer/go-installer.sh > go-installer.sh
chmod +x go-installer.sh
./go-installer.sh
```
安装完成后就可以用浏览器打开 http://你的IP地址:8886 管理微力内容了


# 存在的问题
1. 修改文件后本地可实时预览, 但public文件夹不会更新
2. 可否在服务端使用hugo server?
