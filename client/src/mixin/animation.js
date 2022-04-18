export const animationChange = {
  methods: {
    animationChange(e, type, data) {
      this.data = data; // 在文本框中显示内容
      this.modifyTitle = type; // 弹窗的标题
      this.animation = !this.animation;
    },
  }
}