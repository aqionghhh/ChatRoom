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
```

```

```

