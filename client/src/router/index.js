import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../pages/Index/Index';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  //所有路由
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      component: Index,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    }
  ]
})