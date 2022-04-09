const db = require('../model/Friend');
const Friend = db.model('Friend');
const db2 = require('../model/User');
const User = db2.model('User');
const db3 = require('../model/Message');
const Message = db3.model('Message');
const db4 = require('../model/Group');
const Group = db4.model('Group');
const db5 = require('../model/Groupmember');
const Groupmember = db5.model('Groupmember');
const db6 = require('../model/Groupmessage');
const Groupmessage = db6.model('Groupmessage');

module.exports = function (app) {
  // 查找用户
  app.post('/friend/find', (req, res) => {
    console.log('req.body', req.body);

  })


  // 查询好友相关
  app.post('/friend/search', (req, res) => {
    console.log('frined', req.body);
    // 查询跟本人相关的id
    Friend.find({ $or: [{ 'userID': req.body.id }, { 'friendID': req.body.id }] }).then(async result => {
      console.log('以本人为user时查询的数据', result);
      let userarr = result.filter((item) => {
        return item.state === "0";
      });

      let info = [];
      for (let i = 0; i < userarr.length; i++) {
        await User.findOne({ _id: userarr[i].friendID }).then(find => {
          console.log('find', find);
          let data = {
            state: '0',
            friendID: find._id,
            imgurl: find.imgurl,
            name: find.name,
            email: find.email,
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
      let grouparr = [];

      // 查询以本人为userID的数据
      Friend.find({ 'userID': req.body.id }).then(async result => {
        console.log('以本人为user时查询的数据', result);
        let userarr = result.filter((item) => {
          return item.state === "0";
        });
        // 群
        await Group.find({ 'master': req.body.id }).then(result2 => {
          console.log('result2', result2);
          for (let i = 0; i < result2.length; i++) {
            Groupmessage.findOne({ groupID: result2[i]._id }).sort({ time: -1 }).limit(1).then(master => {
              console.log('master', master);
              if (master) { // 有聊天记录
                let msg = {
                  friendID: result2[i]._id,
                  name: result2[i].name,
                  imgurl: result2[i].imgurl,
                  tip: result2[i].tip,
                  message: master.message,
                  time: master.time,
                  types: master.types,
                  target: 'group'
                }
                grouparr = grouparr.concat(msg);
              } else {  // 没有聊天记录
                let msg = {
                  friendID: result2[i]._id,
                  name: result2[i].name,
                  imgurl: result2[i].imgurl,
                  tip: 0,
                  message: "你已加入群聊",
                  time: result2[i].time,
                  types: "0",
                  target: 'group'
                }
                grouparr = grouparr.concat(msg);
              }
            })
          }
        });

        // 群成员（找我加入的、但不是群主的群）
        await Groupmember.find({ 'userID': req.body.id }).then(async result3 => {
          console.log('result3', result3);
          for (let i = 0; i < result3.length; i++) {
            // 群
            await Group.findOne({ '_id': result3[i].groupID }).then(async result4 => {
              console.log('result4', result4);
              // 查找群里的最后一条聊天记录
              await Groupmessage.findOne({ groupID: result4._id }).sort({ time: -1 }).limit(1).then(groupMsg => {
                console.log(groupMsg);
                if (groupMsg) { // 有聊天记录
                  let msg = {
                    friendID: result4._id,
                    name: result4.name,
                    imgurl: result4.imgurl,
                    tip: result3[i].tip,
                    message: groupMsg.message,
                    time: groupMsg.time,
                    types: groupMsg.types,
                    target: 'group'
                  }
                  grouparr = grouparr.concat(msg);
                } else {  // 没有聊天记录
                  let msg = {
                    friendID: result4._id,
                    name: result4.name,
                    imgurl: result4.imgurl,
                    tip: 0,
                    message: "你已加入群聊",
                    time: result4.time,
                    types: "0",
                    target: 'group'
                  }
                  grouparr = grouparr.concat(msg);
                }
                console.log(grouparr);
              })

            })
          }
        })


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
          await Message.find({ $or: [{ 'userID': friendID }, { 'friendID': friendID }] }).sort({ time: -1 }).limit(1).then(async result2 => {
            // 查找所有的聊天记录，并计算state
            let count = 0;

            await Message.find({
              userID: friendID,  // 我是发送者，朋友是接收者
              friendID: req.body.id,
            }).then(result3 => {
              for (let i = 0; i < result3.length; i++) {
                if (result3[i].tip === 1) { // 1为未读，0为已读
                  count += 1;
                }
              }
              console.log(count);
            });
            info[i].message = result2[0].message,
              info[i].types = result2[0].types,
              info[i].time = result2[0].time,
              info[i].tip = count;
            info[i].target = 'friend'
          })
        }
        // info = info.concat(grouparr);
        console.log('userInfo', info);
        res.send({ info, grouparr });
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
  }),

    // 同意加为好友
    app.post('/friend/confirm', (req, res) => {
      console.log(req.body);
      Friend.update({
        userID: req.body.friendID, // 查找朋友发来的数据
        friendID: req.body.userID
      }, {
        $set: { 'state': '0' }
      }).then(result2 => {
        console.log(result2);
        Friend.find({
          userID: req.body.userID,
          friendID: req.body.friendID
        }).then(result2 => {
          if (result2 == []) {
            Friend.insert({
              userID: req.body.userID,
              friendID: req.body.friendID,
              state: '0',
              time: new Date()
            }).then(result3 => {
              console.log(result3);
              // res.send(result3);
            })
          } else if (result2[0].state === '1') {
            Friend.update({
              userID: req.body.userID,
              friendID: req.body.friendID,
            }, {
              $set: { 'state': '0' }
            }).then(result4 => {
              console.log(result4);
              res.send(result4);
            })
          }
        })

      })
    })

  // 同意加为好友
  app.post('/friend/agree', (req, res) => {
    console.log('同意请求', req.body);

    Friend.find()
  })
}