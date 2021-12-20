<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <div class="top-left">
        <img
          src="../../static/images/Userhome/左箭头.png"
          @click="back"
          alt=""
        />
      </div>
      <div class="top-bar-right">
        <img src="../../static/images/Userhome/三点.png" alt="" />
      </div>
    </div>
    <!-- 内容 -->
    <div class="bg">
      <div class="bg-bai"></div>
      <img class="bg-img" src="../../static/images/img/one.jpg" alt="" />
    </div>
    <div class="main">
      <div class="user-header">
        <div class="sex" :style="{ background: sexBg }">
          <img src="../../static/images/Userhome/女性.png" alt="" />
        </div>
        <img class="user-img" src="../../static/images/img/one.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sexBg: "rgb(255,93,91)",
    };
  },
  methods: {
    //返回上一页
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.top {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
}
.top-bar-right {
  float: right;
}
.top-left {
  float: left;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}
.top-bar-right img {
  width: 26px;
  position: absolute;
  height: 30px;
  right: 16px;
  top: 8px;
}
.top-left img {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  left: 12px;
}
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}
.bg-img {
  width: 100%;
  height: 100%;
  filter: blur(16px);
  opacity: 0.4;
  z-index: -1;
}
.bg-bai {
  /* background-color: #eee; */
  width: 100%;
  height: 100%;
}
.main {
  padding-top: 118px;
  text-align: center;
}
.user-header {
  position: relative;
  width: 206px;
  height: 206px;
  position: relative;
  margin: 0 auto;
}
.sex {
  position: absolute;
  bottom: 11px;
  right: 11px;
  width: 32px;
  height: 32px;
  border-radius: 18px;
}
.sex img {
  width: 20px;
  height: 20px;
  padding: 5px;
}
.user-img {
  height: 200px;
  width: 200px;
  border-radius: 24px;
  border: 3px solid rgb(255, 255, 255);
}
</style>