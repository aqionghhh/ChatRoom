import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../pages/Index/Index';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Search from '../pages/Search/Search';
import Userhome from '../pages/Userhome/Userhome';
import Userdetail from '../pages/Userdetail/Userdetail';
import Cropper from '../pages/Cropper/Cropper';
import FriendRequest from '../pages/FriendRequest/FriendRequest';

//声明使用插件
Vue.use(VueRouter)

const router = new VueRouter({
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
    },
    {
      path: '/friendrequest',
      component: FriendRequest,
    }
  ]
});

//路由守卫
router.beforeEach((to, from, next) => {
  //判断localstorage中是否有token，有token就是已经登录
  //存在就返回true，不存在就返回false
  const isLogin = localStorage.token ? true : false;
  if (to.path == '/login' || to.path == '/register') {
    //如果是访问登录或者注册页面，可以直接访问
    next();
  } else {
    //为true就向下执行，否则就进入login页面
    isLogin ? next() : next("/login");
  }
})

export default router;
