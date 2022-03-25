<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <div class="top-left" @click="back">
        <img src="../../static/images/Userhome/左箭头.png" alt="" />
      </div>
      <div class="top-bar-right">
        <img src="../../static/images/Userhome/三点.png" alt="" />
      </div>
    </div>
    <!-- 背景图片 -->
    <div class="bg">
      <img class="bg-img" src="../../static/images/Userhome/成功.jpg" alt="" />
    </div>
    <!-- 下面的内容 -->
    <div class="main">
      <div class="main-inner">
        <div class="gropu-info">
          <div class="group-name">群名称</div>
          <div class="group-time">2022年3月25日</div>
          <div class="group-notice">
            这里是群简介群简介群简介群简介群简介群简介群简介群简介群简介群简介群简介群简介。
          </div>
        </div>
        <div class="member">
          <div class="member-top">
            <div class="member-title">群成员</div>
            <div class="member-more">管理群成员</div>
            <img
              class="more-img"
              src="../../static/images/Userdetail/右箭头.png"
              alt=""
            />
          </div>
          <div class="memeber-middle">
            <div
              class="member-list"
              v-for="(item, index) in member"
              :key="index"
            >
              <div class="imgs">
                <img
                  class="user-delete"
                  src="../../static/images/chatroom/叉叉.png"
                  alt=""
                />
                <img class="user-img" :src="item.imgurl" alt="" />
              </div>
              <div class="user-name">{{ item.name }}</div>
            </div>
            <div class="member-list">
              <div class="imgs">
                <img
                  class="user-add"
                  src="../../static/images/chatroom/加号.png"
                  alt=""
                />
              </div>
              <div class="user-name">邀请</div>
            </div>
          </div>
        </div>
        <div class="group-detail">
          <div class="row">
            <div class="row-title">群名称</div>
            <div class="row-content">群名称</div>
            <div class="more">
              <img src="../../static/images/Userdetail/右箭头.png" alt="" />
            </div>
          </div>
          <div class="row">
            <div class="row-title">群头像</div>
            <div class="row-content">
              <img
                class="group-img"
                src="../../static/images/Userhome/成功.jpg"
                alt=""
              />
            </div>
            <div class="more">
              <img src="../../static/images/Userdetail/右箭头.png" alt="" />
            </div>
          </div>
          <div class="row">
            <div class="row-title">群公告</div>
            <div class="row-content">
              这是一个群简介群简介群简介群简介群简介群简介群简介群简介群简介群简介
            </div>
            <div class="more">
              <img src="../../static/images/Userdetail/右箭头.png" alt="" />
            </div>
          </div>
        </div>
        <div class="btn2" @click="logout">退出群聊</div>
      </div>
    </div>
  </div>
</template>

<script>
import datas from "../../commons/js/datas.js";
export default {
  data() {
    return {
      member: "", // 群成员信息
    };
  },
  created() {
    localStorage.setItem("friendID", this.$route.query.id);
    this.friendID = localStorage.getItem("friendID");
    this.getMember();
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.back();
    },

    // 获取群成员
    getMember() {
      this.member = datas.friends();
      // console.log(this.member);
      for (let i = 0; i < this.member.length; i++) {}
    },

    // 退出群聊
    logout() {
      this.$router.replace("/index");
    },
  },
};
</script>

<style scoped>
.bg-img {
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  box-sizing: border-box;
}
.main {
  padding-top: 180px;
}
.main-inner {
  width: 100%;
  background-color: white;
  border-radius: 20px 20px 0 0;
  min-height: 500px;
}
.gropu-info {
  padding: 20px 16px;
  border-bottom: 1px solid #eee;
}
.group-name {
  float: left;
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
}
.group-time {
  float: right;
  font-size: 14px;
  color: rgba(39, 40, 50, 0.5);
  line-height: 33px;
}
.group-notice {
  padding-top: 10px;
  clear: both;
  font-size: 14px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.member {
  border-bottom: 1px solid #eee;
}
.member-top {
  padding: 20px 16px;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.member-title {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
}
.member-more {
  float: right;
  padding-right: 5px;
  color: rgba(39, 40, 50, 0.5);
}
.more-img {
  width: 16px;
  height: 16px;
}
.memeber-middle {
  width: 100%;
  padding: 10px 8px 20px;
  box-sizing: border-box;
}
.member-list {
  padding-bottom: 16px;
  width: 20%;
  float: left;
  text-align: center;
}
.imgs {
  display: inline-block;
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: rgb(255, 228, 49);
}
.user-img {
  width: 52px;
  height: 52px;
  border-radius: 10px;
}
.user-delete {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -6px;
  right: -6px;
  z-index: 10;
}
.user-name {
  margin: 0 4px;
  font-size: 14px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.user-add {
  width: 52px;
  height: 52px;
  padding: 16px;
  box-sizing: border-box;
}
.group-detail {
  display: flex;
  flex-direction: column;
  padding-top: 11px;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.row {
  display: flex;
  flex-direction: row;
}
.row-title {
  flex: none;
  padding: 0 16px;
  font-size: 16px;
  line-height: 56px;
}
.row-content {
  flex: auto;
  font-size: 16px;
  line-height: 56px;
  height: 56px;
  color: rgba(39, 40, 50, 0.6);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.more {
  flex: none;
  height: 54px;
  align-items: center;
  display: flex;
}
.more img {
  width: 20px;
  height: 20px;
  padding-right: 10px;
}
.btn2 {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #ff5d5b;
  font-weight: 400;
  text-align: center;
  margin: 80px 0 20px 0;
  line-height: 44px;
}
.group-img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-top: 8px;
}
</style>