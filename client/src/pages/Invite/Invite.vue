<template>
  <div>
    <TopBar>
      <template v-slot:left>
        <img
          @click="back"
          src="../../static/images/Userhome/左箭头.png"
          alt=""
        />
      </template>
      <template v-slot:center>
        <div>邀请好友</div>
      </template>
    </TopBar>
    <!-- 正文 -->
    <div class="main">
      <div class="top">
        <!-- 群头像 -->
        <div class="group-img">
          <img v-if="group.groupImgurl" :src="group.groupImgurl" alt="" />
        </div>
        <!-- 群名 -->
        <div class="group-name">
          <input
            v-model="group.name"
            class="group-name-input"
            type="text"
            placeholder="群名称"
            disabled
          />
        </div>
        <div class="title">用户</div>
      </div>
      <!-- 选择用户 -->
      <UserList :user="user" />
      <!-- 底部按钮 -->
      <div class="bottom-bar">
        <div
          @click="inviteMember"
          :class="{ canCreate: getNumber > 0 }"
          class="bottom-btn"
        >
          邀请（{{ getNumber }}）
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../../components/TopBar/TopBar.vue";
import UserList from "../../components/UserList/UserList.vue";
import { friendShow, inviteFriend } from "../../request/http";
import { throttle } from "../../util/throttle.js";

export default {
  data() {
    return {
      group: [], // 关于群的信息
      user: [], // 关于好友的信息
      number: 0, // 选择的好友数，默认值为0
    };
  },
  components: {
    TopBar,
    UserList,
  },
  computed: {
    getNumber() {
      return this.$store.state.inviteNumber;
    },
  },
  created() {
    // 获取好友列表
    friendShow({
      id: localStorage.getItem("id"),
      friendID: localStorage.getItem("friendID"),
    }).then((res) => {
      this.user = res.data.info;
      res.data.group[0].groupImgurl =
        this.$store.state.userImg + res.data.group[0].groupImgurl;
      this.group = res.data.group[0];
      for (let i = 0; i < this.user.length; i++) {
        this.user[i].imgurl = this.$store.state.userImg + this.user[i].imgurl;
        this.$set(this.user[i], "selected", false);
      }
    });
  },
  methods: {
    back() {
      this.$router.back();
    },

    // 邀请成员
    inviteMember: throttle(function () {
      if (this.getNumber > 0) {
        this.$toast({
          message: "邀请成功",
          icon: require("../../static/images/Userhome/成功.jpg"),
        });

        let ids = []; // 群用户的id
        for (let i = 0; i < this.user.length; i++) {
          if (this.user[i].selected) {
            ids.push(this.user[i].friendID);
          }
        }
        inviteFriend({
          inviteID: localStorage.getItem("id"), // 邀请人id
          groupID: localStorage.getItem("friendID"),
          friendID: ids,
        }).then((res) => {
          if (res.data.msg === "ok") {
            this.$router.back();
            this.$store.state.inviteNumber = 0;
          }
        });
      }
    }, 1000),
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
.top {
  padding-top: 48px;
  position: fixed;
  background-color: #fff;
  width: 100%;
  z-index: 100;
  top: 44px;
}
.group-img {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background: #ffe431;
  box-shadow: 0 18px 20px 0 rgba(39, 40, 50, 0.1);
  border-radius: 20px;
}
.group-img img {
  width: 100px;
  border-radius: 20px;
  height: 100px;
}
.group-name {
  padding: 20px 0 5px 0;
  text-align: center;
}
.group-name-input {
  text-align: center;
  font-size: 26px;
  color: #272832;
  width: 320px;
  height: 45px;
  background: rgb(240, 242, 244);
  border-radius: 23px;
}
.hiddenInput {
  display: none;
}
.group-img-tip {
  font-size: 14px;
  padding-top: 15px;
  text-align: center;
  color: rgba(255, 0, 0, 0.6);
}

.title {
  padding: 20px 0 0 20px;
  font-size: 22px;
  font-weight: 600;
  color: #272832;
  line-height: 30px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding-top: 10px;
  background: white;
}
.bottom-btn {
  margin: 0 16px;
  text-align: center;
  line-height: 45px;
  height: 45px;
  background: rgb(200, 200, 200);
  border-radius: 5px;
  font-size: 18px;
}
.canCreate {
  background: #ffe431;
}
</style>