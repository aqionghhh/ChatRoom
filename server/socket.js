module.exports = function (io) {
  io.on('connection', socket => {
    console.log('连接成功');

    // 在socket中进行注册之后，会自动分配一个 独有的id
    let users = {}; // 注册的每一个用户，装其id

    // 接收
    socket.on('register', (id) => {
      // 从客户端发送来的id
      console.log('从index组件接收来的用户id', id);
      // 回复客户端
      socket.emit('msg', socket.id);
      // 注册
      socket.name = id;
      console.log(socket.name);
      users[id] = socket.id;  // 是一个 用户id: socket.id 的键值对
      console.log('users', users);
    })

    // 用户离开
    socket.on('disconnecting', () => {
      // console.log(socket);
      console.log(users.hasOwnProperty(socket.name));
      if (users.hasOwnProperty(socket.name)) {  // users有socket.name这个属性
        delete users[socket.name];
        console.log('删除之后', users);   // 用户离开页面就删除
      }
      console.log(socket.id + '离开');
    })

    // 私聊
    socket.on('msg', (msg, userID, FriendID) => {
      console.log('一对一聊天', msg, userID, FriendID);
      // 回复客户端
      // socket.emit('msg', socket.id);
      // 注册
    })
  })
}
