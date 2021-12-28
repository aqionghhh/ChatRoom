// const db = require('../model/Friend');
// const Friend = db.model('Friend');
const bcrypt = require('./bcrypt');
const db = require('../model/User');
const User = db.model('User');
const jwt = require('../dao/jwt');//引入token

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


//用户验证
exports.userMatch = (data, pwd, res) => {//data表示用户名/邮箱
  // User.find(wherestr,out,function)//参数1：要找什么；参数2：找完之后返回什么；参数3：回调函数
  let wherestr = { $or: [{ 'name': data }, { 'email': data }] }//传入进来的或者是名字，或者是邮箱
  let out = { 'name': 1, 'imgurl': 1, 'pwd': 1 }//1代表输出，0代表不输出(id默认输出，所以不需要写)
  User.find(wherestr, out, (err, result) => {
    if (err) {
      res.send({ status: 500 })
    } else {
      if (result == '') {//没有匹配到
        res.send({ status: 400 });
      }
      result.map(function (e) {//遍历匹配到的结果，参数e是每一条数据
        const pwdMatch = bcrypt.verification(pwd, e.pwd);
        if (pwdMatch) {//匹配成功
          let token = jwt.generateToken(e._id);
          let back = {
            id: e_id,
            name: e.name,
            imgurl: e.imgurl,
            token: token,
          }
          res.send({ status: 200, back });
        } else {
          res.send({ status: 300 });
        }
      })
    }
  })
}