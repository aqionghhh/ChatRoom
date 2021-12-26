const dbserver = require('../dao/dbserver');

//用户注册
exports.register = function (req, res) {
  let { name, email, pwd } = req.body;
  res.send({ name, email, pwd })

  dbserver.buildUser(name, email, pwd, res);
}

//判断用户/邮箱是否占用
exports.judgeValue = function (req, res) {
  let { data, type } = req.body;
  res.send({ data, type })

  dbserver.countUserValue(data, type, res);
} 