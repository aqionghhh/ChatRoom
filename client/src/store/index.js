import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userImg: "http://localhost:8080/api/userImg/",
    chatImg: "http://localhost:8080/api/chatImg/",
    canTap: false, // 弹窗是否展示，false就是不展示，true就是可以展示
    isBlur: true,   // 输入框是否失焦，默认是不失焦
    number: 1,  // 选中的成员数
    inviteNumber: 0,  // 邀请的成员数
  },
  mutations: { // 增加nutations属性
    // 选择成员
    setNumber(state, back) {
      state.number = back;
    },
    // 选择成员
    setInviteNumber(state, back) {
      state.inviteNumber = back;
    },
    changeTap(state) {  // 弹窗是否展示
      state.canTap = !state.canTap;
    },
    changeBlur(state) {  // 输入框是否失焦
      state.isBlur = !state.isBlur;
    }
  },
})

export default store;