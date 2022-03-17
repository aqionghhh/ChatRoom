import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //存放的键值对就是所要管理的状态
    id: '',
    name: '',
    token: '',
    imgUrl: '',
    canTap: false, // 弹窗是否展示，false就是不展示，true就是可以展示
  },
  mutations: { // 增加nutations属性
    setInfo(state, back) {  // 增加一个mutations的方法，方法的作用是让num从0变成5，state是必须默认参数
      state.id = back.id;
      state.name = back.name;
      state.token = back.token;
      state.imgUrl = back.imgurl;
    },
    changeTap(state) {  // 弹窗是否展示
      state.canTap = !state.canTap;
    }
  },
})

export default store;