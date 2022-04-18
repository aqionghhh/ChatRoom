<template>
  <div class="content">
    <TopBar>
      <template v-slot:left>
        <img
          @click="back"
          src="../../static/images/Userhome/左箭头.png"
          alt=""
        />
      </template>
      <template v-slot:center>
        <div>好友请求</div>
      </template>
    </TopBar>
    <!-- 主体部分 -->
    <div class="artical">
      <div
        class="requester"
        v-for="(request, index) in requestArr"
        :key="index"
      >
        <div class="request-top">
          <div class="reject btn" @click="disagree(index)">拒绝</div>
          <div class="header">
            <img :src="request.imgurl" />
          </div>
          <div class="agree btn" @click="agree(index)">同意</div>
        </div>
        <div class="request-center">
          <div class="title">{{ request.name }}</div>
          <div class="time">{{ changeTime(request.time) }}</div>
        </div>
        <div class="notic">留言：{{ request.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import myfun from "../../commons/js/myfun.js";
import TopBar from "../../components/TopBar/TopBar.vue";

export default {
  data() {
    return {
      requestArr: [],
    };
  },
  components: {
    TopBar,
  },
  created() {
    this.$axios({
      method: "post",
      url: "api/friend/show",
      data: {
        id: localStorage.getItem("id"),
      },
    }).then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].imgurl = this.$store.state.userImg + res.data[i].imgurl;
      }
      this.requestArr = res.data;
    });
  },
  methods: {
    //转换时间
    changeTime(date) {
      return myfun.dateTime(date);
    },
    back() {
      this.$router.back();
    },
    // 拒绝
    disagree(index) {
      console.log(this.requestArr[index].id);
      console.log(this.requestArr[index].target);
      this.$axios({
        method: "post",
        url: "api/friend/disagree",
        data: {
          id: this.requestArr[index].id,
          target: this.requestArr[index].target,
          friendID: this.requestArr[index].friendID,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.msg === "ok") {
          this.requestArr.splice(this.requestArr[index], 1);
          this.$toast({
            message: "已拒绝",
            icon: require("../../static/images/Userhome/成功.jpg"),
          });
        }
      });
    },
    // 同意
    agree(index) {
      console.log(this.requestArr[index].id);
      this.$axios({
        method: "post",
        url: "api/friend/agree",
        data: {
          id: this.requestArr[index].id,
          target: this.requestArr[index].target,
          friendID: this.requestArr[index].friendID,
          imgurl: this.requestArr[index].imgurl,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.msg === "ok") {
          this.requestArr.splice(this.requestArr[index], 1);
          this.$toast({
            message: "已同意",
            icon: require("../../static/images/Userhome/成功.jpg"),
          });
        }
      });
    },
  },
};
</script>

<style scoped>
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