<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <div class="top-left" @click="back">
        <img src="../../static/images/Userhome/左箭头.png" alt="" />
      </div>
    </div>
    <!-- 背景图片 -->
    <div class="bg">
      <img class="bg-img" :src="groupImgurl" alt="" />
    </div>
    <!-- 下面的内容 -->
    <div class="main">
      <div class="main-inner">
        <div class="gropu-info">
          <div class="group-name">{{ groupName }}</div>
          <div class="group-time">{{ changeTime(createTime) }}</div>
          <div class="group-notice">
            {{ groupNotice }}
          </div>
        </div>
        <div class="member">
          <div class="member-top">
            <div class="member-title">群成员</div>
            <div class="member-more" v-show="isMember" @click="manageMember">
              管理群成员
            </div>
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
                  v-show="deleteMember"
                  @click="masterDelete(index)"
                  class="user-delete"
                  src="../../static/images/chatroom/叉叉.png"
                  alt=""
                />
                <img class="user-img" :src="item.imgurl" alt="" />
              </div>
              <div class="user-name">{{ item.name }}</div>
            </div>
            <div class="member-list" v-show="isMember">
              <div class="imgs" @click="inviteMember">
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
            <div class="row-content">{{ groupName }}</div>
            <div
              class="more"
              v-show="isMember"
              @click="animationChange($event, '群名称', groupName)"
            >
              <img src="../../static/images/Userdetail/右箭头.png" alt="" />
            </div>
          </div>
          <div class="row">
            <div class="row-title">群头像</div>
            <div class="row-content">
              <img
                @click="toChange"
                class="group-img"
                :src="groupImgurl"
                alt=""
              />
              <input
                type="file"
                accept="image/*"
                @change="handleFile"
                class="hiddenInput"
                ref="hidden"
              />
            </div>
            <div class="more">
              <img src="../../static/images/Userdetail/右箭头.png" alt="" />
            </div>
          </div>
          <div class="row">
            <div class="row-title">群公告</div>
            <div class="row-content">
              {{ groupNotice }}
            </div>
            <div
              v-show="isMember"
              class="more"
              @click="animationChange($event, '群公告', groupNotice)"
            >
              <img src="../../static/images/Userdetail/右箭头.png" alt="" />
            </div>
          </div>
        </div>
        <div v-show="isMember" class="btn2" @click="logout">退出群聊</div>
      </div>
    </div>
    <!-- 修改的弹出层 -->
    <transition
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div class="modify" v-show="animation">
        <!-- 弹窗的头部 -->
        <div class="modify-header">
          <div class="close" @click="animationChange">取消</div>
          <div class="title">{{ modifyTitle }}</div>
          <div class="define" @click="determine">确定</div>
        </div>
        <!-- 弹窗的内容 -->
        <div class="modify-main">
          <textarea v-model="data" class="modify-content"></textarea>
        </div>
      </div>
    </transition>
    <Dialog :alertText="alertText" @closeTip="closeTip" v-show="showDialog" />
  </div>
</template>

<script>
import Dialog from "../../components/Dialog/Dialog";
import datas from "../../commons/js/datas.js";
import myfun from "../../commons/js/myfun.js";

