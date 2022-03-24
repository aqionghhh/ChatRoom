<template>
  <div class="content">
    <!-- 头部 -->
    <div class="top-bar">
      <div class="top-left" @click="goback">
        <img src="../../static/images/Userhome/左箭头.png" alt="" />
      </div>
      <div class="top-bar-center">{{ friendName }}</div>
      <div class="top-bar-right" v-if="type === 1">
        <img src="../../static/images/img/one.jpg" alt="" />
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="chat" ref="scroll" :style="{ height: height + 'px' }">
      <div
        class="chat-main"
        @click="closeTap"
        :style="{ paddingBottom: mainHeight + 'px' }"
      >
        <div class="pulldown-wrapper">
          <div v-show="beforePullDown">
            <span>下拉刷新</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>刷新中...</span>
            </div>
            <div v-show="!isPullingDown">
              <span>刷新成功</span>
            </div>
          </div>
        </div>
        <!-- 聊天的内容分为两部分：一部分是事件，一部分是头像和内容 -->
        <div class="chat-cont" v-for="(item, index) in msgs" :key="index">
          <div class="chat-time" v-if="item.time != ''">
            {{ changeTime(item.time) }}
          </div>
          <div class="msg-m msg-left" v-if="item.id == friendID">
            <img :src="item.imgurl" class="user-img" alt="" />
            <!-- 文字 -->
            <div class="message" v-if="item.types === '0'">
              <div class="msg-text">
                {{ item.message }}
              </div>
            </div>
            <!-- 图片 -->
            <div class="message" v-if="item.types === '1'">
              <img
                preview="1"
                :src="item.message"
                class="message-img"
                @load="imageLoad"
              />
            </div>
            <!-- 音频 -->
            <div
              class="message"
              v-if="item.types === '2'"
              @click="listenVoice(item.message.voice)"
            >
              <div
                ref="time"
                class="msg-text voice"
                :style="{ width: item.message.time * 20 + 'px' }"
              >
                <img
                  class="voice-img"
                  src="../../static/images/chatroom/音频.png"
                  alt=""
                />

                {{ item.message.time }}″
              </div>
            </div>
          </div>
          <div class="msg-m msg-right" v-else-if="item.id == userID">
            <img v-cloak :src="item.imgurl" class="user-img" alt="" />
            <div class="message" v-if="item.types === '0'">
              <div class="msg-text">
                {{ item.message }}
              </div>
            </div>
            <div class="message" v-else-if="item.types === '1'">
              <img
                preview="1"
                :src="item.message"
                class="message-img"
                @load="imageLoad"
              />
            </div>
            <div
              class="message"
              v-if="item.types === '2'"
              @click="listenVoice(item.message.voice)"
            >
              <div
                ref="time"
                class="msg-text voice"
                :style="{ width: item.message.time * 20 + 'px' }"
              >
                <img
                  class="voice-img"
                  src="../../static/images/chatroom/音频.png"
                  alt=""
                />
                {{ item.message.time }}″
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Submit
      class="submit"
      @sendMsg="getMessage"
      @Height="getPoupHeight"
      @sendPhoto="getPhoto"
      @sendVoice="getVoice"
    />
  </div>
</template>
<script>
import datas from "../../commons/js/datas.js";
import myfun from "../../commons/js/myfun.js";

import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import PullDown from "@better-scroll/pull-down";

import Submit from "../../components/Submit/Submit";

BScroll.use(MouseWheel);
BScroll.use(PullDown);
let audio = new Audio(); // 把变量放在外面可以防止同时播放多个音频

