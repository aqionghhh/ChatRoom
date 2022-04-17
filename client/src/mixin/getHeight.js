export const getHeight = {
  methods: {
    //动态获取元素的高度
    getHeight(decrease) {
      this.height = window.innerHeight - decrease; // 高
    },
  }
}