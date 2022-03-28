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

```
把三个页面的头部的样式拆分出来 在commons/css/index.css。但是因为我太懒了，就只拆了Index组件
```

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

###### 用户主页组件Userhome.vue

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
        leave-active-class="animated fadeOutDown"
      >
      <div v-show="animation" ...>...</div>
      </transition>
      3.需要添加点击事件，并且在data中定义一个变量animation，点击切换animation的值，当其为true时，动画进入，为false时，动画淡出
```

# 2021/12/21

###### 进行页面的跳转

```
个人头像(Index.vue)和搜索出来的用户头像(Search.vue)可以跳转到用户主页(Userhome.vue)
	1.点击个人头像和搜索出来的用户头像跳转到详情页
		需要携带用户个人id到详情页
		带参数的跳转可以使用属性query和params
		<router-link :to="{ path: '/userhome', query: { id: 1 } }">...</router-link>
```

###### query和params区别

```
1.query类似 get, 跳转之后页面 url后面会拼接参数,类似?id=1, 非重要性的可以这样传,
2.密码之类还是用params刷新页面id还在
3.params类似 post, 跳转之后页面 url后面不会拼接参数 , 但是刷新页面id 会消失。
4.当query传递的是一个对象时,需要这样传，否则刷新页面。会发现对象完全变了。成了一个"[object Object]"
```

###### 用户详情页组件Userdetail.vue

```
如何进入用户详情页
	1.点击自己的头像，点击更多，可以修改头像、签名、昵称电话、邮箱等信息，和一个"退出应用"的按钮
	2.如果是自己的好友，可以修改其昵称，和一个"删除好友"的按钮
	3.如果是陌生人，只能进行查看
	
表单中用到了选择器，使用vant组件(用到性别选择器、日期选择)
	1.npm i vant@2
	2.安装插件：npm i babel-plugin-import -D
	3.配置插件：在.babelrc 或 babel.config.js 中添加配置：
		{
          "plugins": [
            [
              "import",
              {
                "libraryName": "vant",
                "libraryDirectory": "es",
                "style": true
              }
            ]
          ]
        }
    4.引入组件（全局注册）（需要Picker和Popup一起使用）
    import { Picker, Popup, DatetimePicker } from 'vant';
    Vue.use(Picker);
    Vue.use(Popup);
    Vue.use(DatetimePicker);
    
头像部分用到了图片裁剪，npm install vue-cropper
	1.//引入vue-cropper
      import VueCropper from 'vue-cropper';
      Vue.use(VueCropper);
    2.https://blog.csdn.net/Jackson991/article/details/107344345?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164008476116780261971860%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=164008476116780261971860&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-5-107344345.pc_search_insert_es_download_v2&utm_term=vue-cropper%E7%A7%BB%E5%8A%A8%E7%AB%AF&spm=1018.2226.3001.4187
    
对于可以修改的地方，点击后会从底部弹出一个弹窗进行修改
	在修改邮箱和密码时需要先输入一遍原始密码才能进行修改
```

# 2021/12/22

###### 用户详情页组件Userdetail.vue

```
底部的修改弹窗需要用到animate.css
	<transition
        name="fade"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
    >
    	<div v-show="animation" ...>...</div>
    </transition>
    需要添加点击事件animationChange，并且在data中定义一个变量animation，点击切换animation的值，当其为true时，动画进入，为false时，动画淡出

弹框点击的确定按钮为单独的点击事件，触发改点击事件后调用animationChange()，并对数据做进一步处理
定义一个dataarr变量对象，在里面存放需要在页面上显示的个人信息，然后根据点击的内容不同，把要修改的个人信息渲染到修改弹窗中
	其中需要进行转换时间，在commons/js/myfun.js中新增一个日期处理函数detailTime()
	在dataarr中new Date()，并赋值给time，最后渲染在模板上
        <div class="cont">{{ timeChange(dataarr.time) }}</div>
	点击内容时，会进行弹窗，并把要修改的内容渲染到弹窗的input框中
		在data中定义一个空字符串变量modifyTitle用来存放弹窗的标题 data: "修改的内容", //弹窗的内容  		 ispwd: true, //是否需要psw显示在修改弹窗上		
		修改弹窗的方法需要接收三个参数，一个是修改的标题，一个是修改的内容，一个是是否展示animationChange(type,data,ispwd){}
		在弹窗的输入密码模板中加上v-show=ispwd，当为true时才显示该input框
		在点击事件中传参@click="animationChange(type,data,true or false)"
			ey:点击签名栏
			@click="animationChange('签名',dataarr.sign ,false)"
