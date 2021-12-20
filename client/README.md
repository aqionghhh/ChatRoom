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
    
    3.返回上一级
    this.$router.back();
```

###### 把三个页面的头部的样式拆分出来 在commons/css/index.css。但是因为我太懒了，就只拆了Index组件

# 2021/12/18

###### Search组件页面搭建

```
匹配到的字高亮
搜索到的用户有两种显示：
	加了好友的可以直接"发消息"
	没有加好友的显示"加好友"
		并且两个按钮的样式不一样
			给不同样式的按钮添加两个不一样类名来写它们单独的样式
模拟数据渲染模板
	在commons/js/datas.js中给friendarr数组新增email字段
	在commons/js/datas.js中新建一个isFriend（好友关系）数组
给input框增加@input事件，为search方法，获取输入值，在searchUser方法中获取datas.js中的friendarr数组，然后进行for循环，与input框中获取到的值进行对比
	要用到js的字符串匹配，js的字符串匹配有很多种方法
		search():用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。如果没有找到任何匹配的子串，则返回-1
		即匹配邮箱又匹配名字，只要有个符合就进入if语句
		if (arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1) {
          this.userarr.push(arr[i]);
        }//在data中定义一个userarr数组变量装入符合的数组
        因为在不停的输入内容，不停的进行匹配，所以需要在输入的同时，只要调用了serach方法，就要在search方法中清空userarr数组变量，并且调用searchUser方法进行输入字符串匹配
    输入的字符串在渲染出来的用户列表中有高亮效果
    	判断匹配的是名字还是邮箱，把匹配到的字符串用replace进行替换成高亮字符
    	let exp = eval('/'+e+'g');//封装在正则里面
    	arr[i].name=arr[i].name.replace(exp,'<span>style="color:#4aaaff">'+e+'</span>')
        arr[i].email=arr[i].email.replace(exp,'<span style="color:#4aaaff">'+e+'</span>')
	要渲染上述的带html标签的需要在模板里写成这样<div class="name" v-html="user.name"></div>
	而不是<div class="name">{{ user.name }}</div>


	搜索出用户后需要判断是"加好友"还是"发消息"：在输入框输入后，把值返回给后端，后端根据好友表判断该用户跟我是否是好友关系（在输入框输入的时候回访问两次数据库，一次访问用户表，一次访问好友表）。因为是一一对应的，所以也需要放在for循环里
		isFriend方法中先设置变量tip=0，默认搜索出来的每个人都不是好友，然后再从commons/datas.js中获取好友列表，对好友表进行for循环，判断数组中的好友的id是否等于之前搜索胡来的用户id，如果是则tip=1，是好友关系。给传入进来的用户增加tip属性。并在searchUser方法中调用isFriend方法，把searchUser当前的循环项传给isFriend方法
		在模板中使用v-if语句，如果tip=1则为发消息；tip=0为加好友
	
	用户一开始不显示，只有搜索的用户数组里有值时才开始显示<div class="title" v-if="userarr.length > 0">用户</div>

```

###### 各种表的字段

![image-20211218193629024](C:\Users\26671\AppData\Roaming\Typora\typora-user-images\image-20211218193629024.png)

# 2021/12/20

###### 用户主页（详情页）组件Userhome.vue

```
只要点击头像就会跳转到该页面，所以有三种状态
	1.自己
	2.好友
	3.陌生人
根据性别动态设置背景颜色，所以需要动态绑定style	
	<div class="sex" :style="{ background: sexBg }">
	然后在data中定义sexBg	      sexBg: "rgb(255,93,91)",
	
发送好友请求按钮，在该页面下有"加好友"或"发消息"按钮，点击加好友按钮出现一个发送好友请求的弹窗。
因为屏幕分辨率不同，所以弹窗的高度也不同，所以需要动态获取屏幕的高度（在页面渲染好之后获取）
  created() {
    window.addEventListener(".bg", this.getHeight); //注册监听器
    this.getHeight(); //页面创建时调用
  },
  //动态获取元素的高度
  getHeight() {
  this.height = window.innerHeight; // 屏幕高-屏幕顶部到头像底部的高
  console.log(this.height);//height在data中进行定义
  },
然后在模板中动态添加高度
      <div class="add-misg" :style="{ height: height + 'px', bottom: '-' + height + 'px' }">
      
发送好友请求做成从底部滑出的效果		npm install animate.css --save
	1.//引入animation动画//在main.js中引入
      import animated from 'animate.css';
      Vue.use(animated)
    2.<transition
        name="fade"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOut"
      >
      <div v-show="animation" ...>...</div>
      </transition>
      3.需要添加点击事件，并且在data中定义一个变量animation，点击切换animation的值，当其为true时，动画进入，为false时，动画淡出
```



