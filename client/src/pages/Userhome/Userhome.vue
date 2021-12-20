<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <div class="top-left">
        <img
          src="../../static/images/Userhome/左箭头.png"
          @click="back"
          alt=""
        />
      </div>
      <div class="top-bar-right">
        <img src="../../static/images/Userhome/三点.png" alt="" />
      </div>
    </div>
    <!-- 内容 -->
    <div class="bg">
      <div class="bg-bai"></div>
      <img class="bg-img" src="../../static/images/img/two.jpg" alt="" />
    </div>
    <div class="main">
      <div class="user-header">
        <div class="sex" :style="{ background: sexBg }">
          <img src="../../static/images/Userhome/女性.png" alt="" />
        </div>
        <img class="user-img" src="../../static/images/img/two.jpg" alt="" />
      </div>
      <div class="user-info">
        <div class="name">{{ user.name }}</div>
        <div class="nick">昵称：{{ user.nick }}</div>
        <div class="intr">{{ user.intr }}</div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-bar">
      <div @click="addFriendAnimate" class="bottom-btn">加为好友</div>
    </div>
    <!-- 添加好友弹窗 -->
    <transition
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="animation"
        class="add-misg"
        :style="{ height: height + 'px' }"
      >
        <!-- :style="{ height: height + 'px', bottom: '-' + height + 'px' -->
        <div class="name">{{ user.name }}</div>
        <textarea
          class="add-main"
          :value="myname + '请求加为好友~'"
          maxlength="120"
        ></textarea>
      </div>
    </transition>
    <transition
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOut"
    >
      <!-- 按钮 -->
      <div class="add-bt" v-show="animation">
        <div class="close">取消</div>
        <div class="send">发送</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sexBg: "rgb(255,93,91)",
      myname: "不知道叫什么",
      user: {
        name: "sxq", //名字
        nick: "嘻嘻", //昵称
        intr: "这个一个简介", //介绍
      },
      height: 0,
      animation: false, //添加好友弹窗
    };
  },
  created() {
    window.addEventListener(".bg", this.getHeight); //注册监听器
    this.getHeight(); //页面创建时调用
  },
  methods: {
    //返回上一页
    back() {
      this.$router.back();
    },
    //动态获取元素的高度
    getHeight() {
      this.height = window.innerHeight - 186; // 高
      console.log(this.height);
    },
    //添加好友动画
    addFriendAnimate() {
      this.animation = !this.animation;
      console.log(this.animation);
    },
  },
};
</script>

<style scoped>
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
}
.top-bar-right {
  float: right;
}
.top-left {
  float: left;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}
.top-bar-right img {
  width: 26px;
  position: absolute;
  height: 30px;
  right: 16px;
  top: 8px;
}
.top-left img {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  left: 12px;
}
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* z-index: -2; */
}
.bg-img {
  width: 100%;
  height: 100%;
  filter: blur(8px);
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: #eee; */
}
.bg-bai {
  /* background-color: #eee; */
  width: 100%;
  height: 100%;
  z-index: -1;
}
.main {
  padding-top: 74px;
  text-align: center;
}
.user-header {
  position: relative;
  width: 206px;
  height: 206px;
  position: relative;
  margin: 0 auto;
}
.sex {
  position: absolute;
  bottom: 11px;
  right: 11px;
  width: 32px;
  height: 32px;
  border-radius: 18px;
}
.sex img {
  width: 20px;
  height: 20px;
  padding: 5px;
}
.user-img {
  height: 200px;
  width: 200px;
  border-radius: 24px;
  border: 3px solid rgb(255, 255, 255);
  z-index: 10;
  position: relative;
}
.user-info {
  padding-top: 21px;
}
.name {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #272832;
  font-weight: 400;
  line-height: 37px;
}
.nick {
  font-size: 14px;
  color: #272832;
  font-family: PingFangSC-Regular;
  line-height: 20px;
}
.intr {
  /* border: 1px solid black; */
  padding: 10px 50px;
  font-size: 14px;
  line-height: 24px;
  color: #272832;
  font-weight: 300;
}
.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  padding: 6px 16px;
}
.bottom-btn {
  text-align: center;
  line-height: 40px;
  height: 40px;
  background: #ffe431;
  border-radius: 5px;
  font-size: 16px;
}
.add-misg {
  width: 100%;
  box-sizing: border-box;
  padding: 0 28px;
  /* height: 600px; */
  background: white;
  position: fixed;
  bottom: 0;
}
.add-misg .name {
  padding: 84px 0 20px;
  font-size: 26px;
  line-height: 37px;
}
.add-main {
  height: 180px;
  background: rgb(243, 244, 246);
  border-radius: 10px;
  padding: 9px 11px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #272832;
  font-weight: 400;
  width: 100%;
  box-sizing: border-box;
  border: none;
}
.add-bt {
  position: fixed;
  /* bottom: -54px; */
  bottom: 0;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  padding: 6px 16px;
  height: 52px;
  display: flex;
  z-index: 100;
}
.close {
  text-align: center;
  line-height: 40px;
  width: 86px;
  height: 40px;
  background: rgba(39, 40, 50, 0.2);
  border-radius: 5px;
  font-size: 16px;
  flex: auto;
}
.send {
  margin-left: 16px;
  text-align: center;
  line-height: 40px;
  width: 90%;
  height: 40px;
  background: #ffe431;
  border-radius: 5px;
  font-size: 16px;
  flex: auto;
}
</style>