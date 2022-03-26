const db = require('../model/Group');
const Group = db.model('Group');
const db2 = require('../model/Groupmessage');
const Groupmessage = db2.model('Groupmessage');
// 文件上传
const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/groupImg');
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
  })
}