export default {
  data() {
    return {
      animation: false, //弹窗是否显示
      data: "修改的内容", //弹窗的内容
      modifyTitle: "", //弹窗的标题
      member: [], // 群成员信息
      friendID: "",
      groupName: "",
      groupImgurl: "",
      groupNotice: "",
      createTime: "",
      deleteMember: false, // 是否显示删除群成员的按钮
      masterID: "", // 群主id
      showDialog: false,
      alertText: "", // 弹窗的文本
      deleteMemberID: "", // 要删除的成员的id
      deleteMemberIndex: "", // 要删除的成员的索引
      isMember: false, // 判断点击进来的是否是群里的人
    };
  },
  components: {
    Dialog,
  },
  created() {
    localStorage.setItem("friendID", this.$route.query.id);
    this.friendID = localStorage.getItem("friendID");
    this.getGroup();
  },
  methods: {
    //转换时间
    changeTime(date) {
      return myfun.dateTime(date);
    },
    //修改弹窗
    animationChange(e, type, data) {
      console.log("type", type);
      this.data = data; // 在文本框中显示内容
      this.modifyTitle = type; // 弹窗的标题
      this.animation = !this.animation;
    },

    //点击弹窗的确定按钮
    determine() {
      // 要修改的是昵称
      if (this.modifyTitle === "群名称") {
        // 先发送请求再关闭弹窗
        this.$axios({
          method: "post",
          url: "api/group/update1",
          data: {
            update: this.data,
            id: localStorage.getItem("friendID"),
          },
        }).then((res) => {
          console.log(res.data);
          // this.$store.commit("setInfo", res.data);
          this.groupName = res.data.msg;
          this.animationChange();
        });
        console.log(111);
      } else {
        // 要修改的是群公告
        this.$axios({
          method: "post",
          url: "api/group/update2",
          data: {
            update: this.data,
            id: localStorage.getItem("friendID"),
          },
        }).then((res) => {
          console.log(res.data);
          // this.$store.commit("setInfo", res.data);
          this.groupNotice = res.data.msg;
          this.animationChange();
        });
        console.log(222);
      }
    },
    // 打开图片上传
    toChange() {
      if (this.isMember) {
        this.$refs.hidden.click(); // 点击图片，实际上点击的是input按钮
      }
    },
    // 将头像显示，并且传到后端
    handleFile(e) {
      let reader = new FileReader();
      reader.readAsDataURL(e.srcElement.files.item(0));
      reader.onload = () => {
        console.log(reader.result);
        this.groupImgurl = reader.result;
        let formData = new FormData();
        formData.append("file", e.srcElement.files.item(0));
        formData.append("id", localStorage.getItem("friendID"));
        this.$axios({
          method: "post",
          data: formData,
          url: "api/group/updatefile",
        }).then((res) => {});
      };
    },

    // 邀请成员
    inviteMember() {
      this.$router.push("/invite");
    },
    // 返回上一页
    back() {
      this.$router.back();
    },

    // 获取群成员
    getMember() {
      this.member = datas.friends();
      for (let i = 0; i < this.member.length; i++) {}
    },
    // 获取群信息
    getGroup() {
      this.$axios({
        method: "post",
        url: "api/group/match",
        data: {
          id: this.friendID,
        },
      }).then((res) => {
        console.log(res.data);
        this.groupName = res.data.msg[0].name; // 群名
        this.groupImgurl =
          "http://localhost:8080/api/userImg/" + res.data.msg[0].imgurl;
        this.groupNotice = res.data.msg[0].notice;
        this.createTime = res.data.msg[0].time;
        this.masterID = res.data.member[0]._id;
        this.member = res.data.member;
        for (let i = 0; i < this.member.length; i++) {
          this.member[i].imgurl =
            "http://localhost:8080/api/userImg/" + this.member[i].imgurl;
          if (localStorage.getItem("id") === this.member[i]._id) {
            this.isMember = true;
          }
        }
      });
    },

    // 显示删除群成员的按钮
    manageMember() {
      if (localStorage.getItem("id") === this.masterID) {
        this.deleteMember = !this.deleteMember; // 如果是群主，才显示叉叉按钮
      }
    },

    // 删除群成员
    masterDelete(index) {
      console.log(index);
      console.log(this.member[index]._id);
      this.deleteMemberIndex = index;
      this.deleteMemberID = this.member[index]._id;
      if (index === 0) {
        this.showAlert("不能删除管理员");
      } else {
        this.showAlert("确认删除？");
      }
    },

    // 展示弹窗
    showAlert(text) {
      this.showDialog = true;
      this.alertText = text;
    },
    // 关闭弹窗
    closeTip(tip) {
      this.showDialog = false;
      this.alertText = "";
      if (tip === "deleteConfrim") {
        // 确认删除群成员
        console.log("deleteConfrim");
        this.$axios({
          method: "post",
          url: "api/group/delete",
          data: {
            userID: this.deleteMemberID,
          },
        }).then((res) => {
          this.member.splice(this.deleteMemberIndex, 1);
        });
      } else if (tip === "exitConfrim") {
        // 确认退出群聊
        if (this.masterID === localStorage.getItem("id")) {
          this.$toast({
            message: "群主不能退群",
            icon: require("../../static/images/Userhome/成功.jpg"),
          });
        } else {
          this.$axios({
            method: "post",
            url: "api/group/delete",
            data: {
              userID: localStorage.getItem("id"),
            },
          }).then((res) => {
            this.$router.replace("/index");
          });
        }
      }
    },

    // 退出群聊
    logout() {
      this.showAlert("确定退出？");
    },
  },
};
</script>

<style scoped>
.top-left {
  float: left;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}
.top-left img {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  left: 12px;
}
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
  margin: 75px 0 20px 0;
  line-height: 44px;
}
.group-img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-top: 8px;
}

/* 修改的弹窗 */
.modify {
  position: absolute;
  z-index: 1002;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.modify-header {
  width: 100%;
  height: 44px;
  /* padding-top: 44px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.modify-header .close {
  padding-left: 16px;
  font-size: 16px;
  line-height: 44px;
  color: rgb(39, 40, 50);
}
.modify-header .title {
  flex: auto;
  text-align: center;
  font-size: 20px;
  line-height: 44px;
  font-weight: 500;
}

.modify-header .define {
  padding-right: 16px;
  font-size: 16px;
  line-height: 44px;
  color: rgb(87, 153, 255);
}
.modify-main {
  display: flex;
  padding: 16px;
  flex-direction: column;
}
.modify-pwd {
  background: rgb(243, 244, 246);
  border-radius: 10px;
  font-size: 16px;
  line-height: 44px;
  height: 44px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 16px;
}
.modify-content {
  background: rgb(243, 244, 246);
  border-radius: 10px;
  border: none;
  height: 193px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  line-height: 44px;
  color: rgb(39, 40, 50);
  padding: 0 10px;
  flex: auto;
}
.hiddenInput {
  display: none;
}
.head_img img {
  width: 80px;
  height: 80px;
}
</style>