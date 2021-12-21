<template>
  <div class="content">
    <!-- 头部 -->
    <div class="top-bar">
      <div class="top-left">
        <img
          src="../../static/images/Userhome/左箭头.png"
          @click="back"
          alt=""
        />
      </div>
      <div class="top-bar-center">详情</div>
      <div class="top-bar-right"></div>
    </div>
    <!-- 主体 -->
    <div class="main">
      <div class="column heads">
        <!-- 分成三列 -->
        <!-- 头像 -->
        <div class="row head">
          <div class="title">头像</div>
          <div class="user-head">
            <img :src="imgurl" class="user-img" alt="" />
          </div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 签名 -->
        <div class="row">
          <div class="title">签名</div>
          <div class="cont">
            呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃
          </div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 注册 -->
        <div class="column row">
          <div class="title">注册</div>
          <div class="cont">2021-12-21 14:15</div>
        </div>
        <!-- 昵称 -->
        <div class="row">
          <div class="title">昵称</div>
          <div class="cont">aqionghhh</div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 性别 -->
        <div class="row">
          <div class="title">性别</div>
          <div class="cont">
            {{ value }}
            <van-popup v-model="showPicker" round position="bottom">
              <van-picker
                title="选择性别"
                show-toolbar
                :columns="projectListArr"
                @cancel="showPicker = false"
                @confirm="changeConfirm"
              />
            </van-popup>
          </div>
          <div class="more">
            <img
              src="../../static/images/Userdetail/右箭头.png"
              @click="showPicker = !showPicker"
              alt=""
            />
          </div>
        </div>
        <!-- 生日 -->
        <div class="row">
          <div class="title">生日</div>
          <div class="cont">2022-01-01</div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 电话 -->
        <div class="row">
          <div class="title">电话</div>
          <div class="cont">15289857572</div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 邮箱 -->
        <div class="column row">
          <div class="title">邮箱</div>
          <div class="cont">2667183507@qq.com</div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 密码 -->
        <div class="row">
          <div class="title">密码</div>
          <div class="cont">sun131313</div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
      </div>
      <div class="btn2">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: require("../../static/images/img/two.jpg"),

      value: "", //input框内显示的值
      projectListArr: ["男", "女", "未知"], //下拉的数据源，从接口中请求到数据，根据需要变成一维数组，只存name
      showPicker: false, //弹出层显示隐藏
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    //性别选择器
    changeConfirm(val, index) {
      this.value = val; //传值
      console.log(index);
      this.showPicker = false;
    },
  },
};
</script>

<style scoped>
@import "../../commons/css/index.css";
van-popup {
  padding: 0;
  margin: 0;
}
.top-bar-center {
  text-align: center;
  color: #272832;
  font-weight: 550;
  font-size: 20px;
  line-height: 44px;
}
.main {
  padding-top: 59px;
  display: flex;
  flex-direction: column;
}
.column {
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  border-bottom: 1px solid #eee;
}
.column .row {
  display: flex;
  flex-direction: row;
}
.title {
  flex: none;
  padding: 0 16px;
  font-size: 16px;
  line-height: 56px;
}
.head {
  height: 74px;
  display: flex;
  align-items: center;
}
.user-head {
  flex: auto;
}
.user-img {
  width: 54px;
  height: 54px;
  line-height: 54px;
  border-radius: 5px;
}
.cont {
  flex: auto;
  font-size: 16px;
  line-height: 56px;
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
  margin-top: 80px;
  line-height: 44px;
}
</style>