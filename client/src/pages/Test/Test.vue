<template>
  <div id="app">
    <div class="item_bock head_p">
      <div class="head_img" @click.stop="uploadHeadImg">
        <img :src="userInfo.avatar" />
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
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: require("../../static/images/img/one.jpg"),
      },
    };
  },
  methods: {
    // 打开图片上传
    uploadHeadImg: function () {
      this.$refs.hidden.click();
    },
    // 将头像显示
    handleFile: function (e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = (data) => {
        let res = data.target || data.srcElement;
        this.userInfo.avatar = res.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
.item_bock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 94px;
  width: 300px;
  padding: 0px 24px 0px 38px;
  border-bottom: 1px solid #f7f7f7;
  background: #fff;
}
.head_p {
  height: 132px;
}
.head_img {
  height: 90px;
}
.head_img img {
  width: 90px;
  height: 90px;
  border-radius: 50px;
}
.setting_right {
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput {
  display: none;
}
.caption {
  color: #8f8f8f;
  font-size: 26px;
  height: 37px;
}
</style>