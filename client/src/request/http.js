// 封装函数
import { post } from './post';
export const logIn = (p) => {
  console.log('p', p);
  post('login/match', p);
}