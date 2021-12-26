// const db = require('../model/Friend');
// const Friend = db.model('Friend');
const bcrypt = require('./bcrypt');
const db = require('../model/User');
const User = db.model('User');

//新建用户
exports.buildUser = function (name, mail, pwd, res) {
  //密码加密
  let password = bcrypt.encryption(pwd);//把传入的pwd进行加密

  let data = {//要插入到User表中的数据
    name: name,
    email: mail,
    pwd: password,
    time: new Date(),
  }
  let user = new User(data);

  //把数据插入到User表中
  user.save(function (err, res) {
    if (err) {
      res.send({ status: 500 });//错误的话状态码返回500
    } else {
      res.send({ status: 200 });
    }
  })
}

//匹配用户表元素个数
exports.countUserValue = function (data, type, res) {//根据匹配到用户表中对应用户的个数来判断用户是否已经注册
  let wherestr = {};

  wherestr[type] = data;  //相当于wherestr = {'type':data};
  //mongoose中提供的匹配元素个数的方法

  User.countDocuments(wherestr, function (err, result) {
    if (err) {
      res.send({ status: 500 });
    } else {
      res.send({ status: 200, result });
    }
  })
}




//测试的代码
// exports.findUser = (res) => {
//   User.find((err, val) => {
//     if (err) {
//       console.log('用户数据查找失败' + err);
//     } else {
//       res.send(val)
//       // console.log('11')
//     }
//   })
// }