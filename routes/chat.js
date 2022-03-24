const db = require('../model/Message');
const Message = db.model('Message');
// 文件上传
const multer = require("multer");
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
    console.log(req.file);
    req.body.message = req.file.filename;
    console.log(req.body);

    Message.create(req.body).then(created => {
      res.send(created);
    })
  })

}