//请求拦截和响应拦截文件
import axios from 'axios'
import router from '../router/index';

axios.interceptors.request.use(config => {
  //判断token是否存在
  console.log('11111111111111111111111');
  if (localStorage.token) {
    //token存在的话设置统一的请求头header
    config.headers.Authorization = localStorage.token
  }
  return config;
}, error => {
  //错误提醒
  return Promise.reject(error)
});

//响应拦截
axios.interceptors.response.use(response => {
  return response;
}, error => {
  //错误提醒

  //获取错误状态码
  const { status } = error.response;
  if (status == 401) {//状态码为400代表token已经失效
    //清除token
    localStorage.removeItem("token");
    //跳转到登录页面
    router.push("/login");
  }

  return Promise.reject(error);
});

export default axios;
