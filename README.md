# 服务端文件目录

```
|--------------------config文件夹(mongodb连接配置)
    |--------------------db.js(用于连接数据库)
    |--------------------credentials.js(用于连接邮箱)
|--------------------dao文件夹(对数据库增删改查)
	|--------------------dbserver.js(处理数据库，对数据库的所有操作都在这里面)
	|--------------------emailserver.js(处理邮箱)
	|--------------------bcrypt.js(生成加密文件，即对传入的数据进行加密和解密)
|--------------------model文件夹
    |--------------------User.js(用于创建数据库模型，即创建用户表)
    |--------------------Friend.js(用于创建数据库模型，即创建好友表)
    |--------------------Message.js(用于创建数据库模型，即创建一对一消息表)
    |--------------------Group.js(用于创建数据库模型，即创建多个群表)
    |--------------------Groupmessage.js(用于创建数据库模型，即创建群消息表)
    |--------------------Groupmember.js(用于创建数据库模型，即创建群成员表)
|--------------------routes文件夹(存放路由文件)
    |--------------------index.js
|--------------------server文件夹(处理函数的文件夹)
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

![image-20211225155517995](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225155517995.png)

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
        5.在mail的路由下使用给注册发送邮件给用户的方法
        	emailserver.emailRegister(mail,res)
        	
最后可以在Login.vue中让传输过去的email=this.user
```

注意：因为解析顺序是从上到下，所以引入body-parser和使用必须要放在引入的路由下，即顺序是先从body-parser开始，再轮到路由页面

###### 获取前端数据(插件：body-parser)

```
Express中间件body-parser
处理程序之前，在中间件中对传入的请求体进行解析（response body）
在http请求中，POST、PUT、PATCH三种请求方法中包含着请求体，也就是所谓的request，在Nodejs原生的http模块中，请求体是要基于流的方式来接受和解析。
body-parser是一个HTTP请求体解析的中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，
```

###### 涉及到的数据库操作

![image-20211225153045443](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225153045443.png)

![image-20211225153158784](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225160837693.png)

![image-20211225153313440](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225153313440.png)

![image-20211225153402900](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225153402900.png)

![image-20211225153507140](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225153507140.png)

![image-20211225153812160](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225153812160.png)

![image-20211225155408692](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225155408692.png)

![image-20211225155733508](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225155733508.png)

![image-20211225155916812](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225155916812.png)

![image-20211225155951783](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225155951783.png)

###### 密码加密bcryptjs

```
1.npm install bcryptjs --save
2.在dao文件夹中创建bcrypt.js文件并引入bcryptjs
3.生成hash密码的方法
4.解密的方法
```

###### 流程

![image-20211225161921598](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211225161921598.png)

###### 注册页面(有两个方法，用户注册，判断用户是否已经注册)

```
在dao/dbserver.js中写注册方法
1.引入加密文件bcrypt.js
2.'新建用户'方法
	1.对传进来的密码进行加密
	2.把要插入到表中的数据做成一个json对象格式
	3.new一条数据
		let user = new User(data);
	4.把数据插入到User表中，并作出响应
		user.save((err,res)=>{})

在dao/dbserver.js中写匹配用户表元素个数方法
1.mongoose提供了countDocuments的方法来匹配数据库中元素的个数，根据匹配到用户表中对应用户的个数来判断用户是否已经注册
```

在dao/dbserver.js中写完注册页面的方法后，在server/register.js中引入dao/dbserver.js并为注册方法编写注册方法，然后在routes/index.js中配置路由。（因为dao/server.js单纯只对数据库进行增删改查 的操作，不涉及任何的逻辑处理，所以需要有单独的函数调用操作数据库的方法，然后再为该方法配置路由）

###### 关于解构赋值

```
同名的数据up可以用结构赋值，
let { name, mail, pwd } = req.body;
```

###### 后端接口总结

```
梳理一下：在前端组件中获取到后端配置的路由，然后执行路由里面的方法，例如：注册页面的/register/add路由，该路由调用server/register.js中的页面注册服务；而在server/register.js中的用户注册的方法中，又调用了dao/dbserver.js中的buildUser方法，在buildUser方法中获取了传入的数据并将其插入到了用户表中。（即routes/index.js中的/register/add路由-----调用----->server/register.js的register方法-----调用----->dao/dbserver.js中的bindUser方法）

因为dao/server.js单纯只对数据库进行增删改查 的操作，不涉及任何的逻辑处理，所以需要有单独的函数调用操作数据库的方法，然后再为该方法配置路由
```

###### 前后端链接

```
        this.$axios({
          data: {
            email: "1111@qq.com",
            name: "sxq",
            pwd: "123",
          },
          url: "api/register/add",
          method: "post",
        })
          .then((res) => {
            //获取response，里面包含了表格数据
            console.log(res);
            //设置分页数据
          })
          .catch((err) => console.log(err));

需要传输数据的就在$axios中写data对象，把data传到后台，后台接收的是req，传输的数据就是req.body
```

# 2021/12/28

###### 登录页面后端(前后端通讯验证：token)

```
1. npm install jsonwebtoken --save
2.新建文件	dao/jwt.js
3.引入token
4.使用token
5.解析token

在dao/dbserver.js中写用户验证方法
	1.// User.find(wherestr,out,function)//参数1：要找什么；参数2：找完之后返回什么；参数3：回调函数
	2.在回调函数中进行判断：出错、没有匹配到、匹配到之后遍历找到的结果(比对密码)
	3.对找出来的密码进行解码(bcrypt)，如果数据库中解密成功的密码与传进来的密码比对成功则返回数据。
	4.在返回的数据中把token返回给前端
		1.在dbserver.js中引入token (const jwt = require('../dao/jwt');//引入token)
		2.let token = jwt.generateToken(e._id);
```

###### 基于token的验证原理

```
基于token的身份验证是无状态的，我们不用将信息存储在服务器或者session中
token通过请求头传输，而不是把认证信息存储在服务器或者sessiob中，就意味着可以从任意一种可以发送HTTP请求的终端向服务器发送请求
```

###### 基于token的身份验证的过程

```
1.登录时，客户端发送用户名密码
2.服务端验证用户名密码是否正确，校验通过就会生成一个有时效的token串，发送给哭护短
3.客户端储存token，一般都会储存在localStorage或者cookie里面
4.客户端每次请求时都带有token，可以将其放在请求头里，每次请求都携带token
5.服务点验证token，所有需要校验身份的接口都会被校验token，若token解析后的数据包含用户身份信息，即身份验证通过，返回数据
```

