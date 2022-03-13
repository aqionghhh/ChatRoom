const dbserver = require('../dao/dbserver');
const db = require('../model/User');
const User = db.model('User');
//用户注册
exports.register = function (req, res) {
  console.log(req.body)
  let { name, email, pwd } = req.body;
  res.send({ name, email, pwd })

  dbserver.buildUser(name, email, pwd, res);
}

//判断邮箱是否占用
exports.judgeValue = function (req, res) {
  let { email } = req.body;

  dbserver.countUserValue(email, res);
} 