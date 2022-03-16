<template>
  <div class="content">
    <!-- 头部 -->
    <div class="top-bar">
      <div class="top-left" @click="goback">
        <img src="../../static/images/Userhome/左箭头.png" alt="" />
      </div>
      <div class="top-bar-center">昵称</div>
      <div class="top-bar-right">
        <img src="../../static/images/img/one.jpg" alt="" />
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="chat" ref="scroll" :style="{ height: height + 'px' }">
      <div class="chat-main">
        <!-- 聊天的内容分为两部分：一部分是事件，一部分是头像和内容 -->
        <div class="chat-cont" v-for="(item, index) in msgs" :key="index">
          <div class="chat-time" v-if="item.time != ''">
            {{ changeTime(item.time) }}
          </div>
          <div class="msg-m msg-left" v-if="item.id == 'a'">
            <img :src="item.imgurl" class="user-img" alt="" />
            <div class="message" v-if="item.types === 0">
              <div class="msg-text">
                {{ item.message }}
              </div>
            </div>
            <div class="message" v-if="item.types === 1">
              <img
                preview="1"
                :src="item.message"
                class="message-img"
                @load="imageLoad"
              />
            </div>
          </div>
          <div class="msg-m msg-right" v-else-if="item.id == 'b'">
            <img v-cloak :src="item.imgurl" class="user-img" alt="" />
            <div class="message" v-if="item.types === 0">
              <div class="msg-text">
                {{ item.message }}
              </div>
            </div>
            <div class="message" v-else-if="item.types === 1">
              <img
                preview="1"
                :src="item.message"
                class="message-img"
                @load="imageLoad"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import datas from "../../commons/js/datas.js";
import myfun from "../../commons/js/myfun.js";

import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import PullDown from "@better-scroll/pull-down";

BScroll.use(MouseWheel);
BScroll.use(PullDown);

export default {
  data() {
    return {
      msgs: [], // 装聊天信息
      height: 0,
      oldTime: new Date(), // 用户进入聊天室的时间就是现在new的时间
    };
  },
  created() {
    window.addEventListener(".bg", this.getHeight); //注册监听器
    this.getHeight(); //页面创建时调用
    this.getMsg();

    // this.$previewRefresh(); // 如果图片是异步生成的，需要在图片数据更新之后调用
  },

  mounted() {
    this.init();
  },
  watch: {
    msgs() {
      // 当数组发生变化的时候调用refresh方法
      this.$nextTick(() => {
        this.init();
      });
    },
  },
  methods: {
    imageLoad() {
      this.scroll.refresh(); // 当src资源加载完成之后调用refresh方法
      // console.log("onload");
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
    // 获取聊天数据
    getMsg() {
      let msg = datas.message();
      // 处理数据：时间
      for (let i = 0; i < msg.length; i++) {
        if (i < msg.length - 1) {
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
    },
    init() {
      // 这么做是为了防止内存泄漏
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true, // 不添加的话回合vue-photo-preview插件发生冲突
          tap: true, // 不添加的话回合vue-photo-preview插件发生冲突
          scrollY: true,
          mouseWheel: true,
          pullDownRefresh: true,
          bounce: {
            top: true,
            bottom: false,
          },
        });
      } else {
        // 如果存在的话，直接刷新
        this.scroll.refresh();
      }

      console.log(this.scroll.scrollerHeight);
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
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
  padding-left: 8px;
}
.msg-right {
  flex-direction: row-reverse;
}
.msg-right .msg-text {
  border-radius: 10px 0 10px 10px;
  margin-right: 8px;
  background-color: #fff260;
}
.msg-right .message-img {
  padding-right: 8px;
}
</style>