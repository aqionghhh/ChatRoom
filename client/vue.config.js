module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
  publicPath: './',
  lintOnSave: false, //关闭语法检查
  //开启代理服务器（方式一）
  // devServer: {//只能把请求转发给5000，不能发送给多个
  //   proxy: 'http://localhost:5000'//一会要把请求发给5000端口的服务器上
  // },

  //开启代理服务器（方式二）
  devServer: {//指定多个代理
    proxy: {
      '/api': {//'/api'是请求前缀，要走代理就要加/api
        target: 'http://localhost:5000',//如果前缀是/api，就把请求发送给该url
        pathRewrite: { '^/api': '' },//匹配路径：把/api的路径转换成空字符串，不写的话转发给5000端口找不到正确的路径
        ws: true,//用于支持websocket
        changeOrigin: true//默认为true,用于控制请求头中的host值
      },
    }
  }
}