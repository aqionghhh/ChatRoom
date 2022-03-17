<template>
  <div>
    <div class="submit">
      <div class="submit-chat">
        <div class="bt-img">
          <img @click="changeRecord" :src="btn" alt="" />
        </div>
        <!-- 使用div来代替textarea -->
        <div
          style="-webkit-user-select: auto"
          class="chat-send btn"
          contenteditable="true"
          ref="content"
          v-show="!record"
          @keydown.enter.prevent="sendMessage"
        ></div>
        <div class="record btn" v-show="record">按住说话</div>
        <div class="bt-img" @click="emoji">
          <img src="../../static/images/submit/笑脸.png" alt="" />
        </div>
        <div class="bt-img">
          <img src="../../static/images/submit/添加.png" alt="" />
        </div>
      </div>

      <div class="emoji" v-show="emojiBtn">表情</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: false,
      btn: require("../../static/images/submit/语音.png"), // 控制左边的按钮，默认显示语音按钮
      emojiBtn: false, // 弹出emoji框，默认是不弹出
      msg: "", // 发送出去的信息
      Height: "", // 弹窗的高度
    };
  },
  methods: {
    // 切换音频和文字输入框
    changeRecord() {
      if (this.record) {
        this.record = !this.record;
        this.btn = require("../../static/images/submit/语音.png");
      } else {
        this.record = !this.record;
        this.btn = require("../../static/images/submit/键盘.png");
        this.emojiBtn = false; // 如果显示的是语音输入，那么就关闭emoji弹窗
      }
      this.$nextTick(() => {
        this.getHeight(".emoji");
      });
    },
    // 点击表情按钮跳出emoji弹窗
    emoji() {
      this.emojiBtn = !this.emojiBtn;
      if (this.emojiBtn) {
        // 如果要弹出emoji窗口的话，显示的是输入框
        this.record = false;
      }
      this.$nextTick(() => {
        // 获取emoji弹框高度
        this.getHeight(".emoji");
      });
    },
    // 获取弹窗的高度
    getHeight(ele) {
      this.Height = document.querySelector(ele).offsetHeight;
      console.log(this.Height);
      this.$emit("Height", this.Height);
    },
    // 发送文本框中的内容
    sendMessage() {
      this.msg = this.$refs.content.innerHTML;
      console.log("发送");
      // 匹配到回车键之后，发送内容，并把文本框设置为空
      this.$emit("sendMsg", this.msg); // 把文本框的内容传递出去
      setTimeout(() => {
        // 防止卡顿
        this.msg = "";
        this.$refs.content.innerHTML = "";
      }, 0);
    },
  },
};
</script>

<style scoped>
/**不给框框设置高度，这样在输入文本框的时候内容会把输入框自动撑开（往上撑开，如果不设置就是往下撑开） */
.submit {
  background: rgba(244, 244, 244, 1);
  border-top: 1px solid #ccc;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
}
.submit-chat {
  width: 100%;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 0 7px;
}
.submit-chat img {
  width: 30px;
  height: 30px;
  margin: 7px 5px;
  flex: auto;
}
.btn {
  margin: 7px 5px;
  flex: auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
}
.chat-send {
  max-height: 80px;
  outline: 0;
  border: 1px solid #a0b3d6;
  font-size: 18px;
  line-height: 24px;
  word-wrap: break-word;
  overflow-y: auto;
  overflow: hidden; /**无滚动条 */
}
.record {
  line-height: 26px;
  text-align: center;
  font-size: 18px;
  color: #ccc;
  height: 26px;
}
.emoji {
  height: 218px;
  width: 100%;
  background: rgb(236, 237, 238);
  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.1);
}
</style>