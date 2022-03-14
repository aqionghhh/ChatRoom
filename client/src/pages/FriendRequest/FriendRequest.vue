<template>
  <div class="content">
    <!-- 头部 -->
    <div class="top-bar">
      <div class="top-left">
        <img
          @click="back"
          src="../../static/images/Userhome/左箭头.png"
          alt=""
        />
      </div>
      <div class="top-bar-center">好友请求</div>
    </div>

    <!-- 主体部分 -->
    <div class="artical">
      <div class="requester">
        <div class="request-top">
          <div class="reject btn">拒绝</div>
          <div class="header">
            <img src="../../static/images/img/one.jpg" />
          </div>
          <div class="agree btn">同意</div>
        </div>
        <div class="request-center">
          <div class="title">昵称</div>
          <div class="time">2022年3月14日</div>
        </div>
        <div class="notic">留言：你好，xxx想加您为好友，谢谢您的通过</div>
      </div>
      <div class="requester">
        <div class="request-top">
          <div class="reject btn">拒绝</div>
          <div class="header">
            <img src="../../static/images/img/one.jpg" />
          </div>
          <div class="agree btn">同意</div>
        </div>
        <div class="request-center">
          <div class="title">昵称</div>
          <div class="time">2022年3月14日</div>
        </div>
        <div class="notic">留言：你好，xxx想加您为好友，谢谢您的通过</div>
      </div>
      <div class="requester">
        <div class="request-top">
          <div class="reject btn">拒绝</div>
          <div class="header">
            <img src="../../static/images/img/one.jpg" />
          </div>
          <div class="agree btn">同意</div>
        </div>
        <div class="request-center">
          <div class="title">昵称</div>
          <div class="time">2022年3月14日</div>
        </div>
        <div class="notic">留言：你好，xxx想加您为好友，谢谢您的通过</div>
      </div>
      <div class="requester">
        <div class="request-top">
          <div class="reject btn">拒绝</div>
          <div class="header">
            <img src="../../static/images/img/one.jpg" />
          </div>
          <div class="agree btn">同意</div>
        </div>
        <div class="request-center">
          <div class="title">昵称</div>
          <div class="time">2022年3月14日</div>
        </div>
        <div class="notic">留言：你好，xxx想加您为好友，谢谢您的通过</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
@import "../../commons/css/index.css";
.top-bar-center {
  flex: auto;
  text-align: center;
  font-size: 20px;
  line-height: 44px;
}
.top {
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid #ccc;
}
.artical {
  padding: 54px 16px;
}
.requester {
  background: rgb(255, 255, 255);
  box-shadow: 0px 24px 64px -8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 56px;
  padding: 16px;
}
.request-top {
  display: flex;
  flex-direction: row;
}
.request-top .btn {
  flex: auto;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}
.reject {
  color: rgb(255, 93, 91);
  background-color: rgba(255, 93, 91, 0.1);
}
.agree {
  background-color: rgba(255, 228, 49, 0.8);
}
.header {
  margin-top: -52px;
  flex: auto;
  text-align: center;
}
.header img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
}
.request-center {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;
}
.title {
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
}
.time {
  font-size: 12px;
  line-height: 17px;
  color: rgba(39, 40, 50, 0.4);
}
.notic {
  line-height: 20px;
  font-size: 14px;
  padding: 10px 16px;
  border-radius: 8px;
  background-color: rgb(243, 244, 246);
}
</style>