<template>
  <div class="content">
    <!-- 头部 -->
    <div class="top-bar">
      <!-- 搜索框 -->
      <div class="search-div">
        <img
          class="search-img"
          src="../../static/images/search/search.png"
          alt=""
        />
        <input
          type="search"
          placeholder="搜索用户/群"
          class="search"
          @input="search"
        />
      </div>
      <div class="top-bar-right">
        <div class="text" @click="back">取消</div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="main">
      <div class="search-user result">
        <div class="title" v-if="userarr.length > 0">用户</div>
        <div class="list user" v-for="(user, index) in userarr" :key="index">
          <!-- 左边是头像、名字和用户 -->
          <router-link :to="{ path: '/userhome', query: { id: 1 } }">
            <img :src="user.imgurl" alt="" />
          </router-link>
          <div class="names">
            <div class="name" v-html="user.name"></div>
            <div class="email" v-html="user.email"></div>
          </div>
          <!-- 右边是进行的操作 -->
          <div class="right-btn adds" v-if="user.tip == 0">加好友</div>
          <div class="right-btn send" v-if="user.tip == 1">发消息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datas from "../../commons/js/datas.js";
export default {
  data() {
    return {
      userarr: [],
    };
  },
  methods: {
    //获取关键词
    search(e) {
      this.userarr = [];
      let searchVal = e.target.value;
      //当字符串长度大于0时才开始进行匹配
      if (searchVal.length > 0) {
        this.searchUser(searchVal);
      }
    },
    //寻找关键词匹配的用户.
    searchUser(e) {
      let arr = datas.friends();
      let exp = eval("/" + e + "/g"); //封装在正则里面
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.search(e) != -1 || arr[i].email.search(e) != -1) {
          this.isFriend(arr[i]);
          arr[i].name = arr[i].name.replace(
            exp,
            '<span style="color:#4aaaff">' + e + "</span>"
          );
          arr[i].email = arr[i].email.replace(
            exp,
            '<span style="color:#4aaaff">' + e + "</span>"
          );
          this.userarr.push(arr[i]);
        }
      }
      // console.log(this.userarr);
    },
    //判断是否为为好友
    isFriend(e) {
      let tip = 0; //先默认搜索出来的每个人都不是好友(0不是好友,1是好友)
      let arr = datas.isFriend(); //获取好友列表
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].friend == e.id) {
          //好友表中friend的id与搜索出来的用户id相同，则认为是好友关系
          tip = 1; //是好友关系
        }
      }
      e.tip = tip; //存入搜索出来的数组中
      // console.log(e.tip);
    },
    //返回上一页
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
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
.text {
  font-size: 18px;
  font-weight: 550;
  font-family: PingFangSC-Medium;
  color: black;
  line-height: 44px;
}
.top-bar-right {
  float: right;
  padding-right: 16px;
}
.search {
  float: none;
  width: 300px;
  height: 30px;
  background: rgb(243, 244, 246);
  border-radius: 5px;
  padding: 0 30px 0 6px;
}
.search-div {
  float: left;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  box-sizing: border-box;
  padding: 7px 59px 7px 16px;
}
.search-img {
  width: 20px;
  height: 20px;
  float: right;
  position: absolute;
  right: 65px;
  top: 12px;
}
.main {
  padding-top: 44px;
}
.result {
  padding-top: 16px;
}
.title {
  height: 30px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 22px;
  padding-left: 16px;
}
.list {
  width: 100%;
  height: 40px;
  padding: 10px 0;
}
.list img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  float: left;
  padding-left: 21px;
}
.names {
  padding-left: 16px;
  float: left;
}
.name {
  font-size: 18px;
  color: rgb(39, 40, 50);
  line-height: 25px;
  font-weight: 600;
}
.right-btn {
  float: right;
  width: 60px;
  height: 24px;
  border-radius: 12px;
  font-weight: 600;
  margin-right: 16px;
  line-height: 24px;
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
}
.email {
  line-height: 14px;
  font-size: 12px;
}
.send {
  background: rgb(255, 228, 49);
  color: rgb(39, 40, 50);
}
.adds {
  background: rgba(74, 170, 255, 0.1);
  color: #4aaaff;
}
</style>