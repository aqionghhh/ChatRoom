module.exports = function (io) {
  // 在socket中进行注册之后，会自动分配一个 独有的id
  let users = {}; // 注册的每一个用户，装其id

  io.on('connection', socket => {
    console.log('连接成功');

    // 接收
    // 用户登录注册
    socket.on('register', (id) => {
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

    // 一对一私聊
    socket.on('msg', (msg, userID, friendID) => {
      console.log('一对一聊天', msg, userID, friendID);

      //进行判断，有值的时候再发送给对方
      if (users[friendID]) {
        // 发送给对方
        socket.to(users[friendID]).emit('msg1', msg, userID);  // emit里面的后两个参数是聊天的信息和发送方id
      }

      // 自己也需要接收在index页面显示，所以发送一份给自己
      // 这样写好像没用，只能在index页面渲染完成之后把最后一条用户的聊天信息一起渲染出来
      // socket.to(users[userID]).emit('msg1', msg, friendID);
    })

    // 群聊
    socket.on('group', (data) => {
      console.log('group', data);
      socket.join(data);
    })
    // 接收群消息
    socket.on('groupMsg', (msg, fromid, gid) => { // 发送的消息、来自哪个用户id、发到哪个群id
      // 群内广播消息
      console.log('群消息', msg);
      socket.to(gid).emit('groupmsg', msg, gid);  // 发送的消息、发给哪个群
    })
  })
}
