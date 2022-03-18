import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //存放的键值对就是所要管理的状态
    id: '',     // id
    name: '',   // 名字
    sign: '',   // 签名
    token: '',  // token
    imgUrl: '', // 用户头像
    birth: '',
    email: '',
    canTap: false, // 弹窗是否展示，false就是不展示，true就是可以展示
  },
  mutations: { // 增加nutations属性
    setInfo(state, back) {  // 增加一个mutations的方法，方法的作用是让num从0变成5，state是必须默认参数
      state.id = back._id;
      state.name = back.name;
      state.sign = back.sign;
      state.token = back.token;
      state.birth = back.birthday;
      state.imgUrl = back.imgurl;
      state.email = back.email;
    },
    // 修改生日
    setBirth(state, back) {
      state.birth = back;
    },
    // 修改性别
    setSex(state, back) {
      state.sex = back;
    },
    // 修改签名
    setSign(state, back) {
      state.sign = back;
    },
    // 修改头像
    setImg(state, back) {
      state.imgUrl = back;
    },
    // 修改昵称
    setName(state, back) {
      state.name = back;
    },
    changeTap(state) {  // 弹窗是否展示
      state.canTap = !state.canTap;
    }
  },
})

export default store;