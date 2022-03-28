const db = require('../model/Friend');
const Friend = db.model('Friend');
const db2 = require('../model/User');
const User = db2.model('User');
const db3 = require('../model/Message');
const Message = db3.model('Message');

module.exports = function (app) {
  // 查找用户
  app.post('/friend/find', (req, res) => {
    console.log('req.body', req.body);

  })


  // 查询好友相关
  app.post('/friend/search', (req, res) => {
    console.log('frined', req.body);
    // 查询跟本人相关的id
    Friend.find({ 'userID': req.body.id }).then(async result => {
      console.log('以本人为user时查询的数据', result);
      let userarr = result.filter((item) => {
        return item.state === "0";
      });
      let info = [];
      for (let i = 0; i < userarr.length; i++) {
        await User.find({ _id: userarr[i].friendID }).then(find => {
          let data = {
            state: '0',
            friendID: find[i]._id,
            imgurl: find[i].imgurl,
            name: find[i].name,
            email: find[i].email,
          }
          info.push(data);
        })
      }
      console.log('userInfo', info);
      res.send(info);
    })
  }),

    // 首页查询好友和群聊
    app.post('/friend/render', (req, res) => {
      console.log(req.body);
      // 查询以本人为userID的数据
      Friend.find({ 'userID': req.body.id }).then(async result => {
        console.log('以本人为user时查询的数据', result);
        let userarr = result.filter((item) => {
          return item.state === "0";
        });
        let info = [];
        for (let i = 0; i < userarr.length; i++) {
          await User.find({ _id: userarr[i].friendID }).then(find => {
            let data = {
              friendID: find[i]._id,
              imgurl: find[i].imgurl,
              name: find[i].name,
            }
            info.push(data);
          })
        }
        console.log('userInfo', info);

        for (let i = 0; i < info.length; i++) {
          let friendID = info[i].friendID; // 拿到每个friend的id
          // 再查找跟每个friendID相关的最后一条聊天记录
          await Message.find({ $or: [{ 'userID': friendID }, { 'friendID': friendID }] }).sort({ time: -1 }).limit(1).then(result2 => {
            info[i].message = result2[0].message,
              info[i].types = result2[0].types,
              info[i].time = result2[0].time,
              info[i].state = result2[0].state
          })
        }
        console.log('userInfo', info);
        res.send(info);
      })
    })

  // 发送好友请求
  app.post('/friend/request', (req, res) => {
    console.log(req.body);
    // 先进行搜索，如果有的话就不进行插入
    Friend.find({ userID: req.body.userID, friendID: req.body.friendID })
      .then(result => {
        console.log('result', result);
        if (result[0]) {   // 如果找到了，就返回一个状态
          res.send({ status: 501 });
        } else {  // 没有找到
          Friend.create(req.body).then(created => {
            res.send({ title: '创建成功' });
          })
        }
      })
  })

  // 同意加为好友
  app.post('/friend/agree', (req, res) => {
    console.log('同意请求', req.body);

    Friend.find()
  })
}