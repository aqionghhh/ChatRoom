const express = require('express');//引入express
const app = express();//实例化app
const bodyParser = require('body-parser');//引入body-parser用来解析req.body
const path = require('path');
const { verifyToken } = require('./dao/jwt');//引入token

//解析前端数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' })); // 最大为5mb
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// 将静态文件目录设置为：项目根目录+/public
// 获取静态路径
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(function (req, res, next) {
  const URL = req.url
  console.log('URL', URL);
  if (URL === '/login/match') {
    // 登录接口无需校验
    return next()
  }
  // 获取token值
  const authorization = req.headers['authorization'];
  console.log(authorization);
  if (authorization === "undefined") {
    return res.status(401).send('Unauthorized')
  } else {
    // 验证token
    verifyToken(authorization).then((data) => {
      return next();
    }).catch((error) => {
      return res.status(401).send('Unauthorized');
    })
  }
})

require('./routes/index')(app);//引入index.js//后面的括号是要传过去的东西
require('./routes/user')(app);//引入index.js//后面的括号是要传过去的东西
require('./routes/friend')(app);//引入index.js//后面的括号是要传过去的东西
require('./routes/chat')(app);//引入index.js//后面的括号是要传过去的东西
require('./routes/group')(app);//引入index.js//后面的括号是要传过去的东西

//socket.io
const io = require('socket.io');
const server = app.listen(8081);  // socket服务的端口
require('./server/socket')(io.listen(server))


//配置404页面
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.stauts = 404;
  next(err);
});
//出现错误处理
app.use((req, res, next) => {
  res.status(err.status || 500);//出现错误或状态码为500时
  res.send(err.message);
});

const port = 5000;
app.listen(port, () => {
  console.log('服务器搭建完成，端口号：' + port)
})