//请求拦截和响应拦截文件
import axios from 'axios'
import router from '../router/index';


export function request(config) {
  const instance = axios.create({
    // 设置基础的url配置项，这样接口处的url前面就不用写url:'http://127.0.0.1:8000/api/home'，直接写成 url:'/api/home', 就可以了
    baseURL: 'http://localhost:8080/',
    //设置请求超时时间
    timeout: 5000
  })

  //请求拦截
  instance.interceptors.request.use(config => {

    //判断token是否存在
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
  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    Message.error(error.response.data);

    //获取错误状态码
    const { status } = error.response;
    if (status == 401) {//状态码为401代表token已经失效
      Message.error("token失效，请重新登陆！")
      //清除token
      localStorage.removeItem("token");
      //跳转到登录页面
      router.push("/login")
    }

  });
  return instance(config);
}

