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
        <div>创建群聊</div>
      </template>
    </TopBar>
    <!-- 正文 -->
    <div class="main">
      <div class="top">
        <!-- 群头像 -->
        <div class="group-img" @click="uploadImg">
          <img :src="groupImg" alt="" />
          <input
            type="file"
            accept="image/*"
            @change="handleFile"
            class="hiddenInput"
            ref="hidden"
          />
        </div>
        <div class="group-img-tip">点击图片上传群头像</div>
        <!-- 群名 -->
        <div class="group-name">
          <input
            v-model="groupName"
            class="group-name-input"
            type="text"
            placeholder="群名称"
          />
        </div>
        <div class="title">用户</div>
      </div>
      <!-- 选择用户 -->
      <UserList :user="user" />
      <!-- 底部按钮 -->
      <div class="bottom-bar">
        <div
          @click="createGroup"
          :class="{ canCreate: getNumber > 1 && groupName && form }"
          class="bottom-btn"
        >
          创建（{{ getNumber }}）
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../../components/TopBar/TopBar.vue";
import UserList from "../../components/UserList/UserList.vue";
export default {
  data() {
    return {
      groupImg: require("../../static/images/chatroom/加号.png"), // 群头像
      user: [],
      groupName: "", // 群名
      form: "",
    };
  },
  components: {
    TopBar,
    UserList,
  },
  created() {
    // 获取好友列表
    this.$axios({
      method: "post",
      url: "api/friend/search",
      data: {
        id: localStorage.getItem("id"),
      },
    }).then((res) => {
      this.user = res.data.filter((item) => {
        return (
          item.state === "0" && item.friendID !== localStorage.getItem("id")
        );
      });

      for (let i = 0; i < this.user.length; i++) {
        this.user[i].imgurl =
          "http://localhost:8080/api/userImg/" + this.user[i].imgurl;
        this.$set(this.user[i], "selected", false);
      }
    });
  },
  computed: {
    getNumber() {
      return this.$store.state.number;
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 点击头像按钮
    uploadImg() {
      this.$refs.hidden.click(); // 点击图片，实际上点击的是input按钮
    },
    // 将头像显示
    handleFile(e) {
      this.form = e.srcElement.files.item(0);
      console.log(this.form);

      let url = window.URL.createObjectURL(e.srcElement.files.item(0)); // 把图片转成blob格式
      console.log("blob", url);
      this.groupImg = url;
    },

    // 创建群聊
    createGroup() {
      if (this.number > 1 && this.groupName && this.form) {
        this.$toast({
          message: "创建成功",
          icon: require("../../static/images/Userhome/成功.jpg"),
        });
        // 在这里发送请求
        let groupname = this.groupName.trim();

        let formData = new FormData();
        formData.append("file", this.form);
        formData.append("groupMaster", localStorage.getItem("id"));
        formData.append("groupName", this.groupName);
        let ids = []; // 群用户的id
        for (let i = 0; i < this.user.length; i++) {
          ids.push(this.user[i]._id);
        }
        formData.append("user", ids);
        this.$axios({
          method: "post",
          url: "api/group/createGroup",
          data: formData,
        }).then((res) => {
          if (res.data.message === "ok") {
            this.$router.replace("/index");
            this.$store.state.number = 1;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
.top {
  padding-top: 28px;
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