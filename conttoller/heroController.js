// 导入M层
const heroModel = require('../model/heroModel.js');

module.exports = {
    showHeroList: (req, res) => {
        // 显示首页 使用服务器重定向
        res.writeHead(302, {
            'Location': '/resource/view/index.html'
        });
        res.end();
    },
    getHeroList: (req, res) => {
        // 获取首页英雄列表
        // 倒叙
        heroModel.find().sort({ '_id': -1 }).exec((err, data) => {
            if (err) {
                throw err;
            } else {
                // 计算页数
                let pageCount = Math.ceil(data.length / 10);
                res.json({
                    // 返回10条数据
                    heros: data.slice(0, 10),
                    pageCount: pageCount,
                    user: req.session.user
                });
            }
        });
    },
    getHeroPage: (req, res) => {
        // 英雄分页查询
        // console.log(req,query); // 获取请求参数
        let page = req.query.page;
        heroModel.find().sort({ '_id': -1 }).exec((err, data) => {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                })
            } else {
                res.send({
                    heros: data.slice((page - 1) * 10, page * 10)
                })
            }
        })
    },
    getHeroSearch: (req, res) => {
        // 英雄搜索功能
        let searchTxt = req.query.searchTxt;
        // mongoose支持正则<名字包含searchTxt, 不区分大小写>
        let rg = new RegExp(searchTxt, 'i');
        heroModel.find({ heroName: rg }, (err, data) => {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                })
            } else {
                res.send({
                    heros: data
                })
            }
        })
    },
    doHeroAdd: (req, res) => {
        // 增加英雄
        // console.log(req.body);
        // console.log(req.files);
        // 保存文件
        let icon = req.files.icon;
        icon.mv('./resource/images/' + req.body.name + '.png', (err) => {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                })
            } else {
                // 写入数据库
                heroModel.create({
                    heroName: req.body.name,
                    heroSkill: req.body.skill,
                    heroIcon: '/resource/images/' + req.body.name + '.png'
                }, (err) => {
                    if (err) {
                        res.send({
                            err_code: 500,
                            err_msg: err
                        })
                    } else {
                        res.send({
                            err_code: 0,
                            err_msg: 'success'
                        })
                    }
                })
            }
        })
    },
    doHeroUpdate: (req, res) => {
        // 修改英雄

        // 获取数据
        let body = req.body;
        let icon = req.files.icon;

        // 修改文件
        if (icon) {
            icon.mv('./resource/images/' + req.body.name + '.png', (err) => {
                if (err) {
                    res.send({
                        err_code: 500,
                        err_msg: err
                    })
                } else {
                    // 修改数据库
                    heroModel.findByIdAndUpdate(req.body._id, {
                        heroName: body.name,
                        heroSkill: body.skill,
                        heroIcon: '/resource/images/' + req.body.name + '.png'
                    }, (err) => {
                        if (err) {
                            res.send({
                                err_code: 500,
                                err_msg: err
                            })
                        } else {
                            res.send({
                                err_code: 0,
                                err_msg: 'success'
                            })
                        }
                    })
                }
            })
        } else {
            // 修改数据库
            heroModel.findByIdAndUpdate(req.body._id, {
                heroName: body.name,
                heroSkill: body.skill,
            }, (err) => {
                if (err) {
                    res.send({
                        err_code: 500,
                        err_msg: err
                    })
                } else {
                    res.send({
                        err_code: 0,
                        err_msg: 'success'
                    })
                }
            })

        }

    },
    getHeroInfo: (req, res) => {
        // 查询英雄

    },
    doHeroDelete: (req, res) => {
        // 删除英雄
        let heroId = req.query._id;
        heroModel.findByIdAndDelete(heroId, (err) => {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                })
            } else {
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            }
        })
    }
}