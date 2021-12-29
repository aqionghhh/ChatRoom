//用户登录
const dbserver = require('../dao/dbserver');
//引入token
const jwt = require('../dao/jwt.js')

//登录
exports.logIn = function (req, res) {
  let { data, pwd } = req.body;

  dbserver.userMatch(data, pwd, res);
}
//token匹配
exports.test = function (req, res) {
  let { token } = req.body;
  let result = jwt.verifyToken(token)
  res.send(result)
}