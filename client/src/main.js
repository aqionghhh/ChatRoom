import Vue from 'vue'
import App from './App.vue'

//引入路由器
import router from './router';
//引入animation动画
import animated from 'animate.css';
Vue.use(animated)

Vue.config.productionTip = false


new Vue({
  el: '#app',
  render: h => h(App),
  router,//使用上vue-router
})