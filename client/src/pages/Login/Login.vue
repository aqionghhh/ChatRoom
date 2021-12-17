<template>
  <div class="contents">
    <!-- 头部 -->
    <div class="top">
      <div class="top-bar-right">
        <span class="text" @click="toRegister">注册</span>
      </div>
    </div>
    <!-- logo -->
    <div class="logo">
      <img src="../../static/images/login/logo.png" alt="" />
    </div>
    <!-- 主体部分 -->
    <div class="main">
      <div class="title">登录</div>
      <div class="slogan">您好，欢迎来到聊天室</div>
      <div class="inputs">
        <input
          class="user"
          @blur="getUser"
          type="text"
          placeholder="用户名/邮箱"
        />
        <input class="pwd" @blur="getPwd" type="password" placeholder="密码" />
        <div class="tips">输入用户名或密码错误！</div>
      </div>
      <!-- 提示语 -->
    </div>
    <div class="submit" @click="login">登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pwd: "",
    };
  },
  methods: {
    //跳转到注册页面
    toRegister() {
      this.$router.push("/register");
    },
    //输入框失焦的时候把value存到user和pwd变量中
    getUser(e) {
      console.log(e.target.value);
      this.user = e.target.value;
    },
    getPwd(e) {
      console.log(e.target.value);
      this.pwd = e.target.value;
    },
    //登录提交
    login() {
      if (this.user && this.pwd) {
        //用户名和密码都存在才提交给后台
        console.log("提交");
      }
    },
  },
};
</script>

<style scoped>
/* @import "../../commons/css/index.css"; */
.contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0;
}
.top-bar-right {
  float: right;
  padding-right: 16px;
}
.text {
  font-size: 18px;
  font-weight: 550;
  font-family: PingFangSC-Medium;
  color: black;
  line-height: 44px;
}
.logo {
  text-align: center;
}
.logo img {
  padding-top: 128px;
  width: 97px;
  height: 46px;
  height: auto;
  margin: 0 auto;
}
.main {
  padding: 27px 0 0 29px;
  width: 90%;
}
.title {
  font-size: 28px;
  font-weight: 550;
  color: black;
  line-height: 40px;
}
.slogan {
  font-size: 18px;
  color: rgba(30, 40, 50, 0.5);
  line-height: 28px;
}
.inputs {
  padding-top: 4px;
  padding-bottom: 60px;
}
input {
  height: 44px;
  font-size: 16px;
  font-family: AvenirNext-Medium;
  font-weight: 500;
  color: rgba(39, 40, 50, 1);
  line-height: 44px;
  border-bottom: 1px solid #ccc;
  width: 90%;
}
.tips {
  font-size: 16px;
  color: rgb(255, 93, 91);
  line-height: 28px;
  float: left;
}
.submit {
  width: 260px;
  height: 48px;
  background: #ffe431;
  box-shadow: 0px 25px 16px -18px rgba(255, 228, 49, 0.4);
  border-radius: 24px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #272832;
  font-weight: 550;
  line-height: 48px;
  text-align: center;
  margin: 0 auto;
}
</style>