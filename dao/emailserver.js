//链接邮箱的页面

//引入发送邮件插件
const nodemailer = require('nodemailer');
//引入证书文件
const credentials = require('../config/credentials');

//创建传输方式
const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: credentials.qq.user,
    pass: credentials.qq.pass,
  }
});

//暴露方法
//1.注册发送邮件给用户
exports.emailRegister = function (email, res) {
  //发送信息内容
  let options = {
    from: '2774312132@qq.com',//来自我的邮箱(即注册证书中的邮箱)
    to: email,//发给传进来的邮箱
    subject: '感谢您在chat的注册',//收到邮件的标题
    // text:'邮箱中的文本内容',
    html: '<span>欢迎您的加入：</span><a href="http://localhost:8080/>点击进入</a>',//邮箱中的链接
  };

  //发送邮件
  transporter.sendMail(options, function (err, msg) {
    if (err) {
      res.send('邮箱发送失败！');//返回给前端
      console.log(err);
    } else {
      res.send('邮箱发送成功！');//返回给前端
      console.log('邮箱发送成功!')
    }
  })
}