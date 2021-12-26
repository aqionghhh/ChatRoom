const dbserver = require('../dao/dbserver');
const emailserver = require('../dao/emailserver');

//注册页面服务
const register = require('../server/register')

module.exports = function (app) {
  app.post('/test', (req, res) => {
    res.send('111');
    // dbserver.findUser(res)
  });

  //邮箱测试
  app.post('/mail', (req, res) => {
    let mail = req.body.email;//取到请求的email(即前端传来的email)
    emailserver.emailRegister(mail, res)
    res.send(mail);
    // console.log(mail);
  })


  //注册页面
  //注册
  app.post('/register/add', (req, res) => {
    register.register(req, res);
  })
  //匹配用户表元素个数
  app.post('/register/judge', (req, res) => {
    register.judgeValue(req, res);
  })

} 