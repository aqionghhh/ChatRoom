import Vue from 'vue'
import App from './App.vue'
// 引入vuex
import store from './store/index'

//引入路由器
import router from './router';
//引入animation动画
import animated from 'animate.css';
Vue.use(animated)
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
//使用vant组件
import { Picker, Popup, DatetimePicker, Uploader, Button } from 'vant';
Vue.use(Picker);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Uploader);
Vue.use(Button);
// 引入大图预览插件
// let option = {
//   maxSpreadZoom: 2, // 控制预览图最大的倍数，默认是2倍，我这里改成了原图
//   fullscreenEl: false, //控制是否显示右上角全屏按钮
//   closeEl: false, //控制是否显示右上角关闭按钮
//   tapToClose: true, //点击滑动区域应关闭图库
//   shareEl: false, //控制是否显示分享按钮
//   zoomEl: false, //控制是否显示放大缩小按钮
//   counterEl: false, //控制是否显示左上角图片数量按钮
//   arrowEl: true,  //控制如图的左右箭头（pc浏览器模拟手机时）
//   tapToToggleControls: true, //点击应切换控件的可见性
//   clickToCloseNonZoomable: true //点击图片应关闭图库，仅当图像小于视口的大小时
// }
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

let options = {
  fullscreenEl: false,
}
Vue.use(preview, options)

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
  store
})