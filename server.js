const express = require('express');//引入express
const app = express();//实例化app

app.get('/', (req, res) => {//访问到根路径的时候给一个响应
  res.send('hello world!');
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('服务器搭建完成，端口号：' + port)
})