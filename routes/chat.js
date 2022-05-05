const db = require('../model/Message');
const Message = db.model('Message');
// 文件上传
const multer = require("multer");
const User = require('../model/User');
const user = require('./user');
const Group = require('../model/Group');
const Groupmessage = require('../model/Groupmessage');

const fs = require('fs');
const path = require('path');
const { log } = require('console');
let paths = 'E:\\program\\Chat\\uploads\\chatImg\\';

// const upload = multer({ dest: 'uploads/userImg/' })
const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('user', file);
    let user = file.originalname.split('-');
    let path2 = 'E:\\program\\Chat\\uploads\\chatImg\\' + user[0];

    if (fs.existsSync(path2)) { // 存在
      console.log('存在');
      cb(null, path2);
    } else {  // 不存在
      console.log('不存在');
      fs.mkdirSync(path2);
      cb(null, path2);
    }
  },
  filename(req, file, cb) {
    let type = file.originalname.replace(/.+\./, '.');

    console.log('file', file);
    console.log('type', type);
    if (file.fieldname === 'chunk') {
      cb(null, file.originalname);
    } else {
      cb(null, Date.now() + type);
    }
  }
})
const upload = multer({ storage: storage });

module.exports = function (app) {
  app.post('/chat/add', upload.single('file'), (req, res) => {
    // console.log(req.file);
    req.body.message = req.file.filename;
    console.log(req.body);

    if (req.body.target === 'friend') {
      Message.create(req.body).then(created => {
        res.send(created);
      })
    } else {
      Groupmessage.create(req.body).then(created => {
        console.log('created', created);
        res.send(created);
      })
    }
  }),

    app.post('/chat/text', (req, res) => {
      console.log(req.body);
      if (req.body.target === 'friend') {
        Message.create(req.body).then(created => {
          res.send(created);
        })
      } else {
        Groupmessage.create(req.body).then(created => {
          console.log('created', created);
          res.send(created);
        })
      }
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
    }),
    // 清空未读消息
    app.post('/chat/stateZero', (req, res) => {
      console.log('要清空聊天state', req.body);
      if (req.body.target === 'friend') {
        Message.update({
          userID: req.body.friendID, // 查找朋友发来的数据
          friendID: req.body.userID
        }, {
          $set: { 'tip': 0 }
        }).then(result => {
          console.log(result);
        })
      }

    })

  // 查找两个人的聊天记录
  app.post('/chat/getMessage', (req, res) => {
    console.log('查找聊天数据', req.body);
    // 按照时间倒叙查找100条
    const d = new Date();
    let month = d.getMonth() + 1;
    let today = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();
    let second = d.getSeconds();
    console.log(hour);
    console.log(month, today);
    if (req.body.page + 1 > today) {
      if ((month - 1) === 1 || 3 || 5 || 7 || 8 || 10 || 12) {
        month -= 1;
        req.body.page -= 31;
      } else if (month === 2) {
        req.body.page -= 28;
        month -= 1;
      } else {
        month -= 1;
        req.body.page -= 30;
      }
    }

    if (req.body.target === 'friend') { // 用户聊天记录查询
      Message.find({
        $or: [{
          userID: req.body.userID,  // 我是发送者，朋友是接收者
          friendID: req.body.friendID,
          // time: { $gt: new Date(2022, month - 1, (today - req.body.page - 1), hour, min, second), $lte: new Date(2022, month - 1, (today - req.body.page), hour, min, second) }
        }, {
          userID: req.body.friendID,  // 朋友是发送者，我是接收者
          friendID: req.body.userID,
          // time: { $gt: new Date(2022, month - 1, (today - req.body.page - 1), hour, min, second), $lte: new Date(2022, month - 1, (today - req.body.page), hour, min, second) }
        }]
        // .limit(20).skip((req.body.page) * 20)：这样可以按照刷新一次返回20条数据，但是这样可能造成重复渲染
      }).sort({ time: -1 }).then(result => {
        // 因为mongodb存储的时间比东八区慢6个小时，所以需要手动加上
        // console.log(result);
        res.send(result);

      })
    } else {  // 群聊
      Groupmessage.find({ friendID: req.body.friendID }).sort({ time: -1 }).then(result => {
        console.log('length', result.length);
        res.send(result);
      })
    }
  }),
    app.post('/chat/file', upload.single('chunk'), (req, res) => {
      console.log('req.file', req.file);
      console.log('req.body', req.body);
      let index = req.file.originalname.split('-');

      res.send({ index: index[1] });

    }),
    app.post('/chat/merge', async (req, res) => {
      let user = req.body.filename.split('.');
      console.log('111', user);
      console.log('222', req.body);

      // 合并切片
      const { filename, size } = req.body;
      const filePath = paths + filename;

      let firstName = filename.split('.');

      await mergeFileChunk(filePath, firstName[0], size);

      //   Message.create(req.body).then(created => {
      res.send(
        { msg: 'ok' }
      );
      //   })
    }),

    // 文件秒传
    app.post('/chat/verify', (req, res) => {
      console.log(req.body);
      const { fileHash, filename } = req.body;
      const ext = extractExt(filename); // .mp3
      const filePath = paths + `${fileHash}${ext}`;
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log('有这个东西');
        res.send({
          shouldUpload: false
        });
      } else {
        console.log(createUploadedList(fileHash));

        console.log('没有这个东西');
        res.send({
          shouldUpload: true,
          uploadedList: createUploadedList(fileHash)
        });
      }

    })
}
// 合并切片
const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = 'E:\\program\\Chat\\uploads\\chatImg\\' + filename;
  const chunkPaths = fs.readdirSync(chunkDir);
  console.log('chunkPaths', chunkPaths);
  console.log('size', size);

  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      console.log('切片存储文件夹：', chunkDir + '\\' + chunkPath);
      console.log('文件写入文件夹：', filePath);
      pipeStream(
        chunkDir + '\\' + chunkPath,
        // 指定位置创建可写流
        fs.createWriteStream(filePath, {
          start: index * size[index],
          end: (index + 1) * size[index]
        })
      )
    }
    )
  );
  console.log('要删除的文件名', chunkDir);
  const deleted = fs.readdirSync(chunkDir);
  console.log('deleted', deleted);
  // fs.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};
const pipeStream = (path, writeStream) => {
  console.log('可读流路径', path);
  new Promise(resolve => {
    const readStream = fs.createReadStream(path);
    readStream.on("end", () => {
      fs.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  })
};
// 判断是否需要进行文件秒传
const extractExt = filename =>
  filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名


// 返回已经上传切片名列表
const createUploadedList = fileHash =>
  fs.existsSync(paths + fileHash)
    ? fs.readdirSync(paths + fileHash)
    : [];