export default {
  data() {
    return {
      msgs: [], // 装聊天信息
      height: 0,
      oldTime: new Date(), // 用户进入聊天室的时间就是现在new的时间
      a: [], // 获取聊天框的dom元素
      b: "", // 获取弹窗submit的高度
      mainHeight: "25", // 聊天内容需要往上调的高度
      beforePullDown: true,
      isPullingDown: false,
      nowPage: 0, // 记录当前的页码，初始值为0
      type: 0, // 判断是私聊还是群聊，私聊是0，群聊是1
      userID: "", // 本人的id
      friendID: "",
      friendName: "", // 要对话的人的名字
    };
  },
  components: {
    Submit,
  },

  created() {
    window.addEventListener(".bg", this.getHeight); //注册监听器
    this.getHeight(); //页面创建时调用
    this.getMsg(this.nowPage); // 把页码传进去
    this.userID = localStorage.getItem("id");
    this.friendID = this.$route.query.id;
    this.friendName = this.$route.query.name;

    // this.$bus.$on("friendID", (data, name) => {
    //   // 往vm的$bus上绑定事件hello
    //   console.log("收到了friendID", data, name);
    //   this.friendID = data;
    //   this.friendName = name;
    //   localStorage.setItem("friendID", data);
    //   localStorage.setItem("friendName", name);
    // });
  },
  watch: {
    userID: {
      immediate: true,
      handler() {
        this.userID = localStorage.getItem("id");
      },
    },
    friendID: {
      immediate: true,
      handler() {
        this.friendID = localStorage.getItem("friendID");
      },
    },
    friendName: {
      immediate: true,
      handler() {
        this.friendName = localStorage.getItem("friendName");
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      console.log(1);
    });
  },
  updated() {
    this.$nextTick(() => {
      // this.init();
      this.scroll.refresh();

      // dom更新时，只有当有弹窗的时候才会滚动到底部，否则下拉刷新也会导致滚动
      if (this.mainHeight > 100) {
        this.scrollToBottom(); // 页面更新之后滚动到下方
      }
    });
  },
  sockets: {
    connet() {
      console.log("连接成功");
    },
    disconnect() {
      console.log("断开链接");
    }, //检测socket断开链接
    reconnect() {
      console.log("重新链接");
    },
    //客户端接收后台传输的socket事件
    // 方法名要和后端emit来的名字一样才能接收
    msg1(msg) {
      let len = this.msgs.length;
      // let nowTime = new Date();
      // let t = myfun.spaceTime(this.oldTime, nowTime);
      // if (t) {
      //   // 根据在myfun里写的方法，如果有返回值，就替换掉最新的值
      //   this.oldTime = t;
      // }
      // nowTime = t;

      let data = {
        id: msg[0].id, // 用户id
        imgurl: msg[0].imgurl,
        message: msg[0].message,
        types: msg[0].types, // 内容类型（0文字，1图片链接，2音频链接
        time: msg[0].time, // 发送时间
        tip: len, // 类似消息的id
      };
      console.log(data.imgurl);
      this.msgs.push(data);

      this.$nextTick(() => {
        this.scroll.refresh();
        this.scrollToBottom(); // 页面更新之后滚动到下方
      });
      console.log("后端传来的数据", msg[0]); //接收的消息
      console.log("后端传来的数据", msg[1]); //接收的消息
    },
  },
  methods: {
    // 点击外面的部分，关闭弹窗
    closeTap() {
      if (this.mainHeight > 100) {
        this.$store.commit("changeTap");
      }
      // 只要点击了外面的部分，就会失焦
      this.$store.commit("changeBlur");
    },
    // 接收文本内容
    getMessage(name, type) {
      name = name.replace(/(&nbsp;)/g, " "); // 把$nbsp;转换成空格
      console.log("内容和类型", name, type);
      let nowTime = new Date();
      let t = myfun.spaceTime(this.oldTime, nowTime);
      if (t) {
        // 根据在myfun里写的方法，如果有返回值，就替换掉最新的值
        this.oldTime = t;
      }
      nowTime = t;

      if (name.trim().length) {
        let len = this.msgs.length;
        this.$axios({
          method: "post",
          url: "api/chat/text",
          data: {
            userID: this.userID,
            friendID: localStorage.getItem("friendID"),
            message: name,
            types: "0",
            time: new Date(),
            state: 1,
          },
        }).then((res) => {
          console.log("res", res.data);
          let data = {
            id: this.userID, // 用户id
            imgurl: localStorage.getItem("imgurl"),
            message: res.data.message,
            types: res.data.types, // 内容类型（0文字，1图片链接，2音频链接
            time: res.data.time, // 发送时间
            tip: len, // 类似消息的id
          };
          this.msgs.push(data);
          console.log(this.msgs);
          this.sendSocket(data); // socket

          this.$nextTick(() => {
            this.scroll.refresh();
            this.scrollToBottom(); // 页面更新之后滚动到下方
          });
        });
      }
    },
    // 接收图片
    getPhoto(form, type) {
      console.log("接收到的消息", form, type);
      let len = this.msgs.length;
      let nowTime = new Date();
      let t = myfun.spaceTime(this.oldTime, nowTime);
      if (t) {
        // 根据在myfun里写的方法，如果有返回值，就替换掉最新的值
        this.oldTime = t;
      }
      nowTime = t;

      // 需要先把图片和音频上传到文件夹中
      let formData = new FormData();
      formData.append("userID", this.userID);
      formData.append("friendID", localStorage.getItem("friendID"));
      formData.append("file", form);
      formData.append("types", type);
      formData.append("time", new Date());
      formData.append("state", 1);

      this.$axios({
        method: "post",
        url: "api/chat/add",
        data: formData,
      }).then((res) => {
        console.log("res.data", res.data);
        let photo = "http://localhost:8080/api/chatImg/" + res.data.message;
        let data = {
          id: this.userID, // 用户id
          imgurl: localStorage.getItem("imgurl"),
          message: photo,
          types: res.data.types, // 内容类型（0文字，1图片链接，2音频链接
          time: nowTime, // 发送时间
          tip: len, // 类似消息的id
        };
        this.msgs.push(data); // 这里等把数据成功提交到后端之后再执行
        this.sendSocket(data);
      });

      this.$nextTick(() => {
        this.scroll.refresh();
        this.scrollToBottom(); // 页面更新之后滚动到下方
        this.$previewRefresh(); // 如果图片是异步生成的，需要在图片数据更新之后调用
      });
    },
    // 接收音频文件
    getVoice(voice, type) {
      console.log("接收来的blob", voice);
      // 时间间隔
      let nowTime = new Date();
      let t = myfun.spaceTime(this.oldTime, nowTime);
      if (t) {
        // 根据在myfun里写的方法，如果有返回值，就替换掉最新的值
        this.oldTime = t;
      }
      nowTime = t;

      // 需要先把图片和音频上传到文件夹中
      let formData = new FormData();
      formData.append("userID", this.userID);
      formData.append("friendID", localStorage.getItem("friendID"));
      formData.append("file", voice.blob, "file.mp3"); // 转成mp3格式
      formData.append("types", type);
      formData.append("time", new Date());
      formData.append("state", 1);
      this.$axios({
        method: "post",
        url: "api/chat/add",
        data: formData,
      }).then((res) => {
        console.log("res.data", res.data);
        res.data.message = "chatImg/" + res.data.message;
        let voiceMsg = "http://localhost:8080/api/" + res.data.message;
        console.log(voiceMsg);
        let len = this.msgs.length;
        let data = {
          id: this.userID, // 用户id
          imgurl: localStorage.getItem("imgurl"),
          message: {
            voice: voiceMsg,
            time: voice.time,
          },
          types: res.data.types, // 内容类型（0文字，1图片链接，2音频链接
          time: nowTime, // 发送时间
          tip: len, // 类似消息的id
        };
        this.msgs.push(data); // 这里等把数据成功提交到后端之后再执行
        console.log(data);
        this.sendSocket(data);

        this.$nextTick(() => {
          this.scroll.refresh();
          this.scrollToBottom(); // 页面更新之后滚动到下方
        });
      });
    },

    // socket提交 发送给后端
    sendSocket(e) {
      // 接收聊天信息
      // 判断这是私聊还是群聊
      if (this.type === 0) {
        // 私聊
        console.log("aaa");
        this.$socket.emit(
          "msg",
          e,
          localStorage.getItem("id"),
          localStorage.getItem("friendID")
        ); // 事件、消息的内容、发送方、接收方
      } else {
        // 群聊
        this.$socket.emit(
          "groupMsg",
          e,
          localStorage.getItem("id"),
          this.groupID
        ); // 事件、消息的内容、发送方、接收方
      }
    },
    // socket接收消息 从后端接收
    // receiveSocket() {
    //   this.$socket.on("msg", (msg, userID) => {
    //     console.log(msg);
    //     console.log(userID);
    //   });
    // },
    // 从数据库中获取聊天数据
    getMsg(page) {
      // 接收现在的页码，然后分段渲染聊天数据
      let msg = datas.message();
      // this.$axios({
      //   method: 'post',
      //   url: 'api/chat/find',
      //   data:{
      //     userID: this.userID,
      //     friendID: this.friendID
      //   }
      // }).then(res => {
      //   console.log(res.data);
      // })
      // 处理数据：时间
      // 一次渲染十条
      for (let i = 0; i < msg.length; i++) {
        if (i < 9) {
          // 如果是最后一条数据（即最顶上的数据），就不进行匹配
          // 时间间隔
          let t = myfun.spaceTime(this.oldTime, msg[i].time);
          if (t) {
            // 根据在myfun里写的方法，如果有返回值，就替换掉最新的值
            this.oldTime = t;
          }
          msg[i].time = t; // 要放到页面上展示的时间，如果没有返回值就是不显示，有返回值就显示
        }
        this.msgs.unshift(msg[i]); // 倒序插入
      }
      this.nowPage += 1;
    },
    // 听语音
    listenVoice(e) {
      console.log("音频文件", e); // 传进来的是mp3文件
      audio.src = e;
      audio.play();
      console.log("播放");
    },
    // 接收弹窗的高度
    getPoupHeight(height) {
      this.mainHeight = height;
    },
    // 页面滚动到最下方
    scrollToBottom() {
      this.a = document.querySelectorAll(".chat-cont");
      // console.log(this.a[this.a.length - 1]);
      this.scroll.scrollToElement(this.a[this.a.length - 1], 200);
    },
    imageLoad() {
      this.scroll.refresh(); // 当src资源加载完成之后调用refresh方法
      // console.log("onload");
      this.scrollToBottom();
    },
    // 返回上一级路由
    goback() {
      this.$router.back();
    },
    //动态获取元素的高度
    getHeight() {
      this.height = window.innerHeight - 50; // 高
      console.log(this.height);
    },
    // 处理时间
    changeTime(data) {
      return myfun.dateTime1(data);
    },

    init() {
      // 这么做是为了防止内存泄漏
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true, // 不添加的话会和vue-photo-preview插件发生冲突
          tap: true, // 不添加的话会和vue-photo-preview插件发生冲突
          // probeType: 2, //因为惯性滑动不会触发
          scrollY: true,
          mouseWheel: true,

          bounceTime: 800,
          useTransition: false,
          pullDownRefresh: {
            threshold: 60, // 顶部的下拉距离
            stop: 56,
          },
          bounce: {
            top: true,
            bottom: false,
          },
        });
      } else {
        // 如果存在的话，直接刷新
        this.scroll.refresh();
      }
      // 触发时机：当顶部下拉的距离大于 threshold 值时，触发一次 pullingDown 钩子
      this.scroll.on("pullingDown", this.pullingDownHandler);

      console.log("scroll", this.scroll.scrollerHeight);
    },

    // 当下拉距离大于60时，执行该函数
    pullingDownHandler() {
      console.log("下拉刷新");
      this.beforePullDown = false;
      this.isPullingDown = true;

      setTimeout(() => {
        this.requestData(); // 请求数据

        this.isPullingDown = false;
        this.finishPullDown();
      }, 1000);
    },

    // 请求数据
    requestData() {
      // 在这里面发送请求
      this.getMsg(this.nowPage);
      setTimeout(() => {
        console.log("刷新中");
      }, 1000);
    },

    // 完成刷新
    async finishPullDown() {
      this.scroll.finishPullDown();
      setTimeout(() => {
        this.beforePullDown = true;
        this.scroll.refresh();
      }, 900);
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
  background-color: rgb(243, 243, 243);
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
  overflow: hidden;
}
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
.chat-main {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 50px;
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
  max-width: 240px;
  word-break: break-all;
  word-wrap: break-word;
}
.message-img {
  max-width: 200px;
  height: auto;
  border-radius: 10px;
}
.msg-left {
  flex-direction: row;
}
.msg-left .msg-text {
  margin-left: 8px;
  border-radius: 0 10px 10px;
  background-color: #fff;
}
.msg-left .message-img {
  margin-left: 8px;
}
.msg-right {
  flex-direction: row-reverse;
}
.msg-left {
  flex-direction: row;
}
.msg-right .msg-text {
  border-radius: 10px 0 10px 10px;
  margin-right: 8px;
  background-color: #fff260;
}
.msg-right .message-img {
  margin-right: 8px;
}
.voice {
  text-align: right;
  min-width: 50px;
  max-width: 200px;
}
.voice-img {
  float: left;
  padding-right: 8px;
  width: 18px;
  height: 20px;
}
</style>