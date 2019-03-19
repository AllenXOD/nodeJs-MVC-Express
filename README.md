# 基于nodeJs+MVC架构+express构建web服务端应用

# Web开发

* 请求
* 处理
* 响应

## 1.1 MVC架构目录的搭建

* app.js
    * 服务器入口文件

* router
    * 路由: 分发请求给MVC

* controller
    * 负责处理业务逻辑(M与V之间的沟通)
        * 获取请求参数
        * 处理(调用M层增删改查)
        * 响应

* view
    * html文件

* model
    * 负责管理数据(数据库增删改查)

* resource
    * 静态资源

## 1.2 第三方模块

- express `nodeJs插件`
- mongoose `mongodb数据库管理`
- jquery
- bootstrap@3.4.1
- art-template
- body-parser `解析post请求参数`
- serve-favicon `托管网页小图标`
- express-fileupload  `接收文件数据`
- svg-captcha `验证码`
- aes256 `AES加密`
- cookie-session  `cookie`

## 1.3 express搭建服务器入口文件

- 导入模块
- 创建服务器
- 配置中间件
    - body-parser 
    - serve-favicon
    - 托管静态资源
    - 路由中间件
- 开启服务器

## 1.4 设计路由(接口文档)

- router.js 
    - 导入express `const express = require('express')`
    - 创建路由中间件 `let app = express()`
    - 导出路由中间件 `module.exports = app`
- app.js 使用路由中间件 
    `const heroRouter = require('./router/heroRuter.js')`
    `app.use(heroRouter)`

## 1.5 实现路由

* 完成C层的业务逻辑
    * 先完成服务端的逻辑
    * 使用postmanc测试
    * 完成客户端

# 前端性能优化

## 1.1 防抖

    防止用户频繁点击网络请求造成性能浪费
        - 开关思想
        - 定时器

## 1.2 节流

    利用定时器让某些事件触发的不要那么频繁 (例如页面滚动事件)

## 信息加密

* 1.客户端用户输入完毕后直接加密(网络请求发送的是密文, 后台数据库存储的也是密文)
* 2.客户端登录时使用相同的加密方式 对用户输入文本进行加密, 数据可只匹配两次密文是否匹配

## 常见加密技术

* md5: 不可逆, 只有加密, 没有解密
    * 加盐技术

* AES加密: 可逆, 有加密和解密
    * 相同的明文, 每一次加密得到的密文不一样
    * 不同的密文. 多次解密得到的明文一样

* RSA加密: 非对称加密

## cookie / session / token

token 单点登录, 不同设备进行登录时, 只有一个能够登录, 后登陆的将会挤掉前面登陆的

## javascriptBridge

前端js控制手机硬件

# 访问一个网页的全过程  

- 域名解析成IP地址
    - 浏览器向本机DNS模块发出`DNS请求`, DNS模块生成相关的`DNS报文`
    - DNS模块将生成的DNS报文传递给`传输层的UDP协议单元`
    - UDP协议单元将该数据封装成UDP数据报, 传递给`网络层的IP协议单元`
    - IP协议单元将该数据封装成IP数据包, 其目的IP地址为DNS服务器的IP地址
    - 封装好的IP数据包将传递给`数据链路层的协议单元`进行发送
    - 发送时在`ARP缓存中查询`相关数据, 如果没有, 就发送`ARP广播`(包含查询的IP地址, 收到广播的主机检查自己的IP, 符合条件的主机将含有自己MAC地址的ARP包发送给ARP广播主机)请求, 等待ARP回应
    - 得到ARP回应后, 将IP地址与路由的下一跳MAC地址对应的信息写入ARP缓存表
    - 写入缓存之后, 以路由下一跳的地址填充目的MAC地址, 以数据帧形式转发(转发可以进行多次)
    - DNS请求到达`DNS服务器的数据链路层协议单元`
    - DNS服务器的数据链路层协议单元解析数据帧, 将内部的IP数据包传递给`网络层IP协议单元`
    - DNS服务器的IP协议单元解析IP数据包, 将内部的UDP数据报传递给`传输层UDP协议单元`
    - DNS服务器的UDP协议单元解析收到的UDP数据报, 将内部的DNS报文传递给`DNS服务单元`
    - `DNS服务单元将域名解析成对应的IP地址, 产生DNS回应报文`
    - `DNS回应报文 -> UDP -> IP -> MAC ->用户主机`
    - `用户主机收到的数据帧, 将数据帧 -> IP -> UDP -> 浏览器`
    - 将域名解析结果以域名和IP地址对应的形式写入DNS缓存表

- 与目的主机进行TCP链接(三次握手)
    - 该TCP报文中SYN标志位设为1，表示连接请求
    - 该TCP报文通过IP（DNS）->MAC（ARP）->网关->目的主机
    - 目的主机收到数据帧，通过IP->TCP，TCP协议单元回应请求应答报文
    - 该报文中SYN和ACK标志设为1，表示连接请求应答
    - 该TCP报文通过IP（DNS）->MAC（ARP）->网关->我的主机
    - 我的主机收到数据帧，通过IP->TCP，TCP协议单元回应请求确认报文
    - 该TCP报文通过IP（DNS）->MAC（ARP）->网关->目的主机
    - 目的主机收到数据帧，通过IP->TCP，连接建立完成


- 发送与收取数据(浏览器与目的主机开始HTTP访问过程)
    - 浏览器向域名发出GET方法报文（`HTTP请求`）；
    - 该GET方法报文通过TCP->IP（DNS）->MAC（ARP）->网关->目的主机；
    - 目的主机收到数据帧，通过IP->TCP->HTTP，HTTP协议单元会回应HTTP协议格式封装好的HTML形式数据（`HTTP响应`）
    [ 从请求信息中获得客户机想访问的主机名。从请求信息中获取客户机想要访问的web应用（web应用程序指提供浏览器访问的程序，简称web应用）。从请求信息中获取客户机要访问的web资源。（web资源，即各种文件，图片，视频，文本等）读取相应的主机下的web应用，web资源。用读取到的web资源数据，创建一个HTTP响应。]
    - 该HTML数据通过TCP->IP（DNS）->MAC（ARP）->网关->我的主机；
    - 我的主机收到数据帧，通过IP->TCP->HTTP->浏览器，浏览器以网页形式显示HTML内容
