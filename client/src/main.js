import Vue from 'vue'
import App from './App.vue'

//引入路由器
import router from './router';
//引入animation动画
import animated from 'animate.css';
Vue.use(animated)
//使用vant组件
import { Picker, Popup, DatetimePicker, Uploader, Button } from 'vant';
Vue.use(Picker);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Uploader);
Vue.use(Button);
//引入vue-cropper
import VueCropper from 'vue-cropper';
Vue.use(VueCropper);
//引入axios
import axios from 'axios';
Vue.prototype.$axios = axios

Vue.config.productionTip = false


new Vue({
  el: '#app',
  render: h => h(App),
  router,//使用上vue-router
})