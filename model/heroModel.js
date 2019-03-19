const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/CQManager');
// 创建model
let heroModel = mongoose.model('heros',{
    heroName: String,
    heroIcon: String,
    heroSkill: String
});

module.exports = heroModel;