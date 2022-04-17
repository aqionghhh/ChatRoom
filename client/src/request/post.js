// 封装post请求
import { request } from './index';
export function logIn(params) {
  let url = 'api/login/match';
  console.log('url', url);
  console.log('params', params);
  return request({
    url: url,
    method: 'post',
    data: params
  })
}
