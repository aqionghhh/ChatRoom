// 封装post请求
import axios from 'axios'
export function post(url, params) {
  url = 'api/' + url;
  console.log(url, params);
  return axios({
    method: 'post',
    url,
    data: params
  })
}