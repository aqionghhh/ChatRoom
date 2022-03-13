const mongoose = require('mongoose');
const db = require('../config/db');

const Schema = mongoose.Schema;

//创建用户表
const UserSchema = new Schema({
  name: {//用户名
    type: String
  },
  pwd: {//密码
    type: String
  },
  email: {//邮箱
    type: String
  },
  sex: {//性别
    type: String,
    default: 'asexual'//默认值是中性
  },
  birthday: {//生日
    type: Date
  },
  phone: {//电话
    type: String
  },
  explain: {//介绍(签名)
    type: String
  },
  imgurl: {//头像链接
    type: String,
    default: 'user.png'//给一张默认头像
  },
  time: {//注册时间
    type: Date,
    // default: new Date()
  },
});

module.exports = db.model('User', UserSchema);//暴露用户表