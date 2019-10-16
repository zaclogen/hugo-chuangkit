---
title: Hugo自动化部署
math: true
# highlight: true
share: false
toc: true
profile: false
slides: example-slides.md
date: 2019-09-19
# markup: mmark
---

# 1. 环境

## 1.1 本地: window 10 x64

- git
- hugo-extended
- ssh

## 1.2 服务端: ubuntu18.06 x64

- git

- hugo-extended

  

  ```bash
  # 获取合适的deb包
  wget https://github.com/gohugoio/hugo/releases/download/v0.58.1/hugo_extended_0.58.1_Linux-64bit.deb
  # 安装
  sudo dpkg -i hugo_extended_0.58.1_Linux-64bit.deb
  # 查看版本
  hugo version
  ```

- caddy (http.git, hook.service插件)

  - caddy介绍 [^1]
  - caddy文档[^2]
  - caddy一键安装教程[^3]

  ```bash
  # 带插件安装(http.git,dns,hook.service)
  curl https://getcaddy.com | bash -s personal http.git,dns,hook.service
  # /etc/caddy中创建配置文件
  sudo mkdir /etc/caddy
  sudo touch /etc/caddy/Caddyfile
  # 配置ssl证书目录
  sudo mkdir /etc/ssl/caddy
  # 配置网站目录
  sudo mkdir /var/www/kcwm.xyz
  # 提高网站安全性, 配置上述文件(夹)用户(组)权限
  sudo chown -R root:www-data /etc/caddy
  sudo chown -R www-data:root /etc/ssl/caddy
  sudo chmod 0770 /etc/ssl/caddy
  sudo chown www-data:www-data /var/www/kcwm.xyz
  ```

  - 安装caddy.service[^4]

    ```bash
    caddy -service install -agree -email kongchuang@zju.edu.cn -conf /etc/caddy/Caddyfile
    # 启动caddy
    caddy -service start
    # 卸载caddy.service
    caddy -service uninstall
    ```

## 1.3 github repo: zaclogen/hugo-chuangkit.git

# 2 配置

## 2.1 webhook

1. 打开Github页面, 进入项目->设置->webhook->Add Webhook

2. 添加webhook,PayloadURL填写/webhook地址`http://kcwm.xyz/webhooks`. **注意**: 这个在caddy使用默认80端口的时候才好用
3. content-type选json secret
4. 口令填写`nicetry`(和Caddyfile中的保持一致) 其他保持默认即可

## 2.2 caddy

- 修改`/etc/caddy/Caddyfile`为:[^5]

```
kcwm.xyz {
        gzip
        tls kongchuang@zju.edu.cn
        git github.com/zaclogen/hugo-chuangkit . {
                repo github.com/zaclogen/hugo-chuangkit
                path /var/www/hugo-chuangkit
                # nicetry为github中webhook的密码
                hook /webhooks nicetry
                hook_type github
                then hugo --destination=/var/www/kcwm.xyz
                interval 600
                }
        root /var/www/kcwm.xyz
}
```

- `/etc/systemd/system/caddy.service`增加

  ```
  [Service]
  LimitNOFILE=8192
  ```

**注意**: 

1. 记得80, 443端口放行

2. 报错时, 可能是文件夹和权限问题

   ```bash
   # 创建文件夹
   mkdir /var/www/hugo-chuangkit
   # 赋予权限
   sudo chown -R root:www-data /var/www/hugo-chuangkit
   ```

# 3 管理

## 3.1 本地

- hugo 使用(首先进入项目根目录)

  ```bash
  # 实时编译生成public文件夹
  hugo -w
  # 实时编译, hugo作服务器, 绑定80端口
  hugo server --port=80  --appendPort=false
  ```

- git

  - 新建仓库时

  ```bash
  git init
  echo "Hello world" >> README.md
  git add .
  git commit -m "first Test"
  git remote add origin https://github.com/zaclogen/[NEWREPO.GIT]
  git push -u origin master
  ```

  - 已有仓库

    ```bash
    git clone https://github.com/zaclogen/hugo-chuangkit.git
    # 文件操作
    git add .
    git commit -m "comment"
    git push -u origin master
    ```

## 3.2 服务端

- caddy的管理命令

  - 修改`/etc/systemd/system/caddy.service`后

    ```bash
    systemctl daemon-reload
    ```

  - 修改`/etc/caddy/Caddyfile`后

    ```bash
    # 重启
    caddy -service restart
    # 启动
    caddy -service start
    # 关闭
    caddy -service stop
    # 查看运行状态
    systemctl status caddy.servic
    ```

  - 通过systemd管理caddy

    ```bash
    sudo systemctl start caddy.service
    sudo systemctl stop caddy.service
    sudo systemctl restart caddy.service
    sudo systemctl reload caddy.service
    # 查看运行状态
    systemctl status caddy.servic
    ```

[^1]:https://caddyserver.com/
[^2]:https://caddyserver.com/docs
[^3]:[https://medium.com/@jestem/caddy%E5%AE%98%E6%96%B9%E8%84%9A%E6%9C%AC%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8-1e6d25154804](https://medium.com/@jestem/caddy官方脚本一键安装与使用-1e6d25154804)
[^4]: https://github.com/hacdias/caddy-service/blob/master/README.md
[^5]: [Caddy+Hugo双GO组合并实现github的webhook钩子推送](https://mile3033.github.io/archives/2018/0526/#1-%E5%AE%89%E8%A3%85caddy)

# 4 过时方案

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
