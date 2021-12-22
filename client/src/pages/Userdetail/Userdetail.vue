<template>
  <div class="content">
    <!-- 头部 -->
    <div class="top-bar">
      <div class="top-left">
        <img
          src="../../static/images/Userhome/左箭头.png"
          @click="back"
          alt=""
        />
      </div>
      <div class="top-bar-center">详情</div>
      <div class="top-bar-right"></div>
    </div>
    <!-- 主体 -->
    <div class="main">
      <div class="column heads">
        <!-- 分成三列 -->
        <!-- 头像 -->
        <div class="row head">
          <div class="title">头像</div>
          <div class="user-head">
            <!-- <img :src="imgurl" class="user-img" alt="" /> -->
            <van-uploader
              class="mt-3"
              :max-size="3 * 1024 * 1024"
              :before-read="beforeRead"
              @oversize="onOversize"
            >
            </van-uploader>
            <van-popup
              class="bg-tran"
              v-model="showCropper"
              closeable
              position="top"
              :style="{ height: '100%' }"
            >
              <div class="flex-column-center height100">
                <vueCropper
                  ref="cropper"
                  :img="option.img"
                  :outputSize="option.outputSize"
                  :outputType="option.outputType"
                  :info="option.info"
                  :full="option.full"
                  :autoCropWidth="option.autoCropWidth"
                  :autoCropHeight="option.autoCropHeight"
                  :canMove="option.canMove"
                  :canMoveBox="option.canMoveBox"
                  :original="option.original"
                  :autoCrop="option.autoCrop"
                  :fixed="option.fixed"
                  :fixedNumber="option.fixedNumber"
                  :centerBox="option.centerBox"
                  :infoTrue="option.infoTrue"
                  :fixedBox="option.fixedBox"
                  :high="option.high"
                  :mode="option.mode"
                ></vueCropper>
                <van-button type="danger" @click="cancelCropper"
                  >取消</van-button
                >
                <van-button type="danger" @click="rotateImage">旋转</van-button>
                <van-button type="danger" @click="getCropBlob">确定</van-button>
              </div>
            </van-popup>
          </div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 签名 -->
        <div class="row">
          <div class="title">签名</div>
          <div
            class="cont"
            @click="animationChange('签名', dataarr.sign, false)"
          >
            {{ dataarr.sign }}
          </div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 注册 -->
        <div class="column row">
          <div class="title">注册</div>
          <div class="cont">{{ timeChange(dataarr.time) }}</div>
        </div>
        <!-- 昵称 -->
        <div class="row">
          <div class="title">昵称</div>
          <div
            class="cont"
            @click="animationChange('昵称', dataarr.name, false)"
          >
            {{ dataarr.name }}
          </div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
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
          <div class="more" @click="timePop = true">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 电话 -->
        <div class="row">
          <div class="title">电话</div>
          <div class="cont">{{ dataarr.phone }}</div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 邮箱 -->
        <div class="column row">
          <div class="title">邮箱</div>
          <div
            class="cont"
            @click="animationChange('邮箱', dataarr.email, true)"
          >
            {{ dataarr.email }}
          </div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
        <!-- 密码 -->
        <div class="row">
          <div class="title">密码</div>
          <div class="cont">{{ dataarr.pwd }}</div>
          <div class="more">
            <img src="../../static/images/Userdetail/右箭头.png" alt="" />
          </div>
        </div>
      </div>
      <div class="btn2">退出登录</div>
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
          <input
            type="text"
            v-model="pwd"
            class="modify-pwd"
            placeholder="请输入原密码"
            v-show="ispwd"
          />
          <textarea v-model="data" class="modify-content"></textarea>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import myfun from "../../commons/js/myfun";
