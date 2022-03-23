module.exports = function (io) {
  io.on('connection', socket => {
    console.log('连接成功');

    // 接收
    socket.on('register', (res) => {
      // 从客户端发送来的id
      console.log('从index组件接收来的id', res);
      // 回复客户端
      socket.emit('msg', res);
    })
  })
}
