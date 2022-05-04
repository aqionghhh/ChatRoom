<template>
  <div class="content">
    <!-- 头部 -->
    <TopBar>
      <template v-slot:left>
        <img
          @click="goback"
          src="../../static/images/Userhome/左箭头.png"
          alt=""
        />
      </template>
      <template v-slot:center>
        <div>{{ friendName }}</div>
      </template>
      <template v-slot:right>
        <router-link
          :to="{
            path: '/groupdetail',
            query: { id: friendID },
          }"
        >
          <div class="top-right" v-if="target === 'group'">
            <img :src="img" alt="" />
          </div>
        </router-link>
      </template>
    </TopBar>
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
        <div class="chat-cont" v-for="(item, index) in showMsg" :key="index">
          <div class="chat-time" v-if="item.time != ''">
            {{ changeTime(item.time) }}
          </div>
          <div class="msg-m msg-right" v-if="item.userID == userID">
            <img
              v-cloak
              :src="item.imgurl"
              @click="toUserHome(index)"
              class="user-img"
              alt=""
            />
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
                loading="lazy"
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
            <div v-if="item.types === '3'" class="file">
              <div class="file-top">
                <div class="file-top-left"></div>
                <div class="file-top-right">
                  <div class="file-topName">文件名</div>
                  <div class="file-topSize">4.53M</div>
                </div>
              </div>
              <div
                class="file-middle"
                :style="{ width: uploadPercentage + '%' }"
              ></div>
              <div class="file-bottom">
                <div class="file-bottomItem" @click="stop">暂停</div>
                <div class="file-bottomItem" @click="goOn">继续</div>
                <div class="file-bottomItem" @click="cancel">取消</div>
              </div>
            </div>
          </div>
          <div class="msg-m msg-left" v-else>
            <img
              :src="item.imgurl"
              @click="toUserHome(index)"
              class="user-img"
              alt=""
            />
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
        </div>
      </div>
    </div>
    <Submit class="submit" @sendMsg="getMessage" @Height="getPoupHeight" />
  </div>
</template>
<script>
import myfun from "../../commons/js/myfun.js";

import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import PullDown from "@better-scroll/pull-down";

import Submit from "../../components/Submit/Submit";
import TopBar from "../../components/TopBar/TopBar.vue";

BScroll.use(MouseWheel);
BScroll.use(PullDown);
let audio = new Audio(); // 把变量放在外面可以防止同时播放多个音频
const controller = new AbortController();

import { getHeight } from "../../mixin/getHeight";
import {
  clearTip,
  sendText,
  sendForm,
  getTalkMessage,
  lookPerson,
} from "../../request/http";

