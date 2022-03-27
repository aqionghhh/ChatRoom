const db = require('../model/Group');
const Group = db.model('Group');
const db2 = require('../model/Groupmessage');
const Groupmessage = db2.model('Groupmessage');
const db3 = require('../model/Groupmember');
const Groupmember = db3.model('Groupmember');
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
  })
}