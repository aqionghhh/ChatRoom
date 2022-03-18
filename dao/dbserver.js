// const db = require('../model/Friend');
// const Friend = db.model('Friend');
const bcrypt = require('./bcrypt');
const db = require('../model/User');
const User = db.model('User');
const jwt = require('./jwt');//引入token

//新建用户
exports.buildUser = function (name, mail, pwd, res) {
  //密码加密
  let password = bcrypt.encryption(pwd);//把传入的pwd进行加密

  const user = new User({//要插入到User表中的数据
    name: name,
    email: mail,
    pwd: password,
    time: new Date(),
  })

  //把数据插入到User表中
  user.save()
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

//匹配用户表元素个数
exports.countUserValue = function (email, res) {//根据匹配到用户表中对应用户的个数来判断用户是否已经注册
  User.find({ email }, (err, data) => {
    if (err) {
      res.send({ status: 400 });
    } else {
      console.log(data[0]);
      if (data[0]) {  // 找到了：代表用户邮箱已经注册，就返回400
        res.send({ status: 400 });
      } else {
        res.send({ status: 501 });  // 没找到：返回501
      }
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
            id: e._id,
            name: e.name,
            imgurl: e.imgurl,
            token: token,
            sex: e.sex,
            sign: e.sign,
            birthday: e.birthday
          }
          res.send({ status: 200, back });
        } else {
          res.send({ status: 300 });
        }
      })
    }
  })
}