import axios from 'axios';

function request(url, dataList) {
  return this.$axios({
    method: 'post',
    url: `api/${url}`,
    data: {
      
    }
  })
}
export default request;