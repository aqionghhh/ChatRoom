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
    4.在前端的Login组件中进行前后端联调测试
```

###### 数据库的所有表及其关联

![image-20211218193629024](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211218193629024.png)

# 2021/12/25

###### 把所有表写入服务器

```
1.在model/User.js中创建用户表
2.在model/Friend.js中创建好友表
	其中要用到用户表中的用户id作为外键
	userID: {//用户id
        type: Schema.Types.ObjectId,
        ref:'User'
      },
3.在model/Message.js中创建一对一消息表
4.在model/Group.js中创建群表
5.在model/Member.js中创建群成员表（每个群对应的每个成员都有一张这个表）
6.在model/Member.js中创建群消息表
```

###### 链接邮箱(插件：nodemailer)

```
1.qq邮箱开启SMTP服务(授权码(链接邮箱的时候要用)：sfnfgqfcebmydgee)
2.在config/credentials.js中写链接qq邮箱配置(证书文件)
3.在dao/emailserver.js中写链接qq邮箱的页面
    1.npm install nodemailer --save
    2.引入证书文件
    3.创建传输方式(官方文档有写)
    4.暴露方法
    	1.注册发送邮件给用户的方法
    5.在routes/index.js中给注册发送邮件给用户的方法配置路由
    	1.引入dao/emailserver.js
    	2.app.post('/mail',(req,res)=>{})
    	3.在Login.vue中进行测试，方式改为post，并向其传递假写参数
    	4.如果这样写状态码会是500，需要用到body-parser(解析req.body)
    		1.npm install body-parser --save
    		2.在server.js中引入body-parser
    			const bodyParser = require('body-parser');
    		3.解析前端数据
    			app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: false }))
```

注意：因为解析顺序是从上到下，所以引入body-parser和使用必须要放在引入的路由下，即顺序是先从body-parser开始，再轮到路由页面

###### 获取前端数据(插件：body-parser)

```
Express中间件body-parser
处理程序之前，在中间件中对传入的请求体进行解析（response body）
在http请求中，POST、PUT、PATCH三种请求方法中包含着请求体，也就是所谓的request，在Nodejs原生的http模块中，请求体是要基于流的方式来接受和解析。
body-parser是一个HTTP请求体解析的中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，
```

###### 发邮件测试
