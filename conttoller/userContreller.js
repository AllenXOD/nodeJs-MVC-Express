// 导入M层
const userModel = require('../model/userModel.js');
// 验证码
const svgCaptcha = require('svg-captcha');

// 存储验证码
let code = '';

module.exports = {
    Register: function (req, res) {
        // console.log(req.body);
        // 验证码对比 <全部转为小写>
        if (req.body.code.toLowerCase() != code.toLowerCase()) {
            res.send({
                err_code: 2,
                err_msg: '验证码错误'
            })
        } else {
            // 用户名对比
            userModel.find({
                userName: req.body.userName
            }, (err, data) => {
                // 服务器内部错误
                if (err) {
                    res.send({
                        err_code: 500,
                        err_msg: err
                    });
                } else if (data.length != 0) {
                    // 查出数据, 代表注册过
                    res.send({
                        err_code: 1,
                        err_msg: '用户已存在'
                    })
                } else {
                    // 未注册<写入数据库>
                    userModel.create({
                        userName: req.body.userName,
                        passWord: req.body.passWord
                    }, (err, data) => {
                        if (err) {
                            res.send({
                                err_code: 500,
                                err_msg: err
                            });
                        } else {
                            res.send({
                                err_code: 0,
                                err_msg: '注册成功'
                            })
                        }
                    })
                }
            })
        }
    },
    doLogin: function (req, res) {
        let body = req.body;
        // 0: 登录成功 1: 用户名不存在 2: 密码错误 500: 服务器错误
        // 用户名对比
        userModel.find({ userName: body.userName }, (err, data) => {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                })
            } else if (data.length == 0) {
                // 没有这个用户
                res.send({
                    err_code: 1,
                    err_msg: '用户名或密码错误'
                })
            } else {
                // 对比密码
                // console.log(data[0]); // 取出对象
                if (body.passWord == data[0].passWord) {
                    // 登录成功 写入cookie
                    req.session.user = body;
                    res.send({
                        err_code: 0,
                        err_msg: 'success'
                    })
                } else {
                    res.send({
                        err_code: 2,
                        err_msg: '用户名或密码错误'
                    })
                }
            }
        })
    },
    captcha: function (req, res) {
        // 创建验证码对象: 得到图片和文本
        let captcha = svgCaptcha.create();
        // console.log(captcha.data);
        // console.log(captcha.text);
        code = captcha.text;
        // 返回图片
        res.type('svg');
        res.status(200).send(captcha.data);
    },
    doLogout: function (req, res) {
        req.session.user = null;
        res.writeHead(302,{
            'Location':'/'
        });
        res.end();
    }
}