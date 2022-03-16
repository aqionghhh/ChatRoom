<template>
  <div class="a">
    <div class="ab" ref="scroll">
      <div class="abc">
        <div class="e" v-for="n in 100" :key="n">{{ n }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
BScroll.use(MouseWheel);

export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.scroll = new BScroll(this.$refs.scroll, {
        mouseWheel: true,
      });
    },
  },
};
</script>

<style scoped>
.ab {
  height: 400px;
  overflow: hidden;
}
.e {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.e:nth-child(2n) {
  background-color: #c3d899;
}
.e:nth-child(2n + 1) {
  background-color: #f2d4a7;
}
</style>