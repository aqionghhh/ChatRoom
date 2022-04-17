<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <slot name="left"></slot>
    </div>
    <div class="top-bar-center">
      <slot name="center"></slot>
    </div>
    <div class="top-bar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 头部共用样式 */
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

.top-bar-left {
  float: left;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}
.top-bar-left img {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  left: 12px;
}
.top-bar-center {
  text-align: center;
  color: #272832;
  font-weight: 550;
  font-size: 20px;
  line-height: 44px;
}

.top-bar-right {
  padding-right: 16px;
  font-size: 18px;
  font-weight: 550;
  font-family: PingFangSC-Medium;
  color: black;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 44px;
}

.top-bar-right img {
  width: 26px;
  position: absolute;
  height: 30px;
  right: 16px;
  top: 8px;
}

.main {
  padding: 52px 0 0;
  width: 100%;
}

.text {
  font-size: 18px;
  font-weight: 550;
  font-family: PingFangSC-Medium;
  color: black;
  line-height: 44px;
}

/* 底部样式 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45px;
  padding-top: 5px;
  padding-bottom: 64px;
  background-color: rgba(255, 255, 255, 0.96);
}

.btn1 {
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: black;
  height: 40px;
  /* background: white; */
  border-radius: 5px;
}
</style>