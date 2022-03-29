<template>
  <div class="content">
    <!-- 头部 -->
    <div class="top-bar">
      <router-link class="top-bar-left" to="/userdetail">
        <!-- 头像 -->
        <img :src="getImg" alt="" />
      </router-link>
      <!-- logo -->
      <div class="top-bar-center">
        <img src="../../static/images/index/logo.gif" alt="" />
      </div>
      <!-- 搜索和创建的图标 -->
      <div class="toop-bar-right">
        <div class="add" @click="create">
          <img src="../../static/images/index/add.png" alt="" />
        </div>
        <div class="search" @click="toSearch">
          <img src="../../static/images/index/search.png" alt="" />
        </div>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="main">
      <div class="friends">
        <div @click="toFriendRequest" class="friend-list">
          <!-- 左边部分,即头像 -->
          <div class="friend-list-l">
            <span class="tip">1</span>
            <img
              class="friend-list-l-img"
              src="../../static/images/index/添加.png"
              alt=""
            />
          </div>
          <!-- 右边部分 -->
          <div class="friend-list-r">
            <div class="top">
              <div class="name">好友申请</div>
              <div class="time">23点50分</div>
            </div>
            <div class="message">你好</div>
          </div>
        </div>
      </div>
      <div class="friends">
        <div
          class="friend-list"
          v-for="(friend, index) in friends"
          :key="index"
        >
          <router-link
            :to="{
              path: '/chatroom',
              query: {
                id: friend.friendID,
                name: friend.name,
                target: 'friend',
              },
            }"
          >
            <!-- 左边部分,即头像 -->
            <div class="friend-list-l">
              <span class="tip" v-if="friend.tip">{{ friend.tip }}</span>
              <img :src="friend.imgurl" alt="" />
            </div>
            <!-- 右边部分 -->
            <div class="friend-list-r">
              <div class="top">
                <div class="name">{{ friend.name }}</div>
                <div class="time">{{ changeTime(friend.time) }}</div>
              </div>
              <div class="message">
                {{ friend.message }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import datas from "../../commons/js/datas.js";
import myfun from "../../commons/js/myfun.js";
export default {
  data() {
    return {
      getImg: "",
      friends: [],
      img: "",
    };
  },
  // 注册socket
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
      console.log("我在首页收到了");
      let middleMsg = ""; // 拿一个变量来显示在主页上的文字信息
      // 判断接收的message类型是图片、文字还是语音
      if (msg[0].types === "0") {
        console.log("发过来的是文字");
        // 文字
        middleMsg = msg[0].message;
      } else if (msg[0].types === "1") {
        // 图片
        middleMsg = "[图片]";
      } else {
        // 语音
        middleMsg = "[语音]";
      }
      console.log(msg);
      for (let i = 0; i < this.friends.length; i++) {
        if (this.friends[i]._id === msg[0].id) {
          console.log("好友收到了");
          let e = this.friends[i];
          e.tip += 1; // 未读消息累加
          e.time = new Date(); // 接收到消息的时间
          e.message = middleMsg; // 显示在页面上的最后一条消息
          // 删除原来的数据项
          this.friends.splice(i, 1);
          // 接收到消息的用户插入到最顶部
          this.friends.unshift(e);
        }
      }
    },
  },
  created() {
    this.getFriends();
  },
  mounted() {
    this.tips();
    // 往服务端发送自己的id
    this.$socket.emit("register", localStorage.getItem("id"));
    this.getImg = localStorage.getItem("imgurl");
  },
  methods: {
    //转换时间
    changeTime(date) {
      return myfun.dateTime(date);
    },
    //获取好友列表数据
    getFriends() {
      this.$axios({
        method: "post",
        url: "api/friend/render",
        data: {
          id: localStorage.getItem("id"),
        },
      })
        .then((res) => {
          console.log("获取到的好友列表", res.data);
          this.friends = res.data;
          for (let i = 0; i < this.friends.length; i++) {
            this.friends[i].imgurl =
              "http://localhost:8080/api/userImg/" + this.friends[i].imgurl;
            if (this.friends[i].types === "1") {
              // 图片
              this.friends[i].message = "[图片]";
            } else if (this.friends[i].types === "2") {
              // 语音
              this.friends[i].message = "[语音]";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //跳转到search页面
    toSearch() {
      this.$router.push("/search");
    },
    // 跳转到建群页面
    create() {
      this.$router.push("create");
    },
    // 判断信息tip是否大于99条
    tips() {
      for (let i = 0; i < this.friends.length; i++) {
        if (this.friends[i].tip > 99) {
          this.friends[i].tip = "99";
        }
      }
    },

    // 去好友申请列表
    toFriendRequest() {
      this.$router.push("friendrequest");
    },
  },
};
</script>

<style scoped>
/* @import "../../commons/css/index.css"; */
.top-bar {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
.top-bar-left {
  float: left;
  padding-left: 8px;
}
.top-bar-left img {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  padding-top: 5px;
}
.top-bar-center img {
  height: 36px;
  width: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.add {
  padding-right: 8px;
}
.search,
.add {
  float: right;
  width: 44px;
  height: 44px;
}
.search img,
.add img {
  width: 26px;
  height: 26px;
  padding: 9px 0 0 9px;
}
.main {
  padding: 52px 0 0;
  width: 100%;
}
.text {
  font-size: 18px;
  font-weight: 550;
  font-family: PingFangSC-Medium;
  color: black;
  line-height: 44px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main {
  padding: 52px 0 0;
  width: 100%;
}
.friend-list {
  height: 48px;
  padding: 8px 0;
}
.friend-list:active {
  background-color: rgba(230, 230, 230, 0.4);
}
.friend-list .friend-list-l {
  position: relative;
  float: left;
}
.friend-list-l img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #ffe431;
  margin-left: 8px;
}
.friend-list-l-img {
  width: 48px;
  height: 48px;
  padding: 8px;
  box-sizing: border-box;
}
.tip {
  position: absolute;
  top: -3px;
  z-index: 10;
  left: 40px;
  min-width: 18px;
  height: 18px;
  background: rgba(255, 93, 91, 1);
  border-radius: 9px;
  color: #fff;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  padding: 1px;
}
.friend-list-r {
  padding-left: 64px;
  padding-right: 16px;
}
.top {
  color: rgba(39, 40, 50, 0.4);
  height: 25px;
}
.name {
  float: left;
  font-size: 17px;
  font-weight: 550;
  color: rgb(39, 40, 50);
  line-height: 25px;
}
.top .time {
  float: right;
  line-height: 25px;
  font-size: 12px;
}
.message {
  font-size: 14px;
  color: rgba(39, 40, 50, 0.6);
  line-height: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /**数值代表是几行 */
  -webkit-box-orient: vertical;
}
</style>