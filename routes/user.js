const db = require('../model/User');
const User = db.model('User');
// 文件上传
const multer = require("multer");
// const upload = multer({ dest: 'uploads/userImg/' })
const storage = multer.diskStorage({
  destination(req, file, cb) {
    let user = req.body.user;   // 没穿user，所以这里是undefined
    console.log('user', user);

    cb(null, './uploads/userImg');
  },
  filename(req, file, cb) {
    let type = file.originalname.replace(/.+\./, '.');
    console.log('type', type);
    cb(null, Date.now() + type);
  }
})
const upload = multer({ storage: storage });


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

    // 修改用户头像
    //  upload.single('file')：括号里的值要和append里面的参数一直
    app.post('/user/updateFile', upload.single('file'), (req, res) => {
      let data = req.body;
      console.log('req.file', req.file);
      // console.log('req.file.path', req.file.path);
      // 配置静态资源路径之后就不需要路径了，只需要文件的名字
      // data.imgurl = req.file.path.replace(/\\/g, "/");
      data.imgurl = req.file.filename;
      // data.originalname = req.file.originalname;
      console.log('插入', data);
      data = JSON.parse(JSON.stringify(data));
      console.log('修改之后', data);

      User.updateOne({ pwd: data.pwd }, { $set: { imgurl: req.file.filename } })
        .then(result => {
          console.log('ok', result)
          res.send({ msg: '修改成功' });  // 把查询到的用户信息传回去
        })
    }),



    // 搜索所有的用户
    app.post('/user/search', (req, res) => {
      User.find((err, data) => {
        // console.log('查找用户', data);
        res.send(data);
      })
    })
}

