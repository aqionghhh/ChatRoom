const dbserver = require('../dao/dbserver');
const emailserver = require('../dao/emailserver');

module.exports = function (app) {
  app.post('/test', (req, res) => {
    res.send('111');
    // dbserver.findUser(res)
  });

  //邮箱测试
  app.post('/mail', (req, res) => {
    let mail = req.body.email//取到请求的email(即前端传来的email)
    res.send(mail);
    // console.log(mail);
  })

} 