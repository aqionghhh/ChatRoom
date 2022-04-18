// 封装函数
import { post } from './post';
// Login
export const logIn = (p) => { // 登录
  return post('login/match', p);
}
// Register
export const canRegister = (p) => {  // 判断邮箱是否注册
  return post('register/judge', p);
}
export const register = (p) => {  // 注册
  return post('register/add', p);
}
// UserHome
export const groupMsg = (p) => {  // 获取群信息
  return post('group/match', p);
}
export const userMsg = (p) => {  // 获取用户信息
  return post('user/detail', p);
}
export const friendRequest = (p) => {  // 发送好友请求
  return post('friend/request', p);
}
export const groupRequest = (p) => {  // 发送加群请求
  return post('friend/request', p);
}