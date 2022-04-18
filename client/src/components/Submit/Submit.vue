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
        <div
          class="record btn"
          v-show="record"
          @touchstart.prevent="voiceStart"
          @touchend.prevent="voiceEnd"
        >
          按住说话
        </div>
        <div class="bt-img" @click="emoji">
          <img src="../../static/images/submit/笑脸.png" alt="" />
        </div>
        <div class="bt-img" @click="more">
          <img src="../../static/images/submit/添加.png" alt="" />
        </div>
      </div>

      <!-- 表情的弹窗 -->
      <div class="emoji" v-show="emojiBtn">
        <div class="emoji-send">
          <div class="emoji-send-delete" @click="deleteOne">删除</div>
          <div class="emoji-send-btn" @click="sendMessage">发送</div>
        </div>
        <Emoji @sendEmoji="getEmoji" />
      </div>
      <!-- 发送图片之类的弹窗 -->
      <div class="more" v-show="moreBtn">
        <div class="more-list" @click="photo">
          <img src="../../static/images/submit/图片.png" alt="" />
          <div class="more-list-title">图片</div>
          <input
            type="file"
            accept="image/*"
            @change="handleFile"
            class="hiddenInput"
            ref="hidden"
          />
        </div>
        <div class="more-list" @click="file">
          <img src="../../static/images/submit/文件.png" alt="" />
          <div class="more-list-title">文件</div>
        </div>
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
      moreBtn: false, // 弹出more框，默认是不弹出
      msg: "", // 发送出去的信息
      Height: "", // 弹窗的高度
      timer: "", // 定时器，用于记录按下鼠标到松开的时间
      i: 1, // 记录音频的秒数
      isRecording: false,
      chunks: [], // 保存blob语音流相关数据
    };
  },
  components: {
    Emoji,
  },
  computed: {
    ...mapState(["canTap", "isBlur"]),
  },
  watch: {
    canTap: {
      handler() {
        if (this.emojiBtn) {
          this.emoji();
        }
        if (this.moreBtn) {
          this.more();
        }
      },
    },
    isBlur: {
      handler() {
        this.$refs.content.blur();
      },
    },
  },
  mounted() {
    if (!navigator.mediaDevices) {
      alert("您的浏览器不支持获取用户设备");
      return;
    }
    if (!window.MediaRecorder) {
      alert("您的浏览器不支持录音");
      return;
    }
  },
  methods: {
    // 当光标停留在输入框的时候，emoji弹窗总是关闭的
    close() {
      if (this.$refs.content.getAttribute("contenteditable") === "true") {
        this.emojiBtn = false;
        this.moreBtn = false;
        this.$nextTick(() => {
          // 获取emoji弹框高度
          this.getHeight(".emoji");
          this.getHeight(".more");
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
      this.moreBtn = false;
      this.$nextTick(() => {
        this.getHeight(".emoji");
        this.getHeight(".more");
      });
    },
    // 点击表情按钮跳出emoji弹窗
    emoji() {
      this.emojiBtn = !this.emojiBtn;
      if (this.emojiBtn) {
        // 如果要弹出emoji窗口的话，显示的是输入框
        this.record = false;
      }
      this.moreBtn = false;
      this.$nextTick(() => {
        // 获取emoji弹框高度
        this.getHeight(".emoji");
      });
    },
    // 点击更多按钮弹窗
    more() {
      this.moreBtn = !this.moreBtn;
      this.emojiBtn = false;
      this.$nextTick(() => {
        // 获取emoji弹框高度
        this.getHeight(".more");
      });
    },
    // 音频处理
    // 开始录音
    voiceStart() {
      console.log("开始");

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.recorder = new window.MediaRecorder(stream);
          // 录音
          this.recorder.start();
          this.recorder.ondataavailable = this.getRecordingData;
          console.log("正在录音");
          this.$toast.loading({
            icon: "music-o",
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: `正在录音中...`,
          });

          //记录时间
          this.timer = setInterval(() => {
            this.i += 1;
            console.log(this.i);
            if (this.i > 59) {
              this.$toast.clear();
              this.voiceEnd(); // 强制结束
            }
          }, 1000);
        })
        .catch((err) => console.log("无法连接到音频", err));
    },
    // 获取blob语音流
    getRecordingData(e) {
      this.chunks.push(e.data);
      console.log("getRecordingData", e.data);
      console.log("chunks", this.chunks);
      let blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" }); // 获取blob
      console.log("blob", blob);
      let data = {
        blob: blob,
        time: this.i,
      };
      this.$emit("sendMsg", data, 2);
      this.$toast.clear(); // 清除弹窗
      this.i = 0;
      this.chunks = [];
    },
    // 结束录音
    voiceEnd() {
      clearInterval(this.timer); // 清除定时器
      console.log("一共有多少秒：", this.i);
      // 录音时间小于2s
      if (this.i < 2) {
        this.$toast.clear(); // 先清除一个toast
        this.$toast.fail("时间不能少于2秒");
        this.recorder.stop();
      } else {
        // 结束录音
        this.recorder.stop();
      }
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
      this.$refs.content.innerHTML += ele;
    },
    // 获取弹窗的高度
    getHeight(ele) {
      this.Height = document.querySelector(ele).offsetHeight + 20;
      this.$emit("Height", this.Height);
    },
    // 发送文本框中的内容
    sendMessage() {
      this.msg = this.$refs.content.innerHTML;
      // 匹配到回车键之后，发送内容，并把文本框设置为空
      this.$emit("sendMsg", this.msg, 0); // 把文本框的内容和数据的类型传递出去
      setTimeout(() => {
        // 防止卡顿
        this.msg = "";
        this.$refs.content.innerHTML = "";
      }, 0);
    },
    // 发送图片
    photo() {
      this.$refs.hidden.click(); // 点击图片，时机上点击的是input按钮
    },
    // 将头像显示，并且传到后端
    handleFile(e) {
      this.$emit("sendMsg", e.srcElement.files.item(0), 1); // 图片的类型是1
    },
    // 文件
    file() {
      console.log("file");
    },
  },
};
</script>

<style scoped>
/**不给框框设置高度，这样在输入文本框的时候内容会把输入框自动撑开（往上撑开，如果不设置就是往下撑开） */
.submit {
  background: rgb(236, 237, 238);
  border-top: 1px solid #ccc;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
  padding-bottom: 20px;
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
.emoji,
.more {
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
  bottom: 22px;
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
.more {
  padding: 10px;
  box-sizing: border-box;
}
.more-list {
  width: 25%;
  text-align: center;
  float: left;
  padding-top: 18px;
}
.more-list img {
  width: 36px;
  height: 36px;
  padding: 12px;
  background-color: white;
  border-radius: 12px;
}
.more-list-title {
  font-size: 14px;
  color: rgba(39, 40, 50, 0.5);
  line-height: 17px;
}
.hiddenInput {
  display: none;
}
</style>