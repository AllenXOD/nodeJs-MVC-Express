const mongoose = require('mongoose');

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/CQManager')

// 创建Model
let userModel = mongoose.model('users',{
    userName: String,
    passWord: String
});

module.exports = userModel;