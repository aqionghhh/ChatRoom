<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <img src="../../static/images/Userdetail/警告.png" alt="" />
      </div>
      <p class="tip_text">{{ alertText }}</p>
      <div class="tap">
        <div class="confrim" @click="confrim">确认</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </section>
  </div>
</template> 
<script>
export default {
  props: {
    alertText: String,
  },
  methods: {
    confrim() {
      //分发自定义事件，事件名是closeTip
      if (this.alertText === "确认删除？") {
        // 是删除成员的弹窗
        this.$emit("closeTip", "deleteConfrim");
      } else if (this.alertText === "确定退出？") {
        // 是退出群聊的按钮
        this.$emit("closeTip", "exitConfrim");
      } else {
        this.$emit("closeTip", "Confrim");
      }
    },
    cancel() {
      this.$emit("closeTip", "cancel");
    },
  },
};
</script>
<style scoped>
@keyframes tipMove {
  0% {
    transform: scale(1);
  }

  35% {
    transform: scale(0.8);
  }

  70% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
.alert_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.5);
}
.tip_text_container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -90px;
  margin-left: -110px;
  width: 60%;
  animation: tipMove 0.4s;
  background-color: rgba(255, 255, 255, 1);
  border: 1px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
}
.tip_icon img {
  width: 50px;
  height: 50px;
}

span:nth-of-type(1) {
  width: 2px;
  height: 30px;
  background-color: #f8cb86;
}

span:nth-of-type(2) {
  width: 2px;
  height: 2px;
  border: 1px;
  border-radius: 50%;
  margin-top: 2px;
  background-color: #f8cb86;
}

.tip_text {
  font-size: 14px;
  color: #333;
  line-height: 20px;
  text-align: center;
  margin-top: 10px;
  padding: 0 5px;
}
.confrim {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  width: 50%;
  line-height: 35px;
}
.cancel {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 35px;
  width: 50%;
}
.tap {
  height: 35px;
  display: flex;
  width: 100%;
  margin-top: 10px;
}
</style>