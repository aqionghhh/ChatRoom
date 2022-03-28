const db = require('../model/Message');
const Message = db.model('Message');
// 文件上传
const multer = require("multer");
const User = require('../model/User');
// const upload = multer({ dest: 'uploads/userImg/' })
const storage = multer.diskStorage({
  destination(req, file, cb) {
    let user = req.body.user;   // 没传user，所以这里是undefined
    // console.log('user', user);

    cb(null, './uploads/chatImg');
  },
  filename(req, file, cb) {
    let type = file.originalname.replace(/.+\./, '.');
    console.log('type', type);
    cb(null, Date.now() + type);
  }
})
const upload = multer({ storage: storage });

module.exports = function (app) {
  app.post('/chat/add', upload.single('file'), (req, res) => {
    // console.log(req.file);
    req.body.message = req.file.filename;
    console.log(req.body);

    Message.create(req.body).then(created => {
      res.send(created);
    })
  }),

    app.post('/chat/text', (req, res) => {
      console.log(req.body);
      Message.create(req.body).then(created => {
        res.send(created);
      })
    }),

    // 查找两个用户的最后一条聊天记录
    app.post('/chat/findOne', (req, res) => {
      console.log('查找最后一条聊天数据', req.body);
      // 首先查询跟本人id相关的聊天记录
      Message.find({ $or: [{ 'userID': req.body.userID }, { 'friendID': req.body.userID }] }).then(async ids => {
        // console.log(ids)
        let arr = []; // 存储所有跟friends相关的最后一条聊天记录
        for (let i = 0; i < req.body.friends.length; i++) {
          let friendID = req.body.friends[i]._id; // 拿到每个friend的id
          // 再查找跟每个friendID相关的最后一条聊天记录
          await Message.find({ $or: [{ 'userID': friendID }, { 'friendID': friendID }] }).sort({ time: -1 }).limit(1).then(result => {
            arr = arr.concat(result);
          })
        }
        console.log(arr);
        res.send(arr);
      })


      // for ( let i = 0; i < req.body.friends.length; i++) {
      //   let friendID = req.body.friends[i]._id; // 拿到每个friend的id
      //   Message.find({ userID: req.body.userID }).then(result => {
      //     console.log(result);
      //   })
      // }
    }),

    // 查找两个人的聊天记录
    app.post('/chat/getMessage', (req, res) => {
      console.log('查找聊天数据', req.body);
      // 按照时间倒叙查找100条
      if (req.body.target === 'friend') { // 用户聊天记录查询

        Message.find({ $or: [{ userID: req.body.userID }, { friendID: req.body.userID }] }).sort({ time: -1 }).then(async result => {
          // console.log(result);

          await User.findOne({ _id: req.body.userID }).then(img => {
            // console.log(img.imgurl);
          });
          await Message.find({ $or: [{ userID: req.body.friendID }, { friendID: req.body.friendID }] }).sort({ time: -1 }).limit(100).then(result2 => {

            // console.log(result2);
            res.send(result2);
          })
        })
      }
    })
}