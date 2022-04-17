<template>
  <div class="content">
    <!-- 头部 -->
    <TopBar>
      <template v-slot:left>
        <img
          @click="back"
          src="../../static/images/Userhome/左箭头.png"
          alt=""
        />
      </template>
      <template v-slot:center>
        <div>详情</div>
      </template>
    </TopBar>
    <!-- 主体 -->
    <div class="main">
      <div class="column heads">
        <!-- 分成三列 -->
        <!-- 头像 -->
        <div class="row head">
          <div class="title">头像</div>
          <div class="user-head">
            <div class="head_img" @click.stop="uploadHeadImg">
              <img :src="dataarr.imgurl" />
            </div>
            <input
              type="file"
              accept="image/*"
              @change="handleFile"
              class="hiddenInput"
              ref="hidden"
            />
          </div>
        </div>
        <!-- 签名 -->
        <div class="row">
          <div class="title">签名</div>
          <div class="cont">
            {{ dataarr.sign }}
          </div>
          <div class="more">
            <img
              v-show="isMe"
              @click="animationChange($event, '签名', dataarr.sign, !isName)"
              src="../../static/images/Userdetail/右箭头.png"
              alt=""
            />
          </div>
        </div>
        <!-- 注册 -->
        <div class="column row">
          <div class="title">注册日期</div>
          <div class="cont">{{ timeChange(dataarr.time) }}</div>
        </div>
        <!-- 昵称 -->
        <div class="row">
          <div class="title">昵称</div>
          <div class="cont">
            {{ dataarr.name }}
          </div>
          <div class="more">
            <img
              @click="animationChange($event, '昵称', dataarr.name, isName)"
              v-show="isMe"
              src="../../static/images/Userdetail/右箭头.png"
              alt=""
            />
          </div>
        </div>
        <!-- 性别 -->
        <div class="row">
          <div class="title">性别</div>
          <div class="cont">
            {{ dataarr.sex }}
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
              v-show="isMe"
              alt=""
            />
          </div>
        </div>
        <!-- 生日 -->
        <div class="row">
          <div class="title">生日</div>
          <div class="cont">
            {{ dataarr.birthday }}
            <van-popup v-model="timePop" position="bottom">
              <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="getTime"
                @cancel="timePop = false"
              />
            </van-popup>
          </div>
          <div class="more" v-show="isMe" @click="timePop = true">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
      </div>
      <div class="btn2" @click="logout" v-if="isMe">退出登录</div>
    </div>

    <!-- 修改的弹出层 -->
    <transition
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div class="modify" v-show="animation">
        <!-- 弹窗的头部 -->
        <div class="modify-header">
          <div class="close" @click="animationChange">取消</div>
          <div class="title">{{ modifyTitle }}</div>
          <div class="define" @click="determine">确定</div>
        </div>
        <!-- 弹窗的内容 -->
        <div class="modify-main">
          <textarea v-model="data" class="modify-content"></textarea>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import TopBar from "../../components/TopBar/TopBar.vue";
