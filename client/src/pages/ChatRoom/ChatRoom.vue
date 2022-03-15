<template>
  <div class="page" :style="{ height: height + 'px' }">
    <div class="content">
      <!-- 头部 -->
      <div class="top-bar">
        <div class="top-left">
          <img src="../../static/images/Userhome/左箭头.png" alt="" />
        </div>
        <div class="top-bar-center">昵称</div>
        <div class="top-bar-right">
          <img src="../../static/images/img/one.jpg" alt="" />
        </div>
      </div>
      <!-- 主体部分 -->
      <div class="chat">
        <div class="chat-main">
          <!-- 聊天的内容分为两部分：一部分是事件，一部分是头像和内容 -->
          <div class="chat-cont">
            <div class="chat-time">22点30分</div>
            <div class="msg-m msg-left">
              <img
                src="../../static/images/img/two.jpg"
                class="user-img"
                alt=""
              />
              <div class="message">
                <div class="msg-text">
                  你好啊，我是嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻
                </div>
              </div>
            </div>
          </div>
          <div class="chat-cont">
            <div class="chat-time">22点30分</div>
            <div class="msg-m msg-right">
              <img
                src="../../static/images/img/two.jpg"
                class="user-img"
                alt=""
              />
              <div class="message">
                <div class="msg-text">嘻嘻嘻</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import PullDown from "@better-scroll/pull-down";

BScroll.use(PullDown);
BScroll.use(MouseWheel);

export default {
  data() {
    return {
      height: "",
    };
  },
  created() {
    window.addEventListener(".page", this.getHeight); //注册监听器
    this.getHeight(); //页面创建时调用
  },

  mounted() {
    this.init();
  },
  methods: {
    //动态获取元素的高度
    getHeight() {
      this.height = window.innerHeight; // 高
      console.log(this.height);
    },
    init() {
      this.bs = new BScroll(".chat", {
        mouseWheel: true,
        scrollY: false,
        scrollX: true,
      });
    },
  },
};
</script>

<style scoped>
.content {
  background-color: rgb(243, 243, 243);
  height: 100%;
}
.top-bar {
  background-color: rgb(243, 243, 243);
}
.top-bar-center {
  flex: auto;
  text-align: center;
  font-size: 20px;
  line-height: 44px;
}
.top-bar-right img {
  width: 30px;
  position: absolute;
  height: 30px;
  right: 16px;
  top: 6px;
  border-radius: 20%;
}
.chat {
  height: 100%;
}
.chat-main {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 50px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
}
.chat-time {
  font-size: 12px;
  color: rgba(39, 40, 50, 0.3);
  line-height: 17px;
  padding: 10px 0;
  text-align: center;
}
.msg-m {
  display: flex;
  padding: 10px 0;
}
.user-img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex: none;
}
.message {
  max-width: 240px;
}
.msg-text {
  font-size: 16px;
  line-height: 22px;
  padding: 9px 12px;
}
.msg-left {
  flex-direction: row;
}
.msg-left .msg-text {
  margin-left: 8px;
  border-radius: 0 10px 10px;
  background-color: #fff;
}
.msg-right {
  flex-direction: row-reverse;
}
.msg-right .msg-text {
  border-radius: 10px 0 10px 10px;
  margin-right: 8px;
  background-color: #fff260;
}
</style>