```







### 我觉得的难点：

1. 页面刷新就丢失用户数据：
   1. 可以把用户的id存在localStorage中，在页面created的时候就向后端发送请求获取与用户信息
2. 把用户的token存在localStorage中，并且设置axios响应拦截器和请求拦截器，判断当前的token是否存在，如果存在就设置统一的请求头header；响应拦截时判断token是否失效，token失效的话就清除localStorage中的token并跳转到登录页面。
3. 进行全局前置路由守卫，如果是跳转到登录或注册页面就正常进行；如果不是就判断localStorage中是否存有token，如果有就next()，正常访问页面；如果没有，就跳转到登录页面。



聊天室

```
群聊和单人聊天公用一个路由组件ChatRoom

使用插件
	npm install @better-scroll/mouse-wheel --save
	npm install @better-scroll/pull-down --save
在聊天内容还没有渲染到页面上的时候已经new BScroll了，所以不会有滚动的特效；需要在页面全部渲染完成之后才能new BScroll，可以再created中请求数据，然后在mounted函数中进行判断，如果msgs有数据了再创建BScroll，如果没有数据，就直接return，再使用$nextTick和watch组合 监视msgs数组，当数组里的内容发生改变之后再初始化BScorll

	vue-photo-preview插件：图片的预览
	vue-photo-preview和better-scroll插件一起用会发生冲突：better-scroll默认会阻止浏览器的原生click事件。只需要添加几个配置项
	https://blog.csdn.net/qq_41150189/article/details/94672119
	
	使用better-scroll 封装的vue组件 有时不能滚动到底部，需要用到@load事件，事件会在页面或图像加载完成后立即发生
	
让一段时间内的聊天内容只显示一个时间：
	把这个方法写在myfun.js里面
```

```
// 如果是做的聊天框，会出现在输入框输入内容时，直接下拉到最底部
// 解决方法：用watch去监听聊天记录是否发生变化，如果有变化才进行滑动

https://blog.csdn.net/weixin_43566573/article/details/103206677?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164744514116782248558796%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=164744514116782248558796&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-3-103206677.142^v2^pc_search_result_control_group,143^v4^control&utm_term=better-scroll%E4%B8%8D%E8%83%BD%E6%BB%91%E5%88%B0%E5%BA%95%E9%83%A8&spm=1018.2226.3001.4187
```

```
submit组件
组件之间通信：$emit
在文本框中@keydown.enter.prevent="cendMessage"绑定事件，把内容传递到ChatRoom组件；通过this.$refs.xxx来获取其中的innerHTML内容
下面的框框弹起来之后把背景内容往上调
```

把emoji表情放在一个数组里，然后在弹窗里渲染

录音：touch事件

一个录音的先后顺序问题：getRecordingData事件是在stop事件之后自动调用的，如果在stop事件中把blob数据传到父组件里，就会造成数组为空的情况，所以把blob数据放到getRecordingData事件中进行传递。

在search组件中，获取到好友列表之后，需要给数组添加响应式的tip，即使用Vue.$set

在发送好友请求那里可以做一个防抖节流（现在还没做）

数据的显示：最开始先请求五十条数据，并存入到array数组里面，然后从array数组中取出十条存入到arr数组中，每下拉刷新时concat十条数据到arr数组中，当arr数组的长度和array的长度一样的时候，再从数据库中继续请求五十条数据到array里。然后下拉刷新建议也做个防抖节流，防止多次请求数据。

在把图片传到前端的时候需要在后端进行静态路径的匹配，即express.static()和app.use()。**在前端拼接图片地址的时候不要忘记加上/api**！！！！！

注意：在进行录音的时候，只有在localhost、https、file的情况下才能获取到navigator.mediaDevices进行录音，所以需要自建证书配置https服务器，或者不做这个

怎么合并发送请求？？

组件的封装

```
可以说封装的顶部导航栏组件？？
后期可以把发送文本文件、图片文件和音频文件一起封装在一个函数中
把时间间隔的判断封装成一个单独的函数
```

```
当进入index页面之后就注册一个socket
```

难点：聊天数据的获取：对面发送消息之后，数据库的聊天记录会发生改变，如果再获取一定的条数的话会获取到已经渲染出来的数据。

​	所以选按照日期获取
