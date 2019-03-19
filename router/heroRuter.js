// 导入模块
const express = require('express');
// 接收文件数据的中间件
const fileUpload = require('express-fileupload');

// 创建路由中间件
let app = express();

// 导入C层
const heroController = require('../conttoller/heroController.js');
// 路由,负责分发请求给C层
app
    // 接收文件数据
    .use(fileUpload())
    // 显示首页
    .get('/', heroController.showHeroList)
    // 获取英雄列表
    .get('/heroList', heroController.getHeroList)
    // 分页查询
    .get('/heroPage', heroController.getHeroPage)
    // 搜索功能
    .get('/heroSearch', heroController.getHeroSearch)
    // 增加英雄
    .post('/heroAdd', heroController.doHeroAdd)
    // 修改英雄
    .post('/heroUpdate', heroController.doHeroUpdate)
    // 查询英雄
    .get('/heroInfo', heroController.getHeroInfo)
    // 删除英雄
    .get('/heroDelete', heroController.doHeroDelete)

// 导出路由中间件
module.exports = app;