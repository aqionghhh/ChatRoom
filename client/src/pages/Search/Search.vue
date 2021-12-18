<template>
  <div class="content">
    <!-- 头部 -->
    <div class="top-bar">
      <!-- 搜索框 -->
      <div class="search-div">
        <img
          class="search-img"
          src="../../static/images/search/search.png"
          alt=""
        />
        <input type="search" placeholder="搜索用户/群" class="search" />
      </div>
      <div class="top-bar-right">
        <div class="text">取消</div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="main">
      <div class="search-user result">
        <div class="title">用户</div>
        <div class="list user">
          <!-- 左边是头像、名字和用户 -->
          <img src="../../static/images/img/one.jpg" alt="" />
          <div class="names">
            <div class="name">嘻嘻</div>
            <div class="email">266@qq.com</div>
          </div>
          <!-- 右边是进行的操作 -->
          <div class="right-btn adds">加好友</div>
        </div>

        <!-- 群 -->
        <div class="list user">
          <!-- 左边是头像、名字和用户 -->
          <img src="../../static/images/img/one.jpg" alt="" />
          <div class="names">
            <div class="name">喝喝</div>
            <div class="email">266@qq.com</div>
          </div>
          <!-- 右边是进行的操作 -->
          <div class="right-btn send">发消息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.top-bar {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
.text {
  font-size: 18px;
  font-weight: 550;
  font-family: PingFangSC-Medium;
  color: black;
  line-height: 44px;
}
.top-bar-right {
  float: right;
  padding-right: 16px;
}
.search {
  float: none;
  width: 300px;
  height: 30px;
  background: rgb(243, 244, 246);
  border-radius: 5px;
  padding: 0 30px 0 6px;
}
.search-div {
  float: left;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  box-sizing: border-box;
  padding: 7px 59px 7px 16px;
}
.search-img {
  width: 20px;
  height: 20px;
  float: right;
  position: absolute;
  right: 65px;
  top: 12px;
}
.main {
  padding-top: 44px;
}
.result {
  padding-top: 16px;
}
.title {
  height: 30px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 22px;
  padding-left: 16px;
}
.list {
  width: 100%;
  height: 40px;
  padding: 10px 0;
}
.list img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  float: left;
  padding-left: 21px;
}
.names {
  padding-left: 16px;
  float: left;
}
.name {
  font-size: 18px;
  color: rgb(39, 40, 50);
  line-height: 25px;
  font-weight: 600;
}
.right-btn {
  float: right;
  width: 60px;
  height: 24px;
  border-radius: 12px;
  font-weight: 600;
  margin-right: 16px;
  line-height: 24px;
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
}
.email {
  line-height: 14px;
  font-size: 12px;
}
.send {
  background: rgb(255, 228, 49);
  color: rgb(39, 40, 50);
}
.adds {
  background: rgba(74, 170, 255, 0.1);
  color: #4aaaff;
}
</style>