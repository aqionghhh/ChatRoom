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
          @click="close"
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

      <div class="emoji" v-show="emojiBtn">
        <div class="emoji-send">
          <div class="emoji-send-delete" @click="deleteOne">删除</div>
          <div class="emoji-send-btn" @click="sendMessage">发送</div>
        </div>
        <Emoji @sendEmoji="getEmoji" />
      </div>
    </div>
  </div>
</template>

<script>
import Emoji from "../Emoji/Emoji";

import { mapState } from "vuex";
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
  components: {
    Emoji,
  },
  computed: {
    ...mapState(["canTap"]),
  },
  watch: {
    canTap: {
      handler() {
        this.emoji();
      },
    },
  },
  methods: {
    // 当光标停留在输入框的时候，emoji弹窗总是关闭的
    close() {
      if (this.$refs.content.getAttribute("contenteditable") === "true") {
        this.emojiBtn = false;
        this.$nextTick(() => {
          // 获取emoji弹框高度
          this.getHeight(".emoji");
        });
      }
    },
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
    // 点击删除按钮
    deleteOne() {
      this.$refs.content.innerHTML = this.$refs.content.innerHTML.substring(
        0,
        this.$refs.content.innerHTML.length - 1
      );
    },
    // 获取点击的emoji
    getEmoji(ele) {
      // console.log(ele);
      this.$refs.content.innerHTML += ele;
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
.emoji-send {
  width: 155px;
  margin-right: 5px;
  height: 52px;
  background-color: #eee;
  position: fixed;
  bottom: 2px;
  right: 0;
  display: flex;
  background-color: rgba(236, 237, 238, 0.8);
  align-items: center;
}
.emoji-send-delete {
  flex: 1;
  margin-left: 12px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: white;
  border-radius: 6px;
}
.emoji-send-btn {
  flex: 1;
  margin: 0 16px 0 10px;
  background-color: rgb(255, 228, 49);
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 6px;
}
</style>