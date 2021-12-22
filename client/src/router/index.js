import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../pages/Index/Index';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Search from '../pages/Search/Search';
import Userhome from '../pages/Userhome/Userhome';
import Userdetail from '../pages/Userdetail/Userdetail';
import Cropper from '../pages/Cropper/Cropper';

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
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/userhome',
      component: Userhome,
    },
    {
      path: '/userdetail',
      component: Userdetail,
    },
    {
      path: '/cropper',
      component: Cropper,
    }
  ]
})