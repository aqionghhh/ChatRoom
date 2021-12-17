# 2021/12/16

###### vue服务器搭建

```
创建vue项目：vue create client
```

###### 项目目录文件夹

```
|-----------------commons普通页面文件夹
|-----------------static静态资源文件夹
|-----------------App.vue
|-----------------	main.js vue初始化入口文件
|-----------------components普通组件文件夹
    |-----------------	
|-----------------pages路由组件文件夹
    |-----------------Index路由组件
    |-----------------	
```

###### 首页 Index.vue

```
先配置路由，服务器的根目录下默认显示Index组件
npm install vue-router
配置路由
	在router/index.js中
        import vue 和 vue-router
            import Vue from 'vue';
            import VueRouter from 'vue-router';
        使用vue-router插件
            Vue.use(VueRouter)
        引入Index.vue
            import Index from '../pages/Index/Index';
全局配置
    在main.js中引入路由器
        import router from './router'
        并在new Vue的时候引用
引用
	在App.vue中的模板中插入
		<router-view></router-view>

图标放在static/images文件夹中，图片按照组件来分类存放

对于头像上的小红点，使用v-if判断其是否为真，为真就显示小红点，为假就不显示
```

# 2021/12/17

```
在写完Index组件后，在commons/js/datas.js中模拟列表数据，并暴露该函数
在Index组件中引入
	import datas from '../../commons/js/datas.js';
在data中定义friends为空数组
在mthods中定义getFriends方法
在mounted中调用：this.getFriends();
```

###### 好友列表时间显示规范

```
使用24小时制
当天之内统一显示hh:mm
大于今天且昨天之内，统一显示 昨天hh:mm
大于昨天，统一显示 yy/mm/dd
```

```
在Index组件中引入myfun.js（时间格式化）
	import myfun from "../../commons/js/myfun.js";
在methods中编写changeTime(date)
在模板中使用，可以直接在模板中把需要格式化的时间传入方法里面
	<div class="time">{{ changeTime(friend.time) }}</div>
```

###### Login组件页面搭建

```
用@blur事件获取两个输入框的value，并将其存入到变量user和pwd中
给登录按钮绑定点击事件，if判断用户名和密码是否同时存在，同时存在则在控制台打印'已提交'
```

###### Register组件页面搭建

```
涉及到密码的查看，所以在data中定义type变量，初始值是password，然后在input框中动态绑定type，进行状态切换
	:type="type"
使用v-if对判断的图片进行是否展示
	data() {
        return {
          type: "password",
          isuser: true, //用户名是否可用 img
          isemail: false, //邮箱是否可用 img
          look: false, //是否可以查看密码 img
          invalid: false, //邮箱是否符合规定格式
          employ: false, //是否被占用
        };
      },
添加点击事件looks，点击眼睛按钮切换眼睛的图片并且控制密码的显示和隐藏
当邮箱input框失焦的时候判断邮箱是否符合格式

给注册按钮动态添加样式
	<div :class="[{submit:isok},{submit1:!isok}]">注册</div>
	在data中定义	isok:false  //默认是灰色，即submit1样式
	添加submit和submit1样式
在所有的内容都填写正确后才会变成submit样式
给三个input框添加@input事件，在data中定义三个变量保存值，然后在methods中获取input框的值
要考虑用户输入了用户名或者邮箱但是被占用，需要进行样式的改变
在获取完值之后，在isOk函数中进行样式的改变
在获取密码和用户名和邮箱的时候调用isOk
```

###### 页面跳转

```
写在模板里：
	<router-link to='需要跳转到的页面的路径>
    <router-link :to="{path:'/bb'}"> //name,path都行, 建议用name //不带参数
写在方法里：
	1.类似压栈
    this.$router.push('/home') //不带参数
    需要在模板中添加点击事件
    
    2.直接替换
    this.$router.replace{path：‘/’ } //不带参数
    需要在模板中添加点击事件
```

###### 把三个页面的头部的样式拆分出来 在commons/css/index.css。但是因为我太懒了，就只拆了Index组件



