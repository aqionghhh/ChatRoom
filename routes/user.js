const db = require('../model/User');
const User = db.model('User');
// const multer = require("multer");
// const upload = multer({ dest: 'uploads/userImg/' })
// 查询用户详情
module.exports = function (app) {
  app.post('/user/detail', (req, res) => {
    console.log('传进来的id', req.body.id);
    User.findOne({ _id: req.body.id }, (err, data) => {
      if (err) {
        console.log('出错了', err)
      }
      console.log('找到的data', data)
      res.send(data);  // 把查询到的用户信息传回去
    })
  }),

    // 修改用户信息
    //  upload.single('file')：括号里的值要和append里面的参数一直
    // app.post('/user/update', upload.single('file'), (req, res) => {
    //   let data = req.body;
    //   console.log('req.file', req.file);
    //   data.imgurl = req.file.path;
    //   data.originalname = req.file.originalname;
    //   console.log('插入', data);

    //   User.findOneAndUpdate({ pwd: data.pwd }, { $set: data }, (err, data) => {
    //     console.log('ok', data)
    //     data.imgurl = 
    //     res.send(data);  // 把查询到的用户信息传回去
    //   })
    // }),
    app.post('/user/update', (req, res) => {
      let data = req.body.arr;
      console.log('插入', data);

      User.findOneAndUpdate({ pwd: data.pwd }, { $set: data }, (err, data) => {
        console.log('ok', data)
        res.send(data);  // 把查询到的用户信息传回去
      })
    }),

    // 搜索所有的用户
    app.post('/user/search', (req, res) => {
      User.find((err, data) => {
        console.log('查找用户', data);
        res.send(data);
      })
    })
}

