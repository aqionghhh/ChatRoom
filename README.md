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

