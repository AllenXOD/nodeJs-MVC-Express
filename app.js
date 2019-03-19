// 导入模块
const express = require('express');
// 创建服务器
let app = express();

// 配置中间件
// 解析post请求参数
const bodyParser = require('body-parser');
// 网页小图标托管
const favicon = require('serve-favicon');
const path = require('path');
// 路由中间件
const heroRouter = require('./router/heroRuter.js');
const userRouter = require('./router/userRouter.js');
// cookie
const cookieSession = require('cookie-session');



app
    // 托管静态资源
    .use('/node_modules', express.static('node_modules'))
    .use('/resource', express.static('resource'))
    .use(bodyParser.urlencoded({ extencoded: false }))
    .use(favicon(path.join(__dirname, 'resource', 'favicon.ico')))
    .use(cookieSession({
        name: 'session',
        keys: ['123456'],// 加密密钥
        maxAge: 24 * 60 * 60 * 1000 // 有效期: 24小时
    }))
    .use((req, res, next) => {
        console.log(req.session);
        next();
    })
    .use(heroRouter)
    .use(userRouter)


// 开启服务器
app.listen(3000, () => {
    console.log("Server start success!");
})