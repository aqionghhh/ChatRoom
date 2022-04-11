const db = require('../model/Group');
const Group = db.model('Group');
const db2 = require('../model/Groupmessage');
const Groupmessage = db2.model('Groupmessage');
const db3 = require('../model/Groupmember');
const Groupmember = db3.model('Groupmember');
const db4 = require('../model/User');
const User = db4.model('User');
const db5 = require('../model/Friend');
const Friend = db5.model('Friend');
// 文件上传
const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/userImg');
  },
  filename(req, file, cb) {
    let type = file.originalname.replace(/.+\./, '.');
    console.log('type', type);
    cb(null, Date.now() + type);
  }
})
const upload = multer({ storage: storage });


module.exports = function (app) {
  app.post('/group/createGroup', upload.single('file'), (req, res) => {
    console.log(req.file);
    console.log(req.body);

    Group.create({ name: req.body.groupName, master: req.body.groupMaster, imgurl: req.file.filename }).then(async created => {
      // res.send(created);
      console.log(created);
      let sp = req.body.user.split(',');
      console.log(sp);
      for (let i = 0; i < sp.length; i++) {
        Groupmember.create({ groupID: created._id, userID: sp[i] })
      }
      await res.send({ message: 'ok' });

    })
  }),

    //搜索所有群
    app.post('/group/search', (req, res) => {
      console.log('req.body', req.body);
      Group.find((err, data) => {
        res.send(data);
      })
    }),

    // 找有自己的群
    app.post('/group/find', async (req, res) => {
      let arr = []; // 用来存group的信息
      await Group.find({ master: req.body.id }).then(find => {
        if (find[0]) {
          arr = arr.concat(find);
        };
      });
      await Groupmember.find({ userID: req.body.id, state: '0' }).then(async member => {
        for (let i = 0; i < member.length; i++) {
          await Group.find({ _id: member[i].groupID }).then(group => {
            arr = arr.concat(group);
            console.log('groupinfo', arr);
          })
        }
        res.send(arr);
      });
    }),

    // 进入群详情页
    // 根据群id搜索群
    app.post('/group/match', (req, res) => {
      console.log('传进来的群id：', req.body);

      Group.findOne({ _id: req.body.id }).then(async result => {
        let msg = []; // 群详情
        let member = [];  // 群成员

        console.log(result);
        msg = msg.concat(result);
        await User.find({ _id: result.master }).then(user => {
          member = member.concat(user);

        })
        await Groupmember.find({ groupID: req.body.id, state: '0' }).then(async result2 => {
          for (let i = 0; i < result2.length; i++) {
            await User.find({ _id: result2[i].userID }).then(result3 => {
              member = member.concat(result3);
              console.log('member', member);
            })
          }
        })
        res.send({ msg, member });
      })
    }),

    // 删除群成员按钮、退出群聊
    app.post('/group/delete', (req, res) => {
      console.log(req.body);
      Groupmember.deleteOne({ userID: req.body.userID }).then(result => {
        console.log(result);
        res.send({ msg: 'ok' });
      })
    }),

    app.post('/group/update1', (req, res) => {
      console.log(req.body);
      Group.update({
        _id: req.body.id, // 查找朋友发来的数据
      }, {
        $set: { 'name': req.body.update }
      }).then(result => {
        console.log(result);
        res.send({ msg: req.body.update });
      })
    }),
    app.post('/group/update2', (req, res) => {
      console.log(req.body);
      Group.update({
        _id: req.body.id, // 查找朋友发来的数据
      }, {
        $set: { 'notice': req.body.update }
      }).then(result => {
        console.log(result);
        res.send({ msg: req.body.update });
      })
    }),

    app.post('/group/updatefile', upload.single('file'), (req, res) => {
      console.log(req.file.filename);
      console.log(req.body);
      Group.update({
        _id: req.body.id, // 查找朋友发来的数据
      }, {
        $set: { 'imgurl': req.file.filename }
      }).then(result => {
        console.log(result);
        res.send({ msg: 'ok' });
      })
    }),

    // 加群请求
    app.post('/group/request', (req, res) => {
      console.log(req.body);
      Groupmember.find({ userID: req.body.userID, groupID: req.body.friendID })
        .then(result => {
          console.log('result', result);
          if (result[0]) {   // 如果找到了，就返回一个状态
            res.send({ status: 501 });
          } else {  // 没有找到
            Groupmember.create({ userID: req.body.userID, groupID: req.body.friendID, message: req.body.message }).then(created => {
              res.send({ title: '申请成功' });
            })
          }
        })
    }),

    // 展示好友和群信息
    app.post('/group/show', (req, res) => {
      console.log(req.body);
      let group = [];
      Group.find({ _id: req.body.friendID }).then(find => {
        let data = {
          name: find[0].name,
          groupImgurl: find[0].imgurl
        }
        group.push(data);
      });

      Friend.find({ 'userID': req.body.id, state: '0' }).then(async result => {
        // console.log('以本人为user时查询的数据', result);
        for (let j = 0; j < result.length; j++) {
          await Group.find({ _id: req.body.id, master: result[j].friendID }).then(master => {
            if (master.length > 0) {
              result[j].state = '1';  // 代表这个好友是群主
            }
          })
          await Groupmember.find({ groupID: req.body.friendID, userID: result[j].friendID }).then(member => {
            if (member.length > 0) {
              result[j].state = '1';  // 代表这个好友已经在群里了
            }
          })
        }
        result = result.filter((item) => {
          return item.state === "0";
        });
        console.log(result);
        let info = [];
        for (let i = 0; i < result.length; i++) {
          await User.findOne({ _id: result[i].friendID }).then(find2 => {
            let data = {
              friendID: find2._id,
              imgurl: find2.imgurl,
              name: find2.name,
              email: find2.email,
            }
            info.push(data);
          })
        }
        res.send({ group, info });
      })
    }),

    // 邀请群成员
    app.post('/group/inviteMember', async (req, res) => {
      console.log(req.body);
      let state = '1';  // 默认是不能直接加群
      await Group.find({ _id: req.body.groupID, master: req.body.inviteID }).then(master => {
        if (master.length > 0) {
          state = '0'; // 如果是群主邀请，就直接进群 
        }
      })
      for (let i = 0; i < req.body.friendID.length; i++) {
        Groupmember.create({
          groupID: req.body.groupID,
          userID: req.body.friendID[i],
          tip: 0,
          time: new Date(),
          state
        }).then(result => {
          res.send({ msg: 'ok' });
        })
      }
    })

}