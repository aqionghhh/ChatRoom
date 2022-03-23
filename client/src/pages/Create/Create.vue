<template>
  <div>
    <div class="top-bar">
      <div class="top-left" @click="back">取消</div>
      <div class="top-bar-center">创建群聊</div>
      <div class="top-bar-right"></div>
    </div>
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
        <div class="group-img-tip">点击图片更换群头像</div>
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
      <div class="friends">
        <div
          @click="select(index)"
          class="user"
          v-for="(item, index) in user"
          :key="index"
        >
          <div class="selected" :class="{ isselected: item.selected }">
            <img
              src="../../static/images/Register/Group 3.png"
              v-if="item.selected"
              alt=""
            />
          </div>
          <img class="user-img" :src="item.imgurl" alt="" />
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
      <!-- 底部按钮 -->
      <div class="bottom-bar">
        <div
          @click="createGroup"
          :class="{ canCreate: number > 2 && groupName }"
          class="bottom-btn"
        >
          创建（{{ number }}）
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupImg: require("../../static/images/Userhome/成功.jpg"), // 群头像
      user: [],
      number: 1, // 选择的成员数，默认值为1，因为包括了自己
      groupName: "", // 群名
    };
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
      console.log("获取到的好友列表", res.data);
      let userarr = res.data.filter((item) => {
        return item.state === "0";
      });
      console.log("临时变量user数组", userarr); // 这里面是自己的好友

      // 返回所有的用户，再从所有的用户中筛选出有friendID的用户
      this.$axios({
        method: "post",
        url: "api/user/search",
      }).then((res) => {
        console.log(res.data);
        for (let i = 0; i < userarr.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (
              userarr[i].friendID === res.data[j]._id &&
              userarr[i].friendID !== localStorage.getItem("id")
            ) {
              this.user.push(res.data[j]);
              this.$set(this.user[i], "selected", false);
            } else if (
              userarr[i].userID === res.data[j]._id &&
              userarr[i].userID !== localStorage.getItem("id")
            ) {
              this.user.push(res.data[j]);
              this.$set(this.user[i], "selected", false);
            }
          }
        }
        console.log("处理完的数据", this.user);
      });
    });
  },
  methods: {
    // 返回首页
    back() {
      this.$router.replace("/index");
    },
    // 点击头像按钮
    uploadImg() {
      this.$refs.hidden.click(); // 点击图片，实际上点击的是input按钮
    },
    // 将头像显示
    handleFile(e) {
      let url = window.URL.createObjectURL(e.srcElement.files.item(0)); // 把图片转成blob格式
      console.log("blob", url);
      this.groupImg = url;
    },
    // 选择群成员
    select(e) {
      console.log(e);
      this.user[e].selected = !this.user[e].selected;
      if (this.user[e].selected === true) {
        this.number += 1;
        console.log(this.user[e].selected);
      } else {
        this.number -= 1;
      }
    },
    // 创建群聊
    createGroup() {
      if (this.number > 2 && this.groupName) {
        this.$toast({
          message: "创建成功",
          icon: require("../../static/images/Userhome/成功.jpg"),
        });
        // 在这里发送请求
        let groupname = this.groupName.trim();
        console.log(groupname);
      }
    },
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-left {
  font-size: 18px;
  padding: 12px 0 0 16px;
}
.top-bar-center {
  text-align: center;
  color: #272832;
  font-weight: 550;
  font-size: 20px;
  line-height: 44px;
}
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
.friends {
  padding: 300px 20px 80px 20px;
}
.title {
  padding: 20px 0 0 20px;

  font-size: 22px;
  font-weight: 600;
  color: #272832;
  line-height: 30px;
}
.user {
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
}
.selected {
  flex: none;
  margin-right: 10px;
  width: 24px;
  height: 24px;
  background: rgba(255, 228, 49, 0.5);
  border-radius: 12px;
}
.isselected {
  background: rgba(255, 228, 49, 1);
}
.selected img {
  width: 15px;
  height: 15px;
  padding-left: 5px;
  padding-top: 5px;
}
.user-img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex: none;
}
.name {
  padding-left: 16px;
  font-size: 20px;
  color: #272832;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
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