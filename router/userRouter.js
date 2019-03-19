const express = require('express');
// 路由中间件
let app = express();

// c层
const userController = require('../conttoller/userContreller.js')
app
    // 注册
    .post('/register',userController.Register)
    // 登录
    .post('/login',userController.doLogin)
    // 验证码
    .get('/captcha',userController.captcha)
    // 退出
    .get('/logout',userController.doLogout)


// 导出路由
module.exports = app;