export default {
  data() {
    return {
      msgs: [], // 装聊天信息
      showMsg: [], // 装展示的聊天数据
      height: 0,
      oldTime: new Date(), // 用户进入聊天室的时间就是现在new的时间
      a: [], // 获取聊天框的dom元素
      b: "", // 获取弹窗submit的高度
      mainHeight: "25", // 聊天内容需要往上调的高度
      beforePullDown: true,
      isPullingDown: false,
      type: 0, // 判断是私聊还是群聊，私聊是0，群聊是1
      userID: "", // 本人的id
      friendID: "",
      friendName: "", // 要对话的人的名字
      img: "", // 群头像
      nowPage: 1, // 当前页码
      data: [], // 保存切片
      size: [], // 文件的大小
      container: {
        // 文件
        file: null,
      },
      hashPercentage: 0, // 计算文件hash的进度
      requestList: [], // 保存请求切片
    };
  },
  components: {
    Submit,
    TopBar,
  },
  computed: {
    // 计算当前文件的上传进度
    uploadPercentage() {
      if (!this.container.file || !this.data.length) return 0;
      const loaded = this.data
        .map((item) => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur);
      return parseInt((loaded / this.container.file.size).toFixed(2));
    },
  },
  mixins: [getHeight],
  async created() {
    window.addEventListener(".bg", this.getHeight); //注册监听器
    this.getHeight(50); //页面创建时调用
    this.userID = localStorage.getItem("id");
    localStorage.setItem("friendID", this.$route.query.id);
    this.friendID = localStorage.getItem("friendID");
    localStorage.setItem("friendName", this.$route.query.name);
    this.friendName = localStorage.getItem("friendName");
    localStorage.setItem("target", this.$route.query.target);
    this.target = localStorage.getItem("target");
    this.img = this.$store.state.userImg + this.$route.query.imgurl;
    this.stateZero(); // 清空未读消息
    await this.getMsg();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
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
      console.log(msg);
      // 进行一个判断，当后端传进来的好友id等于当前页面的好友id，再进行消息的接收
      if (msg[1] === this.friendID) {
        if (msg[0].types === "2") {
          let data = {
            userID: msg[0].userID, // 发送方用户id
            imgurl: msg[0].imgurl,
            message: {
              voice: msg[0].message.voice,
              time: msg[0].message.time,
            },
            types: msg[0].types, // 内容类型（0文字，1图片链接，2音频链接
            time: msg[0].time, // 发送时间
            tip: len, // 类似消息的id
          };
          console.log("socketdata", data);
          this.msgs.push(data);
        } else {
          let data = {
            userID: msg[0].userID, // 发送方用户id
            imgurl: msg[0].imgurl,
            message: msg[0].message,
            types: msg[0].types, // 内容类型（0文字，1图片链接，2音频链接
            time: msg[0].time, // 发送时间
            tip: len, // 类似消息的id
          };
          console.log("socketdata", data);
          this.msgs.push(data);
        }

        this.scrollToBottom();
      }
    },
    groupmsg(msg) {
      console.log("我在聊天页收到了群消息", msg);
      let len = this.msgs.length;
      console.log(msg);
      // 进行一个判断，当后端传进来的好友id等于当前页面的好友id，再进行消息的接收
      if (msg[1] === this.friendID) {
        console.log("id相等");
        if (msg[0].types === "2") {
          let data = {
            userID: msg[0].userID, // 发送方用户id
            imgurl: msg[0].imgurl,
            message: {
              voice: msg[0].message.voice,
              time: msg[0].message.time,
            },
            types: msg[0].types, // 内容类型（0文字，1图片链接，2音频链接
            time: msg[0].time, // 发送时间
            tip: len, // 类似消息的id
          };
          console.log("socketdata", data);
          this.msgs.push(data);
        } else {
          let data = {
            userID: msg[0].userID, // 发送方用户id
            imgurl: msg[0].imgurl,
            message: msg[0].message,
            types: msg[0].types, // 内容类型（0文字，1图片链接，2音频链接
            time: msg[0].time, // 发送时间
            tip: len, // 类似消息的id
          };
          console.log("socketdata", data);
          this.msgs.push(data);
        }
        this.scrollToBottom();
      }
    },
  },
  methods: {
    // 滑动到底部
    scrollBottom() {
      this.$nextTick(() => {
        this.scroll.refresh();
        this.scrollToBottom(); // 页面更新之后滚动到下方
      });
    },
    // 未读消息全部设为0
    stateZero() {
      clearTip({
        userID: this.userID,
        friendID: this.friendID,
        target: this.target,
      });
    },
    // 点击外面的部分，关闭弹窗
    closeTap() {
      if (this.mainHeight > 100) {
        this.$store.commit("changeTap");
      }
      // 只要点击了外面的部分，就会失焦
      this.$store.commit("changeBlur");
    },
    // 接收内容
    async getMessage(name, type) {
      let nowTime = new Date();
      let t = myfun.spaceTime(this.oldTime, nowTime);
      if (t) {
        // 根据在myfun里写的方法，如果有返回值，就替换掉最新的值
        this.oldTime = t;
      }
      nowTime = t;

      if (type === 0) {
        name = name.replace(/(&nbsp;)/g, " "); // 把$nbsp;转换成空格
        if (name.trim().length) {
          sendText({
            userID: this.userID,
            friendID: localStorage.getItem("friendID"),
            imgurl: localStorage.getItem("imgurl"),
            message: name,
            types: type,
            time: new Date(),
            tip: 1,
            target: this.target,
          }).then((res) => {
            let data = {
              userID: this.userID, // 用户id
              imgurl: localStorage.getItem("imgurl"),
              message: name,
              types: "0", // 内容类型（0文字，1图片链接，2音频链接
              time: nowTime, // 发送时间
              tip: 1, // 类似消息的id
            };
            console.log(111111);
            this.showMsg.push(data);
            this.sendSocket(data); // socket

            this.scrollBottom();
          });
        }
      } else if (type === 3) {
        console.log("收到了文件", name);
        this.container.file = name;
        const fileChunkList = this.createFileChunk(name);
        // 生成hash
        this.container.hash = await this.calculateHash(fileChunkList);
        // 判断是否需要文件秒传
        const shouldUpload = await this.verifyUpload(
          this.container.file.name,
          this.container.hash
        );
        console.log("shouldUpload", shouldUpload);
        if (!shouldUpload) {
          this.data.forEach((item) => {
            item.percentage = 100;
          });
          return;
        }

        this.data = fileChunkList.map(({ file }, index) => ({
          chunk: new File([file], this.container.hash + "-" + index),
          hash: this.container.hash, // webworker生成的hash
          size: new File([file], this.container.hash + "-" + index).size,
          fileHash: this.container.hash,
          index,
          percentage: 0,
        }));
        for (let i = 0; i < this.data.length; i++) {
          this.size.push(this.data[i].size);
        }
        console.log("this.size", this.size);
        await this.uploadChunks(name);
      } else {
        let formData = new FormData();
        formData.append("userID", this.userID);
        formData.append("imgurl", localStorage.getItem("imgurl"));
        formData.append("friendID", localStorage.getItem("friendID"));
        formData.append("types", type);
        formData.append("time", new Date());
        formData.append("tip", 1);
        formData.append("target", this.target);
        if (type === 1) {
          formData.append("file", name);
          console.log("file", name);
        } else {
          formData.append("file", name.blob, "file.mp3"); // 转成mp3格式
          formData.append("time2", name.time);
        }
        this.$axios({
          method: "post",
          url: "api/chat/add",
          data: formData,
        }).then((res) => {
          console.log("res.data", res.data);
          let message = "";
          if (type === 1) {
            message = this.$store.state.chatImg + res.data.message;
          } else {
            message = {
              voice: this.$store.state.chatImg + res.data.message,
              time: name.time,
            };
          }
          let data = {
            userID: this.userID, // 用户id
            imgurl: localStorage.getItem("imgurl"),
            message: message,
            types: res.data.types, // 内容类型（0文字，1图片链接，2音频链接
            time: nowTime, // 发送时间
            tip: 1, // 类似消息的id
          };
          this.showMsg.push(data); // 这里等把数据成功提交到后端之后再执行
          this.sendSocket(data);
          this.scrollBottom();
        });
      }
    },

    // 生成切片
    createFileChunk(file, size = 1024 * 1024) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur + size),
        });
        cur += size;
      }

      console.log("fileChunkList", fileChunkList);
      return fileChunkList;
    },

    // 上传切片
    async uploadChunks(name) {
      let lastName = name.name.split(".");
      this.requestList = this.data
        .map(({ chunk, hash, index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", this.container.hash + "." + lastName[1]);
          formData.append("filename", this.container.hash);
          return { formData, index };
        })
        .map(async ({ formData, index }) =>
          this.$axios({
            method: "post",
            url: "api/chat/file",
            data: formData,
            index,
            onUploadProgress: this.createProgressHandler(this.data[index]),
            signal: controller.signal,
          })
            .then((res) => {})
            .catch((err) => {
              console.log("err", err);
            })
        );
      await Promise.all(this.requestList); // 并发切片
      await this.mergeRequest(lastName); // 合并切片请求
    },
    // 合并切片
    async mergeRequest(lastName) {
      this.$axios({
        method: "post",
        url: "api/chat/merge",
        data: {
          filename: this.container.hash + "." + lastName[1],
          size: this.size,
        },
      }).then((res) => {
        console.log("合并完了", res.data);
      });
    },
    // 原生xhrhttprequest
    createProgressHandler(item) {
      return (e) => {
        console.log("正在上传", e.loaded / e.total);
        item.percentage = parseInt(String((e.loaded / e.total) * 100));
      };
    },
    // 生成文件 hash（web-worker）
    calculateHash(fileChunkList) {
      return new Promise((resolve) => {
        // 添加 worker 属性
        this.container.worker = new Worker("/hash.js");
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = (e) => {
          const { percentage, hash } = e.data;
          this.hashPercentage = percentage;
          console.log("webworker", percentage);
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    // 文件秒传
    async verifyUpload(filename, fileHash) {
      let result = "";
      await this.$axios({
        url: "api/chat/verify",
        method: "post",
        data: {
          filename,
          fileHash,
        },
      }).then((res) => {
        console.log("res.data", res.data.shouldUpload);
        result = res.data.shouldUpload;
      });
      return result;
    },

    // 暂停
    stop() {
      controller.abort();

      this.requestList = [];
      console.log("暂停");
      console.log(this.requestList);
    },
    // 继续
    goOn() {},
    // 取消
    cancel() {},

    // socket提交 发送给后端
    sendSocket(e) {
      // 接收聊天信息
      // 判断这是私聊还是群聊
      if (this.target === "friend") {
        // 私聊
        this.$socket.emit(
          "msg",
          e,
          localStorage.getItem("id"),
          localStorage.getItem("friendID") // 这里是好友id
        ); // 事件、消息的内容、发送方、接收方
      } else {
        // 群聊
        this.$socket.emit(
          "groupMsg",
          e,
          localStorage.getItem("id"),
          localStorage.getItem("friendID") // 这里是群id
        ); // 事件、消息的内容、发送方、接收方
      }
    },
    // 从数据库中获取聊天数据
    getMsg() {
      // 接收现在的页码，然后分段渲染聊天数据
      getTalkMessage({
        userID: this.userID,
        friendID: this.friendID,
        target: this.target,
      })
        .then((res) => {
          let msg = res.data;
          if (msg[0]) {
            for (let i = 0; i < msg.length; i++) {
              if (i < msg.length) {
                // 如果是最后一条数据（即最顶上的数据），就不进行匹配
                // 时间间隔
                let t = myfun.spaceTime(this.oldTime, msg[i].time);
                if (t) {
                  // 根据在myfun里写的方法，如果有返回值，就替换掉最新的值
                  this.oldTime = t;
                }
                msg[i].time = t; // 要放到页面上展示的时间，如果没有返回值就是不显示，有返回值就显示
              }
              if (msg[i].types === "1" || msg[i].types === "2") {
                msg[i].message = this.$store.state.chatImg + msg[i].message;
              }
              if (msg[i].types === "2") {
                msg[i].message = {
                  voice: msg[i].message,
                  time: msg[i].time2,
                };
              }
              if (i < 10) {
                this.showMsg.unshift(msg[i]); // 倒序插入
              }
              this.msgs.unshift(msg[i]); // 倒序插入
            }
          }
          console.log(this.msgs);
        })
        .catch((err) => {});
    },
    // 听语音
    listenVoice(e) {
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
      this.scroll.scrollToElement(this.a[this.a.length - 1], 0);
    },
    imageLoad() {
      this.scroll.refresh(); // 当src资源加载完成之后调用refresh方法
      this.scrollToBottom();
    },
    // 返回上一级路由
    goback() {
      this.$router.back();
    },
    // 处理时间
    changeTime(data) {
      return myfun.dateTime(data);
    },
    // 跳转到userhome页
    toUserHome(index) {
      console.log(this.msgs[index].userID); // 获取到当前用户的id
      let path = "";
      if (localStorage.getItem("target") === "friend") {
        // 是一对一聊天
        path = `/userhome?id=${this.msgs[index].userID}&tip=1&target=friend`;
        this.$router.push({ path });
      } else if (this.msgs[index].userID === localStorage.getItem("id")) {
        // 点击的是自己
        path = `/userhome?id=${this.msgs[index].userID}&tip=2&target=friend`;
        this.$router.push({ path });
      } else {
        // 点击的是群里的陌生人
        lookPerson({
          userID: this.userID,
          friendID: this.msgs[index].userID,
        }).then((res) => {
          console.log(res.data);
          if (res.data.msg === "ok") {
            path = `/userhome?id=${this.msgs[index].userID}&tip=1&target=friend`;
          }
          this.$router.push({ path });
        });
      }
    },

    init() {
      // 这么做是为了防止内存泄漏
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true, // 不添加的话会和vue-photo-preview插件发生冲突
          tap: "tap", // 不添加的话会和vue-photo-preview插件发生冲突
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
      this.scroll.on("scroll", (position) => {
        this.scroll.y = position.y + 0;
        // console.log(position.x, position.y);
      });
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
      this.pushData();
      setTimeout(() => {
        console.log("刷新中");
      }, 1000);
    },

    pushData() {
      let count = this.msgs.length - this.nowPage * 10;
      if (count > 10) {
        for (let i = 0; i < 10; i++) {
          if (
            (this.nowPage + 1) * 10 < this.msgs.length ||
            this.msgs.length > this.nowPage * 10
          ) {
            this.showMsg.unshift(
              this.msgs[this.msgs.length - (this.nowPage + 1) * 10 + (10 - i)]
            );
          }
        }
      } else if (count > 0 && count < 10) {
        for (let i = 0; i < count; i++) {
          if (
            (this.nowPage + 1) * 10 < this.msgs.length ||
            this.msgs.length > this.nowPage * 10
          ) {
            this.showMsg.unshift(
              this.msgs[
                this.msgs.length - (this.nowPage + 1) * 10 + (10 - count)
              ]
            );
          }
        }
      }

      this.nowPage += 1;
    },

    // 完成刷新
    async finishPullDown() {
      this.scroll.finishPullDown();
      setTimeout(() => {
        this.beforePullDown = true;
      }, 900);
    },
  },
};
</script>

<style scoped>
.content {
  height: 100vh;
  background-color: rgb(243, 243, 243);
}
.top-bar {
  background-color: rgb(243, 243, 243);
}
.top-right {
  padding-right: 16px;
  font-size: 18px;
  font-weight: 550;
  font-family: PingFangSC-Medium;
  color: black;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 44px;
}
.top-right img {
  width: 30px;
  position: absolute;
  height: 30px;
  right: 16px;
  top: 8px;
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
  padding: 10px 16px;
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
.file {
  border: 5px solid rgb(18, 183, 245);
  width: 200px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: white;
}
.file-top {
  padding: 10px;
  display: flex;
}
.file-top-left {
  background-image: url("../../static/images/chatroom/MP3.png");
  width: 50px;
  height: 50px;
  background-size: 50px 50px;
}
.file-top-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5px;
  max-width: 100px;
}
.file-topName {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.file-topSize {
  padding-top: 5px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
.file-middle {
  background-color: rgba(0, 0, 0, 0.2);
  height: 2px;
}
.file-bottom {
  display: flex;
  justify-content: end;
  padding: 10px;
}
.file-bottomItem {
  padding: 0 5px 0 0;
  color: rgb(18, 183, 245);
}
</style>