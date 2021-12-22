# 服务端文件目录

```
|--------------------config文件夹(mongodb连接配置)
    |--------------------db.js(用于连接数据库)
|--------------------dao文件夹(对数据库增删改查)
	|--------------------dbserver.js(处理数据库)
|--------------------model文件夹
    |--------------------User.js(用于创建数据库模型，即创建多个用户表)
|--------------------routes文件夹(存放路由文件)
    |--------------------index.js
|--------------------server文件夹
```

# 2021/12/16

###### node端服务器搭建

```
初始化项目：npm init
入口文件：server.js
引入express：npm install express
在server.js中引入express，并实例化app，监听5000端口，访问到根目录的时候给一个响应
修改package.json：
	  "scripts": {
        "start": "node server.js",
        "server": "nodemon server.js"
      },
运行项目：npm run start	npm run server
```

# 2021/12/22

###### 可以看看《node与express开发》

###### 配置404页面和出现错误处理(server.js)

```
//配置404页面
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.stauts = 404;
  next(err);
})
//出现错误处理
app.use((req, res, next) => {
  res.status(err.status || 500);//出现错误或状态码为500时
  res.send(err.message);
});
```

###### 前端接口调试

```
1.需要先配置代理服务器，即vue.config.js
	devServer: {//指定多个代理
        proxy: {
          '/api': {//'/api'是请求前缀，要走代理就要加/api
            target: 'http://localhost:5000',//如果前缀是/api，就把请求发送给该url
            pathRewrite: { '^/api': '' },//匹配路径：把/api的路径转换成空字符串，不写的话转发给5000端口找不到正确的路径
            ws: true,//用于支持websocket
            changeOrigin: true//默认为true,用于控制请求头中的host值
          },
        }
      }
2.需要先下载axios
	npm install --save axios
	在mani.js中引入axios并存到vm的原型链中
		import axios from 'axios';
        Vue.prototype.$axios = axios
3.在登录组件的登录按钮进行连接后端的测试：
	this.$axios
        .get("/api/test")	//这里的'/api'会转换成空字符串
        .then((res) => {
        //获取response，里面包含了表格数据
        console.log(res);
        //设置分页数据
        })
        .catch((err) => console.log(err));
```

###### 连接并测试数据库

```
连接数据库(config/db.js)：
	1.下载mongoose插件
        npm install --save mongoose
    2.在config/db.js中引入mongoose
    	const mongoose = require('mongoose');
    3.创建连接并定义一个数据库的名字为"chat"
		const db = mongoose.createConnection('mongodb://localhost:27017/chat');
	4.连接成功或失败都返回一句话
		db.on('error', console.error.bind(console, '数据库连接失败'));
        db.once('open', function () {
          console.info('数据库连接成功');
        })
    5.暴露数据库
    	module.exports = db;
    	
建立数据库模型(model/User.js)：
	1.引入mongoose和数据库
		const mongoose = require('mongoose');
        const db = require('../config/db');
	2.创建用户表
		const UserSchema = new Schema();
	3.暴露用户表
		module.exports = db.model('User', UserSchema);
		
对用户表的增删改查(dao/dbserver.js)：
	1.引入用户表
		const db = require('../model/User');
        const User = db.model('User');
    2.暴露一个查找用户表的方法
    	exports.findUser = (res)=>{
          User.find((err,val)=>{
            if(err){
              console.log('用户数据查找失败'+err);
            }else{
              res.send(val)
            }
          })
        }
    3.在routes/index.js中引入dao/dbserver.js，并对数据库进行测试
    	const dbserver = require('../dao/dbserver');
		app.get('/test', (req, res) => {
          dbserver.findUser(res)
        });
```

###### 数据库的所有表及其关联

![image-20211218193629024](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211218193629024.png)

