import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../pages/Index/Index';

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
    }
  ]
})