export default {
  data() {
    return {
      dataarr: {
        name: "aqionghhh", //昵称
        sign: "呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃", //签名
        time: new Date(), //注册时间
        sex: "女", //性别input框内显示的值
        birthday: "2001-07-25", //日期input框内显示的时间
        phone: "15289857572", //电话
        email: "2667183507@qq.com", //邮箱
        pwd: "sun131313", //密码
      },
      ispwd: true, //是否需要psw显示在修改弹窗上
      pwd: "", //在修改弹窗中用户需要输入的原密码
      animation: false, //弹窗是否显示
      data: "修改的内容", //弹窗的内容
      option: {
        img: "",
        outputSize: 0.8,
        info: false, // 裁剪框的大小信息
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: window.innerWidth - 100 + "px", // 默认生成截图框宽度
        autoCropHeight: window.innerWidth - 100 + "px", // 默认生成截图框高度
        high: true, // 是否按照设备的dpr 输出等比例图片
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: "100% auto", // 图片默认渲染方式
      },

      showCropper: false, // 截图弹窗遮罩默认隐藏
      imageAccept: "/jpg,/png,/jpeg",
      imageFileName: "",
      modifyTitle: "", //弹窗的标题
      imgurl: require("../../static/images/img/two.jpg"),
      projectListArr: ["男", "女", "未知"], //下拉的数据源，从接口中请求到数据，根据需要变成一维数组，只存name
      showPicker: false, //弹出层显示隐藏
      //日期选择器
      timePop: false, //日期弹出层是否显示
      minDate: new Date(2000, 0, 1), //最小日期
      maxDate: new Date(2025, 10, 1), //最大日期
      currentDate: new Date(), //当前日期
    };
  },
  methods: {
    imageToBase64(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 截图框中的图片
        this.option.img = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },

    // 确认剪裁并上传图片
    getCropBlob() {
      this.$comMethods.toast("上传中", 0);
      let formData = new FormData();
      this.$refs.cropper.getCropBlob((data) => {
        formData.append("avatar", data, this.imageFileName);
        // formData私有类对象，访问不到，可以通过get判断值是否传进去
        console.log(formData.get("avatar"));
        // 上传图片至服务器
        this.$api
          .modifyProfile(formData)
          .then((res) => {
            if (res.code === 200) {
              this.$toast("更改头像成功");
              // do something...
            } else {
              this.$toast("上传失败");
            }
          })
          .catch((err) => console.error(err));
      });
    },

    // 旋转图片
    rotateImage() {
      this.$refs.cropper.rotateRight();
    },

    // 取消截图上传头像
    cancelCropper() {
      this.showCropper = false; // 隐藏切图遮罩
      this.showPopup = true;
    },
    back() {
      this.$router.back();
    },
    //时间处理
    timeChange(date) {
      return myfun.detailTime(date);
    },
    //性别选择器
    changeConfirm(val, index) {
      this.dataarr.sex = val; //传值
      console.log(index);
      this.showPicker = false;
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

      this.timePop = false; //隐藏弹出层
      // console.log(this.time);
    },
    finish2() {
      this.$refs.cropper2.getCropData((data) => {
        this.modelSrc = data;
        this.model = false;
        //裁剪后的图片显示
        this.example2.img = this.modelSrc;
        // this.toBlob(data)
        // console.log(data)
        // console.log(this.toBlob(data))

        //将图片上传服务器中
      });
    },

    onOversize() {
      this.$notify("图片不能大于3M");
    },

    // 获取文件后缀
    getFileSuffix(fileName) {
      return fileName.match(/\/\w+$/)[0].toLowerCase();
    },

    // 选择图片上传前操作，调起剪裁组件
    beforeRead(file) {
      if (!this.imageAccept.includes(this.getFileSuffix(file.type))) {
        return this.$notify("请上传 jpg/png 格式图片");
      }
      this.showCropper = true;
      this.imageFileName = file.name;
      // 本地图片转成base64，用于截图框显示本地图片
      this.imageToBase64(file);
    },

    //修改弹窗
    animationChange(type, data, ispwd) {
      this.animation = !this.animation;
      this.modifyTitle = type;
      this.data = data;
      this.ispwd = ispwd;
    },

    //点击弹窗的确定按钮
    determine() {
      this.animationChange();
    },
  },
};
</script>

<style scoped>
@import "../../commons/css/index.css";
/* @import "../../commons/css/headimg.css"; */
.height100 {
  height: 80%;
}
.flex-column-center {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.vue-cropper {
  background: #000;
}
.cropper-view-box {
  outline: 1px solid #fff !important;
  outline-color: #fff !important;
}
van-popup {
  padding: 0;
  margin: 0;
}
.top-bar-center {
  text-align: center;
  color: #272832;
  font-weight: 550;
  font-size: 20px;
  line-height: 44px;
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
  margin-top: 80px;
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
</style>