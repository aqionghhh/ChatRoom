<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <div class="top-left" @click="back">
        <img
          @click="back"
          src="../../static/images/Userhome/左箭头.png"
          alt=""
        />
      </div>
      <div class="top-bar-right">
        <img
          @click="toUserDetail"
          src="../../static/images/Userhome/三点.png"
          alt=""
        />
      </div>
    </div>
    <!-- 内容 -->
    <div class="bg">
      <div class="bg-bai"></div>
      <img class="bg-img" :src="user.img" alt="" />
    </div>
    <div class="main">
      <div class="user-header">
        <div
          v-if="user.sex === '女'"
          class="sex"
          :style="{ background: sexBg[0] }"
        >
          <img src="../../static/images/Userhome/女性.png" alt="" />
        </div>
        <div
          v-else-if="user.sex === '男'"
          class="sex"
          :style="{ background: sexBg[1] }"
        >
          <img src="../../static/images/Userhome/男性.png" alt="" />
        </div>
        <div
          v-else-if="user.sex === '未知'"
          class="sex"
          :style="{ background: sexBg[2] }"
        >
          <img src="../../static/images/Userhome/未知性别.png" alt="" />
        </div>
        <div v-else class="sex" :style="{ background: sexBg[2] }">
          <img src="../../static/images/Userhome/群聊.png" alt="" />
        </div>
        <img class="user-img" :src="user.img" alt="" />
      </div>
      <div class="user-info">
        <div class="name">{{ user.name }}</div>
        <div class="nick" v-show="user.email">邮箱：{{ user.email }}</div>
        <div class="nick" v-show="user.notice">群公告：{{ user.notice }}</div>
        <div class="intr" v-show="user.email">签名：{{ user.intr }}</div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-bar">
      <div v-if="tip === '0'" @click="addFriendAnimate" class="bottom-btn">
        <div v-if="target === 'friend'">加为好友</div>
        <div v-else>申请加群</div>
      </div>
      <router-link
        :to="{
          path: '/chatroom',
          query: { id: friendID, name: user.name, target: target },
        }"
      >
        <div v-if="tip === '1'" class="bottom-btn">发送消息</div>
      </router-link>
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
          v-if="target === 'friend'"
          class="add-main"
          v-model="friendRequest"
          maxlength="120"
        ></textarea>
        <textarea
          v-if="target === 'group'"
          class="add-main"
          v-model="groupRequest"
          maxlength="120"
        ></textarea>
      </div>
    </transition>
    <transition
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <!-- 按钮 -->
      <div class="add-bt" v-show="animation">
        <div class="close" @click="addFriendAnimate">取消</div>
        <div class="send" @click="sendRequest">发送</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getHeight } from "../../mixin/getHeight";
import {
  userMsg,
  groupMsg,
  friendRequest,
  groupRequest,
} from "../../request/http";

export default {
  data() {
    return {
      sexBg: ["rgb(255,93,91)", "rgb(25,144,254)", "rgb(255,228,49)"], // 分别对应女、男、未知
      user: {
        img: "", // 头像
        name: "", //名字
        email: "", //昵称
        intr: "", //介绍
        sex: "", // 性别
        notice: "", // 群公告
      },
      myname: "",
      height: 0,
      animation: false, //添加好友弹窗
      tip: "", // 根据传进来的tip判断当前用户是否为好友，1为好友，0为陌生人；1为群成员，0为未加群
      friendID: "", // 朋友id或群id
      target: "", // 表示当前是群还是好友
      friendRequest: "请求加为好友~",
      groupRequest: "请求加群~",
    };
  },
  created() {
    window.addEventListener(".bg", this.getHeight); //注册监听器
    this.getHeight(200); //页面创建时调用
    this.tip = this.$route.query.tip; // 传进来的是字符串
    this.friendID = this.$route.query.id;
    if (this.$route.query.target === "group") {
      // 群聊天
      groupMsg({
        id: this.friendID,
      }).then((res) => {
        console.log(res.data.msg);
        this.user.name = res.data.msg[0].name;
        this.user.img = this.$store.state.userImg + res.data.msg[0].imgurl;
        this.user.notice = res.data.msg[0].notice;
        this.target = "group";
      });
    } else {
      // 好友
      userMsg({
        id: this.$route.query.id,
      }).then((res) => {
        console.log(res.data);
        this.user.name = res.data.name;
        this.user.email = res.data.email;
        this.user.img = this.$store.state.userImg + res.data.imgurl;
        if (res.data.sign === "编辑你的个人签名") {
          this.user.intr = "无";
        } else {
          this.user.intr = res.data.sign;
        }
        if (res.data.sex === "asexual") {
          console.log(1111111);
          this.user.sex = "未知";
          console.log(this.user.sex);
        } else {
          this.user.sex = res.data.sex;
        }
        this.target = "friend";
      });
    }

    this.myname = localStorage.getItem("name");
    // 获取用户信息
  },
  mixins: [getHeight],
  methods: {
    //返回上一页
    back() {
      this.$router.back();
    },
    //添加好友动画
    addFriendAnimate() {
      this.animation = !this.animation;
    },
    // 发送好友请求
    sendRequest() {
      if (this.target === "friend") {
        friendRequest({
          userID: localStorage.getItem("id"), // 自己的id
          friendID: this.$route.query.id, // 好友的id
          state: "1", // 发送请求
          message: this.myname + "" + this.friendRequest,
        }).then((res) => {
          console.log(res.data);
          if (res.data.status === 501) {
            this.$toast({
              message: "别发那么多次！",
              icon: require("../../static/images/Userhome/成功.jpg"),
            });
          } else {
            this.$toast({
              message: "发送成功",
              icon: require("../../static/images/Userhome/成功.jpg"),
            });
          }
          this.animation = false;
        });
      } else {
        groupRequest({
          userID: localStorage.getItem("id"), // 自己的id
          friendID: this.$route.query.id, // 群的id
          state: "1", // 发送请求
          message: this.myname + "" + this.groupRequest,
        }).then((res) => {
          console.log(res.data);
          if (res.data.status === 501) {
            this.$toast({
              message: "别发那么多次！",
              icon: require("../../static/images/Userhome/成功.jpg"),
            });
          } else {
            this.$toast({
              message: "发送成功",
              icon: require("../../static/images/Userhome/成功.jpg"),
            });
          }
          this.animation = false;
        });
      }
    },
    // 去用户详情页
    toUserDetail() {
      if (this.$route.query.target === "group") {
        this.$router.push({
          path: `/groupdetail?id=${this.friendID}`,
        });
      } else {
        this.$router.push({
          path: `/userdetail?id=${this.friendID}`,
        });
      }
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
  z-index: -2;
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
  z-index: 11;
}
.sex img {
  width: 20px;
  height: 20px;
  padding: 5px;
  position: relative;
  z-index: 12;
}
.user-img {
  height: 200px;
  width: 200px;
  border-radius: 24px;
  border: 3px solid rgb(255, 255, 255);
  z-index: 10;
  position: relative;
  box-shadow: 0 18px 20px 0 rgba(39, 40, 50, 0.1);
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
  height: 45px;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 64px;
}
.bottom-btn {
  margin: 0 16px;
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
  height: 160px;
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
  padding: 5px 16px 64px;
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