export default {
  data() {
    return {
      dataarr: {
        imgurl: "", // 图片
        name: "", //昵称
        sign: "", //签名
        time: "", //注册时间
        sex: "", //性别input框内显示的值
        birthday: "", //日期input框内显示的时间
      },
      id: "", // 自己的id
      isMe: false, // 点进来的是本人
      isName: true, // 需要修改 名字
      animation: false, //弹窗是否显示
      data: "修改的内容", //弹窗的内容
      modifyTitle: "", //弹窗的标题
      projectListArr: ["男", "女", "未知"], //下拉的数据源，从接口中请求到数据，根据需要变成一维数组，只存name
      showPicker: false, //弹出层显示隐藏
      //日期选择器
      timePop: false, //日期弹出层是否显示
      minDate: new Date(2000, 0, 1), //最小日期
      maxDate: new Date(2025, 10, 1), //最大日期
      currentDate: new Date(), //当前日期
    };
  },
  components: {
    TopBar,
  },
  created() {
    this.id = localStorage.getItem("id");
    console.log(this.$route.query.id);
    console.log(this.id);
    this.$axios({
      method: "post",
      data: {
        id: this.$route.query.id, // 把id作为索引传给后端
      },
      url: "api/user/detail",
    }).then((res) => {
      console.log(res.data);
      if (res.data.sex === "asexual") {
        this.dataarr.sex = this.projectListArr[2];
      } else {
        this.dataarr.sex = res.data.sex;
      }
      if (res.data.sign) {
        // 当签名不为空时
        this.dataarr.sign = res.data.sign;
      }
      if (res.data.birthday) {
        // 当生日不为空时
        this.dataarr.birthday = res.data.birthday.slice(0, 10);
      }
      this.dataarr.name = res.data.name;
      this.dataarr.pwd = res.data.pwd;
      this.dataarr.time = res.data.time;
      // this.dataarr.imgurl = res.data.imgurl;
      res.data.imgurl = "userImg/" + res.data.imgurl;
      this.dataarr.imgurl = "http://localhost:8080/api/" + res.data.imgurl;
      console.log(this.dataarr.imgurl);
      this.$store.commit("setInfo", res.data);
    });

    // 判断与自己的id是否相等
    this.isMe = this.$route.query.id === this.id;
    console.log(this.isMe);
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 打开图片上传
    uploadHeadImg() {
      if (this.isMe) {
        this.$refs.hidden.click(); // 点击图片，实际上点击的是input按钮
        console.log("input");
      }
    },
    // 将头像显示，并且传到后端
    handleFile(e) {
      console.log("e", e.srcElement.files.item(0)); // 图片文件
      // let url = window.URL.createObjectURL(e.srcElement.files.item(0)); // 把图片转成blob格式
      // console.log("blob", url);
      // this.dataarr.imgurl = url;
      let reader = new FileReader();
      reader.readAsDataURL(e.srcElement.files.item(0));
      reader.onload = () => {
        console.log(reader.result);
        console.log(this.dataarr.imgurl);
        this.dataarr.imgurl = reader.result;
        // console.log("this.imgurl", this.imgurl);

        let formData = new FormData();
        formData.append("file", e.srcElement.files.item(0));
        formData.append("name", this.dataarr.name);
        formData.append("sign", this.dataarr.sign);
        formData.append("time", this.dataarr.time);
        formData.append("sex", this.dataarr.sex);
        formData.append("pwd", this.dataarr.pwd);
        formData.append("birthday", this.dataarr.birthday);
        console.log("formData", formData);
        this.$axios({
          method: "post",
          // data: {
          //   arr: this.dataarr,
          // },
          data: formData,
          url: "api/user/updatefile",
        })
          .then((res) => {
            console.log("res.data", res.data);
            if (res.data.msg === "修改成功") {
              this.$axios({
                method: "post",
                data: {
                  id: this.id, // 把id作为索引传给后端
                },
                url: "api/user/detail",
              }).then((res) => {
                this.dataarr.imgurl =
                  "http://localhost:8080/api/userImg/" + res.data.imgurl; // 因为做了代理，不要忘记加上/api！
                console.log("this.dataarr.imgurl", this.dataarr.imgurl);
                localStorage.setItem("imgurl", this.dataarr.imgurl);
              });
            }
            // console.log(this.dataarr);
          })
          .catch(() => {
            console.log("error");
          });
      };
    },

    // 注册时间处理
    timeChange(date) {
      return date.slice(0, 10);
    },
    //性别选择器
    changeConfirm(val, index) {
      this.dataarr.sex = val; //传值
      console.log(val);
      this.$axios({
        method: "post",
        data: {
          arr: this.dataarr,
          // data: this.data,
        },
        url: "api/user/update",
      });
      this.showPicker = false;
      this.$store.commit("setSex", this.dataarr.sex);
    },
    //日期选择器
    getTime(e) {
      // console.log(e);
      let year = e.getFullYear(); //年
      let month = e.getMonth() + 1; //月
      let day = e.getDate(); //日
      let hour = e.getHours(); //时
      let minute = e.getMinutes(); //分
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.dataarr.birthday = `${year}-${month}-${day}`;
      this.$axios({
        method: "post",
        data: {
          arr: this.dataarr,
          // data: this.data,
        },
        url: "api/user/update",
      });
      this.timePop = false; //隐藏弹出层
      console.log(this.dataarr.birthday);

      this.$store.commit("setBirth", this.dataarr.birthday);
    },
    //修改弹窗
    // 当点击取消按钮的时候，会默认传event事件进来，所以需要一个参数接着
    animationChange(e, type, data) {
      this.data = data; // 在文本框中显示内容
      this.modifyTitle = type; // 弹窗的标题
      this.animation = !this.animation;
    },

    //点击弹窗的确定按钮
    determine() {
      if (this.modifyTitle === "昵称") {
        // 要修改的是昵称
        this.dataarr.name = this.data;
        console.log("name", this.dataarr.name);
        this.$store.commit("setName", this.dataarr.name);
        localStorage.setItem("name", this.data);
      } else {
        this.dataarr.sign = this.data;
        console.log("sign", this.dataarr.sign);
        this.$store.commit("setSign", this.dataarr.sign);
      }
      this.$axios({
        method: "post",
        data: {
          arr: this.dataarr,
          // data: this.data,
        },
        url: "api/user/update",
      });
      this.animationChange();
    },
    // 退出登录
    logout() {
      localStorage.clear();
      this.$router.replace("/login");
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
@import "../../commons/css/index.css";
/* @import "../../commons/css/headimg.css"; */
.content {
  box-sizing: border-box;
}
.height100 {
  height: 80%;
}
.flex-column-center {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
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
  margin: 80px 0 20px 0;
  line-height: 44px;
}

/* 修改的弹窗 */
.modify {
  position: absolute;
  z-index: 1002;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.modify-header {
  width: 100%;
  height: 44px;
  /* padding-top: 44px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.modify-header .close {
  padding-left: 16px;
  font-size: 16px;
  line-height: 44px;
  color: rgb(39, 40, 50);
}
.modify-header .title {
  flex: auto;
  text-align: center;
  font-size: 20px;
  line-height: 44px;
  font-weight: 500;
}

.modify-header .define {
  padding-right: 16px;
  font-size: 16px;
  line-height: 44px;
  color: rgb(87, 153, 255);
}
.modify-main {
  display: flex;
  padding: 16px;
  flex-direction: column;
}
.modify-pwd {
  background: rgb(243, 244, 246);
  border-radius: 10px;
  font-size: 16px;
  line-height: 44px;
  height: 44px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 16px;
}
.modify-content {
  background: rgb(243, 244, 246);
  border-radius: 10px;
  border: none;
  height: 193px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  line-height: 44px;
  color: rgb(39, 40, 50);
  padding: 0 10px;
  flex: auto;
}
.hiddenInput {
  display: none;
}
.head_img img {
  width: 80px;
  height: 80px;
}
</style>