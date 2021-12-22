const express = require('express');//引入express
const app = express();//

app.get('/', (req, res) => {//访问到根路径的时候给一个响应
  res.send('hello world!');
})

// //设置允许跨域
// app.all('/test', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
require('./routes/index')(app);//引入index.js//后面的括号是要传过去的东西

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