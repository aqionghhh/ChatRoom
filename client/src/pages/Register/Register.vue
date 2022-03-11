<template>
  <div class="contents">
    <!-- 头部 -->
    <div class="top">
      <div class="toop-bar-left" @click="toLogin">
        <img
          src="../../static/images/Register/左箭头.png"
          class="back"
          alt=""
        />
      </div>
    </div>
    <!-- logo -->
    <div class="logo">
      <img src="../../static/images/login/logo.png" alt="" />
    </div>
    <!-- 主体部分 -->
    <div class="main">
      <div class="title">注册</div>
      <div class="inputs">
        <div class="inputs-div">
          <input
            class="user"
            @input="userRight"
            type="text"
            placeholder="请取个名字"
          />
          <div class="employ" v-if="useremploy">该用户名已注册</div>
          <img
            v-if="isuser"
            class="ok"
            src="../../static/images/Register/Group 3.png"
            alt=""
          />
        </div>
        <div class="inputs-div">
          <input
            class="email"
            @input="emailRight"
            type="text"
            placeholder="请输入邮箱"
          />
          <div class="employ" v-if="emailemploy">邮箱已被占用</div>
          <div class="invalid" v-if="invalid">邮箱无效</div>
          <img
            v-if="isemail"
            class="ok"
            src="../../static/images/Register/Group 3.png"
            alt=""
          />
        </div>
        <div class="inputs-div">
          <input
            class="psw"
            :type="type"
            name=""
            id=""
            @input="pwdRight"
            placeholder="请输入密码"
          />
          <img
            v-if="!look"
            class="look"
            src="../../static/images/Register/查看.png"
            alt=""
            @click="looks"
          />
          <img
            v-if="look"
            class="look"
            src="../../static/images/Register/闭眼.png"
            alt=""
            @click="looks"
          />
        </div>
      </div>
    </div>
    <div :class="[{ submit: isok }, { submit1: !isok }]" @click="register">
      注册
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "password",
      isuser: false, //用户名是否可用 img
      isemail: false, //邮箱是否可用 img
      look: true, //是否可以查看密码 img
      invalid: false, //邮箱是否符合规定格式
      useremploy: false, //用户名是否被占用
      emailemploy: false, //邮箱是否被占用
      email: "", //邮箱
      isok: false,
      user: "", //用户名
      pwd: "", //密码
    };
  },
  methods: {
    //密码显示隐藏
    looks() {
      if (this.look) {
        this.type = "text";
        this.look = !this.look;
      } else {
        this.type = "password";
        this.look = !this.look;
      }
    },
    //判断邮箱格式
    emailRight(e) {
      let reg =
        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      this.email = e.target.value;
      if (this.email.length > 0) {
        //用户输入值之后再进行正则匹配
        //拿用户输入的内容进行正则匹配
        if (reg.test(this.email)) {
          //如果为真就是匹配通过
          this.invalid = false;
          this.isemail = true;
          // console.log("正确");
        } else {
          // console.log("不正确");
          this.invalid = true;
          this.isemail = false;
        }
      }
      this.isOk();
      // console.log(e.target.value);//打印出input框的值
    },
    //跳转到的登录页面
    toLogin() {
      this.$router.replace("/login");
    },
    //获取用户名
    userRight(e) {
      if (e.target.value) {
        this.user = e.target.value;
        this.isuser = true;
        this.isOk();
      }
    },
    //获取密码
    pwdRight(e) {
      this.pwd = e.target.value;
      this.isOk();
    },
    //判断页面是否能够进行注册
    isOk() {
      if (this.isuser && this.isemail && this.pwd.length > 5) {
        //邮箱是真的、用户名是真的、密码长度>6
        this.isok = true;
      } else {
        this.isok = false;
      }
    },
    register() {
      if (this.isok === true) {
        this.$axios({
          data: {
            data: "sxq",
            email: "111@qq.com",
            pwd: "123",
          },
          url: "api/register/add",
          method: "post",
        }).then((res) => {
          if (res.data) {
            this.emailemploy = true;
          } else {
            this.$router.replace("/register");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
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
.toop-bar-left {
  float: left;
  padding-left: 12px;
  width: 44px;
  height: 44px;
}
.back {
  margin-top: 10px;
  width: 25px;
  height: 25px;
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
.inputs-div {
  position: relative;
}
.employ,
.invalid {
  position: absolute;
  right: 30px;
  top: 3px;
  line-height: 44px;
  font-weight: 500;
  color: rgb(255, 93, 91);
}
.ok {
  position: absolute;
  right: 30px;
  top: 15px;
  width: 21px;
  height: 16px;
}
.look {
  position: absolute;
  right: 31px;
  top: 15px;
  width: 21px;
  height: 18px;
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
.submit1 {
  width: 260px;
  height: 48px;
  background: rgba(39, 40, 50, 0.2);
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